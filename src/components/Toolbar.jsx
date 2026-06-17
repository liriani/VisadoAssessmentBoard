import React, { useState } from 'react';

const Toolbar = ({
  t, assessmentKeys, currentAssessment, switchAssessment, resetView, toggleLang, lang,
  setShowMobileMenu, showMobileMenu,
  customBoards, activeCustomBoard, createCustomBoard, deleteCustomBoard, renameCustomBoard, switchToCustomBoard,
}) => {
  const [showNewBoard, setShowNewBoard] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState('');

  const handleCreate = () => {
    const name = newBoardName.trim() || t.newBoardPlaceholder;
    createCustomBoard(name);
    setNewBoardName('');
    setShowNewBoard(false);
  };

  const startRename = (board, e) => {
    e.stopPropagation();
    setRenamingId(board.id);
    setRenameValue(board.name);
  };

  const commitRename = (boardId) => {
    if (renameValue.trim()) renameCustomBoard(boardId, renameValue.trim());
    setRenamingId(null);
  };

  return (
    <div className="flex-none bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="flex items-center justify-between px-3 sm:px-6 py-2 min-h-[56px]">

        {/* Left: title + mobile hamburger */}
        <div className="flex items-center gap-2 min-w-0">
          <h1 className="text-base sm:text-lg font-bold text-gray-800 whitespace-nowrap">{t.appTitle}</h1>
          <button
            onClick={() => setShowMobileMenu(m => !m)}
            className="sm:hidden ml-1 p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600"
            aria-label="Toggle menu"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Center: tabs */}
        <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto scrollbar-hide flex-1 mx-3">
          {/* Preset assessment tabs */}
          {assessmentKeys.map(key => (
            <button
              key={key}
              onClick={() => switchAssessment(key)}
              className={`flex-none text-xs font-medium px-3 py-1 rounded-full transition-colors whitespace-nowrap ${!activeCustomBoard && currentAssessment === key ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
              {t.tabs[key]}
            </button>
          ))}

          {/* Divider */}
          {customBoards.length > 0 && <div className="w-px h-5 bg-gray-200 mx-1 flex-none" />}

          {/* Custom board tabs */}
          {customBoards.map(board => (
            <div key={board.id} className="flex-none flex items-center gap-0.5">
              {renamingId === board.id ? (
                <input
                  autoFocus
                  value={renameValue}
                  onChange={e => setRenameValue(e.target.value)}
                  onBlur={() => commitRename(board.id)}
                  onKeyDown={e => { if (e.key === 'Enter') commitRename(board.id); if (e.key === 'Escape') setRenamingId(null); }}
                  className="text-xs font-medium px-2 py-1 rounded-full border border-emerald-400 outline-none w-32"
                  onClick={e => e.stopPropagation()}
                />
              ) : (
                <button
                  onClick={() => switchToCustomBoard(board.id)}
                  className={`text-xs font-medium px-3 py-1 rounded-full transition-colors whitespace-nowrap ${activeCustomBoard === board.id ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                >
                  ✏️ {board.name}
                </button>
              )}
              <button
                onClick={(e) => startRename(board, e)}
                className="text-[10px] text-gray-400 hover:text-indigo-500 px-0.5"
                title={t.renameBoard}
              >✎</button>
              <button
                onClick={(e) => { e.stopPropagation(); if (window.confirm(t.deleteBoardConfirm)) deleteCustomBoard(board.id); }}
                className="text-[10px] text-gray-400 hover:text-red-500 px-0.5"
                title={t.deleteBoard}
              >✕</button>
            </div>
          ))}

          {/* + New board button */}
          {showNewBoard ? (
            <div className="flex items-center gap-1 flex-none">
              <input
                autoFocus
                value={newBoardName}
                onChange={e => setNewBoardName(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleCreate(); if (e.key === 'Escape') setShowNewBoard(false); }}
                placeholder={t.newBoardPlaceholder}
                className="text-xs px-2 py-1 rounded-full border border-emerald-400 outline-none w-36"
              />
              <button onClick={handleCreate} className="text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 px-2 py-1 rounded-full">✓</button>
              <button onClick={() => setShowNewBoard(false)} className="text-xs text-gray-400 hover:text-gray-600 px-1">✕</button>
            </div>
          ) : (
            <button
              onClick={() => setShowNewBoard(true)}
              className="flex-none flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-full transition-colors whitespace-nowrap"
              title={t.newBoard}
            >
              <span className="text-base leading-none">＋</span> {t.newBoard}
            </button>
          )}
        </div>

        {/* Right: Reset View + Lang toggle */}
        <div className="flex items-center gap-2 flex-none">
          <button
            onClick={resetView}
            className="text-xs sm:text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors shadow-sm whitespace-nowrap"
          >
            {t.resetView}
          </button>
          <button
            onClick={toggleLang}
            className="text-xs font-bold text-indigo-700 bg-indigo-100 hover:bg-indigo-200 px-3 py-1.5 rounded-lg transition-colors shadow-sm"
            title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          >
            {t.langToggle}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {showMobileMenu && (
        <div className="sm:hidden border-t border-gray-100 px-3 py-2 flex flex-wrap gap-2 bg-white">
          {assessmentKeys.map(key => (
            <button
              key={key}
              onClick={() => switchAssessment(key)}
              className={`text-xs font-medium px-3 py-1 rounded-full transition-colors ${!activeCustomBoard && currentAssessment === key ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
              {t.tabs[key]}
            </button>
          ))}
          {customBoards.map(board => (
            <button
              key={board.id}
              onClick={() => switchToCustomBoard(board.id)}
              className={`text-xs font-medium px-3 py-1 rounded-full transition-colors ${activeCustomBoard === board.id ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
              ✏️ {board.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Toolbar;
