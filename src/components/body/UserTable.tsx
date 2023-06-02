import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Box, Modal, Typography } from '@mui/material';
import { deleteUser, editUser } from '../../state/stateManage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function UserTable() {
  const userData = useSelector((state: any) => state.contact);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false); // state for modal open
  const [users, setUsers] = useState([]); // state for set user in users to loop
  const [editUsers, setEditUser] = useState({ 
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    status: '',
  }); // state for get the user for update

  // function for handle delete operation of contact
  const handleDelete = (id: any) => {
    dispatch(deleteUser({ id }));
    toast.success('User deleted successfully');
  };

  // function for controll modal
  const handleOpen = (id: any) => {
    const user: any = userData.find((user: any) => user.id === id);
    setEditUser(user);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // useEffect hook for insert user in state
  useEffect(() => {
    setUsers(userData);
  }, [userData]);



  // submit function for handle edit contact
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { id, firstName, lastName, email, phone, status } = editUsers;

    setOpen(false);
    console.log(editUsers);

    // dispatch user for edit
    dispatch(
      editUser({
        id,
        firstName,
        lastName,
        email,
        phone,
        status,
      })
    );
    toast.success('User edit successfully');
  };

  return (
    <>
      <ToastContainer />
      {users.length === 0 ? (
        <Typography textAlign={'center'} color={'blue'}>
          No contact added.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>First name</TableCell>
                <TableCell>Second Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user: any) => (
                <TableRow
                  key={user.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  {user.status === 'active' ? (
                    <TableCell sx={{ color: 'green' }}>{user.status}</TableCell>
                  ) : (
                    <TableCell sx={{ color: 'red' }}>{user.status}</TableCell>
                  )}
                  <TableCell>
                    <Button color="primary" onClick={() => handleOpen(user.id)}>
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button color="warning" onClick={() => handleDelete(user.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* modal section for edit */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="container">
                <form className="form" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="inputField"
                    name="firstName"
                    value={editUsers.firstName}
                    onChange={(e) =>
                      setEditUser({ ...editUsers, firstName: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="inputField"
                    name="lastName"
                    value={editUsers.lastName}
                    onChange={(e) => setEditUser({ ...editUsers, lastName: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Email"
                    className="inputField"
                    name="email"
                    value={editUsers.email}
                    onChange={(e) => setEditUser({ ...editUsers, email: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    className="inputField"
                    name="phone"
                    value={editUsers.phone}
                    onChange={(e) => setEditUser({ ...editUsers, phone: e.target.value })}
                  />
                  <div className="radioGroup">
                    <label>
                      <input
                        type="radio"
                        name="status"
                        value="active"
                        checked={editUsers.status === 'active'}
                        onChange={() => setEditUser({ ...editUsers, status: 'active' })}
                      />
                      Active
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="status"
                        value="inactive"
                        checked={editUsers.status === 'inactive'}
                        onChange={() => setEditUser({ ...editUsers, status: 'inactive' })}
                      />
                      Inactive
                    </label>
                  </div>
                  <button type="submit" className="submitButton">
                    Submit
                  </button>
                </form>
              </div>
            </Box>
          </Modal>
        </TableContainer>
      )}
    </>
  );
}
