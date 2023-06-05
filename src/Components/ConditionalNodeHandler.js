// React
import React from "react";
import { Handle, Position } from 'reactflow';
import { Card } from "react-bootstrap";

// PropTypes
import PropTypes from "prop-types";

/**
 * Condtional Node Handler for graph
 * @param {{ data }}
 * @returns {React.ReactElement} Root Intents.
 */
const CondtionalNodeHandler = React.memo(({ data, dryRun }) => {
  const { label } = data;

  return (
    <Card className="mt-2" style={{ background: 'transparent', boxShadow: 'none', border: 'none' }}>
      <Card.Header style={{ background: 'transparent', boxShadow: 'none', border: 'none' }}>
        <div className="conditional-handler">
          <div className="label-content" style={{ width: `${100 + label.length}px`, height: `${100 + label.length}px` }}><span>{label}</span></div>
        </div>
      </Card.Header>
      {!dryRun && <Handle
        type="target"
        position={Position.Top}
      />}
      {!dryRun && <Handle
        type="source"
        position={Position.Right}
        id="yes"
      />}
      {!dryRun && <Handle
        type="source"
        id="no"
        position={Position.Bottom}
      />}
    </Card >
  );
});

CondtionalNodeHandler.propTypes = {
  data: PropTypes.object, // contains the payload for the node
  dryRun: PropTypes.bool // Dry run for calculating the projection for the graph
};

export default CondtionalNodeHandler;