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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      <DeleteIcon onClick={handleClickOpen} />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure Want to Delete ? <b>{props.employee.firstName} {props.employee.lastName}</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={DeleteEmployee} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RemoveEmployee;
