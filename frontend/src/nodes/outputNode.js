import { useState as useOutputState } from 'react';
import { Position as OutputPosition } from 'reactflow';
import { BaseNode as OutputBaseNode } from './BaseNode';

const outputHandles = [
  { type: 'target', position: OutputPosition.Left, id: 'input' },
];

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useOutputState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useOutputState(data.outputType || 'Text');

  return (
    <OutputBaseNode title="Output" handles={outputHandles} >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label>Name: <input type="text" value={currName} onChange={(e) => setCurrName(e.target.value)} style={{width: '100%', boxSizing: 'border-box'}} /></label>
        <label>Type: 
          <select value={outputType} onChange={(e) => setOutputType(e.target.value)} style={{width: '100%'}}>
            <option value="Text">Text</option>
            <option value="Image">Image</option>
          </select>
        </label>
      </div>
    </OutputBaseNode>
  );
};