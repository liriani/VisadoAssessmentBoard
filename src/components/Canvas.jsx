import React from 'react';
import NodeCard from './NodeCard';
import AssessmentQuestionsCard from './AssessmentQuestionsCard';
import ToolsPanel from './ToolsPanel';

const Canvas = ({
  containerRef,
  pan,
  nodes,
  edges,
  draggingNode,
  isPanning,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleTouchStart,
  handleTouchMove,
  updateNode,
  simulateEdit,
  setNodes,
  lang,
  t,
  addPostIt,
  addQuestionsCard,
  resetView,
  currentAssessment
}) => {
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
      className={`w-full h-full relative miro-bg overflow-hidden ${isPanning ? 'cursor-grabbing' : 'cursor-grab'}`}
    >
      {/* Pannable layer */}
      <div
        style={{ transform: `translate(${pan.x}px, ${pan.y}px)` }}
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
              onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, node.id); }}
              onTouchStart={(e) => { e.stopPropagation(); handleTouchStart(e, node.id); }}
              onDoubleClick={() => node.type !== 'comment' && simulateEdit(node)}
              onDelete={(id) => setNodes(prev => prev.filter(n => n.id !== id))}
              onUpdate={(updates) => updateNode(node.id, updates)}
            />
          );
        })}
      </div>

      {/* Canvas hint badge */}
      <div className="canvas-hint">{t.hint}</div>

      {/* Floating tools panel */}
      <ToolsPanel
        lang={lang}
        addPostIt={addPostIt}
        addQuestionsCard={addQuestionsCard}
        resetView={resetView}
        t={t}
      />
    </div>
  );
};

export default Canvas;
