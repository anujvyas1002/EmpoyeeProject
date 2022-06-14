import React,{useState} from "react";
import {  Modal } from "react-bootstrap";
import { Button, Input ,NativeSelect} from '@mui/material';
import { useForm } from "react-hook-form";
import axios from "axios";

const AddEmployee = (props) => {
  
  const { register,resetField, handleSubmit, formState: { errors } } = useForm({
    mode:"onTouched"
  });
  const [show, setShow] = useState(false);
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
      employee_about: data.employee,
      gender: data.gender,
      role: {role:data.role},
      skills: AddSkill,
    }
    handleClose();
    createPost(req);
  }



  

  function createPost(req) {
    axios
      .post('http://localhost:3000/employees', req )
      .then((response) => {
        
        console.log(response.status)
        props.FatchAllRecord();

        resetField("id")
        resetField("firstname")
        resetField("lastName")
        resetField("dob")
        resetField("role")
        resetField("gender")
        resetField("employee_about")
        resetField("skills")

        if(response.status===200){
          console.log("200 success");
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


  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const Roles = [
    {  role: "Developer" },
    {  role: "Tester" },
    {  role: "Manager" },
    {  role: "Team Leader" },
  ];
  

  function skillCheck(e){
    console.log(e.target.value);

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

  const Skills = [
    { id: 1, skill: "Java" },
    { id: 2, skill: "NodeJs" },
    { id: 3, skill: "React" },
    { id: 4, skill: "Angular" },
    { id: 5, skill: "Android" },
  ];

  

  return (
    <div>
    
      <div className="container">
        <Button className="mt-2"  variant="contained" color="primary" onClick={handleShow}>Add Employee</Button>
        
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Empoyee</Modal.Title>
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
                  message:"Frist name is invaild"
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
                  <option  value="">--- Select Your Roles ---</option>
                  {Roles.map((item,index) => (
                    <option  key={index}>{item.role}</option>
                  ))}
                </NativeSelect>
                {
                 errors.role && (
                   <div className="text-danger"> {errors.role.message}</div>
                 )
               }
              </div>

                <div className="form-group">
                <label htmlFor="employee">Employee About</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="employee"
                  placeholder="Enter Your employee"
                  {...register( "employee",{ required: "Employee About is Required",
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
                 errors.employee && (
                   <div className="text-danger"> {errors.employee.message}</div>
                 )
               }
              </div>
              
              <label htmlFor="skill">Skills</label>
              <div className="form-control"   >
              {Skills.map((employee) => (
                    //  <input type="Checkbox" {...register("skill")} value={item.skill} name={item.skill} onChange={e => skillCheck(e)} key={index} label={item.skill} />
                    <div className="form-check" key={employee.id}>
                    <input type="Checkbox" {...register("skill")} id={employee.skill} name={employee.skill} onChange={e => skillCheck(e)} />
                    <label className="form-check-label" htmlFor={employee.skill}  >
                    {employee.skill}
                    </label>
                  </div>
                  ))} 
              </div>
              
              <hr></hr>
          <Button variant="contained" className="float-end mt-2" color="primary"  type="submit">Create</Button>
          <Button className="me-2 float-end mt-2" variant="outlined" onClick={handleClose}>
            Close
          </Button>

                </form>
        </Modal.Body> 
        
      </Modal>
     
      </div>
    </div>
  );
};

export default AddEmployee;
