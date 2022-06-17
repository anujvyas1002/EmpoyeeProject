

import React,{useState} from 'react'
import axios from "axios";
import AddEmployee from "./AddEmployee";
import UpdateEmployee from "./UpdateEmployee";
import RemoveEmployee from "./RemoveEmployee";
import SearchEmployee from "./SearchEmployee";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
// import {EditIcon} from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';


const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchApiData,setSearchApiData]=useState([]);
  const [filterVal, setFilterVal]=useState();


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
        fetchAllRecord();
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

  function fetchAllRecord() {
    axios.get(`http://localhost:3000/employees`).then((response) => {
      setEmployees(response.data);
      console.log(response.data)
      setSearchApiData(response.data)
      console.log("anuj"+response.data[0].skills[0].skill)
    });
  }

  const handleFilter = (e) =>{
    if(e.target.value===''){
      setEmployees(searchApiData);
    }

    else{
      const filterResult = searchApiData.filter(item=>item.firstname.toLowerCase().includes(e.target.value.toLowerCase()))
      setEmployees(filterResult);
    }

    setFilterVal(e.target.value);
  }


  return (
    <div>
      <div className="container">
        <input placeholder="Search" value={filterVal} onChange={(e)=>handleFilter(e)}/>
      <SearchEmployee/>
  <AddEmployee fetchAllRecord={fetchAllRecord}/>
    <hr></hr>
  <Paper sx={{ width: '100%', mb: 2 }}>
    
  <TableContainer>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell >First Name</TableCell>
            <TableCell >Last Name</TableCell>
            <TableCell >DOB</TableCell>
            <TableCell >Gender</TableCell>
            <TableCell >Role</TableCell>
            <TableCell >Skills</TableCell>
            <TableCell > About</TableCell>
            <TableCell >Actions</TableCell>
          </TableRow>
        </TableHead>
    <TableBody>
            {
              employees
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((employee,index)=>
        (
            <TableRow
              key={employee.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell  >{employee.firstname}</TableCell>
              <TableCell >{employee.lastName}</TableCell>
              <TableCell >{employee.dob}</TableCell>
              <TableCell >{employee.gender}</TableCell>
              <TableCell >{employee.role.role}</TableCell>
                <TableCell >
{
employee.skills.map((skill,index)=>
                (
                  <div key={index}>{skill.skill}</div>
                  
                ))}
                  </TableCell>

              
                <TableCell >{employee.employee_about}</TableCell>
                <TableCell >
                <UpdateEmployee  employee={employee}  fetchAllRecord={fetchAllRecord} />
                <RemoveEmployee employeeID={employee.id} fetchAllRecord={fetchAllRecord}/>
                {/* <DeleteIcon />
                <EditIcon /> */}

     
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
