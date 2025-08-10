import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

const buttonStyle = {
  position: 'absolute', // Position relative to the main content area
  bottom: '24px',
  left: '50%',
  transform: 'translateX(-50%)', // Center the button horizontally
  padding: '12px 24px',
  background: '#4299E1',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '16px',
  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
  zIndex: 10, // Ensure it's above the canvas
};

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const handleSubmit = () => {
    console.log('nodes', nodes);
    console.log('edges', edges);
  };

  return (
    <button onClick={handleSubmit} style={buttonStyle}>
      Submit
    </button>
  );
};
