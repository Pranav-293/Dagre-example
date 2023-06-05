import React, { useCallback, useEffect } from 'react';
import ConditionalNodeHandler from './ConditionalNodeHandler';
import DefaultNodeHandler from './DefaultNodeHandler';
import EventNodeHandler from './EventNodeHandler';
import OptionsNodeHandler from './OptionNodeHandler';
import ReactFlow, {
  addEdge,
  ConnectionLineType,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import dagre from 'dagre';


//import { initialNodes, initialEdges } from './nodes-edges.js';
import initialNodes from "./nodesData.json"
import initialEdges from "./edgesData.json"

import 'reactflow/dist/style.css';





const nodeTypes = {
  defaultNodeHandler: DefaultNodeHandler,
  eventNodeHandler: EventNodeHandler,
  conditionalNodeHandler: ConditionalNodeHandler,
  optionsNodesHandler: OptionsNodeHandler,
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? 'left' : 'top';
    node.sourcePosition = isHorizontal ? 'right' : 'bottom';

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);

const LayoutFlow = () => {
  
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }
        , eds)
      ),
    []
  );
  


  return (
    <div className='bg' style={{ width: '100vw', height: '100vh' }}>
    <ReactFlow
    nodeTypes={nodeTypes}
      onlyRenderVisibleElements={true}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      // connectionLineType={ConnectionLineType.SmoothStep}
      fitView
    >
    </ReactFlow>
    </div>
  );
};

export default LayoutFlow;