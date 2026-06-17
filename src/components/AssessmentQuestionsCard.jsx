import React, { useState, useRef } from 'react';
import { UI_STRINGS } from '../constants/uiStrings';

const AssessmentQuestionsCard = ({ node, lang, onMouseDown, onTouchStart, onDelete, onUpdate, isDraggingThis, currentAssessment }) => {
  const t = UI_STRINGS[lang];
  const [inputText, setInputText] = useState('');
  const [questionType, setQuestionType] = useState('yes_no');
  const [expandedQ, setExpandedQ] = useState(null);
  const [newOptionText, setNewOptionText] = useState('');
  const importRef = useRef(null);

  const questions = node.questions || [];

  const onUpdateQuestions = (nodeId, newQs) => {
    onUpdate({ questions: newQs });
  };

  const questionTypeLabel = (type) => t.questionTypes[type] || type;

  const questionTypeBadge = (type) => {
    if (type === 'yes_no') return 'bg-indigo-100 text-indigo-700';
    if (type === 'multiple') return 'bg-blue-100 text-blue-700';
    if (type === 'single') return 'bg-emerald-100 text-emerald-700';
    return 'bg-gray-100 text-gray-700';
  };

  const addQuestion = () => {
    const text = inputText.trim();
    if (!text) return;
    const newQ = {
      id: 'q_' + Date.now(),
      text,
      type: questionType,
      options: (questionType === 'multiple' || questionType === 'single') ? [] : null,
    };
    onUpdateQuestions(node.id, [...questions, newQ]);
    setInputText('');
  };

  const deleteQuestion = (qid) => {
    onUpdateQuestions(node.id, questions.filter(q => q.id !== qid));
    if (expandedQ === qid) setExpandedQ(null);
  };

  const addOption = (qid) => {
    const text = newOptionText.trim();
    if (!text) return;
    const updated = questions.map(q => {
      if (q.id !== qid) return q;
      const opts = q.options || [];
      return { ...q, options: [...opts, { id: 'opt_' + Date.now(), text, qualifies: true }] };
    });
    onUpdateQuestions(node.id, updated);
    setNewOptionText('');
  };

  const toggleQualifies = (qid, oid) => {
    const updated = questions.map(q => {
      if (q.id !== qid) return q;
      return { ...q, options: q.options.map(o => o.id === oid ? { ...o, qualifies: !o.qualifies } : o) };
    });
    onUpdateQuestions(node.id, updated);
  };

  const deleteOption = (qid, oid) => {
    const updated = questions.map(q => {
      if (q.id !== qid) return q;
      return { ...q, options: q.options.filter(o => o.id !== oid) };
    });
    onUpdateQuestions(node.id, updated);
  };

  const exportJSON = () => {
    const data = JSON.stringify({ title: node.title, visaPathway: currentAssessment || null, questions }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (node.title.replace(/[^a-z0-9]/gi, '_') || 'questions') + '.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        const qs = parsed.questions || parsed;
        if (Array.isArray(qs)) {
          const updates = { questions: qs };
          if (parsed.title) updates.title = parsed.title;
          onUpdate(updates);
        }
      } catch(err) { alert(t.invalidJSON); }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const styles = 'border-purple-400 bg-purple-50 text-purple-900 shadow-purple-100/50';

  return (
    <div
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      style={{ left: node.x, top: node.y }}
      className={`absolute z-10 rounded-xl border-2 node-card shadow-lg cursor-pointer
                    w-80 ${styles} ${isDraggingThis ? 'scale-105 z-20 shadow-xl opacity-90' : ''}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-4 pt-4 pb-2 border-b border-purple-200">
        <h3
          className="font-bold text-sm tracking-tight leading-tight flex-1 min-w-0 truncate outline-none"
          contentEditable={true}
          suppressContentEditableWarning={true}
          onBlur={(e) => onUpdate({ title: e.currentTarget.innerText })}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {node.title}
        </h3>
        <div className="flex items-center gap-1 ml-2 flex-none">
          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-purple-200 text-purple-800">{t.questions}</span>
          <button
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); exportJSON(); }}
            className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 hover:bg-purple-200 text-purple-700 border border-purple-300"
            title={t.exportJSON}
          >↓ JSON</button>
          <button
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); importRef.current && importRef.current.click(); }}
            className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 hover:bg-purple-200 text-purple-700 border border-purple-300"
            title={t.importJSON}
          >↑ JSON</button>
          <input ref={importRef} type="file" accept=".json" className="hidden" onChange={importJSON} />
          <button
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); onDelete(node.id); }}
            className="text-purple-400 hover:text-red-500 text-xs font-bold px-1"
            title={t.deleteCard}
          >✕</button>
        </div>
      </div>

      {/* Questions list */}
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="max-h-64 overflow-y-auto px-3 py-2 flex flex-col gap-1.5"
      >
        {questions.length === 0 && (
          <p className="text-xs text-purple-400 italic text-center py-3">
            {t.noQuestionsYet}
          </p>
        )}
        {questions.map((q, idx) => (
          <div key={q.id} className="rounded-lg border border-purple-200 bg-white/70 overflow-hidden">
            {/* Question row */}
            <div className="flex items-start gap-1.5 px-2 py-1.5">
              <span className="text-[10px] font-bold text-purple-400 mt-0.5 flex-none">{idx + 1}.</span>
              <span className="text-xs font-medium flex-1 leading-snug">{q.text}</span>
              <div className="flex items-center gap-1 flex-none">
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${questionTypeBadge(q.type)}`}>
                  {questionTypeLabel(q.type)}
                </span>
                {(q.type === 'multiple' || q.type === 'single') && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setExpandedQ(expandedQ === q.id ? null : q.id); setNewOptionText(''); }}
                    className="text-[10px] text-purple-500 hover:text-purple-700 font-bold px-1"
                    title={t.viewEditOptions}
                  >{expandedQ === q.id ? '▲' : '▼'}</button>
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); deleteQuestion(q.id); }}
                  className="text-[10px] text-purple-300 hover:text-red-500 font-bold px-0.5"
                >✕</button>
              </div>
            </div>
            {/* Options panel */}
            {expandedQ === q.id && (q.type === 'multiple' || q.type === 'single') && (
              <div className="border-t border-purple-100 bg-purple-50/60 px-2 py-1.5 flex flex-col gap-1">
                {(q.options || []).length === 0 && (
                  <p className="text-[10px] text-purple-400 italic">
                    {t.noOptionsYet}
                  </p>
                )}
                {(q.options || []).map(opt => (
                  <div key={opt.id} className="flex items-center gap-1.5">
                    <span className="text-[10px] flex-1 leading-snug">{opt.text}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleQualifies(q.id, opt.id); }}
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded border transition-colors ${
                        opt.qualifies
                          ? 'bg-emerald-100 text-emerald-700 border-emerald-300'
                          : 'bg-red-100 text-red-600 border-red-300'
                      }`}
                      title={t.clickToToggle}
                    >
                      {opt.qualifies ? t.qualifies : t.disqualifies}
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteOption(q.id, opt.id); }}
                      className="text-[10px] text-purple-300 hover:text-red-500 font-bold"
                    >✕</button>
                  </div>
                ))}
                {/* Add option input */}
                <div className="flex gap-1 mt-0.5">
                  <input
                    type="text"
                    value={newOptionText}
                    onChange={(e) => setNewOptionText(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addOption(q.id); } }}
                    placeholder={t.newOption}
                    className="flex-1 text-[10px] border border-purple-200 rounded px-1.5 py-1 bg-white focus:outline-none focus:border-purple-400"
                  />
                  <button
                    onClick={(e) => { e.stopPropagation(); addOption(q.id); }}
                    className="text-[10px] font-bold px-2 py-1 rounded bg-purple-500 hover:bg-purple-600 text-white"
                  >+</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input area */}
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="border-t border-purple-200 px-3 py-2 bg-purple-50/80"
      >
        {/* Type selector */}
        <div className="flex gap-1 mb-1.5">
          {['yes_no', 'multiple', 'single'].map(type => (
            <button
              key={type}
              onClick={(e) => { e.stopPropagation(); setQuestionType(type); }}
              className={`flex-1 text-[9px] font-bold py-1 rounded border transition-colors ${
                questionType === type
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-white text-purple-600 border-purple-300 hover:bg-purple-100'
              }`}
            >
              {questionTypeLabel(type)}
            </button>
          ))}
        </div>
        {/* Text input + submit */}
        <div className="flex gap-1.5">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addQuestion(); } }}
            placeholder={t.typeQuestion}
            className="flex-1 text-xs border border-purple-300 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none focus:border-purple-500 placeholder-purple-300"
          />
          <button
            onClick={(e) => { e.stopPropagation(); addQuestion(); }}
            className="flex-none text-xs font-bold px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors"
          >
            {t.addQuestion}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentQuestionsCard;
