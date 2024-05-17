import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import BASE_URL from '../Api/base';

export const conversionFilterByOffer = createAsyncThunk(
    'offer/serchDataByOfferId',
    async ({partners_Id,offerId}) => {
      const response = await fetch(`${BASE_URL}conversion/serchDataByOfferId?partners_Id=${partners_Id}&offerId=${offerId}`);
      const responseData = await response.json();
      console.log("offerConversion list",responseData)
      return responseData;
    }
  )
export const conversionFilterByPublisher = createAsyncThunk(
    'offer/serchDataByPublisherId',
    async ({partners_Id,publisherId}) => {
      const response = await fetch(`${BASE_URL}conversion/serchDataByPublisherId?partners_Id=${partners_Id}&publisherId=${publisherId}`);
      const responseData = await response.json();
      console.log("PublisherConversion list",responseData)
      return responseData;
    }
  )
export const conversionFilterByAdvertiser = createAsyncThunk(
    'offer/serchDataByAdvertiseId',
    async ({partners_Id,advertiserId}) => {
      const response = await fetch(`${BASE_URL}conversion/serchDataByAdvertiseId?partners_Id=${partners_Id}&advertiserId=${advertiserId}`);
      const responseData = await response.json();
      console.log("AdvertiserConversion list",responseData)
      return responseData;
    }
  )
export const conversionFilterByManager = createAsyncThunk(
    'offer/serchDataByManagerId',
    async ({partners_Id,managerId}) => {
      const response = await fetch(`${BASE_URL}conversion/serchDataByManagerId?partners_Id=${partners_Id}&managerId=${managerId}`);
      const responseData = await response.json();
      console.log("ManagerConversion list",responseData)
      return responseData;
    }
  )
export const conversionFilterBysearchParams = createAsyncThunk(
    'offer/serchDataByMsearchParams', 
    async ({partners_Id,searchParams}) => {
      const response = await fetch(`${BASE_URL}conversion/searchAllConversionData?partners_Id=${partners_Id}&searchParam=${searchParams}`);
      const responseData = await response.json();
      return responseData;
    }
  )
export const exportConversionData = createAsyncThunk(
    'conversion/downloadDataInExcelSheetByPartners', 
    async ({partners_Id, selectedParams, startDate, endDate}) => {
      const response = await fetch(`${BASE_URL}conversion/downloadDataInExcelSheetByPartners?partners_Id=${partners_Id}&selectedParams=${selectedParams}&startDate=${startDate}&endDate=${endDate}`);
      const responseData = await response.json();
      return responseData;
    }
  )


export const conversionFilterSlice = createSlice({
  name: 'conversionFilters',
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
  builder.addCase(conversionFilterByOffer.pending, (state, action) => {
      state.loading =  true;
    });
  builder.addCase(conversionFilterByOffer.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
        state.list =  action.payload.responseResult
  });
  builder.addCase(conversionFilterByOffer.rejected, (state, action) => {
      state.error =  action.payload;
      state.loading =  false;
    });
  builder.addCase(conversionFilterByPublisher.pending, (state, action) => {
      state.loading =  true;
  });
  builder.addCase(conversionFilterByPublisher.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
        state.list =  action.payload.responseResult
  });
  builder.addCase(conversionFilterByPublisher.rejected, (state, action) => {
      state.error =  action.payload;
      state.loading =  false;
  });
  builder.addCase(conversionFilterByAdvertiser.pending, (state, action) => {
      state.loading =  true;
  });
  builder.addCase(conversionFilterByAdvertiser.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
        state.list =  action.payload.responseResult
  });
  builder.addCase(conversionFilterByAdvertiser.rejected, (state, action) => {
      state.error =  action.payload;
      state.loading =  false;
  });
  builder.addCase(conversionFilterByManager.pending, (state, action) => {
      state.loading =  true;
  });
  builder.addCase(conversionFilterByManager.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
        state.list =  action.payload.responseResult
  });
  builder.addCase(conversionFilterByManager.rejected, (state, action) => {
      state.error =  action.payload;
      state.loading =  false;
  });
  builder.addCase(conversionFilterBysearchParams.pending, (state, action) => {
      state.loading =  true;
  });
  builder.addCase(conversionFilterBysearchParams.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
        state.list =  action.payload.responseResult
  });
  builder.addCase(conversionFilterBysearchParams.rejected, (state, action) => {
      state.error =  action.payload;
      state.loading =  false;
  });
  builder.addCase(exportConversionData.pending, (state, action) => {
      state.loading =  true;
  });
  builder.addCase(exportConversionData.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
  });
  builder.addCase(exportConversionData.rejected, (state, action) => {
      state.error =  action.payload;
      state.loading =  false;
  });

  },
})

// export const {} = offersSlice.actions

export default conversionFilterSlice.reducer