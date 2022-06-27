import EmployeeContext from "./employeeContext";
import { useState } from "react";
import axios from "axios";

const EmployeeState = (props) => {
  const host = "http://localhost:3000/employees"
  const notesInitial = []
  const [employees, setEmployees] = useState(notesInitial)

  console.log(employees)



  // Get all Notes
  function fetchAllRecord() {
    axios.get(`${host}`).then((response) => {
      setEmployees(response.data);
    });
  }


  // Add a Note
  function CreateEmployee(req) {
    axios.post(`${host}`, req).then((response) => {
      console.log(response)
      if (response.status === 200) {
        console.log("200 success");
      } else if (response.status === 201) {
        console.log("201 Created");
      } else if (response.status === 400) {
        console.log("400 Bad Request");
      } else if (response.status === 404) {
        console.log("404 Not Found");
      } else if (response.status === 500) {
        console.log("500 Internal Server Error");
      } else {
        console.log("other error");
      }
    });
  }

  // Delete a Note
 
  function DeleteEmployee() {
    axios
      .delete(`${host}/${employees.id}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("200 success");
          props.fetchAllRecord();
        } else if (response.status === 201) {
          console.log("201 Created");
        } else if (response.status === 400) {
          console.log("400 Bad Request");
        } else if (response.status === 404) {
          console.log("404 Not Found");
        } else if (response.status === 500) {
          console.log("500 Internal Server Error");
        } else {
          console.log("other error");
        }
      });
  }


  function UpdateEmployee(req) {
    axios
      .put(`${host}/${props.employee.id}`, req)
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          console.log("200 success");
          props.fetchAllRecord();
        } else if (response.status === 201) {
          console.log("201 Created");
        } else if (response.status === 400) {
          console.log("400 Bad Request");
        } else if (response.status === 404) {
          console.log("404 Not Found");
        } else if (response.status === 500) {
          console.log("500 Internal Server Error");
        } else {
          console.log("other error");
        }
      });
  }


  return (
    <EmployeeContext.Provider value={{ employees, CreateEmployee, DeleteEmployee, UpdateEmployee, fetchAllRecord }}>
      {props.children}
    </EmployeeContext.Provider>
  )

}
export default EmployeeState;