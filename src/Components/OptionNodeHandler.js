// React
import React from "react";
import PropTypes from "prop-types";
import { Handle, Position } from 'reactflow';
import { Card, ListGroup } from "react-bootstrap";

/**
 * Options Node Handler for projection of data in graph
 * @param {{ data }}
 * @returns {React.ReactElement} Root Intents.
 */
const OptionsNodeHandler = React.memo((props) => {
  const { data: { options }, dryRun } = props;
  return (
    <Card
      className="mt-2 options-node-handler"
    >
      {!dryRun && <Handle
        type="target"
        position={Position.Top}
      />}
      {
        Array.isArray(options)
          ? <ListGroup variant="flush" className="card-body">
            {
              options?.map(({ label, rootNode, name }, index) => {
                // If the response value exists render node content
                const condition = rootNode && name;
                return (
                  <ListGroup.Item
                    value={condition ? name : ""}
                    key={index}
                    style={{
                      cursor: condition ? "pointer" : "not-allowed",
                      background: condition ? null : "#E0E0E0"
                    }}>
                    {label}
                    {
                      condition
                        ? <i className="ml-2 fa fa-arrow-right" aria-hidden="true"></i>
                        : null
                    }
                  </ListGroup.Item>
                );
              })
            }
          </ListGroup>
          : null
      }
    </Card>
  );
});

OptionsNodeHandler.propTypes = {
  data: PropTypes.object, //Contains display properties,
  dryRun: PropTypes.bool // Dry run for calculating the projection for the graph
};

export default OptionsNodeHandler;