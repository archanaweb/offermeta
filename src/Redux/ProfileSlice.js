import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import BASE_URL from '../Api/base';


export const editProfile = createAsyncThunk(
    'subAdmin/editProfile',
    async ({partners_Id,formData}) => {
      const response = await fetch(`${BASE_URL}subAdmin/editProfile?partners_Id=${partners_Id}`,{
        method: 'PUT',
    headers: {
        'accept': 'application/json'
    },
    body: new URLSearchParams(formData)
      });
      const responseData = await response.json();
      console.log("profile res",responseData)
      return responseData
    }
  )
export const uploadProfileImg = createAsyncThunk(
    'subAdmin/uploadImage',
    async (formData) => {
      const response = await fetch(`${BASE_URL}subAdmin/uploadImage`,{
        method: 'PUT',
    headers: {
        'accept': 'application/json'
    },
    body: formData
      });
      const responseData = await response.json();
      return responseData
    }
  )


const ProfileSlice = createSlice({
  name: 'profile',
  initialState: {
    total : null,
    detail: null,
    loading : false,
    error : null
  },

  reducers: {
    
  },

  extraReducers: (builder) => {

    // fetch builder
    builder.addCase(editProfile.pending, (state, action) => {
        state.loading =  true;
      });
    builder.addCase(editProfile.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
    //   state.total =  action.payload.responseResult
    });
    builder.addCase(editProfile.rejected, (state, action) => {
        state.error =  action.payload;
        state.loading =  false;
      });
    builder.addCase(uploadProfileImg.pending, (state, action) => {
        state.loading =  true;
      });
    builder.addCase(uploadProfileImg.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
    });
    builder.addCase(uploadProfileImg.rejected, (state, action) => {
        state.error =  action.payload;
        state.loading =  false;
      });

  },
})

// export const {} = offersSlice.actions

export default ProfileSlice.reducer