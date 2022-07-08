import React from 'react';
import {Form, Button, Row, Col} from "react-bootstrap";

export default function ColumnFields(props) {
  const handleColumnChange = (index, event) => {
    let data = [...props.columnFields]
    data[index][event.target.name] = event.target.value
    props.setColumnFields(data);
  }

  const removeColumns = (index) => {
    let data = [...props.columnFields]
    data.splice(index, 1)
    props.setColumnFields(data)
  }

  return(
    <>
      {
      props.tableType !== 'create-controller' && 
      props.tableType !== '' &&
      props.columnFields.map((input, index) => {
        return (
        <div className="column" key={index}>
          <Form.Label>Column Name:</Form.Label>
          <br/>
          <Form>
            <div>
              <Row>
                <Col>
                  <Form.Control
                    name='columnName'
                    placeholder="Column Name"
                    className={index}
                    value={input.columnName}
                    onChange={event => handleColumnChange(index, event)}
                  />
                </Col>
                <Col>
                  <Form.Select aria-label="Default select example"
                    id="columnType" 
                    name="columnType"
                    value={input.columnType}
                    onChange={event => handleColumnChange(index, event)}
                  >
                    <option value="">-- Select --</option>
                    <option value="string">string</option>
                    <option value="text">text</option>
                    <option value="boolean">boolean</option>
                    <option value="references">references</option>
                    <option value="integer">integer</option>
                    <option value="bigint">bigint</option>
                    <option value="float">float</option>
                    <option value="decimal">decimal</option>
                    <option value="numeric">numeric</option>
                    <option value="time">time</option>
                    <option value="date">date</option>
                    <option value="datetime">DateTime</option>
                    <option value="timestamp">timestamp</option>
                    <option value="binary">binary</option>
                    <option value="primary_key">primary_key</option>
                    
                  </Form.Select>
                </Col>
              </Row>
            </div>
            <Button 
              onClick={() => removeColumns(index)}
              variant="danger"
              >
                Remove
            </Button>
          </Form>
        </div>
        )
      })}
    </>
  )
}

