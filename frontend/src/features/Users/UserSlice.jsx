// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Create a slice for user authentication
const userSlice = createSlice({
  name: 'user',
  initialState: {
    fullName: '', // Initial value for fullName
    UserEmail:'',
  },
  reducers: {
    setFullName: (state, action) => {
      state.fullName = action.payload;
    },
    setEmail:(state,action)=>{

      state.UserEmail = action.payload;



    },
  

  },
});

// Export the action to set fullName
export const { setFullName ,  setEmail } = userSlice.actions;

// Export the selector to get fullName from the state
export const selectFullName = (state) => state.user.fullName;

export const selectUserEmail = (state) => state.user.UserEmail;

// Export the reducer to include it in the store
export default userSlice.reducer;
