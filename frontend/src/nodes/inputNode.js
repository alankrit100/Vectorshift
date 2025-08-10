import React, { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode'; // Import the BaseNode

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handles = [
    { type: 'source', position: Position.Right, id: `${id}-value` },
  ];

  return (
    <BaseNode title="Input" icon={'➡️'} handles={handles} borderColor="#3B82F6">
      <label style={{display: 'block', fontWeight: 500, marginBottom: '12px'}}>
        Name
        <input 
          type="text" 
          value={currName} 
          onChange={(e) => setCurrName(e.target.value)}
          style={{width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #d1d5db', boxSizing: 'border-box'}}
        />
      </label>
      <label style={{display: 'block', fontWeight: 500}}>
        Type
        <select 
          value={inputType} 
          onChange={(e) => setInputType(e.target.value)}
          style={{width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #d1d5db', boxSizing: 'border-box'}}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};
