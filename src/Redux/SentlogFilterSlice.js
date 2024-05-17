import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import BASE_URL from '../Api/base';

export const sentLogsFilterByOffer = createAsyncThunk(
    'sentLogs/serchDataByOfferId',
    async ({partners_Id,offerId}) => {
      const response = await fetch(`${BASE_URL}sentLogs/serchDataByOfferId?partners_Id=${partners_Id}&offerId=${offerId}`);
      const responseData = await response.json();
      console.log("offersentLogs list",responseData)
      return responseData;
    }
  )
export const sentLogsFilterByPublisher = createAsyncThunk(
    'sentLogs/serchDataByPublisherId',
    async ({partners_Id,publisherId}) => {
      const response = await fetch(`${BASE_URL}sentLogs/serchDataByPublisherId?partners_Id=${partners_Id}&publisherId=${publisherId}`);
      const responseData = await response.json();
      console.log("PublishersentLogs list",responseData)
      return responseData;
    }
  )
export const sentLogsFilterByAdvertiser = createAsyncThunk(
    'sentLogs/serchDataByAdvertiseId',
    async ({partners_Id,advertiserId}) => {
      const response = await fetch(`${BASE_URL}sentLogs/serchDataByAdvertiseId?partners_Id=${partners_Id}&advertiserId=${advertiserId}`);
      const responseData = await response.json();
      console.log("AdvertisersentLogs list",responseData)
      return responseData;
    }
  )
export const sentLogsFilterByManager = createAsyncThunk(
    'sentLogs/serchDataByManagerId',
    async ({partners_Id,managerId}) => {
      const response = await fetch(`${BASE_URL}sentLogs/serchDataByManagerId?partners_Id=${partners_Id}&managerId=${managerId}`);
      const responseData = await response.json();
      console.log("ManagersentLogs list",responseData)
      return responseData;
    }
  )

  export const fetchSentlogSearchList = createAsyncThunk(
    'offer/searchPublisherSentLogAPI',
        async ({partners_Id,searchInputValue}) => {
            const response = await fetch(`${BASE_URL}offer/searchPublisherSentLogAPI?partners_Id=${partners_Id}&search=${searchInputValue}`);
            const responseData = await response.json();
            return responseData
        }
    )

export const SentLogsFilterSlice = createSlice({
  name: 'sentLogsFilter',
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
  builder.addCase(sentLogsFilterByOffer.pending, (state, action) => {
      state.loading =  true;
    });
  builder.addCase(sentLogsFilterByOffer.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
        state.list =  action.payload.responseResult
  });
  builder.addCase(sentLogsFilterByOffer.rejected, (state, action) => {
      state.error =  action.payload;
      state.loading =  false;
    });
  builder.addCase(sentLogsFilterByPublisher.pending, (state, action) => {
      state.loading =  true;
  });
  builder.addCase(sentLogsFilterByPublisher.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
        state.list =  action.payload.responseResult
  });
  builder.addCase(sentLogsFilterByPublisher.rejected, (state, action) => {
      state.error =  action.payload;
      state.loading =  false;
  });
  builder.addCase(sentLogsFilterByAdvertiser.pending, (state, action) => {
      state.loading =  true;
  });
  builder.addCase(sentLogsFilterByAdvertiser.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
        state.list =  action.payload.responseResult
  });
  builder.addCase(sentLogsFilterByAdvertiser.rejected, (state, action) => {
      state.error =  action.payload;
      state.loading =  false;
  });
  builder.addCase(sentLogsFilterByManager.pending, (state, action) => {
      state.loading =  true;
  });
  builder.addCase(sentLogsFilterByManager.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
        state.list =  action.payload.responseResult
  });
  builder.addCase(sentLogsFilterByManager.rejected, (state, action) => {
      state.error =  action.payload;
      state.loading =  false;
  });
  builder.addCase(fetchSentlogSearchList.fulfilled, (state, action) => {
    state.loading =  false;
    state.error = null;
    state.list =  action.payload.responseResult
});

  },
})

// export const {} = offersSlice.actions

export default SentLogsFilterSlice.reducer