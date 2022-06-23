import React from "react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const Loaders = () => {
  const [loaderOpen, setLoaderOpen] = React.useState(false);
  const loaderClose = () => {
    setLoaderOpen(false);
  };
  const loaderOn = () => {
    setLoaderOpen(!loaderOpen);
  };
  return <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loaderOpen}
        onClick={loaderClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
  </div>;
};

export default Loaders;


