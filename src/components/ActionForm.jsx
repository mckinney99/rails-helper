import React from 'react'
import {Form, Button} from "react-bootstrap";

export default function ActionForm(props) {
  const handleActionChange = (index, event) => {
    let data = [...props.actionFields]
    data[index][event.target.name] = event.target.value
    props.setActionFields(data);
  }

  const handleAddActionClick = () => {
    let newaction = { actionName: '' }
    props.setActionFields([...props.actionFields, newaction])
  };

  const removeActions = (index) => {
    let data = [...props.actionFields]
    data.splice(index, 1)
    props.setActionFields(data)
  }
  return(
    <>
      {props.tableType === 'create-controller' && props.tableType !== '' &&
        props.actionFields.map((input, index) => {
          return (
            <div className="actions-form" key={index}>
              <Form.Label>Action:</Form.Label>
              <Form.Control
                onChange={event => handleActionChange(index, event)}
                value={input.actionName}
                name="actionName"
                placeholder="Creates controller method with a corresponding view + helper"
              />
              <Button 
                onClick={() => removeActions(index)}
                variant="danger"
                >
                  Remove
              </Button>
            </div>
          )
        })
      }    

      {props.tableType === 'create-controller' && props.tableType !== '' &&
        <Button 
          id="form-submit" 
          variant="primary"
          onClick={handleAddActionClick}>
            Add Action
        </Button>
        
      }
    </>
  )
}
