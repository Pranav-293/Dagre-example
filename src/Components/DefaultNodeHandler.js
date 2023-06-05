// React
import React, { useEffect } from "react";
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';
import { Card, ListGroup } from "react-bootstrap";

// PropTypes
import PropTypes from "prop-types";

// Utils
 import { RESPONSE_TYPE_PAYLOAD } from "../response-payload.util";


//SIDE EDGE ENABLE TYPES
const SIDE_EDGE_ENABLE_TYPES = ["jumpto", "conditional", "dynamicForm", "options"];

/**
 * Return the type of the response
 * @param {String} type 
 * @returns {String} title
 */
const getPreviewTypes = (type) => {
  const iconDetails = RESPONSE_TYPE_PAYLOAD.find((item) => item?.type?.toLowerCase() == type.toLowerCase());
  return iconDetails?.title;
};

/**
 * Node Handler for projection of data in graph
 * @param {{ data, selected }}
 * @returns {React.ReactElement} Root Intents.
 */
const DefaultNodeHandler = React.memo((props) => {
  const { data, selected, dryRun } = props;
  const { label, isSystem = false, nodeId, description, conditional } = data;
  // Handling function dynamically
//   const updateNodeInternals = dryRun ? () => { } : useUpdateNodeInternals();
  const updateNodeInternals = () => {};

  useEffect(() => {
    //Updating node interals for Handle
    updateNodeInternals(nodeId);
  }, [data?.response]);

  return (
    <Card className={`mt-2 node-handler ${selected ? isSystem ? "node-selection-custom" : "node-selection-default" : ""}`}
      name={conditional ? "response-section" : ""}
      style={{ cursor: 'pointer', width: "288px" }}
      border={isSystem ? "success" : "primary"}
    >
      {
        !dryRun &&
        <Handle
          type="target"
          position={Position.Top}
        />}
      {
        !conditional
          ?
          <Card.Header
            style={{ backgroundColor: isSystem ? "green" : "#008fe2" }}
          >
            {label}
          </Card.Header>
          : null
      }
      {
        !conditional && description
          ? <Card.Body>
            <Card.Text>
              {description}
            </Card.Text>
          </Card.Body>
          : null
      }
      {
        Array.isArray(data?.response)
          ? <ListGroup variant="flush" className="card-body" name={conditional ? "response-section" : ""}>
            {
              data?.response?.map((typeObject, index) => {
                // If the response value exists render node content
                if (typeObject) {
                  const { type, value } = typeObject;
                  const previewType = getPreviewTypes(type) || type;
                  return (
                    <ListGroup.Item name="response-section" key={index} style={value?.loopNode ? { backgroundColor: "#E0E0E0" } : {}}>
                      {previewType}
                      {
                        !dryRun && SIDE_EDGE_ENABLE_TYPES.includes(type) && !value?.loopNode ?
                          <Handle
                            type="source"
                            position={Position.Right}
                            id={`${nodeId}-${type}-${index}`}
                          /> : null
                      }
                    </ListGroup.Item>
                  );
                }
                else {
                  return <></>;
                }
              })
            }
          </ListGroup>
          : null
      }
      {
        !conditional && !dryRun
          ? <Handle
            type="source"
            id="child"
            position={Position.Bottom}
          />
          : null
      }
    </Card>
  );
});

DefaultNodeHandler.propTypes = {
  data: PropTypes.object, // contains the payload for the node
  selected: PropTypes.bool, // Contains boolean value. node selected/unselected
  dryRun: PropTypes.bool // Dry run for calculating the projection for the graph
};

export default DefaultNodeHandler;