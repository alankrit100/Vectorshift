import React from 'react';
import { Handle } from 'reactflow';
import { useStore } from '../store'; // Import the useStore hook
import { shallow } from 'zustand/shallow';

// --- STYLES (Unchanged from before) ---
const nodeStyle = {
  backgroundColor: '#ffffff',
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  padding: '16px',
  width: 280,
  fontFamily: "'Inter', sans-serif",
  fontSize: '13px',
  color: '#1f2937',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  position: 'relative', // Make this a positioning context for the button
};

const titleStyle = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#11182c',
  marginBottom: '12px',
  paddingBottom: '8px',
  borderBottom: '1px solid #e5e7eb',
  display: 'flex',
  alignItems: 'center',
};

// --- NEW STYLE for the delete button ---
const deleteButtonStyle = {
  position: 'absolute',
  top: '8px',
  right: '8px',
  width: '20px',
  height: '20px',
  background: '#F1F5F9',
  border: '1px solid #CBD5E1',
  borderRadius: '50%',
  color: '#64748B',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  fontWeight: 'bold',
  lineHeight: '1',
  transition: 'background-color 0.2s, color 0.2s',
};

const selector = (state) => ({
  onNodesChange: state.onNodesChange,
});

export const BaseNode = ({ id, title, icon, handles, children }) => {
  // Get the onNodesChange function from your Zustand store
  const { onNodesChange } = useStore(selector, shallow);

  // This function is called when the delete button is clicked
  const handleDelete = (event) => {
    event.stopPropagation(); // Prevents the node from being selected
    // Creates the "remove" event that React Flow understands
    const removeChange = [{ type: 'remove', id: id }];
    onNodesChange(removeChange);
  };

  return (
    <div style={nodeStyle}>
      {/* --- DELETE BUTTON --- */}
      <button
        style={deleteButtonStyle}
        onClick={handleDelete}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#FECACA';
          e.currentTarget.style.color = '#DC2626';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#F1F5F9';
          e.currentTarget.style.color = '#64748B';
        }}
        title="Delete node"
      >
        ×
      </button>

      {/* --- EXISTING NODE CONTENT --- */}
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={{ top: handle.top, background: '#9ca3af' }}
        />
      ))}
      <div style={titleStyle}>
        {icon && <span style={{ marginRight: '8px' }}>{icon}</span>}
        {title}
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};
