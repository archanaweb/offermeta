import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import BASE_URL from '../Api/base';

export const clickFilterByOffer = createAsyncThunk(
    'tracking/serchDataByOfferId',
    async ({partners_Id,offerId}) => {
      const response = await fetch(`${BASE_URL}tracking/serchDataByOfferId?partners_Id=${partners_Id}&offerId=${offerId}`);
      const responseData = await response.json();
      return responseData;
    }
  )
export const clickFilterByPublisher = createAsyncThunk(
    'tracking/serchDataByPublisherId',
    async ({partners_Id,publisherId}) => {
      const response = await fetch(`${BASE_URL}tracking/serchDataByPublisherId?partners_Id=${partners_Id}&publisherId=${publisherId}`);
      const responseData = await response.json();
      return responseData;
    }
  )
export const clickFilterByAdvertiser = createAsyncThunk(
    'tracking/serchDataByAdvertiseId',
    async ({partners_Id,advertiserId}) => {
      const response = await fetch(`${BASE_URL}tracking/serchDataByAdvertiseId?partners_Id=${partners_Id}&advertiserId=${advertiserId}`);
      const responseData = await response.json();
      console.log("Advertisertracking list",responseData)
      return responseData;
    }
  )
export const clickFilterByManager = createAsyncThunk(
    'tracking/serchDataByManagerId',
    async ({partners_Id,managerId}) => {
      const response = await fetch(`${BASE_URL}tracking/serchDataByManagerId?partners_Id=${partners_Id}&managerId=${managerId}`);
      const responseData = await response.json();
      console.log("Managertracking list",responseData)
      return responseData;
    }
  )

//   export const createAdvertiser = createAsyncThunk(
//     'advertiser/addAdvertiser',
//     async (formData) => {
//       const response = await fetch(`${BASE_URL}advertiser/addAdvertiser`, {
//         method: "POST",
//         headers: {
//             'accept': 'application/json'
//         },
//         body:  new URLSearchParams(formData)
//       });
//       const responseData = await response.json();
//       console.log(responseData)
//       return responseData
//     }
//   )

export const clickFilterSlice = createSlice({
  name: 'clickFilter',
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
  builder.addCase(clickFilterByOffer.pending, (state, action) => {
      state.loading =  true;
    });
  builder.addCase(clickFilterByOffer.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
        state.list =  action.payload.responseResult
  });
  builder.addCase(clickFilterByOffer.rejected, (state, action) => {
      state.error =  action.payload;
      state.loading =  false;
    });
  builder.addCase(clickFilterByPublisher.pending, (state, action) => {
      state.loading =  true;
  });
  builder.addCase(clickFilterByPublisher.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
        state.list =  action.payload.responseResult
  });
  builder.addCase(clickFilterByPublisher.rejected, (state, action) => {
      state.error =  action.payload;
      state.loading =  false;
  });
  builder.addCase(clickFilterByAdvertiser.pending, (state, action) => {
      state.loading =  true;
  });
  builder.addCase(clickFilterByAdvertiser.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
        state.list =  action.payload.responseResult
  });
  builder.addCase(clickFilterByAdvertiser.rejected, (state, action) => {
      state.error =  action.payload;
      state.loading =  false;
  });
  builder.addCase(clickFilterByManager.pending, (state, action) => {
      state.loading =  true;
  });
  builder.addCase(clickFilterByManager.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
        state.list =  action.payload.responseResult
  });
  builder.addCase(clickFilterByManager.rejected, (state, action) => {
      state.error =  action.payload;
      state.loading =  false;
  });

  },
})

// export const {} = offersSlice.actions

export default clickFilterSlice.reducer