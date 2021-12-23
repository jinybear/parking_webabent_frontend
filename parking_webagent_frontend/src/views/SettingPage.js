import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';


export default function SettingPage() {
    return (
        <div>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{
                marginRight: '36px'
              }}
            >
              <MenuIcon />hello
              
            </IconButton>
        </div>
    );
}