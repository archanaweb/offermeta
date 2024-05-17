import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import BASE_URL from '../Api/base';

export const updatePublisher = createAsyncThunk(
  'publicher/updatePublicher',
  async ({subAdminId,publisherId,formData}) => {
    const response = await fetch(`${BASE_URL}publicher/updatePublisher?partners_Id=${subAdminId}&publisherId=${publisherId}`, {
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

export const addPublisher = createAsyncThunk(
    'publicher/addPublicher',
    async (formData) => {
      const response = await fetch(`${BASE_URL}publicher/addPublicher`, {
        method: "POST",
        headers: {
            'accept': 'application/json'
        },
        body:  new URLSearchParams(formData)
      });
      const responseData = await response.json();
      return responseData
    }
  )

export const fetchPublisherList = createAsyncThunk(
'publicher/fetchPublicher',
    async (subAdminId) => {
        const response = await fetch(`${BASE_URL}publicher/publisherList?partners_Id=${subAdminId}`);
        const responseData = await response.json();
        return responseData
    }
)
export const fetchApprovedPublisherList = createAsyncThunk(
'publisher/publisherAprooveOfferList',
    async (publisherId) => {
        const response = await fetch(`${BASE_URL}publisher/publisherAprooveOfferList?publisherId=${publisherId}`);
        const responseData = await response.json();
        return responseData
    }
)

export const fetchPublisherDetail = createAsyncThunk(
  'publicher/fetchPublicherDetal',
      async ({subAdminId,publisherId}) => {
          const response = await fetch(`${BASE_URL}publicher/publisherLoginById?partners_Id=${subAdminId}&publisherId=${publisherId}`,{
            method: "POST"
          }
          );
          const responseData = await response.json();
          return responseData
      }
  )

  export const fetchPublisherSearchList = createAsyncThunk(
    'publicher/searchpublisherAPI',
        async ({partners_Id,searchInputValue}) => {
            const response = await fetch(`${BASE_URL}offer/searchpublisherAPI?partners_Id=${partners_Id}&search=${searchInputValue}`);
            const responseData = await response.json();
            return responseData
        }
    )

export const publisherSlice = createSlice({
  name: 'publisher',
  initialState: {
    list : [],
    approvedOfferList : [],
    updatedList : [],
    detail : null,
    loading : false,
    error : null
  },

  reducers: {
    
  },

  extraReducers: (builder) => {
    builder.addCase(addPublisher.pending, (state, action) => {
      state.loading = true;
      // state.list =  action.payload.responseResult
  });
    builder.addCase(addPublisher.fulfilled, (state, action) => {
        // state.list =  action.payload.responseResult
        state.loading = false;
    });
    builder.addCase(addPublisher.rejected, (state, action) => {
      state.error = true;
      // state.list =  action.payload.responseResult
  });
   
    builder.addCase(fetchPublisherList.pending, (state, action) => {
        state.loading =  true;
        document.querySelector('body').classList.add('loading')
    });
    builder.addCase(fetchPublisherList.fulfilled, (state, action) => {
      state.list =  action.payload.responseResult?.reverse();
      document.querySelector('body').classList.remove('loading')
  });
  builder.addCase(fetchPublisherList.rejected, (state, action) => {
    state.error =  true;
    document.querySelector('body').classList.remove('loading')
  });

  // list by search
    builder.addCase(fetchPublisherSearchList.pending, (state, action) => {
        state.loading =  true;
        // document.querySelector('body').classList.add('loading')
    });
    builder.addCase(fetchPublisherSearchList.fulfilled, (state, action) => {
      state.updatedList =  action.payload.responseResult?.reverse();
      // document.querySelector('body').classList.remove('loading')
  });
  builder.addCase(fetchPublisherSearchList.rejected, (state, action) => {
    state.error =  true;
    // document.querySelector('body').classList.remove('loading')
  });
builder.addCase(updatePublisher.fulfilled, (state, action) => {
  state.detail =  action.payload.responseResult;
});
builder.addCase(fetchPublisherDetail.pending, (state, action) => {
  state.loading =  true;
  document.querySelector('body').classList.add('loading')
});
builder.addCase(fetchPublisherDetail.fulfilled, (state, action) => {
  state.detail =  action.payload.responsResult;
  state.loading =  false;
  document.querySelector('body').classList.remove('loading')
});
builder.addCase(fetchPublisherDetail.rejected, (state, action) => {
  state.error =  true;
  state.loading =  false;
  document.querySelector('body').classList.remove('loading')
});
builder.addCase(fetchApprovedPublisherList.pending, (state, action) => {
  state.loading =  true;
  document.querySelector('body').classList.add('loading')
});
builder.addCase(fetchApprovedPublisherList.fulfilled, (state, action) => {
  state.approvedOfferList =  action.payload.resposneResult;
  state.loading =  false;
  document.querySelector('body').classList.remove('loading')
});
builder.addCase(fetchApprovedPublisherList.rejected, (state, action) => {
  state.error =  true;
  state.loading =  false;
  document.querySelector('body').classList.remove('loading')
});
  },
})

export const {} = publisherSlice.actions

export default publisherSlice.reducer