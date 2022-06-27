import React, { useContext, useEffect, useState } from 'react'
import noteContext from "../context/employees/employeeContext"
import { Modal } from "react-bootstrap";
import { Button, Input, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import EditIcon from "@mui/icons-material/Edit";
import EmployeeTable from './EmployeeTable';


const UpdateEmployee = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "onTouched"
  });


 

    const context = useContext(noteContext);
    const { employees, fetchAllRecord, UpadteEmployee } = context;
   
    useEffect(() => {
      fetchAllRecord()
        // eslint-disable-next-line
    }, [])

  // Modal state
  const [show, setShow] = useState(false);

  // SelectedDate mantain
  const [selectedDate, setSelectedDate] = useState();
  
  
// date format
  function formatDate(timestamp){
    var x= new Date(timestamp);
    var DD = x.getDate();
    var MM = x.getMonth()+1;
    var YYYY = x.getFullYear();
    return YYYY +"/" + MM+"/" + DD;
   
 }
 
 //data send for object
  let req;

  //from data
  const onSubmit = (data) => {
    req = {
      id: Date.now(),
      firstName: data.firstName,
      lastName: data.lastName,
      dob: formatDate(selectedDate),
      employee_about: data.employee_about,
      gender: data.gender,
    };
    handleClose();
    UpadteEmployee(req);
  };

 


 
 //Modal popup close
  const handleClose = () => setShow(false);

  //Modal popup show
  const handleShow = () => {
    setShow(true);
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Empoyee</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <Input
                type="text"
                className="form-control"
                id="firstName"
                placeholder="Enter Your First  Name"
                {...register("firstName", {
                  required: "First Name is Required",
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "Frist name is invaild"
                  },
                  minLength: {
                    value: 3,
                    message: "Enter your Minimum 3 characters"
                  },
                  maxLength: {
                    value: 20,
                    message: "Enter your Maximum 20 characters"
                  }
                })}
              />
              {errors.firstName && (
                <div className="text-danger"> {errors.firstName.message}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <Input
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Enter Your Last Name"
                {...register("lastName", {
                  required: "Last Name is Required",
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "Last name is invaild"
                  },
                  minLength: {
                    value: 3,
                    message: "Enter your Minimum 3 characters"
                  },
                  maxLength: {
                    value: 20,
                    message: "Enter your Maximum 20 characters"
                  }
                })}
              />
              {errors.lastName && (
                <div className="text-danger"> {errors.lastName.message}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="gender">Choose Your Gender</label>
              <br></br>
              <div className="form-check form-check-inline">
                <Input
                  className="form-check-input"
                  type="radio"
                  id="male"
                  value="Male"
                  {...register("gender", { required: "Gender is Required" })}
                />
                <label className="form-check-label" htmlFor="male">
                  Male
                </label>
              </div>
              <div className="form-check form-check-inline">
                <Input
                  className="form-check-input"
                  type="radio"
                  id="female"
                  value="Female"
                  name="gender"
                  {...register("gender", { required: "Gender is Required" })}
                />
                <label className="form-check-label" htmlFor="female">
                  Female
                </label>
              </div>
              <div className="form-check form-check-inline">
                <Input
                  className="form-check-input"
                  type="radio"
                  id="other"
                  value="Other"
                  {...register("gender", { required: "Gender is Required" })}
                />
                <label className="form-check-label" htmlFor="other">
                  Other
                </label>
              </div>

              {errors.gender && (
                <div className="text-danger"> {errors.gender.message}</div>
              )}
            </div>

          
             <div className="form-group">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <label htmlFor="dob">Date of Birth</label>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    // label="For desktop"
                    inputFormat="dd/MM/yyyy"
                    className="form-control"
                    value={selectedDate}
                    {...register("dob", { required: "DOB is Required" })}
                    onChange={(newValue) => {
                      setSelectedDate(newValue);
                    }}
                    maxDate={new Date()}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>

              {errors.dob && (
                <span className="text-danger"> {errors.dob.message}</span>
              )}
            </div> 

            {/* <div className="form-group">
              <label htmlFor="role">Choose Your Roles</label>
              <NativeSelect
                className="form-control"
                id="role"
                {...register("role", { required: "Role is Required" })}
              >
                <option value="">--- Select Your Roles ---</option>
                {roles.map((role) => (
                  <option key={role.id}>{role.role}</option>
                ))}
              </NativeSelect>
              {errors.role && (
                <div className="text-danger"> {errors.role.message}</div>
              )}
            </div> */}

            <div className="form-group">
              <label htmlFor="employee_about">Employee About</label>
              <textarea
                type="text"
                className="form-control"
                id="employee_about"
                placeholder="Enter Your employee"
                {...register("employee_about", {
                  required: "Employee About is Required",
                  minLength: {
                    value: 3,
                    message: "Enter your Minimum 3 characters"
                  },
                  maxLength: {
                    value: 300,
                    message: "Enter your Maximum 300 characters"
                  }
                })}
              />
              {errors.employee_about && (
                <div className="text-danger">
                  {errors.employee_about.message}
                </div>
              )}
            </div>

            {/* <label htmlFor="skills">Skills</label>
            <div className="form-control">
              {skills.map((skill) => (
                <div className="form-check" key={skill.id}>
                  <input
                    type="Checkbox"
                    {...register("skills", { required: true })}
                    id={skill.id}
                    name="skills"
                    value={skill}
                    onChange={(e) => skillCheck(e, skill)}
                  />
                  <label className="form-check-label" htmlFor={skill.id}>
                    {skill.skill}
                  </label>
                </div>
              ))}

              {selectedSkills.length < 1 &&
                errors.skills?.type === "required" && (
                  <div className="text-danger">Enter your Minimum 1 Skills</div>
                )}
            </div> */}

            <hr></hr>
            <Button
              variant="contained"
              className="float-end mt-2"
              color="primary"
              type="submit"
            >
              Create
            </Button>
            <Button
              className="me-2 float-end mt-2"
              variant="outlined"
              onClick={handleClose}
            >
              Close
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      <div className="row my-3">
                <h2>Employees</h2>
                <div className="container mx-2"> 
                {employees.length===0 && 'No Employees to display'}
                </div>
                {employees.map((employee) => {
                    return <EmployeeTable key={employee.id}  employee={employee} />
                })}
            </div>
    </div>
  );
};

export default UpdateEmployee;
