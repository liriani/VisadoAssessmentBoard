import React, { useState, useRef, useEffect } from 'react';

const getNodeStyles = (type) => {
  switch(type) {
    case 'start': return 'border-indigo-400 bg-indigo-50 text-indigo-900 shadow-indigo-100/50';
    case 'filter': return 'border-amber-400 bg-amber-50 text-amber-900 shadow-amber-100/50';
    case 'error': return 'border-red-400 bg-red-50 text-red-900 shadow-red-100/50';
    case 'branch': return 'border-blue-400 bg-blue-50 text-blue-900 shadow-blue-100/50';
    case 'result': return 'border-emerald-400 bg-emerald-50 text-emerald-900 shadow-emerald-100/50';
    case 'comment': return 'border-yellow-400 bg-yellow-100 text-yellow-900 shadow-yellow-100/50';
    default: return 'border-gray-400 bg-white text-gray-900 shadow-gray-100/50';
  }
};

const getBadgeColor = (type) => {
  switch(type) {
    case 'start': return 'bg-indigo-200 text-indigo-800';
    case 'filter': return 'bg-amber-200 text-amber-800';
    case 'error': return 'bg-red-200 text-red-800';
    case 'branch': return 'bg-blue-200 text-blue-800';
    case 'result': return 'bg-emerald-200 text-emerald-800';
    case 'comment': return 'bg-yellow-300 text-yellow-900';
    default: return 'bg-gray-200 text-gray-800';
  }
};

const PLACEHOLDER_ES = 'Escribe tu comentario aquí...';
const PLACEHOLDER_EN = 'Write your comment here...';

const NodeCard = ({ node, lang, onMouseDown, onTouchStart, onDoubleClick, onDelete, onUpdate, isDraggingThis }) => {
  const isComment = node.type === 'comment';
  const styles = getNodeStyles(node.type);
  const badgeStyle = getBadgeColor(node.type);
  const placeholder = lang === 'es' ? PLACEHOLDER_ES : PLACEHOLDER_EN;
  const isPlaceholder = isComment && (node.text === PLACEHOLDER_ES || node.text === PLACEHOLDER_EN);
  const editableRef = useRef(null);

  // Sync contentEditable content when node.text changes externally
  useEffect(() => {
    if (isComment && editableRef.current && editableRef.current !== document.activeElement) {
      editableRef.current.innerText = isPlaceholder ? '' : node.text;
    }
  }, [node.text]);

  const handleFocus = () => {
    if (isPlaceholder && editableRef.current) {
      editableRef.current.innerText = '';
      onUpdate({ text: '' });
    }
  };

  const handleBlur = (e) => {
    const val = e.currentTarget.innerText.trim();
    if (val === '') {
      editableRef.current.innerText = '';
      onUpdate({ text: placeholder });
    } else {
      onUpdate({ text: val });
    }
  };

  return (
    <div
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onDoubleClick={onDoubleClick}
      style={{ left: node.x, top: node.y }}
      className={`absolute z-10 rounded-xl border-2 p-4 bg-opacity-95 backdrop-blur-sm node-card cursor-pointer shadow-lg
                                ${isComment ? 'w-52 rotate-1' : 'w-72'}
                                ${styles} ${isDraggingThis ? 'scale-105 z-20 shadow-xl opacity-90' : ''}`}
      title={!isComment ? (lang === 'es' ? 'Doble clic para registrar edición' : 'Double-click to log edit') : ''}
    >
      <div className="flex justify-between items-center mb-2 border-b border-inherit pb-2">
        <h3 className="font-bold text-sm tracking-tight leading-tight">{node.title}</h3>
        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${badgeStyle}`}>
                                    {node.type}
                                </span>
      </div>
      {isComment ? (
        <div
          ref={editableRef}
          className={`text-sm whitespace-pre-wrap leading-relaxed font-medium font-mono outline-none min-h-[2rem] ${
            isPlaceholder ? 'text-yellow-500 italic' : 'opacity-90'
          }`}
          contentEditable
          suppressContentEditableWarning
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseDown={(e) => e.stopPropagation()}
          dangerouslySetInnerHTML={{ __html: isPlaceholder ? `<span style="color:#ca8a04;font-style:italic">${placeholder}</span>` : node.text }}
        />
      ) : (
        <div className="text-sm opacity-90 whitespace-pre-wrap leading-relaxed font-medium">
          {node.text}
        </div>
      )}
      {isComment && (
        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => { e.stopPropagation(); onDelete(node.id); }}
          className="absolute top-1 right-1 text-yellow-600 hover:text-red-500 text-xs font-bold px-1"
          title={lang === 'es' ? 'Eliminar nota' : 'Delete note'}
        >✕</button>
      )}
    </div>
  );
};

export default NodeCard;
