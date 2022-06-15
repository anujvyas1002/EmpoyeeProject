import React from 'react'
import axios from "axios";
import AddEmployee from "./AddEmployee";
import UpdateEmployee from "./UpdateEmployee";
import RemoveEmployee from "./RemoveEmployee";

const EmployeeTable = () => {

  const [employees, setEmployees] = React.useState([]);

  React.useEffect(() => {
    axios.get(`http://localhost:3000/employees`).then((response) => {
      console.log(response.data)
      
      if(response.status===200){
        console.log("200 success");
        FatchAllRecord();
      }
      else if(response.status===201){
        console.log("201 Created");
      }
      else if(response.status===400){
        console.log("400 Bad Request"); 
      }
      else if(response.status===404){
        console.log("404 Not Found"); 
      }
      else if(response.status===500){
        console.log("500 Internal Server Error");
      }
      else{
        console.log("other error");
      }
    });
  }, []);

  function FatchAllRecord() {
    axios.get(`http://localhost:3000/employees`).then((response) => {
      setEmployees(response.data);
      console.log(response.data)
      console.log("anuj"+response.data.skills)
      
    });
  }

 


  return (
    <div>
      <div className="container">
  <AddEmployee FatchAllRecord={FatchAllRecord}/>
  <hr></hr>
 <table className="table">
  <thead>
    <tr>
   
      <th scope="col">Firstname</th>
      <th scope="col">LastName</th>
      <th scope="col">DOB</th>
      <th scope="col">Gender</th>
      
      <th scope="col">Role</th>
      <th scope="col">Skill</th>
      <th scope="col">Employee About</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
      
        {employees
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((employee) => {
        (
          <tr key={employee.id}>
          <td>{employee.firstname}</td>
          <td>{employee.lastName}</td>
          <td>{employee.dob}</td>
          <td>{employee.gender}</td>
          <td>{employee.role.role}</td>
          {
        employee.skills.map((skill,index)=>
        (
          <td key={index}>{skill.skill}</td>
        ))}
          
          <td>{employee.employee_about}</td>
          <td>
            <UpdateEmployee  employee={employee}  FatchAllRecord={FatchAllRecord} />
            <RemoveEmployee employeeID={employee.id} FatchAllRecord={FatchAllRecord}/>
          </td>
         </tr> 
        )})
      }    
  </tbody>
</table>
</div>
    </div>
  )
}

export default EmployeeTable
