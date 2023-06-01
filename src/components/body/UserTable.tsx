import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import {useState, useEffect} from 'react'
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../state/stateManage';


export default function UserTable() {
  const [users, setUsers] = useState([])
  const userData = useSelector((state:any) => state.contact)
  const dispatch = useDispatch()

  const handleDelete = (id: string) => {
    dispatch(deleteUser({
      id
    }))
  }


useEffect(() => {
  setUsers(userData)
  
},[handleDelete])



  

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >First name</TableCell>
            <TableCell >Second Name</TableCell>
            <TableCell >Status</TableCell>
            <TableCell >Actions</TableCell>
            <TableCell ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user: any) => (
            <TableRow
              key={user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
             
              <TableCell >{user.firstName}</TableCell>
              <TableCell >{user.lastName}</TableCell>
              {user.status == 'active'? <TableCell sx={{color: 'green'}}>{user.status}</TableCell> : <TableCell sx={{color: 'red'}}>{user.status}</TableCell>}
              
              <Button color='primary'>Edit</Button>
              <Button color='warning' onClick={() => handleDelete(user.id)}>Delete</Button>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
