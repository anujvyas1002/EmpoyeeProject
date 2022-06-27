import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button
} from "@mui/material";

const RemoveEmployee = (props) => {
  const [open, setOpen] = React.useState(false);

  //conformation box open
  const handleClickOpen = () => {
    setOpen(true);
  };

  //conformation box Close
  const handleClose = () => {
    setOpen(false);
  };

  // Delete Employee Delete Api Call
  function DeleteEmployee() {
    axios
      .delete(`http://localhost:3000/employees/${props.employee.id}`)
      .then((response) => {
        if (response.status === 200) {
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

  return (
    <div>
      {/* Delete Icon */}
      <DeleteIcon onClick={handleClickOpen} />

      {/* conformation Box */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure want to delete {" "}
            <b>
              {props.employee.firstName} {props.employee.lastName} ?
            </b> 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={DeleteEmployee} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RemoveEmployee;
