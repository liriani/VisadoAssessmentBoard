import React, { useState, useRef, useCallback } from 'react';
import Toolbar from './components/Toolbar';
import ToolsPanel from './components/ToolsPanel';
import Canvas from './components/Canvas';
import { ASSESSMENTS } from './data/assessments';
import { UI_STRINGS } from './constants/uiStrings';

function App() {
  const [lang, setLang] = useState('es');
  const [currentAssessment, setCurrentAssessment] = useState('regularizacion');
  const [nodes, setNodes] = useState(ASSESSMENTS.es.regularizacion.nodes);
  const [edges, setEdges] = useState(ASSESSMENTS.es.regularizacion.edges);
  const [pan, setPan] = useState({ x: 50, y: 50 });
  const [scale, setScale] = useState(1);
  const [draggingNode, setDraggingNode] = useState(null);
  const [isPanning, setIsPanning] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const startPos = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const MIN_SCALE = 0.2;
  const MAX_SCALE = 3;
  const ZOOM_STEP = 0.15;
  const t = UI_STRINGS[lang];

  // Mouse interaction
  const handleMouseDown = (e, nodeId) => {
    if (nodeId) {
      setDraggingNode(nodeId);
    } else {
      setIsPanning(true);
    }
    startPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (draggingNode) {
      const dx = (e.clientX - startPos.current.x) / scale;
      const dy = (e.clientY - startPos.current.y) / scale;
      setNodes(prev => prev.map(n => n.id === draggingNode ? { ...n, x: n.x + dx, y: n.y + dy } : n));
      startPos.current = { x: e.clientX, y: e.clientY };
    } else if (isPanning) {
      const dx = e.clientX - startPos.current.x;
      const dy = e.clientY - startPos.current.y;
      setPan(p => ({ x: p.x + dx, y: p.y + dy }));
      startPos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = () => {
    setDraggingNode(null);
    setIsPanning(false);
  };

  // Touch interaction
  const handleTouchStart = (e, nodeId) => {
    const touch = e.touches[0];
    if (nodeId) {
      setDraggingNode(nodeId);
    } else {
      setIsPanning(true);
    }
    startPos.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e) => {
    if (!draggingNode && !isPanning) return;
    const touch = e.touches[0];
    if (draggingNode) {
      const dx = (touch.clientX - startPos.current.x) / scale;
      const dy = (touch.clientY - startPos.current.y) / scale;
      setNodes(prev => prev.map(n => n.id === draggingNode ? { ...n, x: n.x + dx, y: n.y + dy } : n));
      startPos.current = { x: touch.clientX, y: touch.clientY };
    } else if (isPanning) {
      const dx = touch.clientX - startPos.current.x;
      const dy = touch.clientY - startPos.current.y;
      setPan(p => ({ x: p.x + dx, y: p.y + dy }));
      startPos.current = { x: touch.clientX, y: touch.clientY };
    }
  };

  // Wheel zoom — zooms toward the cursor position
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = -e.deltaY;
    setScale(prev => {
      const next = delta > 0
        ? Math.min(MAX_SCALE, prev + ZOOM_STEP)
        : Math.max(MIN_SCALE, prev - ZOOM_STEP);
      if (next === prev) return prev;
      // Adjust pan so the point under the cursor stays fixed
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        setPan(p => ({
          x: mouseX - (mouseX - p.x) * (next / prev),
          y: mouseY - (mouseY - p.y) * (next / prev),
        }));
      }
      return next;
    });
  }, []);

  const zoomIn = () => {
    setScale(prev => {
      const next = Math.min(MAX_SCALE, parseFloat((prev + ZOOM_STEP).toFixed(2)));
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        setPan(p => ({
          x: cx - (cx - p.x) * (next / prev),
          y: cy - (cy - p.y) * (next / prev),
        }));
      }
      return next;
    });
  };

  const zoomOut = () => {
    setScale(prev => {
      const next = Math.max(MIN_SCALE, parseFloat((prev - ZOOM_STEP).toFixed(2)));
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        setPan(p => ({
          x: cx - (cx - p.x) * (next / prev),
          y: cy - (cy - p.y) * (next / prev),
        }));
      }
      return next;
    });
  };

  // Switch assessment (preserves language)
  const switchAssessment = (type, overrideLang) => {
    const activeLang = overrideLang || lang;
    setCurrentAssessment(type);
    const data = ASSESSMENTS[activeLang][type];
    setNodes(data.nodes);
    setEdges(data.edges);
    setPan({ x: 50, y: 50 });
    setScale(1);
    setShowMobileMenu(false);
  };

  // Language toggle
  const toggleLang = () => {
    const newLang = lang === 'es' ? 'en' : 'es';
    setLang(newLang);
    const data = ASSESSMENTS[newLang][currentAssessment];
    setNodes(data.nodes);
    setEdges(data.edges);
  };

  const resetView = () => {
    setPan({ x: 50, y: 50 });
    setScale(1);
  };

  const updateNode = (nodeId, updates) => {
    setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, ...updates } : n));
  };

  // Add an Assessment Questions node to the canvas
  const addQuestionsCard = () => {
    const id = 'questions_' + Date.now();
    const newNode = {
      id,
      x: (-pan.x + 200) / scale,
      y: (-pan.y + 200) / scale,
      title: lang === 'es' ? '❓ Preguntas de Assessment' : '❓ Assessment Questions',
      type: 'questions',
      questions: [],
    };
    setNodes(prev => [...prev, newNode]);
  };

  // Feature 2: Add a Post-it comment node to the canvas
  const addPostIt = () => {
    const id = 'comment_' + Date.now();
    const newNode = {
      id,
      x: (-pan.x + 200) / scale,
      y: (-pan.y + 200) / scale,
      title: lang === 'es' ? '📝 Nota' : '📝 Note',
      text: lang === 'es' ? 'Escribe tu comentario aquí...' : 'Write your comment here...',
      type: 'comment',
    };
    setNodes(prev => [...prev, newNode]);
  };

  // Feature 3: Simulate editing a node — adds an audit Post-it near it
  const simulateEdit = (node) => {
    if (node.type === 'comment') return; // don't audit comment nodes
    const now = new Date();
    const ts = now.toLocaleString(lang === 'es' ? 'es-ES' : 'en-GB', { dateStyle: 'short', timeStyle: 'short' });
    const auditId = 'audit_' + Date.now();
    const auditNode = {
      id: auditId,
      x: node.x + 310,
      y: node.y,
      title: lang === 'es' ? '🕐 Editado' : '🕐 Edited',
      text: (lang === 'es' ? 'Editado: ' : 'Edited: ') + ts + '\n↖ ' + node.title,
      type: 'comment',
    };
    setNodes(prev => [...prev, auditNode]);
  };

  const assessmentKeys = Object.keys(ASSESSMENTS.es);

  return (
    <div className="w-screen h-screen flex flex-col bg-white select-none">
      <Toolbar
        t={t}
        assessmentKeys={assessmentKeys}
        currentAssessment={currentAssessment}
        switchAssessment={switchAssessment}
        resetView={resetView}
        toggleLang={toggleLang}
        lang={lang}
        setShowMobileMenu={setShowMobileMenu}
        showMobileMenu={showMobileMenu}
      />
      <div className="flex-1 relative overflow-hidden h-full">
        <Canvas
          containerRef={containerRef}
          pan={pan}
          scale={scale}
          nodes={nodes}
          edges={edges}
          draggingNode={draggingNode}
          isPanning={isPanning}
          handleMouseDown={handleMouseDown}
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
          handleTouchStart={handleTouchStart}
          handleTouchMove={handleTouchMove}
          handleWheel={handleWheel}
          updateNode={updateNode}
          simulateEdit={simulateEdit}
          setNodes={setNodes}
          lang={lang}
          t={t}
          addPostIt={addPostIt}
          addQuestionsCard={addQuestionsCard}
          resetView={resetView}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          currentAssessment={currentAssessment}
        />
      </div>
    </div>
  );
}

export default App;
