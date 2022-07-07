import React from "react";
import Navigation from './Navigation'
import {Form, Button, Row, Col} from "react-bootstrap";

export default function MainForm() {
  const [formData, setFormData] = React.useState(
      {
        tableType: "",
        tableName: "",
      }
    )
  const [columnFields, setColumnFields] = React.useState([])
  const [actionFields, setActionFields] = React.useState([])

  function handleChange(event) {
    const {name, value} = event.target
    setFormData(prevFormData => {
      return {
          ...prevFormData,
          [name]: value
      }
    })
  }

  const handleColumnChange = (index, event) => {
    let data = [...columnFields]
    data[index][event.target.name] = event.target.value
    setColumnFields(data);
  }

  const handleAddColumnClick = () => {
    let newcolumn = { columnName: '', columnType: '' }
    setColumnFields([...columnFields, newcolumn])
    console.log(columnFields)
  };

  const handleActionChange = (index, event) => {
    let data = [...actionFields]
    data[index][event.target.name] = event.target.value
    setActionFields(data);
  }

  const handleAddActionClick = () => {
    let newaction = { actionName: '' }
    setActionFields([...actionFields, newaction])
  };

  const removeColumns = (index) => {
    let data = [...columnFields]
    data.splice(index, 1)
    setColumnFields(data)
  }

  function handleActions() {
    let fields = []
    for (let i=0; i<actionFields.length; i++) {
      let snake_case = actionFields[i].actionName.split(/(?=[A-Z])/).join('_').toLowerCase()
      fields.push(snake_case)
    }
    let newFields = fields.toString().split(',').join(' ')
    return newFields
  }

  const handlePlaceHolder = () => {
    if (formData.tableType === 'create-table-and-model') {
      return 'Model Name'
    } else if (formData.tableType === 'create-table') {
      return 'Table Name'
    } else if (formData.tableType === 'create-controller') {
      return 'Controller Name'
    } else if (formData.tableType === 'create-scaffold') {
      return 'Resource Name'
    } else if (formData.tableType === 'add-column') {
      return 'Name of Table you are adding the column to'
    } else if (formData.tableType === 'remove-column') {
      return 'Name of Table you are removing the column from'
    }
  }

  const handleColumnButton = () => {
    if (formData.tableType !== 'create-controller' && formData.tableType !== '') {
      return true
    } else if (columnFields.length < 1 && (formData.tableType === 'add-column' || formData.tableType === 'remove-column')) {
      return false
    }
  }

  const littleMessage = () => {
    if (formData.tableType !== '') {
      return <>
      <span>Don't forget to run  <mark>rails db:migrate</mark>    :)</span>
      </>
    } else {
      return ''
    }
  }

  const handleResult = () => {
    let firstColumn = typeof columnFields[0] === "undefined" ? "" : columnFields[0].columnName;

    if (formData.tableType === 'create-table') {
      let result = `rails g migration ${formData.tableName}`
      return result
    } else if (formData.tableType === 'add-column') {
      let result = `rails g migration Add${firstColumn}To${formData.tableName}`
      return result
    } else if (formData.tableType === 'create-join') {
      let result = `rails g create-join ${formData.tableName}`
      return result
    } else if (formData.tableType === 'remove-column') {
      let result = `rails g Remove${firstColumn}From${formData.tableName}`
      return result
    } else if (formData.tableType === 'create-table-and-model') {
      let result = `rails g model ${formData.tableName}`
      return result
    } else if (formData.tableType === 'create-controller') {
      let result = `rails g controller ${formData.tableName}`
      return result
    } else if (formData.tableType === 'create-scaffold') {
      let result = `rails g scaffold ${formData.tableName}`
      return result
    } else {
      return ""
    }
  }

  const handleColumns = () => {
    let fields = []

    const isColumn = (col) => {
      if (typeof col === "undefined") {
        return false;
      } else if (col.columnName !== '' && col.columnType !== '') {
        return true;
      } else {
        return false;
      }
    }
    
    if ( 
      columnFields.length >= 1 &&
      (formData.tableType === 'create-table' ||
      formData.tableType === 'create-table-and-model' ||
      formData.tableType === 'create-scaffold')
      ) {
        for (let i=0; i<columnFields.length; i++) {
          let semiColon = isColumn(columnFields[i]) ? ":" : ""
          let snake_case = columnFields[i].columnName.split(/(?=[A-Z])/).join('_').toLowerCase()
          fields.push(snake_case + semiColon + columnFields[i].columnType)
        }
        let newFields = fields.toString().split(',').join(' ')
        return newFields

    } else if ( columnFields.length >= 1 &&
      (formData.tableType === 'add-column' ||
      formData.tableType === 'remove-column')) {
        let semiColon = isColumn(columnFields[0]) ? ":" : ""
        let newColName = isColumn(columnFields[0]) ? columnFields[0].columnName : ""
        let newColType = isColumn(columnFields[0]) ? columnFields[0].columnType : ""

        fields.push(newColName + semiColon + newColType)

        let newFields = fields.toString().split(',').join(' ')
        let result = newFields.split(/(?=[A-Z])/).join('_').toLowerCase();
        return result

    } else {
      return ""
    }
  }

  const result = handleResult() + " " + (formData.tableType === 'create-controller' ? handleActions() : handleColumns())

  return (
    <div>
      <Navigation/>
      <div className="main">
        <h2>What do you want to do?</h2>

        <Form.Select aria-label="Default select example"
          id="tableType" 
          value={formData.tableType}
          onChange={handleChange}
          name="tableType"
        >
          <option value="">-- Select --</option>
          <option value="create-table">Create a table migration</option>
          <option value="create-table-and-model">Create a model with a corresponding migration</option>
          <option value="create-controller">Create a controller</option>
          <option value="create-scaffold">Create a scaffold (Controller, Model, View, Route, and Migration)</option>
          <option value="add-column">Add column to existing table</option>
          <option value="remove-column">Remove column from existing table</option>
        </Form.Select>

        {formData.tableType !== '' && 
        <div className="form-group">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={formData.tableName}
            name="tableName"
            placeholder={handlePlaceHolder()}
          />
        </div>
        }

        {/* -------------------------------------- COLUMN FORM -------------------------------- */}

        {formData.tableType !== 'create-controller' && formData.tableType !== '' && columnFields.map((input, index) => {
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

        {/* -------------------^^^^-------------- END COLUMN FORM ------------------^^^^---------------------- */}


        {/* -------------------------------------- ACTIONS FORM -------------------------------- */}

        {formData.tableType === 'create-controller' && formData.tableType !== '' &&
          actionFields.map((input, index) => {
            return (
              <div className="actions-form" key={index}>
                <Form.Label>Action:</Form.Label>
                <Form.Control
                  onChange={event => handleActionChange(index, event)}
                  value={input.actionName}
                  name="actionName"
                  placeholder="Creates controller method with a corresponding view + helper"
                />
              </div>
            )
          })
        }    

        {formData.tableType === 'create-controller' && formData.tableType !== '' &&
          <Button 
            id="form-submit" 
            variant="primary"
            onClick={handleAddActionClick}>
              Add Action
          </Button>
        }     


        {/* -------------------------------------- END ACTIONS FORM -------------------------------- */}

        {handleColumnButton() &&
          <Button 
            id="form-submit" 
            variant="primary"
            onClick={handleAddColumnClick}>
              Add Column
          </Button>
        }
        <br/>

        <br/>
        <br/>
        <br/>

        { formData.tableType !== '' &&
          <div className="result" >
            <p className="result-text">{result}</p>
            <br/>
            <Button variant="outline-dark"
              onClick={() => {navigator.clipboard.writeText(result)}}>
              Copy
            </Button>
          </div>
        }

        <br/>
        <br/>
        <br/>

        {formData.tableType !== '' && littleMessage()}

      </div>
    </div>
  );
}
