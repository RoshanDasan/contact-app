import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ContactState {
    contact: any[];
}

const initialState: ContactState = {
    contact: []
}


export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
      setUser: (state, action: PayloadAction<{ contact: any }>) => {
        if (state.contact) {
          state.contact.push(action.payload.contact);
        } else {
          console.error("user does not exist");
        }
      },
      deleteUser: (state, action: PayloadAction<{ id: any }>) => {
        const idToDelete = action.payload.id;
        state.contact = state.contact.filter((user) => user.id !== idToDelete);
      },
      editUser: (
        state,
        action: PayloadAction<{ id: any; firstName: any; lastName: any; email: any; phone: any; status: any }>
      ) => {
        const { id, firstName, lastName,email, phone, status } = action.payload;
        const userToEdit = state.contact.find((user) => user.id === id);
        if (userToEdit) {
          userToEdit.firstName = firstName;
          userToEdit.lastName = lastName;
          userToEdit.email = email;
          userToEdit.phone = phone;
          userToEdit.status = status;
        } else {
          console.error("user does not exist");
        }
      },
    }
})


export const { setUser, deleteUser, editUser } = contactSlice.actions;
export default contactSlice.reducer;