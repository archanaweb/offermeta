import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import BASE_URL from '../Api/base';

export const fetchOfferList = createAsyncThunk(
    'offer/offerList',
    async ({partners_Id,currentPage}) => {
      const response = await fetch(`${BASE_URL}offer/offerList?partners_Id=${partners_Id}&page=${currentPage}`);
      const responseData = await response.json();
      return responseData
    }
  )
  export const fetchOfferSearchList = createAsyncThunk(
    'offer/searchOfferAPI',
        async ({partners_Id,searchInputValue}) => {
            const response = await fetch(`${BASE_URL}offer/searchOfferAPI?partners_Id=${partners_Id}&search=${searchInputValue}`);
            const responseData = await response.json();
            return responseData
        }
    )
export const fetchCategoryList = createAsyncThunk(
    'category/categoryList',
    async (partners_Id) => {
      const response = await fetch(`${BASE_URL}category/categoryList?partners_Id=${partners_Id}`);
      const responseData = await response.json();
      return responseData
    }
  )
export const fetchVerticalList = createAsyncThunk(
    'category/verticalList',
    async (partners_Id) => {
      const response = await fetch(`${BASE_URL}category/verticalList?partners_Id=${partners_Id}`);
      const responseData = await response.json();
      return responseData
    }
  )
export const fetchTrafficList = createAsyncThunk(
    'category/trafficList',
    async (partners_Id) => {
      const response = await fetch(`${BASE_URL}category/trafficList?partners_Id=${partners_Id}`);
      const responseData = await response.json();
      return responseData
    }
  )
export const fetchRequiredOfferList = createAsyncThunk(
    'publisher/requestofferList',
    async (partners_Id) => {
      const response = await fetch(`${BASE_URL}publisher/requestofferList?partners_Id=${partners_Id}`);
      const responseData = await response.json();
      return responseData
    }
  )

  export const updateOffer = createAsyncThunk(
    'publicher/updatePublicher',
    async ({partners_Id,offerId, formData}) => {
      const response = await fetch(`${BASE_URL}offer/updateOffer?partners_Id=${partners_Id}&offerId=${offerId}`, {
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
    async ({partners_Id,offerId}) => {
      const response = await fetch(`${BASE_URL}offer/viewOffer?partners_Id=${partners_Id}&offerId=${offerId}`);
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
  export const addCategory = createAsyncThunk(
    'category/addCategory',
    async (formData) => {
      const response = await fetch(`${BASE_URL}category/addCategory`, {
        method: 'POST',
        headers: {
            'accept': 'application/json'
        },
        body: new URLSearchParams(formData)
      });
      const responseData = await response.json();
      return responseData
    }
  )
  export const addTraffic= createAsyncThunk(
    'category/addTraffic',
    async (formData) => {
      const response = await fetch(`${BASE_URL}category/addTraffic`, {
        method: 'POST',
        headers: {
            'accept': 'application/json'
        },
        body: new URLSearchParams(formData)
      });
      const responseData = await response.json();
      return responseData
    }
  )
  export const addVertical= createAsyncThunk(
    'category/addVertical',
    async (formData) => {
      const response = await fetch(`${BASE_URL}category/addVertical`, {
        method: 'POST',
        headers: {
            'accept': 'application/json'
        },
        body: new URLSearchParams(formData)
      });
      const responseData = await response.json();
      return responseData
    }
  )
  export const requestOffer = createAsyncThunk(
    'publisher/requestOffer',
    async ({publisherId,offerId, formData}) => {
      const response = await fetch(`${BASE_URL}publisher/requestOffer?publisherId=${publisherId}&offerId=${offerId}`, {
        method: 'POST',
        headers: {
            'accept': 'application/json'
        },
        body: new URLSearchParams(formData)
      });
      const responseData = await response.json();
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

  export const approveOffer = createAsyncThunk(
    'publisher/approoveOffer',
        async ({partners_Id,offerId}) => {
            const response = await fetch(`${BASE_URL}publisher/approoveOffer?partners_Id=${partners_Id}&offerId=${offerId}`,{
              method: "PUT",
              headers: {
                'accept': 'application/json'
            }
            });
            const responseData = await response.json();
            return responseData
        }
    )

    export const fetchEventValue = createAsyncThunk(
      'offer/eventValueList',
      async ({partners_Id,offerId}) => {
        const response = await fetch(`${BASE_URL}offer/eventValueList?partners_Id=${partners_Id}&offerId=${offerId}`);
        const responseData = await response.json();
        return responseData
      }
    )


export const offersSlice = createSlice({
  name: 'offers',
  initialState: {
    list : [],
    updatedList : [],
    categoryList: [],
    verticalList: [],
    trafficList: [],
    requestOfferList: [],
    detail: null,
    loading : false,
    error : null,
    eventValueList: []
  },

  reducers: {
    
  },

  extraReducers: (builder) => {
    builder.addCase(fetchOfferList.pending, (state, action) => {
        state.loading =  true;
      });
      builder.addCase(fetchOfferList.fulfilled, (state, action) => {
        state.list =  action.payload.responseResult
        state.loading =  false;
      });
      builder.addCase(fetchOfferList.rejected, (state, action) => {
        state.error =  true;
        state.loading =  false;
      });
      // offerList by Search
      builder.addCase(fetchOfferSearchList.fulfilled, (state, action) => {
        state.updatedList =  action.payload.responseResult?.reverse()
        document.querySelector('body').classList.remove('loading')
      });
      // category list 
      builder.addCase(fetchCategoryList.fulfilled, (state, action) => {
        state.categoryList =  action.payload.resposneResult
      });
      // vertical list 
      builder.addCase(fetchVerticalList.fulfilled, (state, action) => {
        state.verticalList =  action.payload.resposneResult
      });
      // traffic list 
      builder.addCase(fetchTrafficList.fulfilled, (state, action) => {
        state.trafficList =  action.payload.resposneResult
      });
      // requestOffer list 
      builder.addCase(fetchRequiredOfferList.fulfilled, (state, action) => {
        state.requestOfferList =  action.payload.resposneResult
      });
      

      builder.addCase(createOffer.fulfilled, (state, action) => {
        state.detail =  action.payload.responseResult
      });
      builder.addCase(addCategory.fulfilled, (state, action) => {
        state.loading =  false
        state.error = null
      });
      builder.addCase(addVertical.fulfilled, (state, action) => {
        state.loading =  false
        state.error = null
      });
      builder.addCase(addTraffic.fulfilled, (state, action) => {
        state.loading =  false
        state.error = null
      });
      builder.addCase(requestOffer.fulfilled, (state, action) => {
        state.loading =  false
        state.error = null
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
      // Approve offer builder
      builder.addCase(approveOffer.pending, (state, action) => {
        state.loading =  true;
      });
    builder.addCase(approveOffer.fulfilled, (state, action) => {
      state.loading =  false;
      state.error = null;
    });
    builder.addCase(approveOffer.rejected, (state, action) => {
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

export default offersSlice.reducer