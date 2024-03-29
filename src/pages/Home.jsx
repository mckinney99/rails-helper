import React from "react";
import Navigation from '../components/Navigation'
import {Button} from "react-bootstrap";
import ColumnForm from "../components/ColumnForm"
import TableForm from "../components/TableForm"
import ActionForm from "../components/ActionForm"
import Footer from "../components/Footer"

export default function Home() {
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

  const handleAddColumnClick = () => {
    let newcolumn = { columnName: '', columnType: '' }
    setColumnFields([...columnFields, newcolumn])
  };

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

  const handleResult = () => {
    let firstColumn = () => {
      if (typeof columnFields[0] === "undefined") {
        return ""
      } else if (columnFields.length > 1){
        return "columns"
      } else {
        return convertToSnakeCase(columnFields[0].columnName)
      }
    }

    if (formData.tableType === 'create-table') {
      let result = `rails g migration create_${convertToSnakeCase(formData.tableName)}`
      return result
    } else if (formData.tableType === 'add-column') {
      let result = `rails g migration add_${firstColumn()}_to_${convertToSnakeCase(formData.tableName)}`
      return result
    } else if (formData.tableType === 'create-join') {
      let result = `rails g create-join ${convertToSnakeCase(formData.tableName)}`
      return result
    } else if (formData.tableType === 'remove-column') {
      let result = `rails g migration remove_${firstColumn()}_from_${convertToSnakeCase(formData.tableName)}`
      return result
    } else if (formData.tableType === 'create-table-and-model') {
      let result = `rails g model ${convertToSnakeCase(formData.tableName)}`
      return result
    } else if (formData.tableType === 'create-controller') {
      let result = `rails g controller ${convertToSnakeCase(formData.tableName)}`
      return result
    } else if (formData.tableType === 'create-scaffold') {
      let result = `rails g scaffold ${convertToSnakeCase(formData.tableName)}`
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
    
    if (columnFields.length >= 1) {
      for (let i=0; i<columnFields.length; i++) {
        let semiColon = isColumn(columnFields[i]) ? ":" : ""
        let snake_case = convertToSnakeCase(columnFields[i].columnName)
        fields.push(snake_case + semiColon + columnFields[i].columnType)
      }
      let newFields = fields.toString().split(',').join(' ')
      return newFields
    } else {
      return ""
    }
  }

  function convertToSnakeCase(str) {
    // Replace uppercase letters with underscore followed by lowercase
    const snakeCaseStr = str.replace(/([a-z])([A-Z])/g, '$1_$2');
  
    // Convert the string to lowercase
    return snakeCaseStr.toLowerCase();
  }
  

  const result = handleResult() + " " + (formData.tableType === 'create-controller' ? handleActions() : handleColumns())

  return (
    <div>
      <Navigation/>

      <div className="main">

        <TableForm 
          tableName={formData.tableName}
          tableType={formData.tableType}
          handleChange={handleChange}
          handlePlaceHolder={handlePlaceHolder}
        />

        <ColumnForm 
          tableType={formData.tableType}
          columnFields={columnFields}
          setColumnFields={setColumnFields}
        />

        <ActionForm 
          tableType={formData.tableType}
          actionFields={actionFields}
          setActionFields={setActionFields}
        />

        {formData.tableType !== 'create-controller' &&
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
        <Footer/>
      </div>
    </div>
  );
}
