import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import BASE_URL from '../Api/base';

export const fetchPostBackList = createAsyncThunk(
    'publisherManagement/postbackList',
    async ({partnerId,currentPage}) => {
      const response = await fetch(`${BASE_URL}publisherManagement/postbackList?partners_Id=${partnerId}&page=${currentPage}`);
      const responseData = await response.json();
      return responseData
    }
  )

  export const addPostback = createAsyncThunk(
    'publisherManagement/postbackMangement',
    async ({partners_Id, formData}) => {
      const response = await fetch(`${BASE_URL}publisherManagement/postbackMangement?partners_Id=${partners_Id}`, {
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

  export const fetchPostBackDetail = createAsyncThunk(
    'publisherManagement/viewPostabck',
        async ({partners_Id,Id}) => {
            const response = await fetch(`${BASE_URL}publisherManagement/viewPostabck?partners_Id=${partners_Id}&Id=${Id}`);
            const responseData = await response.json();
            return responseData
        }
    )

    export const updatePostback = createAsyncThunk(
      'publisherManagement/updatePostback',
      async (formData) => {
        const response = await fetch(`${BASE_URL}publisherManagement/updatePostback`, {
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

    export const deletePostBack = createAsyncThunk(
      'publisherManagement/deletePostback',
          async ({postbackId,partners_Id,offerId}) => {
              const response = await fetch(`${BASE_URL}publisherManagement/deletePostback?postbackId=${postbackId}&partners_Id=${partners_Id}&offerId=${offerId}`,{
                method: "DELETE",
                headers: {
                  'accept': 'application/json'
              }
              });
              const responseData = await response.json();
              return responseData
          }
      )
    
export const postbackSlice = createSlice({
  name: 'postback',
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
    builder.addCase(fetchPostBackList.pending, (state, action) => {
        state.loading =  true;
      });
    builder.addCase(fetchPostBackList.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
      state.list =  action.payload.responseResult
    });
    builder.addCase(fetchPostBackList.rejected, (state, action) => {
        state.error =  action.payload;
        state.loading =  false;
      });
      // Add builder
      builder.addCase(addPostback.pending, (state, action) => {
        state.loading =  true;
      });
    builder.addCase(addPostback.fulfilled, (state, action) => {
      state.loading =  false;
      state.error = null;
    });
    builder.addCase(addPostback.rejected, (state, action) => {
        state.loading =  false;
        state.error =  action.payload;
      });

      // Detail builder
      builder.addCase(fetchPostBackDetail.pending, (state, action) => {
        state.loading =  true;
      });
    builder.addCase(fetchPostBackDetail.fulfilled, (state, action) => {
      state.loading =  false;
      state.detail = action.payload.resposneResult
      state.error = null;
    });
    builder.addCase(fetchPostBackDetail.rejected, (state, action) => {
        state.loading =  false;
        state.error =  action.payload;
      });

      // Update builder
      builder.addCase(updatePostback.pending, (state, action) => {
        state.loading =  true;
      });
    builder.addCase(updatePostback.fulfilled, (state, action) => {
      state.loading =  false;
      state.detail = action.payload.resposneResult
      state.error = null;
    });
    builder.addCase(updatePostback.rejected, (state, action) => {
        state.loading =  false;
        state.error =  action.payload;
      });
       // Delete builder
       builder.addCase(deletePostBack.pending, (state, action) => {
        state.loading =  true;
      });
    builder.addCase(deletePostBack.fulfilled, (state, action) => {
      state.loading =  false;
      state.error = null;
    });
    builder.addCase(deletePostBack.rejected, (state, action) => {
        state.loading =  false;
        state.error =  action.payload;
      });
  },
})

// export const {} = offersSlice.actions

export default postbackSlice.reducer