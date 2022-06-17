import React,{useState} from "react";
import {  Modal } from "react-bootstrap";
import { Button, Input ,NativeSelect} from '@mui/material';
import { useForm } from "react-hook-form";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';

const UpdateEmployee = (props) => {
  const { register,setValue , handleSubmit, formState: { errors ,isDirty, isValid } } = useForm({
    mode:"onTouched",
  });
  const [show, setShow] = useState(false);
  const [skills, setSkills] = React.useState([]);
  const [roles, setRoles] = React.useState([]);

  const AddSkill=[];
  let req:any;
  // console.log(errors)
  const onSubmit = data => {
    console.log(data);
    console.log(AddSkill);
    req = {
      id: Date.now(),
      firstname: data.firstname,
      lastName: data.lastName,
      dob: data.dob,
      employee_about: data.employee_about,
      gender: data.gender,
      role: {role:data.role},
      skills: AddSkill,
    }
    handleClose();
    UpdateEmployee(req);
  }


  
  const handleClose = () => setShow(false);
  const handleShow = () =>{
    console.log(props.employee.role.role)
    setValue("id",props.employee.id)
    setValue("firstname",props.employee.firstname)
    setValue("lastName",props.employee.lastName)
    setValue("dob",props.employee.dob)
    setValue("role",props.employee.role.role)
    setValue("gender",props.employee.gender)
    setValue("employee_about",props.employee.employee_about)
    setValue("skill",props.employee.skills[0].skill)
    setShow(true);
    skillsData();
    rolesData();
  } 

  
  function skillCheck(e){
    console.log(e.target.id);

    if (e.target.name === 'Java') {
      AddSkill.push({skill:'Java'});
    }
    else{
      for(let i = 0; i < AddSkill.length; i++){
        if(AddSkill[i] === AddSkill[i].skill && e.target.name === 'Java'){
          AddSkill.splice(i, 1);
        }
      }
    }
    if (e.target.name === 'NodeJs' ) {
      AddSkill.push({skill:'NodeJs'});
    }
    else{
      for(let i = 0; i < AddSkill.length; i++){
        if(AddSkill[i] === AddSkill[i].skill ){
          AddSkill.splice(i, 1);
        }
      }
    }
    if (e.target.name === 'React' ) {
      AddSkill.push({skill:'React'});
    }
    else{
      for(let i = 0; i < AddSkill.length; i++){
        if(AddSkill[i] === AddSkill[i].React ){
          AddSkill.splice(i, 1);
        }
      }
    }
    if (e.target.name === 'Angular' ) {
      AddSkill.push({skill:'Angular'});
    }
    else{
      for(let i = 0; i < AddSkill.length; i++){
        if(AddSkill[i] === AddSkill[i].skill ){
          AddSkill.splice(i, 1);
        }
      }
    }
    if (e.target.name === 'Android' ) {
      AddSkill.push({skill:'Angular'});
    }
    else{
      for(let i = 0; i < AddSkill.length; i++){
        if(AddSkill[i] === AddSkill[i].skill ){
          AddSkill.splice(i, 1);
        }
      }
    }

  }


  function UpdateEmployee(req) {
    axios
      .put(`http://localhost:3000/employees/${props.employee.id}`, req)
      .then((response) => {
          if(response.status===200){
          console.log("200 success"); 
          props.fetchAllRecord();
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
  }

  function skillsData() {
    axios.get(`http://localhost:3000/skills`).then((response) => {
      setSkills(response.data)
      console.log(response.data)
    });
  }

  function rolesData() {
    axios.get(`http://localhost:3000/roles`).then((response) => {
      setRoles(response.data)
      console.log(response.data)
    });
  }

  

  return (
    <div>
          <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{props.employee.firstname } Upadate Empoyee </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <Input
                  type="text"
                  className="form-control"
                  id="firstname"
                  placeholder="Enter Your First  Name"
                 {...register( "firstname",{ required: "First Name is Required",
                 pattern:{
                  value:/^[A-Za-z]+$/i,
                  message:"frist name is invaild"
                 },
                minLength:{
                  value:3,
                  message:"Enter your Minimum 3 characters"
                },
                maxLength:{
                  value:20,
                  message:"Enter your Maximum 20 characters"
                },
               })}
                />
                 {
                 errors.firstname && (
                   <div className="text-danger"> {errors.firstname.message}</div>
                 )
               }
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <Input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Enter Your Last Name"
                  {...register( "lastName",{ required: "Last Name is Required",
                  pattern:{
                    value:/^[A-Za-z]+$/i,
                    message:"Last name is invaild"
                   },
                  minLength:{
                    value:3,
                    message:"Enter your Minimum 3 characters"
                  },
                  maxLength:{
                    value:20,
                    message:"Enter your Maximum 20 characters"
                  },
                 })}
                
                  />
                   {
                   errors.lastName && (
                     <div className="text-danger"> {errors.lastName.message}</div>
                   )
                 }
                </div>
                <div className="form-group">
                  <label htmlFor="gender">
                    Choose Your Gender
                  </label>
                  <br></br>
                  <div className="form-check form-check-inline">
                    <Input
                      className="form-check-input"
                      type="radio"
                      id="male"
                      value="male"
                      {...register("gender", { required: "Gender is Required" })}
                    />
                    <label className="form-check-label" htmlFor="male">
                      male
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <Input
                      className="form-check-input"
                      type="radio"
                      id="female"
                      value="female"
                      name="gender"
                      {...register("gender", { required: "Gender is Required" })}
                    />
                    <label className="form-check-label" htmlFor="female">
                      female
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <Input
                      className="form-check-input"
                      type="radio"
                      id="other"
                      value="other"
                      {...register("gender", { required: "Gender is Required" })}
           
                    />
                    <label className="form-check-label" htmlFor="other">
                      other
                    </label>
                  </div>
                
                  {
                 errors.gender && (
                   <div className="text-danger"> {errors.gender.message}</div>
                 )
               }
               </div>
               

              <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
                <Input
                  id="dob"
                  className="form-control"
                  type="date"
                  // defaultValue="2022-06-09"
                  {...register("dob", { required: "DOB is Required" })}
                />
                 {
                 errors.dob && (
                   <div className="text-danger"> {errors.dob.message}</div>
                 )
               }
              </div>


              <div className="form-group">
                <label htmlFor="role">Choose Your Roles</label>
                <NativeSelect className="form-control" id="role" {...register("role", { required:"Role is Required" })}
           >
                  {/* <option  value="">--- Select Your Roles ---</option> */}
                  {roles.map((role) => (
                    <option   key={role.id}>{role.role}</option>
                  ))}
                </NativeSelect>
                {
                 errors.role && (
                   <div className="text-danger"> {errors.role.message}</div>
                 )
               }
              </div>

                <div className="form-group">
                <label htmlFor="employee_about">Employee About</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="employee_about"
                  placeholder="Enter Your employee about"
                  {...register( "employee_about",{ required: "Employee About is Required",
                  minLength:{
                    value:3,
                    message:"Enter your Minimum 3 characters"
                  },
                  maxLength:{
                    value:20,
                    message:"Enter your Maximum 300 characters"
                  },
                 })}        
                    />
                 {
                 errors.employee_about && (
                   <div className="text-danger"> {errors.employee_about.message}</div>
                 )
               }
              </div>
              
              <label htmlFor="skill">Skills</label>
              <div className="form-control"   >
              {skills.map((skill) => (
                    //  <input type="Checkbox" {...register("skill")} value={item.skill} name={item.skill} onChange={e => skillCheck(e)} key={index} label={item.skill} />
                    <div className="form-check" key={skill.id}>
                    <input type="Checkbox" {...register("skill")} id={skills.id} name={skill.skill} onChange={e => skillCheck(e)} />
                    <label className="form-check-label" htmlFor={skill.id}>
                    {skill.skill}
                    </label>
                  </div>
                  ))} 
              </div>
              
              <hr></hr>
           <hr></hr>
          <Button variant="contained" className="float-end mt-2" color="primary"  disabled={!isDirty || !isValid} type="submit">Update</Button>
          <Button className="me-2 float-end mt-2" variant="outlined" onClick={handleClose}>
            Close
          </Button>

                </form>
        </Modal.Body>
      
      </Modal>
    
      
      <EditIcon onClick={handleShow}/>
    </div>
  );
};


export default UpdateEmployee
