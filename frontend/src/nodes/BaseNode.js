import { Handle } from 'reactflow';

// Centralized styling for all nodes to ensure a consistent look and feel.
const nodeStyle = {
  backgroundColor: '#ffffff',
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  padding: '16px',
  width: 280,
  fontFamily: 'sans-serif',
  fontSize: '13px',
  color: '#1f2937',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
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



export const BaseNode = ({ title, icon, handles, children }) => {
  return (
    <div style={nodeStyle}>
      {/* Dynamically render all handles passed in the props */}
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

