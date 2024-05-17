import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import BASE_URL from '../Api/base';

export const fetchIpList = createAsyncThunk(
    'subAdmin/ipList',
    async ({partners_Id, advertiserId}) => {
      const response = await fetch(`${BASE_URL}subAdmin/ipList?partners_Id=${partners_Id}&advertiserId=${advertiserId}`);
      const responseData = await response.json();
      console.log("ipAddress list",responseData)
      return responseData;
    }
  )
// export const fetchAdvertiserDetails = createAsyncThunk(
//     'advertiser/advertiserView',
//     async ({partners_Id, advertiserId}) => {
//       const response = await fetch(`${BASE_URL}advertiser/advertiserView?partners_Id=${partners_Id}&advertiserId=${advertiserId}`);
//       const responseData = await response.json();
//       console.log("advertiser list",responseData)
//       return responseData;
//     }
//   )
export const deleteIpAddress = createAsyncThunk(
    'subAdmin/removeIp',
    async ({ipAddress,partners_Id,advertiserId}) => {
      const response = await fetch(`${BASE_URL}subAdmin/deleteIp?partners_Id=${partners_Id}&advertiserId=${advertiserId}`, {
        method: 'DELETE',
        headers: {
            'accept': 'application/json'
        },
        body: new URLSearchParams({ipAddress})
    });
      const responseData = await response.json();
      console.log("advertiser list",responseData)
      return responseData;
    }
  )

  export const createIpAddress = createAsyncThunk(
    'subAdmin/addIp',
    async (formData) => {
      const response = await fetch(`${BASE_URL}subAdmin/addIp`, {
        method: "POST",
        headers: {
            'accept': 'application/json'
        },
        body:  new URLSearchParams(formData)
      });
      const responseData = await response.json();
      console.log(responseData)
      return responseData
    }
  )

export const IpAddressSlice = createSlice({
  name: 'ipaddress',
  initialState: {
    list : [],
    loading : false,
    error : null,
    message : null
  },

  reducers: {
    
  },

  extraReducers: (builder) => {
     // fetch builder
     builder.addCase(fetchIpList.pending, (state, action) => {
        state.loading =  true;
        document.querySelector('body').classList.add('loading')
      });
      builder.addCase(fetchIpList.fulfilled, (state, action) => {
          state.loading =  false;
          state.error = null;
        state.list =  action.payload.responseResult[0]?.ip
        document.querySelector('body').classList.remove('loading')
      });
      builder.addCase(fetchIpList.rejected, (state, action) => {
          state.error =  true;
          state.loading =  false;
          document.querySelector('body').classList.remove('loading')
        });
        // delete builder
     builder.addCase(deleteIpAddress.pending, (state, action) => {
        state.loading =  true;
        document.querySelector('body').classList.add('loading')
      });
      builder.addCase(deleteIpAddress.fulfilled, (state, action) => {
          state.loading =  false;
          state.error = null;
        document.querySelector('body').classList.remove('loading')
      });
      builder.addCase(deleteIpAddress.rejected, (state, action) => {
          state.error =  true;
          state.loading =  false;
          document.querySelector('body').classList.remove('loading')
        });
      // fetch builder
    builder.addCase(createIpAddress.fulfilled, (state, action) => {
      state.loading =  false;
      state.error =  false;
    });
  },
})

// export const {} = offersSlice.actions

export default IpAddressSlice.reducer