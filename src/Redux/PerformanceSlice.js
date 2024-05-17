import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import BASE_URL from '../Api/base';


export const fetchPTotalProfit = createAsyncThunk(
    'conversion/totalProfit',
    async (partnerId) => {
      const response = await fetch(`${BASE_URL}conversion/totalProfit?partners_Id=${partnerId}`);
      const responseData = await response.json();
      return responseData
    }
  )
export const fetchPTotalPayout = createAsyncThunk(
    'conversion/totalPayout',
    async (partnerId) => {
      const response = await fetch(`${BASE_URL}conversion/totalPayout?partners_Id=${partnerId}`);
      const responseData = await response.json();
      return responseData
    }
  )
export const fetchPTotalRevenue = createAsyncThunk(
    'conversion/totalRevenue',
    async (partnerId) => {
      const response = await fetch(`${BASE_URL}conversion/totalRevenue?partners_Id=${partnerId}`);
      const responseData = await response.json();
      return responseData
    }
  )
export const fetchPTotalConversion = createAsyncThunk(
    'conversion/totalConversion',
    async (partnerId) => {
      const response = await fetch(`${BASE_URL}conversion/totalConversion?partners_Id=${partnerId}`);
      const responseData = await response.json();
      return responseData
    }
  )
export const fetchPTotalCRate = createAsyncThunk(
    'conversion/conversionRate',
    async (partnerId) => {
      const response = await fetch(`${BASE_URL}conversion/conversionRate?partners_Id=${partnerId}`);
      const responseData = await response.json();
      return responseData
    }
  )
export const fetchPTotalClicks = createAsyncThunk(
    'tracking/totalClick',
    async (partnerId) => {
      const response = await fetch(`${BASE_URL}tracking/totalClick?partners_Id=${partnerId}`);
      const responseData = await response.json();
      return responseData
    }
  )
export const fetchPEventReport = createAsyncThunk(
    'eventReport/partnerEventValueReport',
    async (apiEndPoint) => {
      const response = await fetch(`${BASE_URL}${apiEndPoint}`);
      const responseData = await response.json();
      return responseData
    }
  )
export const fetchPubEventReport = createAsyncThunk(
    'eventReport/publisherEventValueReport',
    async ({apiEndpoint}) => {
      const response = await fetch(`${BASE_URL}${apiEndpoint}`);
      const responseData = await response.json();
      return responseData
    }
  )
export const fetchMangEventReport = createAsyncThunk(
    'eventReport/managerEventReport',
    async (apiEndpoint) => {
      const response = await fetch(`${BASE_URL}${apiEndpoint}`);
      const responseData = await response.json();
      return responseData
    }
  )


const PerformanceSlice = createSlice({
  name: 'performance',
  initialState: {
    eventReport : [],
    pubEventReport : [],
    mangEventReport : [],
    totalProfit : null,
    totalPayout : null,
    totalRevenue : null,
    totalConversion : null,
    totalCRate : null,
    totalClicks : null,
    detail: null,
    loading : false,
    error : null
  },

  reducers: {
    
  },

  extraReducers: (builder) => {

    // fetch builder
    builder.addCase(fetchPTotalProfit.pending, (state, action) => {
        state.loading =  true;
      });
    builder.addCase(fetchPTotalProfit.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
      state.totalProfit =  action.payload.responseResult?.$
    });
    builder.addCase(fetchPTotalProfit.rejected, (state, action) => {
        state.error =  action.payload;
        state.loading =  false;
      });
    builder.addCase(fetchPTotalPayout.pending, (state, action) => {
        state.loading =  true;
      });
    builder.addCase(fetchPTotalPayout.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
      state.totalPayout =  action.payload.responseResult?.$
    });
    builder.addCase(fetchPTotalPayout.rejected, (state, action) => {
        state.error =  action.payload;
        state.loading =  false;
      });
    builder.addCase(fetchPTotalRevenue.pending, (state, action) => {
        state.loading =  true;
      });
    builder.addCase(fetchPTotalRevenue.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
      state.totalRevenue =  action.payload.responseResult?.$
    });
    builder.addCase(fetchPTotalRevenue.rejected, (state, action) => {
        state.error =  action.payload;
        state.loading =  false;
      });
    builder.addCase(fetchPTotalConversion.pending, (state, action) => {
        state.loading =  true;
      });
    builder.addCase(fetchPTotalConversion.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
        state.totalConversion =  action.payload.responseResult
    });
    builder.addCase(fetchPTotalConversion.rejected, (state, action) => {
        state.error =  action.payload;
        state.loading =  false;
      });
    builder.addCase(fetchPTotalCRate.pending, (state, action) => {
        state.loading =  true;
      });
    builder.addCase(fetchPTotalCRate.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
      state.totalCRate =  action.payload.responseResult
    });
    builder.addCase(fetchPTotalCRate.rejected, (state, action) => {
        state.error =  action.payload;
        state.loading =  false;
      });
    builder.addCase(fetchPTotalClicks.pending, (state, action) => {
        state.loading =  true;
      });
    builder.addCase(fetchPTotalClicks.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
      state.totalClicks =  action.payload.responseResult
    });
    builder.addCase(fetchPTotalClicks.rejected, (state, action) => {
        state.error =  action.payload;
        state.loading =  false;
      });
    builder.addCase(fetchPEventReport.pending, (state, action) => {
        state.loading =  true;
      });
    builder.addCase(fetchPEventReport.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
        state.eventReport =  action.payload.responseResult
    });
    builder.addCase(fetchPEventReport.rejected, (state, action) => {
        state.error =  action.payload;
        state.loading =  false;
      });
    builder.addCase(fetchPubEventReport.pending, (state, action) => {
        state.loading =  true;
      });
    builder.addCase(fetchPubEventReport.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
      state.pubEventReport =  action.payload.responseResult
    });
    builder.addCase(fetchPubEventReport.rejected, (state, action) => {
        state.error =  action.payload;
        state.loading =  false;
      });
    builder.addCase(fetchMangEventReport.pending, (state, action) => {
        state.loading =  true;
      });
    builder.addCase(fetchMangEventReport.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
        state.mangEventReport =  action.payload.responseResult
    });
    builder.addCase(fetchMangEventReport.rejected, (state, action) => {
        state.error =  action.payload;
        state.loading =  false;
      });

  },
})

// export const {} = offersSlice.actions

export default PerformanceSlice.reducer