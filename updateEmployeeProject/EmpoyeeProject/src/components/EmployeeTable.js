import React, { useState } from "react";
import axios from "axios";
import AddEmployee from "./AddEmployee";
import UpdateEmployee from "./UpdateEmployee";
import RemoveEmployee from "./RemoveEmployee";
import SearchEmployee from "./SearchEmployee";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
  Button,
  Input
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchApiData, setSearchApiData] = useState();
  const [filterVal, setFilterVal] = useState();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    axios.get(`http://localhost:3000/employees`).then((response) => {
      if (response.status === 200) {
        console.log("200 success");
        fetchAllRecord();
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
  }, []);

  function fetchAllRecord() {
    axios.get(`http://localhost:3000/employees`).then((response) => {
      setEmployees(response.data);
      setSearchApiData(response.data);
    });
  }

  const filterSkills = (e, skills) => {
    return skills.some((skill) => skill.skill.toLowerCase().includes(e));
  };

  const handleFilter = (e) => {
    if (e.target.value === "") {
      setEmployees(searchApiData);
    } else {
      const filterResult = searchApiData.filter((item) => {
        return (
          item.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.lastName.toLowerCase().includes(e.target.value.toLowerCase()) ||
          filterSkills(e.target.value.toLowerCase(), item.skills) ||
          item.role.role.toLowerCase().includes(e.target.value.toLowerCase())
        );
      });
      setEmployees(filterResult);
    }
    setFilterVal(e.target.value);
  };

  return (
    <div>
      <div>
        <div className="float-end mt-3">
          <Input
            placeholder="Search"
            value={filterVal || ""}
            onChange={(e) => handleFilter(e)}
          />
          <Button>
            <SearchOutlinedIcon />
          </Button>
        </div>
        <SearchEmployee />
        <div>
          <AddEmployee fetchAllRecord={fetchAllRecord} />
        </div>
        <hr />
        <Paper sx={{ width: "100%", mb: 0 }}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              className="table table-striped table-hover"
              size="small"
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>DOB</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Skills</TableCell>
                  <TableCell> About</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((employee) => (
                    <TableRow
                      key={employee.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{employee.firstName}</TableCell>
                      <TableCell>{employee.lastName}</TableCell>
                      <TableCell>{employee.dob}</TableCell>
                      <TableCell>{employee.gender}</TableCell>
                      <TableCell>{employee.role.role}</TableCell>
                      <TableCell>
                        {employee.skills.map((skill, index) => (
                          <div key={index}>{skill.skill}</div>
                        ))}
                      </TableCell>
                      <TableCell>{employee.employee_about}</TableCell>
                      <TableCell>
                        <IconButton color="primary">
                          <UpdateEmployee
                            employee={employee}
                            fetchAllRecord={fetchAllRecord}
                          />
                        </IconButton>
                        <IconButton color="error">
                          <RemoveEmployee
                            employee={employee}
                            fetchAllRecord={fetchAllRecord}
                          />
                        </IconButton>
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
  );
};

export default EmployeeTable;
