import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button, Input, NativeSelect } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const AddEmployee = (props) => {
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "onTouched"
  });

  const [value, setValue] = useState(new Date());

  const [show, setShow] = useState(false);
  const [skills, setSkills] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  let req;
  // console.log(errors)
  const onSubmit = (data) => {
    console.log(data);

    // console.log(AddSkill);
    req = {
      id: Date.now(),
      firstName: data.firstName,
      lastName: data.lastName,
      dob: data.dob,
      employee_about: data.employee_about,
      gender: data.gender,
      role: { role: data.role },
      skills: selectedSkills
    };
    handleClose();
    createPost(req);
  };

  function createPost(req) {
    axios.post("http://localhost:3000/employees", req).then((response) => {
      console.log(response.status);
      props.fetchAllRecord();

      resetField("id");
      resetField("firstName");
      resetField("lastName");
      resetField("dob");
      resetField("role");
      resetField("gender");
      resetField("employee_about");
      resetField("skills");

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

  function skillsData() {
    axios.get(`http://localhost:3000/skills`).then((response) => {
      setSkills(response.data);
      console.log(response.data);
    });
  }

  function rolesData() {
    axios.get(`http://localhost:3000/roles`).then((response) => {
      setRoles(response.data);
      console.log(response.data);
    });
  }

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    skillsData();
    rolesData();
  };

  function skillCheck(e, skill) {
    console.log(skill);
    console.log(skills);
    let newSkills = [...selectedSkills];

    var index = selectedSkills.findIndex((o) => o.id === skill.id);
    console.log("index" + index);
    if (index === -1) {
      newSkills.push(skill);
    } else {
      newSkills.splice(index, 1);
    }

    console.log(newSkills);
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
              {/* <label htmlFor="dob">Date of Birth</label> */}
              {/* <Input
                  id="dob"
                  className="form-control"
                  type="date"
                  // defaultValue="2022-06-09"
                  {...register("dob", { required: "DOB is Required" })}
                /> */}

              <LocalizationProvider dateAdapter={AdapterDateFns}>
              <label htmlFor="dob">Date of Birth</label>
                
                <Stack spacing={3}>
                     <DesktopDatePicker
                    // label="For desktop"
                    inputFormat="dd/MM/yyyy"
                    value={value}
                    className="form-control"
                    {...register("dob", { required: "DOB is Required" })}
                    maxDate={new Date()}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>

              {errors.dob && <span> {errors.dob.message}</span>}
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
    </div>
  );
};

export default AddEmployee;
