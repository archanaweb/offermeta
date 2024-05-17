import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import BASE_URL from '../Api/base';

export const fetchPlanList = createAsyncThunk(
    'admin/planList',
    async (adminId) => {
      const response = await fetch(`${BASE_URL}admin/planList?adminId=${adminId}`);
      const responseData = await response.json();
      return responseData
    }
  )

  export const updateOffer = createAsyncThunk(
    'publicher/updatePublicher',
    async ({offerId, formData}) => {
      const response = await fetch(`${BASE_URL}offer/updateOffer?offerId=${offerId}`, {
        method: "PUT",
        headers: {
            'accept': 'application/json'
        },
        body:  formData
      });
      const responseData = await response.json();
      return responseData
    }
  )

  export const fetchOfferDetail = createAsyncThunk(
    'offer/viewOffer',
    async (offerId) => {
      const response = await fetch(`${BASE_URL}offer/viewOffer?offerId=${offerId}`);
      const responseData = await response.json();
      console.log("offer detail res",responseData);
      return responseData
    }
  )

  export const createOffer = createAsyncThunk(
    'offer/createOffer',
    async (form) => {
      console.log("create data",form)
      const response = await fetch(`${BASE_URL}offer/createOffer`, {
        method: 'POST',
        headers: {
            'accept': 'application/json'
        },
        body: form
      });
      const responseData = await response.json();
      console.log("create offer res",responseData)
      return responseData
    }
  )

  export const deleteOffer = createAsyncThunk(
    'offer/deleteOffer',
        async ({subAdminId,id}) => {
            const response = await fetch(`${BASE_URL}offer/deleteOffer?partners_Id=${subAdminId}&offerId=${id}`,{
              method: "PUT",
              headers: {
                'accept': 'application/json'
            }
            });
            const responseData = await response.json();
            return responseData
        }
    )
  export const offerInactive = createAsyncThunk(
    'offer/offerInactive',
        async ({partners_Id,offerId}) => {
            const response = await fetch(`${BASE_URL}offer/offerInactive?partners_Id=${partners_Id}&offerId=${offerId}`,{
              method: "PUT",
              headers: {
                'accept': 'application/json'
            }
            });
            const responseData = await response.json();
            console.log("inactiveStatusRes",responseData)
            return responseData
        }
    )

  export const offerActive = createAsyncThunk(
    'offer/offerActive',
        async ({partners_Id,offerId}) => {
            const response = await fetch(`${BASE_URL}offer/offerActive?partners_Id=${partners_Id}&offerId=${offerId}`,{
              method: "PUT",
              headers: {
                'accept': 'application/json'
            }
            });
            const responseData = await response.json();
            console.log("activeStatusRes",responseData)
            return responseData
        }
    )

    export const fetchEventValue = createAsyncThunk(
      'offer/eventValueList',
      async (offerId) => {
        const response = await fetch(`${BASE_URL}offer/eventValueList?offerId=${offerId}`);
        const responseData = await response.json();
        return responseData
      }
    )


export const PlanSlice = createSlice({
  name: 'plan',
  initialState: {
    list : [],
    detail: null,
    loading : false,
    error : null,
    eventValueList: []
  },

  reducers: {
    
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPlanList.pending, (state, action) => {
        state.loading =  true;
        document.querySelector('body').classList.add('loading')
      });
    builder.addCase(fetchPlanList.fulfilled, (state, action) => {
      state.list =  action.payload.responseResult?.reverse()
      document.querySelector('body').classList.remove('loading')
    });
    builder.addCase(fetchPlanList.rejected, (state, action) => {
        state.error =  true;
        document.querySelector('body').classList.remove('loading')
      });

      builder.addCase(createOffer.fulfilled, (state, action) => {
        state.detail =  action.payload.responseResult
      });
      builder.addCase(fetchOfferDetail.pending, (state, action) => {
        state.loading =  true
        document.querySelector('body').classList.add('loading')
      });
      builder.addCase(fetchOfferDetail.fulfilled, (state, action) => {
        state.detail =  action.payload.responseResult
        state.loading =  false
        document.querySelector('body').classList.remove('loading')
      });
      builder.addCase(fetchOfferDetail.rejected, (state, action) => {
        state.error =  true
        state.loading =  false
        document.querySelector('body').classList.remove('loading')
      });
      builder.addCase(updateOffer.fulfilled, (state, action) => {
        state.detail =  action.payload.responseResult
      });

       // Delete builder
       builder.addCase(deleteOffer.pending, (state, action) => {
        state.loading =  true;
      });
    builder.addCase(deleteOffer.fulfilled, (state, action) => {
      state.loading =  false;
      state.detail =  action.payload.responseResult
      state.error = null;
    });
    builder.addCase(deleteOffer.rejected, (state, action) => {
        state.loading =  false;
        state.error =  action.payload;
      });

      // offer Inactive builder
      builder.addCase(offerInactive.pending, (state, action) => {
        state.loading =  true;
      });
    builder.addCase(offerInactive.fulfilled, (state, action) => {
      state.loading =  false;
      state.error = null;
    });
    builder.addCase(offerInactive.rejected, (state, action) => {
        state.loading =  false;
        state.error =  action.payload;
      });

      // offer Active builder
      builder.addCase(offerActive.pending, (state, action) => {
        state.loading =  true;
      });
    builder.addCase(offerActive.fulfilled, (state, action) => {
      state.loading =  false;
      state.error = null;
    });
    builder.addCase(offerActive.rejected, (state, action) => {
        state.loading =  false;
        state.error =  action.payload;
      });

      // eventValue builder

      builder.addCase(fetchEventValue.pending, (state, action) => {
        state.loading =  true;
        document.querySelector('body').classList.add('loading')
      });
    builder.addCase(fetchEventValue.fulfilled, (state, action) => {
      console.log("event list",action.payload.responseResult)
      state.eventValueList =  action.payload.responseResult
      document.querySelector('body').classList.remove('loading')
    });
    builder.addCase(fetchEventValue.rejected, (state, action) => {
        state.error =  true;
        document.querySelector('body').classList.remove('loading')
      });
  },
})

// export const {} = offersSlice.actions

export default PlanSlice.reducer