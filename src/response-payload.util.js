//RESPONSE TYPE
const RESPONSE_TYPE = {
    MULTIRESPONSE: "multiResponse",
    TEXT: "text",
    OPTIONS: "options",
    HYPERLINK: "hyperlink",
    IMAGE: "image",
    JUMPTO: "jumpto",
    CONDITIONAL: "conditional",
    DYNAMIC_FORM: "dynamicForm"
};

// RESPONSE TYPE LIMIT
const RESPONSE_TYPE_LIMIT = {
    [RESPONSE_TYPE.DYNAMIC_FORM]: 1,
    [RESPONSE_TYPE.OPTIONS]: 1,
    [RESPONSE_TYPE.CONDITIONAL]: 1,
};

// Dialog response type and payload
const RESPONSE_TYPE_PAYLOAD = [
    {
        "type": RESPONSE_TYPE.MULTIRESPONSE,
        "title": "Multi Response Text",
        "value": {
            "response": [
                {
                    "type": "text",
                    "value": ""
                }
            ],
            "sequence_type": "sequence",
            "id": "multi_resp_001"
        }
    },
    {
        type: RESPONSE_TYPE.TEXT,
        title: "Text",
        value: ""
    },
    {
        type: RESPONSE_TYPE.OPTIONS,
        title: "Option",
        value: {
            text: "",
            options: [
                {
                    value: {
                        input: {
                            text: ""
                        }
                    },
                    label: ""
                }
            ]
        }
    },
    {
        type: RESPONSE_TYPE.HYPERLINK,
        title: "Link",
        value: {
            data: {
                header: "",
                url: ""
            }
        }
    },
    {
        type: RESPONSE_TYPE.IMAGE,
        title: "Image",
        value: {
            data: {
                header: "",
                imageType: "",
                dataArr: [
                    {
                        url: "",
                        clickEvent: true
                    }
                ]
            }
        }
    },
    {
        type: RESPONSE_TYPE.JUMPTO,
        title: "Jumpto"
    },
    {
        type: RESPONSE_TYPE.CONDITIONAL,
        title: "Conditional"
    },
    {
        type: RESPONSE_TYPE.DYNAMIC_FORM,
        title: "Dynamic Form",
        value: {
            name: "dynamicForm",
            uiBuilder: "BUILDER",
            formEvent: null,
            close: null,
            data: {
                type: "gridV2",
                id: "grid-test-accountInfo",
                description: "account info grid",
                cols: [{
                    id: "column-61",
                    xs: "12",
                    md: "12",
                    lg: "12",
                    children: [{
                        id: "uiBuilder",
                        description: "UI Builder description",
                        type: "section",
                        className: "rectangle-25",
                        cols: [{
                            children: [
                                {
                                    type: "form",
                                    dataSource: "uiBuilder",
                                    className: "",
                                    description: "ui Builder form",
                                    id: 'uiBuilderID',
                                    columns: [
                                        {
                                            type: "gridV2",
                                            id: "header-section",
                                            className: "widget-form-header",
                                            description: "header section",
                                            cols: [
                                                {
                                                    id: "column-4",
                                                    xs: "4",
                                                    md: "4",
                                                    description: "heading and close section",
                                                    children: [
                                                        {
                                                            id: "header-text",
                                                            type: "text",
                                                            dynamicText: false,
                                                            description: "header-screen",
                                                            className: "header-screen-1",
                                                            text: "",
                                                        },
                                                    ]
                                                },
                                                {
                                                    id: "column-56",
                                                    xs: "4",
                                                    md: "4",
                                                    description: "icon Button",
                                                    children: [
                                                        {
                                                            type: "iconButton",
                                                            size: "small",
                                                            adornment: "endAdornment",
                                                            icon: "clear",
                                                            variant: "text",
                                                            className: "clearIcon",
                                                            id: "cancel-ArrowBack",
                                                            description: "cancel-ArrowBack-payWithCard",
                                                            handleClick: [
                                                                {
                                                                    type: "bindDataInEvent",
                                                                    event: "uiBuilderClose"
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                            ]
                                        }
                                    ],
                                    submit: {
                                        label: "Continue",
                                        id: "random",
                                        description: "",
                                        onSubmit: [{
                                            type: 'bindDataInEvent',
                                            event: "uiBuilderSubmit"
                                        }]
                                    }
                                }
                            ]
                        }]
                    }]
                }]
            }
        }
    }
];

// Response Fields
const RESPONSE_FIELDS = {
    default: ["type", "value"]
};

/**
 * get the filter response type payload 
 * @param {string} type 
 * @returns {object} filter response type
 */
const getResponseTypePayload = (type) => {
    return RESPONSE_TYPE_PAYLOAD.find(val => val.type.toLowerCase() === type.toLowerCase());
};


/**
 * Preparing response payload for dialog
 * @param {Array} forms data for response array 
 * @returns {Array} Parsed Array for forms
 */
const getDialogResponsePayload = (forms) => {
    const initialForm = forms.map((form) => {
        const formModification = {};
        if (RESPONSE_FIELDS[form?.type]) {
            RESPONSE_FIELDS[form?.type].forEach(field => (formModification[field] = form[field]));
            return formModification;
        }
        RESPONSE_FIELDS.default.forEach(field => (formModification[field] = form[field]));
        return formModification;
    });
    return initialForm;
};

export { RESPONSE_TYPE_PAYLOAD, RESPONSE_TYPE_LIMIT, RESPONSE_TYPE, getResponseTypePayload, getDialogResponsePayload };