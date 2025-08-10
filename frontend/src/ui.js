import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import {
  FilterNode, MergeNode, CsvUploadNode, LogNode, ChangeCaseNode
} from './nodes/customNodes';
import 'reactflow/dist/style.css';

const gridSize = 25;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode, llm: LLMNode, customOutput: OutputNode,
  text: TextNode, filter: FilterNode, merge: MergeNode,
  csvUpload: CsvUploadNode, log: LogNode, changeCase: ChangeCaseNode,
};

const selector = (state) => ({
  nodes: state.nodes, edges: state.edges,
  getNodeID: state.getNodeID, addNode: state.addNode,
  onNodesChange: state.onNodesChange, onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const { nodes, edges, getNodeID, addNode, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: { id: nodeID, nodeType: type },
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, addNode, getNodeID]
  );

  return (
    <div ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineStyle={{ stroke: '#A0AEC0', strokeWidth: 2 }}
        connectionLineType='smoothstep'
      >
        <Background variant="dots" color="#4A5568" gap={gridSize} />
        <Controls showInteractive={false} style={{
          button: {
            backgroundColor: 'rgba(45, 55, 72, 0.8)',
            color: '#A0AEC0',
            border: '1px solid #4A5568',
          }
        }} />
        <MiniMap nodeColor="#fff" maskColor="rgba(26, 32, 44, 0.6)" />
      </ReactFlow>
    </div>
  );
};
