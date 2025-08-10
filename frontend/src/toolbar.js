import React from 'react';

// --- STYLES ---
const headerStyle = {
  padding: '12px 24px',
  background: 'rgba(26, 32, 44, 0.8)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid #4A5568',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: 'white',
  flexShrink: 0,
};

const titleStyle = {
  fontSize: '20px',
  fontWeight: '600',
  letterSpacing: '0.5px',
};

const nodePaletteStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px', // Creates space between the node buttons
};

const nodeItemStyle = {
  padding: '6px 12px',
  background: '#2D3748',
  color: '#E2E8F0',
  border: '1px solid #4A5568',
  borderRadius: '6px',
  cursor: 'grab',
  fontSize: '13px',
  fontWeight: '500',
  transition: 'background-color 0.2s ease-in-out',
};

// --- COMPONENT ---

// Helper function to set data for the drag event
const onDragStart = (event, nodeType) => {
  const appData = { nodeType };
  event.target.style.cursor = 'grabbing';
  event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
  event.dataTransfer.effectAllowed = 'move';
};

const onDragEnd = (event) => {
    event.target.style.cursor = 'grab';
};

export const PipelineToolbar = () => {
  const nodeTypes = [
    { type: 'customInput', label: 'Input' },
    { type: 'llm', label: 'LLM' },
    { type: 'customOutput', label: 'Output' },
    { type: 'text', label: 'Text' },
    { type: 'filter', label: 'Filter Data' },
    { type: 'merge', label: 'Merge' },
    { type: 'csvUpload', label: 'Load CSV' },
    { type: 'log', label: 'Log Output' },
    { type: 'changeCase', label: 'Change Case' },
  ];

  return (
    <header style={headerStyle}>
      <div style={titleStyle}>Vectorshift</div>
      
      {/* Node palette container */}
      <div style={nodePaletteStyle}>
        {nodeTypes.map(({ type, label }) => (
          <div
            key={type}
            style={nodeItemStyle}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4A5568'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2D3748'}
            onDragStart={(event) => onDragStart(event, type)}
            onDragEnd={onDragEnd}
            draggable // This attribute is essential
          >
            {label}
          </div>
        ))}
      </div>
    </header>
  );
};
