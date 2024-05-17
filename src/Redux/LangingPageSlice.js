import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import BASE_URL from '../Api/base';


export const fetchLandingPageList = createAsyncThunk(
    'offer/landingPageList',
    async({partnerId,offerId}) => {
      const response = await fetch(`${BASE_URL}offer/landingPageList?partners_Id=${partnerId}&offerId=${offerId}`);
      const responseData = await response.json();
      console.log("landing pafe res>>>>",responseData)
      return responseData
    }
  )

export const addLandingPage = createAsyncThunk(
    'offer/addLandingPage',
    async ({subadminId,offerId,formData}) => {
      console.log("landing data",formData,subadminId,offerId)
      const response = await fetch(`${BASE_URL}offer/addLandingPage?offerId=${offerId}`, {
        method: "POST",
        headers: {
            'accept': 'application/json'
        },
        body:  new URLSearchParams(formData)
      });
      const responseData = await response.json();
      console.log("landing detail",responseData)
      return responseData
    }
  )

export const updateLanding = createAsyncThunk(
    'offer/updateLandingPage',
    async ({landingPageId ,formData}) => {
      const response = await fetch(`${BASE_URL}offer/updateLandingPage?landingPageId=${landingPageId}`, 
      {
        method: "PUT",
        headers: {
            'accept': 'application/json'
        },
        body:  new URLSearchParams(formData)
      });
      const responseData = await response.json();
      return responseData
    }
  )
    
export const langingpageSlice = createSlice({
  name: 'landing',
  initialState: {
    list : [],
    detail: [],
    loading : false,
    error : null
  },

  reducers: {
    
  },

  extraReducers: (builder) => {
    // fetch builder
    builder.addCase(fetchLandingPageList.pending, (state, action) => {
        state.loading =  true;
      });
    builder.addCase(fetchLandingPageList.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
        state.list =  action.payload.responseResult;
    });
    builder.addCase(fetchLandingPageList.rejected, (state, action) => {
        state.error =  action.payload;
        state.loading =  false;
      });

      // Add builder
    builder.addCase(addLandingPage.pending, (state, action) => {
        state.loading =  true;
      });
    builder.addCase(addLandingPage.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
        console.log("create payload",action.payload.responseResult)
        state.detail =  action.payload.responseResult;
    });
    builder.addCase(addLandingPage.rejected, (state, action) => {
        state.error =  action.payload;
        state.loading =  false;
      });

      // Update builder
      builder.addCase(updateLanding.pending, (state, action) => {
        state.loading =  true;
      });
    builder.addCase(updateLanding.fulfilled, (state, action) => {
      state.loading =  false;
      // state.detail = action.payload.resposneResult
      state.error = null;
    });
    builder.addCase(updateLanding.rejected, (state, action) => {
        state.loading =  false;
        state.error =  action.payload;
      });
  },
})

// export const {} = offersSlice.actions

export default langingpageSlice.reducer