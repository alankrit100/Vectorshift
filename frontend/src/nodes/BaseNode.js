import React from 'react';
import { Handle } from 'reactflow';

// Centralized styling inspired by VectorShift's dark theme.
// All styles are defined as JavaScript objects inside the component file.
const nodeStyle = {
  backgroundColor: '#2D3748', // Dark gray background
  border: '1px solid #4A5568', // Slightly lighter border
  borderRadius: '8px',
  padding: '0', // Padding will be handled by internal divs
  width: 280,
  fontFamily: 'Inter, sans-serif', // Modern sans-serif font
  fontSize: '13px',
  color: '#E2E8F0', // Light text color for contrast
  boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.25)',
};

const titleStyle = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#CBD5E0',
  padding: '12px 16px',
  display: 'flex',
  alignItems: 'center',
};

const contentStyle = {
    padding: '0 16px 16px 16px',
};

/**
 * A generic, styled wrapper for all nodes in the application.
 * @param {object} props
 * @param {string} props.title - The text to display in the node's header.
 * @param {string} props.borderColor - The color for the top border of the node.
 * @param {React.ReactNode} props.icon - An optional icon (like an emoji) for the header.
 * @param {Array<object>} props.handles - An array of configuration objects for the reactflow Handles.
 * @param {React.ReactNode} props.children - The unique content to render inside the node.
 */
export const BaseNode = ({ title, icon, handles, children, borderColor = '#4A5568' }) => {
  // Create a dynamic style for the main div to include the custom top border color
  const dynamicNodeStyle = {
    ...nodeStyle,
    borderTop: `4px solid ${borderColor}`,
  };

  return (
    <div style={dynamicNodeStyle}>
      {/* Dynamically render all handles passed in the props */}
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={{ 
            top: handle.top, 
            background: '#4A5568', // Handle color
            border: '2px solid #2D3748' 
          }}
        />
      ))}
      
      <div style={titleStyle}>
        {icon && <span style={{ marginRight: '8px', fontSize: '16px' }}>{icon}</span>}
        {title}
      </div>
      
      {/* The unique content for each node goes here */}
      <div style={contentStyle}>
        {children}
      </div>
    </div>
  );
};
