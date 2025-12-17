import { useState, useCallback } from 'react';
import { ReactFlow, useNodesState, useEdgesState, applyNodeChanges, applyEdgeChanges, addEdge, Background, Controls, MiniMap, BackgroundVariant } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { StartNode } from '../../components/nodes/StartNode';
const nodeTypes = {
  startNode: StartNode,
};
const initialNodes = [
  { id: 'n1', type: 'startNode', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
  { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
];
const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];

export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  // const onNodeClick = useCallback((event, node) => {
  //   console.log('Node clicked:', node.data.label, 'ID:', node.id);
  //   // You can add your custom logic here, e.g., open a modal or a sidebar
  //   alert(`You clicked on: ${node.data}`);
  // }, []);
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  return (
    <div style={{ height: '800px', width: '1500px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        {/* <MiniMap nodeStrokeWidth={3} pannable zoomable /> */}
        <Background variant={BackgroundVariant.Cross} />
        <Controls />
      </ReactFlow>
    </div>
  );
}