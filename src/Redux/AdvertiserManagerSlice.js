import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import BASE_URL from '../Api/base';

export const fetchAdvertiserManagerList = createAsyncThunk(
    'manager/advertiserAsignList',
    async ({partners_Id, managerId}) => {
      const response = await fetch(`${BASE_URL}manager/advertiserAsignList?partners_Id=${partners_Id}&managerId=${managerId}`);
      const responseData = await response.json();
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

export const AdvertiserManagerSlice = createSlice({
  name: 'advertiserManager',
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
     builder.addCase(fetchAdvertiserManagerList.pending, (state, action) => {
        state.loading =  true;
        document.querySelector('body').classList.add('loading')
      });
      builder.addCase(fetchAdvertiserManagerList.fulfilled, (state, action) => {
          state.loading =  false;
          state.error = null;
        state.list =  action.payload.responseResult
        document.querySelector('body').classList.remove('loading')
      });
      builder.addCase(fetchAdvertiserManagerList.rejected, (state, action) => {
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

export default AdvertiserManagerSlice.reducer