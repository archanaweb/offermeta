import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import BASE_URL from '../Api/base';


export const fetchTotalProfit = createAsyncThunk(
    'tracking/tottalProfit',
    async ({subAdminId,offerId}) => {
      const response = await fetch(`${BASE_URL}tracking/tottalProfit?partners_Id=${subAdminId}&offerId=${offerId}`);
      const responseData = await response.json();
      console.log("profit res",responseData)
      return responseData
    }
  )


const ProfitSlice = createSlice({
  name: 'profit',
  initialState: {
    total : null,
    detail: null,
    loading : false,
    error : null
  },

  reducers: {
    
  },

  extraReducers: (builder) => {

    // fetch builder
    builder.addCase(fetchTotalProfit.pending, (state, action) => {
        state.loading =  true;
      });
    builder.addCase(fetchTotalProfit.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
      state.total =  action.payload.responseResult
    });
    builder.addCase(fetchTotalProfit.rejected, (state, action) => {
        state.error =  action.payload;
        state.loading =  false;
      });

  },
})

// export const {} = offersSlice.actions

export default ProfitSlice.reducer