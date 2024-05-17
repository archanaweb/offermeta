import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import BASE_URL from '../Api/base';


export const fetchCountryList = createAsyncThunk(
    'user/countrylist',
    async () => {
      const response = await fetch(`${BASE_URL}user/countrylist`);
      const responseData = await response.json();
      console.log("country list",responseData)
      return responseData
    }
  )


const CountryListSlice = createSlice({
  name: 'country',
  initialState: {
    list : [],
    detail: null,
    loading : false,
    error : null
  },

  reducers: {
    
  },

  extraReducers: (builder) => {

    // fetch builder
    builder.addCase(fetchCountryList.pending, (state, action) => {
        state.loading =  true;
      });
    builder.addCase(fetchCountryList.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
      state.list =  action.payload.responseResult
    });
    builder.addCase(fetchCountryList.rejected, (state, action) => {
        state.error =  action.payload;
        state.loading =  false;
      });


  },
})

// export const {} = offersSlice.actions

export default CountryListSlice.reducer