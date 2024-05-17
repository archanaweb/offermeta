import { createSlice } from "@reduxjs/toolkit";

const updtaeSidebarBgSlice = createSlice({
    name: 'sidebarbackground',
    initialState: {
        bgColor: '#e1e5eb',
    },
    reducers: {
        updateColor: (state, action) => {
            state.bgColor = action.payload;
          },
    },
  })
  
  export const {updateColor} = updtaeSidebarBgSlice.actions
  export default updtaeSidebarBgSlice.reducer