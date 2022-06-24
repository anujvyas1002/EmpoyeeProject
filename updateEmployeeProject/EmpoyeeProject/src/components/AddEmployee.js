import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button, Input, NativeSelect, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import Loaders from "./Loaders";

const AddEmployee = (props) => {
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "onTouched"
  });

  // Modal state
  const [show, setShow] = useState(false);

  //skills get state
  const [skills, setSkills] = useState([]);

  // roles get state
  const [roles, setRoles] = useState([]);

  // selected Skill mantain state
  const [selectedSkills, setSelectedSkills] = useState([]);

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
      role: { role: data.role },
      skills: selectedSkills
    };
    handleClose();
    createEmployee(req);
  };

  //createEmployee Data send Api Call & reset input filed
  function createEmployee(req) {
    axios.post("http://localhost:3000/employees", req).then((response) => {
      console.log(response)
      props.fetchAllRecord();
      resetField("id");
      resetField("firstName");
      resetField("lastName");
      resetField("dob");
      resetField("role");
      resetField("gender");
      resetField("employee_about");
      resetField("skills")
      resetField("selectedSkills");
      resetField("setSelectedSkills");

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

 //skill data get Api call
  function skillsData() {
    axios.get(`http://localhost:3000/skills`).then((response) => {
      setSkills(response.data);
    });
  }

  //Role data get Api call
  function rolesData() {
    axios.get(`http://localhost:3000/roles`).then((response) => {
      setRoles(response.data);
    });
  }

 //Modal popup close
  const handleClose = () => setShow(false);

  //Modal popup show
  const handleShow = () => {
    setShow(true);
    skillsData();
    rolesData();
  };

  // Skillls Input filed condition
  function skillCheck(e, skill) {
    let newSkills = [...selectedSkills];
    var index = selectedSkills.findIndex((o) => o.id === skill.id);
    if (index === -1) {
      newSkills.push(skill);
    } else {
      newSkills.splice(index, 1);
    }
    setSelectedSkills(newSkills);
  }

  return (
    <div>
      <Button
        className="mt-2"
        variant="contained"
        color="primary"
        onClick={handleShow}
      >
        Add Employee
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Empoyee</Modal.Title>
        </Modal.Header>
        <Modal.Body className="overflow-auto p-2" style={{ height: "500px" }}>
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

            <div className="form-group">
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
            </div>

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

            <label htmlFor="skills">Skills</label>
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
            </div>

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

      {/* Loader */}
      {/* <Loaders /> */}

    </div>
  );
};

export default AddEmployee;
