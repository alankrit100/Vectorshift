import { useState as useTextState } from 'react';
import { Position as TextPosition } from 'reactflow';
import { BaseNode as TextBaseNode } from './BaseNode';

const textHandles = [
  { type: 'target', position: TextPosition.Left, id: 'input' },
  { type: 'source', position: TextPosition.Right, id: 'output' },
];

export const TextNode = ({ data }) => {
  const [currText, setCurrText] = useTextState(data?.text || '{{input}}');

  return (
    <TextBaseNode title="Text" handles={textHandles} icon="📄">
      <label>
        Text Content:
        <textarea 
          value={currText} 
          onChange={(e) => setCurrText(e.target.value)}
          rows={3}
          style={{width: '100%', boxSizing: 'border-box', marginTop: '4px'}}
        />
      </label>
    </TextBaseNode>
  );
};