import React from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode'; // Import the BaseNode

export const LLMNode = ({ id }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-system`, top: '35%' },
    { type: 'target', position: Position.Left, id: `${id}-prompt`, top: '65%' },
    { type: 'source', position: Position.Right, id: `${id}-response` },
  ];

  return (
    <BaseNode title="LLM" icon={'🧠'} id={id} handles={handles} borderColor="#8B5CF6">
      <div style={{ textAlign: 'left', color: '#e4e7eeff' }}>
        This is a Large Language Model.
      </div>
    </BaseNode>
  );
};