import React, { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

// --- STYLES for the custom alert box ---
const alertOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const alertBoxStyle = {
  background: '#2D3748',
  color: '#E2E8F0',
  padding: '24px',
  borderRadius: '8px',
  border: '1px solid #4A5568',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
  width: '320px',
  fontFamily: "'Inter', sans-serif",
};

const alertTitleStyle = {
  fontSize: '18px',
  fontWeight: '600',
  marginBottom: '16px',
};

const alertContentStyle = {
  fontSize: '14px',
  lineHeight: '1.6',
};

const alertButtonStyle = {
  marginTop: '24px',
  width: '100%',
  padding: '10px',
  background: '#4299E1',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: '500',
};

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [alertInfo, setAlertInfo] = useState(null); // State to hold the response data
  const [isLoading, setIsLoading] = useState(false); // State to manage loading indicator

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // The backend is expected to be running on localhost:8000
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setAlertInfo(result); // Store the result to trigger the alert display

    } catch (error) {
      console.error("Failed to submit pipeline:", error);
      // Create a user-friendly error message
      setAlertInfo({ error: "Could not connect to the backend. Please ensure it's running." });
    } finally {
      setIsLoading(false);
    }
  };

  const buttonStyle = {
    position: 'absolute',
    bottom: '24px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '12px 24px',
    background: '#4299E1',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    fontWeight: '600',
    fontSize: '16px',
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
    zIndex: 10,
    opacity: isLoading ? 0.7 : 1,
  };

  return (
    <>
      <button onClick={handleSubmit} style={buttonStyle} disabled={isLoading}>
        {isLoading ? 'Analyzing...' : 'Submit'}
      </button>

      {/* --- Custom Alert Box --- */}
      {alertInfo && (
        <div style={alertOverlayStyle}>
          <div style={alertBoxStyle}>
            <div style={alertTitleStyle}>Pipeline Analysis Complete</div>
            <div style={alertContentStyle}>
              {alertInfo.error ? (
                <p style={{color: '#F56565'}}>{alertInfo.error}</p>
              ) : (
                <>
                  <p><strong>Nodes:</strong> {alertInfo.num_nodes}</p>
                  <p><strong>Edges:</strong> {alertInfo.num_edges}</p>
                  <p><strong>Is a DAG:</strong> 
                    <span style={{color: alertInfo.is_dag ? '#48BB78' : '#F56565', fontWeight: 'bold'}}>
                      {` ${alertInfo.is_dag ? 'Yes' : 'No (Cycle Detected)'}`}
                    </span>
                  </p>
                </>
              )}
            </div>
            <button style={alertButtonStyle} onClick={() => setAlertInfo(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
