import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// setting up interface for reducer data
interface ContactState {
    contact: any[];
}

// setting up the initial state of the redux data
const initialState: ContactState = {
    contact: []
}

// slice for creating redux state
export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {

      // reducer for inserting data into state
      setUser: (state, action: PayloadAction<{ contact: any }>) => {
        if (state.contact) {
          state.contact.push(action.payload.contact);
        } else {
          console.error("user does not exist");
        }
      },

      // reducer for delete contact from state
      deleteUser: (state, action: PayloadAction<{ id: any }>) => {
        const idToDelete = action.payload.id;
        state.contact = state.contact.filter((user) => user.id !== idToDelete);
      },

      // reducer for update the contact individualy
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

// exporting slice 
export const { setUser, deleteUser, editUser } = contactSlice.actions;
export default contactSlice.reducer;