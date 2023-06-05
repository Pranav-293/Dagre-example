import React, { useCallback, useEffect, useRef } from "react";
import {
  ConnectionLineType,
  ReactFlow,
  addEdge,
  useEdgesState,
  useNodesState
} from "reactflow";
import "reactflow/dist/style.css";
import edgeList from "./edgesData.json";
import nodeList from "./nodesData.json";
import ConditionalNodeHandler from "./ConditionalNodeHandler";
import DefaultNodeHandler from "./DefaultNodeHandler";
import EventNodeHandler from "./EventNodeHandler";
import OptionsNodeHandler from "./OptionNodeHandler";

const nodeTypes = {
  defaultNodeHandler: DefaultNodeHandler,
  eventNodeHandler: EventNodeHandler,
  conditionalNodeHandler: ConditionalNodeHandler,
  optionsNodesHandler: OptionsNodeHandler,
};

const Flow = () => {
  const reactFlowWrapper = useRef(null);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    setNodes(nodeList);
    setEdges(edgeList);
  }, []);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds
        )
      ),
    []
  );

  return (
    <>
      <div className="reactflow_wrapper" ref={reactFlowWrapper} style={{width:"100vw", height:"100vh"}}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onlyRenderVisibleElements={true}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          // onInit={(rfi) => {
          //   console.log(rfi);
          //   rfi.addNodes(layoutedNodes.slice(51));
          //   rfi.addEdges(layoutedEdges.slice(51));
          // }}
          nodeTypes={nodeTypes}
          // onDrop={handleOnDrop}
          // onDragOver={onDragOver}
          // onConnectStart={onConnectStart}
          // onConnectEnd={onConnectEnd}
          fitView
        >
          {/* <Controls>
            <ControlButton onClick={onUndoClicked}>
              <FontAwesomeIcon icon={faRotateLeft} />
            </ControlButton>
            <ControlButton onClick={onRedoClicked}>
              <FontAwesomeIcon icon={faRotateRight} />
            </ControlButton>
          </Controls> */}
          {/* <MiniMap /> */}

          {/* <Background variant="dots" gap={12} size={1} /> */}
          {/* <Sidebar/> */}
        </ReactFlow>
      </div>
    </>
  );
};

export default Flow;
