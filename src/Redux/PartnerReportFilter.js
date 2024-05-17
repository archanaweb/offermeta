import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import BASE_URL from '../Api/base';

export const parEventReportFilterByOffer = createAsyncThunk(
    'eventReport/searchPartnerReport',
    async ({partners_Id,offerId, startDate, endDate}) => {
      const response = await fetch(`${BASE_URL}eventReport/searchPartnerReport?partners_Id=${partners_Id}&offerId=${offerId}&startDate=${startDate}&endDate=${endDate}`);
      const responseData = await response.json();
      return responseData;
    }
  )
export const parEventReportFilterByAdvertiser = createAsyncThunk(
    'eventReport/advertiserEventValueReport',
    async ({partners_Id,advertiserId, startDate, endDate}) => {
      const response = await fetch(`${BASE_URL}eventReport/advertiserEventValueReport?partners_Id=${partners_Id}&advertiserId=${advertiserId}&startDate=${startDate}&endDate=${endDate}`);
      const responseData = await response.json();
      return responseData;
    }
  )

export const parErOfferFilterSlice = createSlice({
  name: 'parEventReportFilters',
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
  builder.addCase(parEventReportFilterByOffer.pending, (state, action) => {
      state.loading =  true;
  });
  builder.addCase(parEventReportFilterByOffer.fulfilled, (state, action) => {
        state.list =  action.payload.responseResult
        state.loading =  false;
        state.error = false;
  });
  builder.addCase(parEventReportFilterByOffer.rejected, (state, action) => {
      state.error =  action.payload;
      state.loading =  false;
  });
  
  builder.addCase(parEventReportFilterByAdvertiser.pending, (state, action) => {
      state.loading =  true;
  });
  builder.addCase(parEventReportFilterByAdvertiser.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
        state.list =  action.payload.responseResult
  });
  builder.addCase(parEventReportFilterByAdvertiser.rejected, (state, action) => {
      state.error =  action.payload;
      state.loading =  false;
  });

  },
})

// export const {} = offersSlice.actions

export default parErOfferFilterSlice.reducer