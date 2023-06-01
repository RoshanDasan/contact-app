import * as React from 'react';
import {useState} from 'react'
import Box, { BoxProps } from '@mui/material/Box';
import { Button } from '@mui/material';
import UserTable from '../components/body/UserTable';
import AddContact from '../components/body/AddContact';

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

export default function Contact() {
    const [ display, setDisplay ] = useState(true)

    const handleViewContact = () => {
        console.log('view-contact')
        setDisplay(true)
    }
    const handleCreateContact = () => {
        console.log('create-contact')
        setDisplay(false)
    }
  return (
    <div style={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        <Button onClick={handleViewContact}>view contact</Button>
        <Button onClick={handleCreateContact}>add contact</Button>
      </Box>  

        {display?(
        <UserTable />

        ):(
          <AddContact />
        )}

    </div>
  );
}