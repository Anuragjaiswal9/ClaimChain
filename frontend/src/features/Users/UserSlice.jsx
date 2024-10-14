// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Create a slice for user authentication
const userSlice = createSlice({
  name: 'user',
  initialState: {
    fullName: '', // Initial value for fullName
  },
  reducers: {
    setFullName: (state, action) => {
      state.fullName = action.payload;
    },
  },
});

// Export the action to set fullName
export const { setFullName } = userSlice.actions;

// Export the selector to get fullName from the state
export const selectFullName = (state) => state.user.fullName;

// Export the reducer to include it in the store
export default userSlice.reducer;
