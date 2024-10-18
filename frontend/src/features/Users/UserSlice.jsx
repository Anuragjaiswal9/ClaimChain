// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Create a slice for user authentication
const userSlice = createSlice({
  name: 'user',
  initialState: {
    fullName: '', // Initial value for fullName
    UserEmail:'',
    AvatarName:'',
  },
  reducers: {
    setFullName: (state, action) => {
      state.fullName = action.payload;
    },
    setEmail:(state,action)=>{

      state.UserEmail = action.payload;



    },
    setAvatarName:(state , action) =>
    {
      state.AvatarName = action.payload;
    },
  

  },
});

// Export the action to set fullName
export const { setFullName ,  setEmail , setAvatarName } = userSlice.actions;

// Export the selector to get fullName from the state
export const selectFullName = (state) => state.user.fullName;

export const selectUserEmail = (state) => state.user.UserEmail;

export const selectAvatarName = (state) => state.user.AvatarName;

// Export the reducer to include it in the store
export default userSlice.reducer;
