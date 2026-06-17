import React from 'react';

const Toolbar = ({ t, assessmentKeys, currentAssessment, switchAssessment, resetView, toggleLang, lang, setShowMobileMenu, showMobileMenu }) => {
  return (
    <div className="flex-none bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="flex items-center justify-between px-3 sm:px-6 py-2 min-h-[56px]">

        {/* Left: title + mobile hamburger */}
        <div className="flex items-center gap-2 min-w-0">
          <h1 className="text-base sm:text-lg font-bold text-gray-800 whitespace-nowrap">{t.appTitle}</h1>
          {/* Mobile hamburger */}
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

        {/* Center: assessment tabs — hidden on mobile, shown on sm+ */}
        <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto scrollbar-hide flex-1 mx-3">
          {assessmentKeys.map(key => (
            <button
              key={key}
              onClick={() => switchAssessment(key)}
              className={`flex-none text-xs font-medium px-3 py-1 rounded-full transition-colors whitespace-nowrap ${currentAssessment === key ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
              {t.tabs[key]}
            </button>
          ))}
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
              className={`text-xs font-medium px-3 py-1 rounded-full transition-colors ${currentAssessment === key ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
              {t.tabs[key]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Toolbar;
