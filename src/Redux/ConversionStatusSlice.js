import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import BASE_URL from '../Api/base';


export const UpdateAllStatusDeclined = createAsyncThunk(
    'conversion/DeclinedAllConversion',
    async (partnerId) => {
      const response = await fetch(`${BASE_URL}conversion/DeclinedAllConversion?partners_Id=${partnerId}`, {
        method: 'PUT',
        headers: {
            'accept': 'application/json'
        }
      });
      const responseData = await response.json();
      console.log("status res",responseData)
      return responseData
    }
  )
  export const UpdateAllStatusApproved = createAsyncThunk(
    'conversion/approvedAllConversion',
    async (partnerId) => {
      const response = await fetch(`${BASE_URL}conversion/approvedAllConversion?partners_Id=${partnerId}`, {
        method: 'PUT',
        headers: {
            'accept': 'application/json'
        }
      });
      const responseData = await response.json();
      console.log("status res",responseData)
      return responseData
    }
  )
  export const UpdateAllStatusPending = createAsyncThunk(
    'conversion/pendingAllConversion',
    async (partnerId) => {
      const response = await fetch(`${BASE_URL}conversion/pendingAllConversion?partners_Id=${partnerId}`, {
        method: 'PUT',
        headers: {
            'accept': 'application/json'
        }
      });
      const responseData = await response.json();
      console.log("status res",responseData)
      return responseData
    }
  )
  export const UpdateAllStatusCancel = createAsyncThunk(
    'conversion/cancelAllConversion',
    async (partnerId) => {
      const response = await fetch(`${BASE_URL}conversion/cancelAllConversion?partners_Id=${partnerId}`, {
        method: 'PUT',
        headers: {
            'accept': 'application/json'
        }
      });
      const responseData = await response.json();
      console.log("status res",responseData)
      return responseData
    }
  )


const ConversionStatusSlice = createSlice({
  name: 'conversionStatus',
  initialState: {
    loading : false,
    error : null
  },

  reducers: {
    
  },

  extraReducers: (builder) => {

    // fetch builder
    builder.addCase(UpdateAllStatusDeclined.pending, (state, action) => {
        state.loading =  true;
      });
    builder.addCase(UpdateAllStatusDeclined.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
    });
    builder.addCase(UpdateAllStatusDeclined.rejected, (state, action) => {
        state.error =  action.payload;
        state.loading =  false;
      });
      builder.addCase(UpdateAllStatusApproved.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
    });
    builder.addCase(UpdateAllStatusPending.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
        console.log('pending payload<><><>',action.payload)
    });
    builder.addCase(UpdateAllStatusCancel.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
    });


  },
})

// export const {} = offersSlice.actions

export default ConversionStatusSlice.reducer