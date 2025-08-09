import { Position as LLMPosition } from 'reactflow'; // Use alias to avoid name conflict
import { BaseNode as LLMBaseNode } from './BaseNode';

const llmHandles = [
  { type: 'target', position: LLMPosition.Left, id: 'system', top: '35%' },
  { type: 'target', position: LLMPosition.Left, id: 'prompt', top: '65%' },
  { type: 'source', position: LLMPosition.Right, id: 'response' },
];

export const LLMNode = () => {
  return (
    <LLMBaseNode title="LLM" handles={llmHandles} >
      <div style={{ color: '#6b7280' }}>.</div>
      <div style={{ marginTop: '10px' }}>
        <label style={{ display: 'block', color: '#374151', fontSize: 25 }}>This is a llm</label>
      </div>
    </LLMBaseNode>
  );
};

