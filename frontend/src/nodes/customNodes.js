import React from 'react';
import { Position } from 'reactflow';

// We import your BaseNode component, our "Sandwich Kit"
import { BaseNode } from './BaseNode';

// A simple text input style to reuse
const inputStyle = {
  width: '100%',
  padding: '8px',
  marginTop: '4px',
  borderRadius: '4px',
  border: '1px solid #d1d5db',
  boxSizing: 'border-box',
};

// --- 1. Filter Data Node ---
// Demonstrates multiple output handles and a text input.
export const FilterNode = () => {
  const handles = [
    { type: 'target', position: Position.Left, id: 'data-in' },
    { type: 'source', position: Position.Right, id: 'data-out-true', top: '35%' },
    { type: 'source', position: Position.Right, id: 'data-out-false', top: '65%' },
  ];

  return (
    <BaseNode title="Filter Data" icon={'⚖️'} handles={handles}>
      <label style={{display: 'block', fontWeight: 500}}>
        Condition
        <input style={inputStyle} type="text" placeholder="e.g., amount > 100" />
      </label>
    </BaseNode>
  );
};


// --- 2. Merge Node ---
// Demonstrates multiple input handles.
export const MergeNode = () => {
  const handles = [
    { type: 'target', position: Position.Left, id: 'a-in', top: '35%' },
    { type: 'target', position: Position.Left, id: 'b-in', top: '65%' },
    { type: 'source', position: Position.Right, id: 'merged-out' },
  ];

  return (
    <BaseNode title="Merge" icon={'🔗'} handles={handles}>
      <div style={{ textAlign: 'center', color: '#6b7280' }}>
        Combines two datasets.
      </div>
    </BaseNode>
  );
};


// --- 3. CSV Upload Node ---
// A simple "source" node with a button.
export const CsvUploadNode = () => {
  const handles = [
    { type: 'source', position: Position.Right, id: 'csv-out' },
  ];

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    background: '#f3f4f6',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
  };

  return (
    <BaseNode title="Load CSV File" icon={'📄'} handles={handles}>
      <button style={buttonStyle}>
        Choose file...
      </button>
    </BaseNode>
  );
};


// --- 4. Log to Console Node ---
// A simple "endpoint" node with no outputs.
export const LogNode = () => {
  const handles = [
    { type: 'target', position: Position.Left, id: 'log-in' },
  ];

  return (
    <BaseNode title="Log Output" icon={'📟'} handles={handles}>
      <div style={{ textAlign: 'center', color: '#6b7280' }}>
        Logs any incoming data to the browser's console.
      </div>
    </BaseNode>
  );
};


// --- 5. Change Case Node ---
// Demonstrates a select dropdown for interactive logic.
export const ChangeCaseNode = () => {
  const handles = [
    { type: 'target', position: Position.Left, id: 'text-in' },
    { type: 'source', position: Position.Right, id: 'text-out' },
  ];
  
  return (
    <BaseNode title="Change Case" icon={'Aa'} handles={handles}>
       <label style={{display: 'block', fontWeight: 500}}>
        Convert to
        <select style={inputStyle}>
          <option value="upper">UPPERCASE</option>
          <option value="lower">lowercase</option>
        </select>
      </label>
    </BaseNode>
  );
};
