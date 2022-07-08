import React from 'react';
import {Form} from "react-bootstrap";

export default function TableForm(props) {
  return(
    <>
    <h2>What do you want to do?</h2>
      <Form.Select aria-label="Default select example"
        id="tableType" 
        value={props.tableType}
        onChange={props.handleChange}
        name="tableType"
      >
        <option value="">-- Select --</option>
        <option value="create-table">Create a table migration</option>
        <option value="create-table-and-model">Create a model with a corresponding migration</option>
        <option value="create-controller">Create a controller</option>
        <option value="create-scaffold">Create a scaffold (Controller, Model, View, Route, and Migration)</option>
        <option value="add-column">Add columns to existing table</option>
        <option value="remove-column">Remove columns from existing table</option>
      </Form.Select>

      {props.tableType !== '' && 
      <div className="form-group">
        <Form.Label>{props.handlePlaceHolder()}</Form.Label>
        <Form.Control
          onChange={props.handleChange}
          value={props.tableName}
          name="tableName"
          placeholder="PascalCase or snake_case"
        />
      </div>
      }
    </>
  )
}
