import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import BASE_URL from '../Api/base';

    export const deletePubPostBack = createAsyncThunk(
      'publisherManagement/deletePublisherPostback',
          async ({postbackId,publisherId,partners_Id,offerId}) => {
              const response = await fetch(`${BASE_URL}publisherManagement/deletePublisherPostback?postbackId=${postbackId}&publisherId=${publisherId}&partners_Id=${partners_Id}&offerId=${offerId}`,{
                method: "DELETE",
                headers: {
                  'accept': 'application/json'
              }
              });
              const responseData = await response.json();
              return responseData
          }
      )
    
export const publisherPostbackSlice = createSlice({
  name: 'publisherPostback',
  initialState: {
    list : [],
    detail: null,
    loading : false,
    error : null
  },

  reducers: {
    
  },

  extraReducers: (builder) => {

    // // fetch builder
    // builder.addCase(fetchPostBackList.pending, (state, action) => {
    //     state.loading =  true;
    //   });
    // builder.addCase(fetchPostBackList.fulfilled, (state, action) => {
    //     state.loading =  false;
    //     state.error = null;
    //   state.list =  action.payload.responseResult
    // });
    // builder.addCase(fetchPostBackList.rejected, (state, action) => {
    //     state.error =  action.payload;
    //     state.loading =  false;
    //   });
    //   // Add builder
    //   builder.addCase(addPostback.pending, (state, action) => {
    //     state.loading =  true;
    //   });
    // builder.addCase(addPostback.fulfilled, (state, action) => {
    //   state.loading =  false;
    //   state.error = null;
    // });
    // builder.addCase(addPostback.rejected, (state, action) => {
    //     state.loading =  false;
    //     state.error =  action.payload;
    //   });

    //   // Detail builder
    //   builder.addCase(fetchPostBackDetail.pending, (state, action) => {
    //     state.loading =  true;
    //   });
    // builder.addCase(fetchPostBackDetail.fulfilled, (state, action) => {
    //   state.loading =  false;
    //   state.detail = action.payload.resposneResult
    //   state.error = null;
    // });
    // builder.addCase(fetchPostBackDetail.rejected, (state, action) => {
    //     state.loading =  false;
    //     state.error =  action.payload;
    //   });

    //   // Update builder
    //   builder.addCase(updatePostback.pending, (state, action) => {
    //     state.loading =  true;
    //   });
    // builder.addCase(updatePostback.fulfilled, (state, action) => {
    //   state.loading =  false;
    //   state.detail = action.payload.resposneResult
    //   state.error = null;
    // });
    // builder.addCase(updatePostback.rejected, (state, action) => {
    //     state.loading =  false;
    //     state.error =  action.payload;
    //   });
       // Delete builder
       builder.addCase(deletePubPostBack.pending, (state, action) => {
        state.loading =  true;
      });
    builder.addCase(deletePubPostBack.fulfilled, (state, action) => {
      state.loading =  false;
      state.error = null;
    });
    builder.addCase(deletePubPostBack.rejected, (state, action) => {
        state.loading =  false;
        state.error =  action.payload;
      });
  },
})

// export const {} = offersSlice.actions

export default publisherPostbackSlice.reducer