import React from "react";

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



const Messages = (props) => {
  const [open, setOpen] = React.useState(false);



  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event) => {
    setOpen(false);
  };

  return <div>
      <Stack spacing={2} sx={{ width: '100%' }}>
      <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
         {props.message}
        </Alert>
      </Snackbar>


      {/* <Alert severity="error" onClose={handleClose} sx={{ width: '100%' }}>This is an error message!</Alert>
      <Alert severity="warning"onClose={handleClose}  sx={{ width: '100%' }} >This is a warning message!</Alert>
      <Alert severity="info" onClose={handleClose} sx={{ width: '100%' }}>This is an information message!</Alert>
      <Alert severity="success" onClose={handleClose}  sx={{ width: '100%' }}>This is a success message!</Alert>
  */}
    </Stack>
  </div>;
};

export default Messages;



