import React from 'react';

const ToolsPanel = ({ lang, addPostIt, addQuestionsCard, resetView, zoomIn, zoomOut, t }) => {
  return (
    <div
      className="absolute left-3 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2"
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-2 flex flex-col gap-2">
        <span className="text-[9px] font-bold text-gray-400 uppercase text-center tracking-widest">
          {t.tools}
        </span>
        <button
          onClick={addPostIt}
          className="flex flex-col items-center gap-0.5 p-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 transition-colors"
          title={lang === 'es' ? 'Añadir nota Post-it' : 'Add Post-it note'}
        >
          <span className="text-lg">📝</span>
          <span className="text-[9px] font-semibold text-yellow-800">
            {t.note}
          </span>
        </button>
        <button
          onClick={addQuestionsCard}
          className="flex flex-col items-center gap-0.5 p-2 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors"
          title={lang === 'es' ? 'Añadir tarjeta de preguntas' : 'Add assessment questions card'}
        >
          <span className="text-lg">❓</span>
          <span className="text-[9px] font-semibold text-purple-800">
            {t.questions}
          </span>
        </button>
        <button
          onClick={resetView}
          className="flex flex-col items-center gap-0.5 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors"
          title={t.resetView}
        >
          <span className="text-lg">🏠</span>
          <span className="text-[9px] font-semibold text-gray-600">
            {t.view}
          </span>
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
          <span className="text-[9px] font-semibold text-blue-700">
            {t.zoomIn}
          </span>
        </button>

        {/* Zoom Out */}
        <button
          onClick={zoomOut}
          className="flex flex-col items-center gap-0.5 p-2 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
          title={t.zoomOut}
        >
          <span className="text-lg leading-none font-bold text-blue-600">－</span>
          <span className="text-[9px] font-semibold text-blue-700">
            {t.zoomOut}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ToolsPanel;
