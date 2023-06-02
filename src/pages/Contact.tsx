import {useState} from 'react'
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import UserTable from '../components/body/UserTable';
import AddContact from '../components/body/AddContact';


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