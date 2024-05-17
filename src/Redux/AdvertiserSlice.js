import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import BASE_URL from '../Api/base';

export const fetchAdvertiserList = createAsyncThunk(
    'advertiser/advertiserList',
    async (subAdminId) => {
      const response = await fetch(`${BASE_URL}advertiser/advertiserList?partners_Id=${subAdminId}`);
      const responseData = await response.json();
      console.log("advertiser list",responseData)
      return responseData;
    }
  )
export const fetchAdvertiserDetails = createAsyncThunk(
    'advertiser/advertiserView',
    async ({partners_Id, advertiserId}) => {
      const response = await fetch(`${BASE_URL}advertiser/advertiserView?partners_Id=${partners_Id}&advertiserId=${advertiserId}`);
      const responseData = await response.json();
      console.log("advertiser list",responseData)
      return responseData;
    }
  )
export const updatedAdvertiserDetails = createAsyncThunk(
    'advertiser/updateAdvertiser',
    async ({formData,partners_Id}) => {
      const response = await fetch(`${BASE_URL}advertiser/updateAdvertiser?partners_Id=${partners_Id}&advertiserId=${formData.advertiserId}`, {
        method: 'PUT',
        headers: {
            'accept': 'application/json'
        },
        body: new URLSearchParams(formData)
    });
      const responseData = await response.json();
      console.log("advertiser list",responseData)
      return responseData;
    }
  )

  export const createAdvertiser = createAsyncThunk(
    'advertiser/addAdvertiser',
    async (formData) => {
      const response = await fetch(`${BASE_URL}advertiser/addAdvertiser`, {
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
  export const advertiserGenerateToken = createAsyncThunk(
    'advertiser/genreateToken',
    async ({partners_Id, advertiserId}) => {
      const response = await fetch(`${BASE_URL}advertiser/genreateToken?partners_Id=${partners_Id}&advertiserId=${advertiserId}`, {
        method: 'PUT',
        headers: {
            'accept': 'application/json'
        }
    });
      const responseData = await response.json();
      console.log(responseData)
      return responseData
    }
  )

export const advertiserSlice = createSlice({
  name: 'advertiser',
  initialState: {
    list : [],
    generateTokenRes: null,
    detail: null,
    loading : false,
    error : null,
    message : null
  },

  reducers: {
    
  },

  extraReducers: (builder) => {


     // fetch builder
     builder.addCase(fetchAdvertiserList.pending, (state, action) => {
      state.loading =  true;
    });
    builder.addCase(fetchAdvertiserList.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
        state.list =  action.payload.responseResult
    });
    builder.addCase(fetchAdvertiserList.rejected, (state, action) => {
        state.error =  true;
        state.loading =  false;
      });
       // fetch detail builder
     builder.addCase(fetchAdvertiserDetails.pending, (state, action) => {
      state.loading =  true;
      document.querySelector('body').classList.add('loading')
    });
    builder.addCase(fetchAdvertiserDetails.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
      state.detail =  action.payload.responseResult
      document.querySelector('body').classList.remove('loading')
    });
    builder.addCase(fetchAdvertiserDetails.rejected, (state, action) => {
        state.error =  true;
        state.loading =  false;
        document.querySelector('body').classList.remove('loading')
      });
      // fetch builder
     builder.addCase(updatedAdvertiserDetails.pending, (state, action) => {
      state.loading =  true;
      document.querySelector('body').classList.add('loading')
    });
    builder.addCase(updatedAdvertiserDetails.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
    });
    builder.addCase(updatedAdvertiserDetails.rejected, (state, action) => {
        state.error =  true;
        state.loading =  false;
        document.querySelector('body').classList.remove('loading')
      });
      // fetch builder
     builder.addCase(advertiserGenerateToken.pending, (state, action) => {
      state.loading =  true;
      document.querySelector('body').classList.add('loading')
    });
    builder.addCase(advertiserGenerateToken.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
        state.generateTokenRes = action.payload.responseResult
    });
    builder.addCase(advertiserGenerateToken.rejected, (state, action) => {
        state.error =  true;
        state.loading =  false;
        document.querySelector('body').classList.remove('loading')
      });

    builder.addCase(createAdvertiser.fulfilled, (state, action) => {
      state.list =  action.payload.responseResult;
      state.message =  action.payload.responseMessage;
    });
  },
})

// export const {} = offersSlice.actions

export default advertiserSlice.reducer