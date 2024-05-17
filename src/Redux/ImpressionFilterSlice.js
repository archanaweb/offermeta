import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import BASE_URL from '../Api/base';

export const impressionFilterByOffer = createAsyncThunk(
    'impression/serchDataByOfferId',
    async ({partners_Id,offerId}) => {
      const response = await fetch(`${BASE_URL}impression/serchDataByOfferId?partners_Id=${partners_Id}&offerId=${offerId}`);
      const responseData = await response.json();
      console.log("offerimpression list",responseData)
      return responseData;
    }
  )
export const impressionFilterByPublisher = createAsyncThunk(
    'impression/serchDataByPublisherId',
    async ({partners_Id,publisherId}) => {
      const response = await fetch(`${BASE_URL}impression/serchDataByPublisherId?partners_Id=${partners_Id}&publisherId=${publisherId}`);
      const responseData = await response.json();
      console.log("Publisherimpression list",responseData)
      return responseData;
    }
  )
export const impressionFilterByAdvertiser = createAsyncThunk(
    'impression/serchDataByAdvertiseId',
    async ({partners_Id,advertiserId}) => {
      const response = await fetch(`${BASE_URL}impression/serchDataByAdvertiseId?partners_Id=${partners_Id}&advertiserId=${advertiserId}`);
      const responseData = await response.json();
      console.log("Advertiserimpression list",responseData)
      return responseData;
    }
  )
export const impressionFilterByManager = createAsyncThunk(
    'impression/serchDataByManagerId',
    async ({partners_Id,managerId}) => {
      const response = await fetch(`${BASE_URL}impression/serchDataByManagerId?partners_Id=${partners_Id}&managerId=${managerId}`);
      const responseData = await response.json();
      console.log("Managerimpression list",responseData)
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

export const ImpressionFilterSlice = createSlice({
  name: 'impressionFilter',
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
  builder.addCase(impressionFilterByOffer.pending, (state, action) => {
      state.loading =  true;
    });
  builder.addCase(impressionFilterByOffer.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
        state.list =  action.payload.responseResult
  });
  builder.addCase(impressionFilterByOffer.rejected, (state, action) => {
      state.error =  action.payload;
      state.loading =  false;
    });
  builder.addCase(impressionFilterByPublisher.pending, (state, action) => {
      state.loading =  true;
  });
  builder.addCase(impressionFilterByPublisher.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
        state.list =  action.payload.responseResult
  });
  builder.addCase(impressionFilterByPublisher.rejected, (state, action) => {
      state.error =  action.payload;
      state.loading =  false;
  });
  builder.addCase(impressionFilterByAdvertiser.pending, (state, action) => {
      state.loading =  true;
  });
  builder.addCase(impressionFilterByAdvertiser.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
        state.list =  action.payload.responseResult
  });
  builder.addCase(impressionFilterByAdvertiser.rejected, (state, action) => {
      state.error =  action.payload;
      state.loading =  false;
  });
  builder.addCase(impressionFilterByManager.pending, (state, action) => {
      state.loading =  true;
  });
  builder.addCase(impressionFilterByManager.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
        state.list =  action.payload.responseResult
  });
  builder.addCase(impressionFilterByManager.rejected, (state, action) => {
      state.error =  action.payload;
      state.loading =  false;
  });

  },
})

// export const {} = offersSlice.actions

export default ImpressionFilterSlice.reducer