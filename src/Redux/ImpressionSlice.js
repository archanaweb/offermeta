import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import BASE_URL from '../Api/base';


export const fetchTotalImpression = createAsyncThunk(
    'impression/totalImpression',
    async (subAdminId) => {
      const response = await fetch(`${BASE_URL}impression/totalImpression?partners_Id=${subAdminId}`);
      const responseData = await response.json();
      console.log("impression res",responseData)
      return responseData
    }
  )

  export const fetchImressionList = createAsyncThunk(
    'impression/impressionList',
    async ({partners_Id, getCurrentPage}) => {
      const response = await fetch(`${BASE_URL}impression/impressionList?partners_Id=${partners_Id}&page=${getCurrentPage}`);
      const responseData = await response.json();
      console.log("impression res",responseData)
      return responseData
    }
  )


const ImpressionSlice = createSlice({
  name: 'impression',
  initialState: {
    click : null,
    detail: null,
    loading : false,
    error : null
  },

  reducers: {
    
  },

  extraReducers: (builder) => {

    // fetch builder
    builder.addCase(fetchTotalImpression.pending, (state, action) => {
        state.loading =  true;
      });
    builder.addCase(fetchTotalImpression.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
      state.click =  action.payload.responseResult
    });
    builder.addCase(fetchTotalImpression.rejected, (state, action) => {
        state.error =  action.payload;
        state.loading =  false;
      });

       // fetch list builder
    builder.addCase(fetchImressionList.pending, (state, action) => {
      state.loading =  true;
    });
  builder.addCase(fetchImressionList.fulfilled, (state, action) => {
      state.loading =  false;
      state.error = null;
    state.list =  action.payload.responseResult?.reverse()
  });
  builder.addCase(fetchImressionList.rejected, (state, action) => {
      state.error =  action.payload;
      state.loading =  false;
    });

  },
})

// export const {} = offersSlice.actions

export default ImpressionSlice.reducer