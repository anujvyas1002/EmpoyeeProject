import React from 'react'
import axios from "axios";
import AddEmployee from "./AddEmployee";
import UpdateEmployee from "./UpdateEmployee";
import RemoveEmployee from "./RemoveEmployee";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';




const EmployeeTable = () => {

  const [employees, setEmployees] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


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
    });
  }



  return (
    <div>
      <div className="container">
  <AddEmployee FatchAllRecord={FatchAllRecord}/>
  <hr></hr>
  <Paper sx={{ width: '100%', mb: 2 }}>
    
  <TableContainer>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Firstname</TableCell>
            <TableCell align="right">LastName</TableCell>
            <TableCell align="right">DOB</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Skill</TableCell>
            <TableCell align="right">Employee About</TableCell>
            <TableCell align="right">Actions</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {
        employees.map((employee)=>
        (
            <TableRow
              key={employee.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >
              {employee.firstname}
              </TableCell>
              <TableCell align="right">{employee.lastName}</TableCell>
              <TableCell align="right">{employee.dob}</TableCell>
              <TableCell align="right">{employee.gender}</TableCell>
              <TableCell align="right">{employee.role.role}</TableCell>

                    {
                employee.skills.map((skill,index)=>
                (
               
                <TableCell  key={index}>{skill.skill}</TableCell>

                ))}
                <TableCell align="right">{employee.employee_about}</TableCell>
                <TableCell align="right">
                <UpdateEmployee  employee={employee}  FatchAllRecord={FatchAllRecord} />
                <RemoveEmployee employeeID={employee.id} FatchAllRecord={FatchAllRecord}/>
     
                    </TableCell>
            </TableRow>
        ))}

        
                </TableBody>
            </Table>
    </TableContainer>
    <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={employees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      
    </Paper>
 
     
   </div>
    </div>
  )
}

export default EmployeeTable
