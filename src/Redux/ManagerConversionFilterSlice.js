import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import BASE_URL from '../Api/base';

export const managerConversionFilterByOffer = createAsyncThunk(
    'manager/managerSerchDataByOfferId',
    async ({partners_Id,publisherManagerId,offerId}) => {
      const response = await fetch(`${BASE_URL}manager/managerSerchDataByOfferId?partners_Id=${partners_Id}&publisherManagerId=${publisherManagerId}&offerId=${offerId}`);
      const responseData = await response.json();
      console.log("offerConversion list",responseData)
      return responseData;
    }
  )
export const managerConversionFilterByPublisher = createAsyncThunk(
    'manager/maangerSerchDataByPublisherId',
    async ({partners_Id,managerId,publisherId}) => {
      const response = await fetch(`${BASE_URL}manager/maangerSerchDataByPublisherId?partners_Id=${partners_Id}&publisherManagerId=${managerId}&publisherId=${publisherId}`);
      const responseData = await response.json();
      console.log("PublisherConversion list",responseData)
      return responseData;
    }
  )
// export const conversionFilterByAdvertiser = createAsyncThunk(
//     'offer/serchDataByAdvertiseId',
//     async ({partners_Id,advertiserId}) => {
//       const response = await fetch(`${BASE_URL}conversion/serchDataByAdvertiseId?partners_Id=${partners_Id}&advertiserId=${advertiserId}`);
//       const responseData = await response.json();
//       console.log("AdvertiserConversion list",responseData)
//       return responseData;
//     }
//   )
// export const conversionFilterByManager = createAsyncThunk(
//     'offer/serchDataByManagerId',
//     async ({partners_Id,managerId}) => {
//       const response = await fetch(`${BASE_URL}conversion/serchDataByManagerId?partners_Id=${partners_Id}&managerId=${managerId}`);
//       const responseData = await response.json();
//       console.log("ManagerConversion list",responseData)
//       return responseData;
//     }
//   )
export const managerConversionFilterBysearchParams = createAsyncThunk(
    'manager/managerSearchAllConversionData', 
    async ({partners_Id,managerId,searchParams}) => {
      const response = await fetch(`${BASE_URL}manager/managerSearchAllConversionData?partners_Id=${partners_Id}&publisherManagerId=${managerId}&searchParam=${searchParams}`);
      const responseData = await response.json();
      return responseData;
    }
  )
// export const exportConversionData = createAsyncThunk(
//     'conversion/downloadDataInExcelSheetByPartners', 
//     async ({partners_Id, selectedParams, startDate, endDate}) => {
//       const response = await fetch(`${BASE_URL}conversion/downloadDataInExcelSheetByPartners?partners_Id=${partners_Id}&selectedParams=${selectedParams}&startDate=${startDate}&endDate=${endDate}`);
//       const responseData = await response.json();
//       return responseData;
//     }
//   )


export const managerConversionFilterSlice = createSlice({
  name: 'managerConversionFilters',
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
  builder.addCase(managerConversionFilterByOffer.pending, (state, action) => {
      state.loading =  true;
  });
  builder.addCase(managerConversionFilterByOffer.fulfilled, (state, action) => {
        state.list =  action.payload.responseResult
        state.loading =  false;
        state.error = false;
  });
  builder.addCase(managerConversionFilterByOffer.rejected, (state, action) => {
      state.error =  action.payload;
      state.loading =  false;
  });
     // fetch builder
  builder.addCase(managerConversionFilterByPublisher.pending, (state, action) => {
      state.loading =  true;
  });
  builder.addCase(managerConversionFilterByPublisher.fulfilled, (state, action) => {
        state.list =  action.payload.responseResult
        state.loading =  false;
        state.error = false;
  });
  builder.addCase(managerConversionFilterByPublisher.rejected, (state, action) => {
      state.error =  action.payload;
      state.loading =  false;
  });
  builder.addCase(managerConversionFilterBysearchParams.pending, (state, action) => {
      state.loading =  true;
  });
  builder.addCase(managerConversionFilterBysearchParams.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
        state.list =  action.payload.responseResult
  });
  builder.addCase(managerConversionFilterBysearchParams.rejected, (state, action) => {
      state.error =  action.payload;
      state.loading =  false;
  });

  },
})

// export const {} = offersSlice.actions

export default managerConversionFilterSlice.reducer