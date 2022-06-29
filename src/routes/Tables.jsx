import Navigation from "../components/Navigation";
import React from "react";
import {Form, Button, Row, Col} from "react-bootstrap";

export default function Tables() {
  const [formData, setFormData] = React.useState(
      {
        tableType: "",
        tableName: "",
        columnName: "",
      }
    )
  
  const [columnCounter, setColumnCounter] = React.useState(0);
  const [columnValues, setColumnValues] = React.useState({});
  const [columnType, setColumnType] = React.useState({});


    console.log(formData)

  function handleChange(event) {
    const {name, value, type, checked} = event.target
    setFormData(prevFormData => {
        return {
            ...prevFormData,
            [name]: value
        }
    })
  }

  const handleAddColumnChange = (e) => {
    const abc = {};
    abc[e.target.className] = e.target.value;
    setColumnValues({ ...columnValues, ...abc });
  };

  const handleAddColumnClick = () => {
    setColumnCounter(columnCounter + 1);
    console.log(columnCounter);
  };

  function handleResult() {
    if (formData.tableType === 'create') {
      let result = `rails generate migration ${formData.tableName}`
      return result
    } else if (formData.tableType === 'add-column') {
      let result = `rails generate migration Add${formData.columnName}To${formData.tableName}`
      return result
    } else if (formData.tableType === 'create-join') {
      let result = `rails generate create-join ${formData.tableName}`
      return result
    }
  }

  const result = handleResult();

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

        {formData.tableType === 'add-column' && 
        <div className="form-group">
          <Form.Label>Column Name (In CamelCase)</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={formData.columnName}
            name="columnName"
            placeholder="Column Name"
          />
        </div>
        }

        <Button 
          id="form-submit" 
          variant="primary"
          onClick={handleAddColumnClick}>
            Add Column
        </Button>{' '}
        <br/>

        {Array.from(Array(columnCounter)).map((c, index) => {
          return (
          <>
          <Form.Label>Column Name (In CamelCase)</Form.Label>
          <br/>
          <Form>
            <Row>
              <Col>
                <Form.Control
                  onChange={handleAddColumnChange}
                  value={formData.addColumnName}
                  name="columnName"
                  placeholder="Column Name"
                  className={index}
                  key={c}
                />
              </Col>
              <Col>
                <Form.Select aria-label="Default select example"
                  id="columnType" 
                  value={columnType}
                  onChange={handleChange}
                  name="columnType"
                >
                  <option value="">-- Select --</option>
                  <option value="string">String</option>
                  <option value="integer">Integer</option>
                  <option value="index">Index</option>
                </Form.Select>
              </Col>
            </Row>
          </Form>
            
          </>
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
