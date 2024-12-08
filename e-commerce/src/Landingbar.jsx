import React from 'react';
import { Button, Typography,} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Landingbar = () => {
  const Navigate = useNavigate();
  const handleSignin = () => {
    Navigate('/signin');
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h6" component="h2">
        Shopping Cart
      </Typography>
      <div>
        <Button variant="outlined" onClick={handleSignin}>
          Login
        </Button>
      </div>
    </div>
  );
}


export default Landingbar;
