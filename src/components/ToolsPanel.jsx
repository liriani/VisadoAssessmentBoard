import React from 'react';

const NODE_TYPE_CONFIG = [
  { type: 'start',  emoji: '🟢', colorBtn: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200', colorText: 'text-indigo-800' },
  { type: 'filter', emoji: '🔶', colorBtn: 'bg-amber-50 hover:bg-amber-100 border-amber-200',   colorText: 'text-amber-800' },
  { type: 'branch', emoji: '🔀', colorBtn: 'bg-blue-50 hover:bg-blue-100 border-blue-200',       colorText: 'text-blue-800' },
  { type: 'result', emoji: '✅', colorBtn: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200', colorText: 'text-emerald-800' },
  { type: 'error',  emoji: '❌', colorBtn: 'bg-red-50 hover:bg-red-100 border-red-200',           colorText: 'text-red-800' },
];

const ToolsPanel = ({ lang, addPostIt, addQuestionsCard, resetView, zoomIn, zoomOut, t, isCustomBoard, addCustomNode, connectMode, setConnectMode, connectSource }) => {
  return (
    <div
      className="absolute left-3 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2"
      style={{ maxHeight: 'calc(100vh - 80px)', top: '50%' }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-2 flex flex-col gap-1.5 overflow-y-auto scrollbar-hide"
        style={{ maxHeight: 'calc(100vh - 96px)' }}
      >
        <span className="text-[9px] font-bold text-gray-400 uppercase text-center tracking-widest">
          {t.tools}
        </span>

        {isCustomBoard ? (
          <>
            {/* Custom board: node type buttons */}
            {NODE_TYPE_CONFIG.map(({ type, emoji, colorBtn, colorText }) => (
              <button
                key={type}
                onClick={() => addCustomNode(type)}
                className={`flex flex-col items-center gap-0.5 p-2 rounded-lg border transition-colors ${colorBtn}`}
                title={`${t.addNode}: ${t.nodeTypes[type]}`}
              >
                <span className="text-lg">{emoji}</span>
                <span className={`text-[9px] font-semibold ${colorText}`}>{t.nodeTypes[type]}</span>
              </button>
            ))}

            {/* Divider */}
            <div className="border-t border-gray-100 my-0.5" />

            {/* Connect mode toggle */}
            <button
              onClick={() => setConnectMode(m => !m)}
              className={`flex flex-col items-center gap-0.5 p-2 rounded-lg border transition-colors ${connectMode ? 'bg-orange-100 border-orange-400 ring-2 ring-orange-300' : 'bg-orange-50 hover:bg-orange-100 border-orange-200'}`}
              title={t.connectModeHint}
            >
              <span className="text-lg">{connectMode ? (connectSource ? '🔗' : '↗️') : '↗️'}</span>
              <span className={`text-[9px] font-semibold ${connectMode ? 'text-orange-700' : 'text-orange-600'}`}>
                {connectMode ? (connectSource ? '...' : t.connectMode) : t.connectMode}
              </span>
            </button>

            {/* Post-it note */}
            <button
              onClick={addPostIt}
              className="flex flex-col items-center gap-0.5 p-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 transition-colors"
              title={t.addPostIt}
            >
              <span className="text-lg">📝</span>
              <span className="text-[9px] font-semibold text-yellow-800">{t.note}</span>
            </button>
          </>
        ) : (
          <>
            {/* Standard tools */}
            <button
              onClick={addPostIt}
              className="flex flex-col items-center gap-0.5 p-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 transition-colors"
              title={t.addPostIt}
            >
              <span className="text-lg">📝</span>
              <span className="text-[9px] font-semibold text-yellow-800">{t.note}</span>
            </button>
            <button
              onClick={addQuestionsCard}
              className="flex flex-col items-center gap-0.5 p-2 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors"
              title={t.addQuestionsCard}
            >
              <span className="text-lg">❓</span>
              <span className="text-[9px] font-semibold text-purple-800">{t.questions}</span>
            </button>
          </>
        )}

        <button
          onClick={resetView}
          className="flex flex-col items-center gap-0.5 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors"
          title={t.resetView}
        >
          <span className="text-lg">🏠</span>
          <span className="text-[9px] font-semibold text-gray-600">{t.view}</span>
        </button>

        {/* Divider */}
        <div className="border-t border-gray-100 my-0.5" />

        {/* Zoom In */}
        <button
          onClick={zoomIn}
          className="flex flex-col items-center gap-0.5 p-2 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
          title={t.zoomIn}
        >
          <span className="text-lg leading-none font-bold text-blue-600">＋</span>
          <span className="text-[9px] font-semibold text-blue-700">{t.zoomIn}</span>
        </button>

        {/* Zoom Out */}
        <button
          onClick={zoomOut}
          className="flex flex-col items-center gap-0.5 p-2 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
          title={t.zoomOut}
        >
          <span className="text-lg leading-none font-bold text-blue-600">－</span>
          <span className="text-[9px] font-semibold text-blue-700">{t.zoomOut}</span>
        </button>
      </div>
    </div>
  );
};

export default ToolsPanel;
