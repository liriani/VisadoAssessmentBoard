import React, { useState, useRef, useEffect } from 'react';
import NodeCard from './NodeCard';
import AssessmentQuestionsCard from './AssessmentQuestionsCard';
import ToolsPanel from './ToolsPanel';

const Canvas = ({
  containerRef,
  pan,
  scale,
  nodes,
  edges,
  draggingNode,
  isPanning,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleTouchStart,
  handleTouchMove,
  handleWheel,
  updateNode,
  simulateEdit,
  setNodes,
  lang,
  t,
  addPostIt,
  addQuestionsCard,
  resetView,
  zoomIn,
  zoomOut,
  currentAssessment,
  isCustomBoard,
  connectMode,
  connectSource,
  setConnectMode,
  setConnectSource,
  addCustomNode,
  deleteCustomNode,
  deleteCustomEdge,
  handleConnectNode,
  pendingEdge,
  confirmPendingEdge,
  cancelPendingEdge,
}) => {
  const [labelVal, setLabelVal] = useState('');
  const labelInputRef = useRef(null);

  // Reset input and focus when a new pending edge appears
  useEffect(() => {
    if (pendingEdge) {
      setLabelVal('');
      setTimeout(() => labelInputRef.current?.focus(), 50);
    }
  }, [pendingEdge]);

  const zoomPct = Math.round((scale ?? 1) * 100);
  return (
    <div
      ref={containerRef}
      onMouseDown={(e) => handleMouseDown(e, null)}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={(e) => handleTouchStart(e, null)}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
      onTouchCancel={handleMouseUp}
      onWheel={handleWheel}
      className={`w-full h-full relative miro-bg overflow-hidden ${isPanning ? 'cursor-grabbing' : 'cursor-grab'}`}
    >
      {/* Pannable + zoomable layer */}
      <div
        style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})` }}
        className="absolute top-0 left-0 w-full h-full origin-top-left"
      >
        {/* SVG edges */}
        <svg className="absolute top-0 left-0 w-[5000px] h-[5000px] pointer-events-none z-0 overflow-visible">
          {edges.map(edge => {
            const sourceNode = nodes.find(n => n.id === edge.from);
            const targetNode = nodes.find(n => n.id === edge.to);
            if (!sourceNode || !targetNode) return null;

            const getX = (node) => {
              if (node.type === 'comment') return node.x + 104;
              if (node.type === 'questions') return node.x + 160;
              return node.x + 144;
            };
            const getY = (node) => {
              if (node.type === 'questions') return node.y + 100;
              return node.y + 60;
            };

            const x1 = getX(sourceNode), y1 = getY(sourceNode);
            const x2 = getX(targetNode), y2 = getY(targetNode);
            const path = `M ${x1} ${y1} C ${x1} ${(y1 + y2) / 2}, ${x2} ${(y1 + y2) / 2}, ${x2} ${y2}`;
            const midX = (x1 + x2) / 2, midY = (y1 + y2) / 2;
            return (
              <g key={edge.id}>
                <path d={path} fill="none" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
                {edge.label && (
                  <foreignObject x={midX - 100} y={midY - 14} width="200" height="28" className="overflow-visible">
                    <div className="flex items-center justify-center w-full h-full">
                                            <span className="bg-white border border-gray-200 text-gray-700 px-3 py-1 text-xs font-bold rounded-full shadow-sm">
                                                {edge.label}
                                            </span>
                    </div>
                  </foreignObject>
                )}
              </g>
            );
          })}
        </svg>

        {/* Node cards */}
        {nodes.map(node => {
          const isQuestions = node.type === 'questions';
          const isDraggingThis = draggingNode === node.id;
          const isConnectSource = connectSource === node.id;

          if (isQuestions) {
            return (
              <AssessmentQuestionsCard
                key={node.id}
                node={node}
                lang={lang}
                isDraggingThis={isDraggingThis}
                onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, node.id); }}
                onTouchStart={(e) => { e.stopPropagation(); handleTouchStart(e, node.id); }}
                onDelete={(id) => setNodes(prev => prev.filter(n => n.id !== id))}
                onUpdate={(updates) => updateNode(node.id, updates)}
                currentAssessment={currentAssessment}
              />
            );
          }

          return (
            <NodeCard
              key={node.id}
              node={node}
              lang={lang}
              isDraggingThis={isDraggingThis}
              isConnectSource={isConnectSource}
              connectMode={connectMode}
              onMouseDown={(e) => {
                e.stopPropagation();
                if (connectMode) { handleConnectNode(node.id); return; }
                handleMouseDown(e, node.id);
              }}
              onTouchStart={(e) => { e.stopPropagation(); handleTouchStart(e, node.id); }}
              onDoubleClick={() => !isCustomBoard && node.type !== 'comment' && simulateEdit(node)}
              onDelete={(id) => isCustomBoard ? deleteCustomNode(id) : setNodes(prev => prev.filter(n => n.id !== id))}
              onUpdate={(updates) => updateNode(node.id, updates)}
              isCustomBoard={isCustomBoard}
            />
          );
        })}
      </div>

      {/* Canvas hint badge */}
      <div className="canvas-hint">{isCustomBoard ? t.customBoardHint : t.hint}</div>

      {/* Zoom level badge */}
      <div className="absolute bottom-4 right-4 z-40 bg-white border border-gray-200 rounded-lg shadow px-3 py-1 text-xs font-semibold text-gray-500 select-none pointer-events-none">
        {zoomPct}%
      </div>

      {/* Inline label input for pending edge */}
      {pendingEdge && (() => {
        const sourceNode = nodes.find(n => n.id === pendingEdge.from);
        const targetNode = nodes.find(n => n.id === pendingEdge.to);
        if (!sourceNode || !targetNode) return null;
        const getX = (node) => node.type === 'comment' ? node.x + 104 : node.type === 'questions' ? node.x + 160 : node.x + 144;
        const getY = (node) => node.type === 'questions' ? node.y + 100 : node.y + 60;
        const x1 = getX(sourceNode), y1 = getY(sourceNode);
        const x2 = getX(targetNode), y2 = getY(targetNode);
        // Convert canvas coords to screen coords
        const midCanvasX = (x1 + x2) / 2;
        const midCanvasY = (y1 + y2) / 2;
        const screenX = midCanvasX * (scale ?? 1) + pan.x;
        const screenY = midCanvasY * (scale ?? 1) + pan.y;
        return (
          <div
            key="pending-label"
            className="absolute z-50 flex flex-col items-center"
            style={{ left: screenX, top: screenY, transform: 'translate(-50%, -50%)' }}
            onMouseDown={e => e.stopPropagation()}
          >
            <div className="bg-white border-2 border-indigo-400 rounded-xl shadow-xl px-3 py-2 flex items-center gap-2 min-w-[180px]">
              <span className="text-sm">🏷️</span>
              <input
                ref={labelInputRef}
                value={labelVal}
                onChange={e => setLabelVal(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') confirmPendingEdge(labelVal);
                  if (e.key === 'Escape') cancelPendingEdge();
                }}
                placeholder={t.connectLabel}
                className="text-xs flex-1 outline-none border-b border-indigo-200 bg-transparent py-0.5 min-w-0"
              />
              <button
                onClick={() => confirmPendingEdge(labelVal)}
                className="text-xs font-bold text-white bg-indigo-500 hover:bg-indigo-600 px-2 py-0.5 rounded-lg"
              >✓</button>
              <button
                onClick={cancelPendingEdge}
                className="text-xs text-gray-400 hover:text-red-500 px-1"
              >✕</button>
            </div>
          </div>
        );
      })()}

      {/* Connect mode banner */}
      {connectMode && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50 bg-orange-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg pointer-events-none">
          {connectSource ? t.connectModeHint.split(',')[1]?.trim() || '→ ' + t.connectModeHint : t.connectModeHint}
        </div>
      )}

      {/* Floating tools panel */}
      <ToolsPanel
        lang={lang}
        addPostIt={addPostIt}
        addQuestionsCard={addQuestionsCard}
        resetView={resetView}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        t={t}
        isCustomBoard={isCustomBoard}
        addCustomNode={addCustomNode}
        connectMode={connectMode}
        setConnectMode={setConnectMode}
        connectSource={connectSource}
      />
    </div>
  );
};

export default Canvas;
