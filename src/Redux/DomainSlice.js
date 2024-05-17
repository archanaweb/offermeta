import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import BASE_URL from '../Api/base';


export const fetchPartnerUserData = createAsyncThunk(
    'subAdmin/viewuserData',
    async (subdomain) => {
      const response = await fetch(`${BASE_URL}subAdmin/viewuserData?subdomain=${subdomain}`);
      const responseData = await response.json();
      console.log("domainRes",responseData)
      return responseData
    }
  )


const DomainSlice = createSlice({
  name: 'subAdminUserData',
  initialState: {
    list : [],
    detail: null,
    loading : false,
    error : null
  },

  reducers: {
    
  },

  extraReducers: (builder) => {

    // fetch builder
    builder.addCase(fetchPartnerUserData.pending, (state, action) => {
        state.loading =  true;
      });
    builder.addCase(fetchPartnerUserData.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
        state.detail =  action.payload.responseResult
    });
    builder.addCase(fetchPartnerUserData.rejected, (state, action) => {
        state.error =  action.payload;
        state.loading =  false;
      });


  },
})

// export const {} = offersSlice.actions

export default DomainSlice.reducer