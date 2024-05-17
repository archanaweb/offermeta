import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import BASE_URL from '../Api/base';

export const pubConversionFilterByOffer = createAsyncThunk(
    'publicher/publisherSerchDataByOfferId',
    async ({partners_Id,publisherId,offerId}) => {
      const response = await fetch(`${BASE_URL}publicher/publisherSerchDataByOfferId?partners_Id=${partners_Id}&publisherId=${publisherId}&offerId=${offerId}`);
      const responseData = await response.json();
      return responseData;
    }
  )
export const pubConversionFilterBysearchParams = createAsyncThunk(
    'publicher/publisherSearchAllConversionData', 
    async ({partners_Id,publisherId,searchParams}) => {
      const response = await fetch(`${BASE_URL}publicher/publisherSearchAllConversionData?partners_Id=${partners_Id}&publisherId=${publisherId}&searchParam=${searchParams}`);
      const responseData = await response.json();
      return responseData;
    }
  )

export const pubConversionFilterSlice = createSlice({
  name: 'pubConversionFilters',
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
  builder.addCase(pubConversionFilterByOffer.pending, (state, action) => {
      state.loading =  true;
  });
  builder.addCase(pubConversionFilterByOffer.fulfilled, (state, action) => {
        state.list =  action.payload.responseResult
        state.loading =  false;
        state.error = false;
  });
  builder.addCase(pubConversionFilterByOffer.rejected, (state, action) => {
      state.error =  action.payload;
      state.loading =  false;
  });
  
  builder.addCase(pubConversionFilterBysearchParams.pending, (state, action) => {
      state.loading =  true;
  });
  builder.addCase(pubConversionFilterBysearchParams.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
        state.list =  action.payload.responseResult
  });
  builder.addCase(pubConversionFilterBysearchParams.rejected, (state, action) => {
      state.error =  action.payload;
      state.loading =  false;
  });

  },
})

// export const {} = offersSlice.actions

export default pubConversionFilterSlice.reducer