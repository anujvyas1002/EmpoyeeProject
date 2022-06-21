import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button, Input, NativeSelect } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";


const UpdateEmployee = (props) => {
  const {
    register,
    setValue,
    handleSubmit,
    resetField,
    formState: { errors, isDirty, isValid }
  } = useForm({
    mode: "onTouched"
  });
  const [show, setShow] = useState(false);
  const [skills, setSkills] = React.useState([]);
  const [roles, setRoles] = React.useState([]);
  const [selectedSkills, setSelectedSkills] = useState(props.employee.skills);
 
  
  const [selectedDate, setSelectedDate] = useState(new Date());


  let req;
  // console.log(errors)
  const onSubmit = (data) => {
    console.log(data);
   
   
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
    UpdateEmployee(req);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    console.log(props.employee.role.role);
    setValue("id", props.employee.id);
    setValue("firstName", props.employee.firstName);
    setValue("lastName", props.employee.lastName);
    setValue("dob", props.employee.dob);
    setValue("role", props.employee.role.role);
    setValue("gender", props.employee.gender);
    setValue("employee_about", props.employee.employee_about);
   
    console.log(selectedSkills);
   
    setShow(true);
    skillsData();
    rolesData();
  };

  function skillCheck(e,skill) {
    console.log(e.target.id);
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

  function UpdateEmployee(req) {
    axios
      .put(`http://localhost:3000/employees/${props.employee.id}`, req)
      .then((response) => {
        if (response.status === 200) {
          resetField("skills");
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

  function skillsData() {
    axios.get(`http://localhost:3000/skills`).then((response) => {
      setSkills(response.data);
      // console.log(response.data[0].skill);
      
    });
  }

  function rolesData() {
    axios.get(`http://localhost:3000/roles`).then((response) => {
      setRoles(response.data);
      console.log(response.data);
    });
  }

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.employee.firstName} Upadate Empoyee </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                    message: "frist name is invaild"
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
                    value={selectedDate}
                    className="form-control"
                    {...register("dob", { required: "DOB is Required" })}
                    maxDate={new Date()}
                    onChange={(newValue) => {
                      setSelectedDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>

              {errors.dob && <span className="text-danger"> {errors.dob.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="role">Choose Your Roles</label>
              <NativeSelect
                className="form-control"
                id="role"
                {...register("role", { required: "Role is Required" })}
              >
                {/* <option  value="">--- Select Your Roles ---</option> */}
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
                placeholder="Enter Your employee about"
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
                  {" "}
                  {errors.employee_about.message}
                </div>
              )}
            </div>

            {/* <label htmlFor="skill">Skills</label>
            <div className="form-control">
              {skills.map((skill) => (
                //  <input type="Checkbox" {...register("skill")} value={item.skill} name={item.skill} onChange={e => skillCheck(e)} key={index} label={item.skill} />
                <div className="form-check" key={skill.id}>
                  <input
                    type="Checkbox"
                    {...register("skill")}
                    id={skills.id}
                    name={skill.skill}
                    onChange={(e) => skillCheck(e)}
                  />
                  <label className="form-check-label" htmlFor={skill.id}>
                    {skill.skill}
                  </label>
                </div>
              ))}
            </div> */}

      <label htmlFor="skills">Skills</label>
            <div className="form-control">
              {skills.map((skill) => (
                <div className="form-check" key={skill.id}>
                  <input
                    type="Checkbox"
                    {...register("skills", { required: true })}
                    id={skill.id}
                    name="skills"
                    value="skills"
                    checked={selectedSkills.findIndex(o => o.id === skill.id)!==-1}
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

            <hr/>
            <Button
              variant="contained"
              className="float-end mt-2"
              color="primary"
              disabled={!isDirty || !isValid}
              type="submit"
            >
              Update
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

      <EditIcon onClick={handleShow} />
    </div>
  );
};

export default UpdateEmployee;
