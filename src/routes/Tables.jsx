import Navigation from "../components/Navigation";
import React from "react";
import {Form, Button, Row, Col} from "react-bootstrap";

export default function Tables() {
  const [formData, setFormData] = React.useState(
      {
        tableType: "",
        tableName: "",
      }
    )

  const [columnFields, setColumnFields] = React.useState([])
  
  const [columnCounter, setColumnCounter] = React.useState(0);
  const [columnData, setColumnData] = React.useState([])

  function handleChange(event) {
    const {name, value, type, checked} = event.target
    setFormData(prevFormData => {
        return {
            ...prevFormData,
            [name]: value
        }
    })
  }

  const handleColumnChange = (index, event) => {
    let data = [...columnFields];
    data[index][event.target.name] = event.target.value;
    setColumnFields(data);
  }

  const handleAddColumnClick = () => {
    let newcolumn = { columnName: '', columnType: '' }
    setColumnFields([...columnFields, newcolumn])
  };

  const removeColumns = (index) => {
    let data = [...columnFields];
    data.splice(index, 1)
    setColumnFields(data)
  }

  const handleResult = () => {
    if (formData.tableType === 'create') {
      let result = `rails generate migration ${formData.tableName}`
      return result
    } else if (formData.tableType === 'add-column') {
      let result = `rails generate migration Add${formData.columnName}To${formData.tableName}`
      return result
    } else if (formData.tableType === 'create-join') {
      let result = `rails generate create-join ${formData.tableName}`
      return result
    } else {
      return ""
    }
  }

  const handleColumns = () => {
    let fields = []
    if (columnFields.length >= 1) {
      for (var i=0; i<columnFields.length; i++) {
        console.log(columnFields[i].columnName + ':' + columnFields[i].columnType)
        fields.push(columnFields[i].columnName + ':' + columnFields[i].columnType)
      }
      console.log(fields)
      return fields.toString().replace(',',' ')
    } else {
      return ""
    }
    
  }

  const result = handleResult() + " " + handleColumns()

  return (
    <div>
      <Navigation />
      <div className="main">
        <h2>Tables</h2>

        <Form.Select aria-label="Default select example"
          id="tableType" 
          value={formData.tableType}
          onChange={handleChange}
          name="tableType"
        >
          <option value="">-- Select --</option>
          <option value="create">Create Table</option>
          <option value="add-column">Add Column to Existing Table</option>
          <option value="create-join">Create Join Table</option>
        </Form.Select>

        {formData.tableType !== '' && 
        <div className="form-group">
          <Form.Label>Table Name (In CamelCase)</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={formData.tableName}
            name="tableName"
            placeholder="Table Name"
          />
        </div>
        }

        {/* -------------------------------------- COLUMN FORM -------------------------------- */}

        <Button 
          id="form-submit" 
          variant="primary"
          onClick={handleAddColumnClick}>
            Add Column
        </Button>{' '}
        <br/>

        {columnFields.map((input, index) => {
          return (
          <div className="column" key={index}>
          <Form.Label>Column Name (In CamelCase)</Form.Label>
          <br/>
          <Form>
            <div>
              <Row>
                <Col>
                  <Form.Control
                    name='columnName'
                    placeholder="Column Name"
                    className={index}
                    onChange={event => handleColumnChange(index, event)}
                    value={input.columnName}
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
                    <option value="string">String</option>
                    <option value="integer">Integer</option>
                    <option value="index">Index</option>
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

        <br/>
        <br/>
        <br/>
        {result}
      </div>
    </div>
  );
}
