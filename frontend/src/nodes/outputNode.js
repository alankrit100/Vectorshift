import React, { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode'; // Import the BaseNode

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');
  
  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-value` },
  ];

  return (
    // Using the same BaseNode wrapper for a consistent frame
    <BaseNode title="Output" icon={'⬅️'} id={id}  handles={handles} borderColor="#EC4899">
      
      {/* Applying the exact same label and input styling as InputNode */}
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
          value={outputType} 
          onChange={(e) => setOutputType(e.target.value)}
          style={{width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #d1d5db', boxSizing: 'border-box'}}
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};
