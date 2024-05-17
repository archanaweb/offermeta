import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import BASE_URL from '../Api/base';


export const fetchManagerList = createAsyncThunk(
    'manager/managerList',
    async (partners_Id) => {
      const response = await fetch(`${BASE_URL}manager/managerList?partners_Id=${partners_Id}`);
      const responseData = await response.json();
      console.log("managerList....",responseData)
      return responseData
    }
  )
export const fetchManagerDetail = createAsyncThunk(
    'manager/managerViewData',
    async ({partners_Id, managerId}) => {
      const response = await fetch(`${BASE_URL}manager/managerViewData?partners_Id=${partners_Id}&managerId=${managerId}`);
      const responseData = await response.json();
      return responseData
    }
  )
export const fetchManagerPostbackDetail = createAsyncThunk(
    'publisherManagement/managerPostbackView',
    async ({partners_Id, managerId,postbackId}) => {
      const response = await fetch(`${BASE_URL}publisherManagement/managerPostbackView?partners_Id=${partners_Id}&managerId=${managerId}&Id=${postbackId}`);
      const responseData = await response.json();
      return responseData
    }
  )

  export const addManager = createAsyncThunk(
    'manager/addManager',
    async (formData) => {
      const response = await fetch(`${BASE_URL}manager/addManager`, {
        method: "POST",
        headers: {
            'accept': 'application/json'
        },
        body:  new URLSearchParams(formData)
      });
      const responseData = await response.json();
      console.log("manager res",responseData)
      return responseData
    }
  )
  export const addManagerPostback = createAsyncThunk(
    'manager/managerpostback',
    async (formData) => {
      const response = await fetch(`${BASE_URL}publisherManagement/managerpostback`, {
        method: "POST",
        headers: {
            'accept': 'application/json'
        },
        body:  new URLSearchParams(formData)
      });
      const responseData = await response.json();
      console.log("managerpostback res",responseData)
      return responseData
    }
  )

  export const deleteManager = createAsyncThunk(
    'publisherManagement/deletePostback',
        async (Id) => {
            const response = await fetch(`${BASE_URL}publisherManagement/deletePostback?Id=${Id}`,{
              method: "DELETE",
              headers: {
                'accept': 'application/json'
            }
            });
            const responseData = await response.json();
            return responseData
        }
    )
  export const deletePubManagerPostback = createAsyncThunk(
    'publisherManagement/ManagerdeletePostback',
        async ({postbackId, publisherId, managerId, partners_Id}) => {
            const response = await fetch(`${BASE_URL}publisherManagement/ManagerdeletePostback?postbackId=${postbackId}&publisherId=${publisherId}&managerId=${managerId}&partners_Id=${partners_Id}`,{
              method: "DELETE",
              headers: {
                'accept': 'application/json'
            }
            });
            const responseData = await response.json();
            return responseData
        }
    )

    export const updateManager = createAsyncThunk(
      'manager/updateMagager',
      async ({subAdminId,Id,formData}) => {
          const response = await fetch(`${BASE_URL}manager/updateMagager?partners_Id=${subAdminId}&managerId=${Id}`,{
            method: "PUT",
            headers: {
              'accept': 'application/json'
          },
          body: new URLSearchParams(formData)
          });
          const responseData = await response.json();
          return responseData
      }
    )
    export const updateManagerPostback = createAsyncThunk(
      'publisherManagement/managerUpdatePostbackr',
      async (formData) => {
          const response = await fetch(`${BASE_URL}publisherManagement/managerUpdatePostback`,{
            method: "PUT",
            headers: {
              'accept': 'application/json'
          },
          body: new URLSearchParams(formData)
          });
          const responseData = await response.json();
          return responseData
      }
    )
    export const managerUploadImage = createAsyncThunk(
      'manager/uploadImage',
      async (formData) => {
          const response = await fetch(`${BASE_URL}manager/uploadImage`,{
            method: "PUT",
            headers: {
              'accept': 'application/json'
          },
          body: formData
          });
          const responseData = await response.json();
          return responseData
      }
    )

    export const fetchManagerPublisherList = createAsyncThunk(
      'manager/AssignPublisherList',
      async ({partners_Id,managerId}) => {
        const response = await fetch(`${BASE_URL}manager/AssignPublisherList?partners_Id=${partners_Id}&managerId=${managerId}`);
        const responseData = await response.json();
        console.log('ManagerPublisherList res',responseData)
        return responseData
      }
    )
    export const fetchManagerClickList = createAsyncThunk(
      'manager/clickList',
      async (apiEndPoint) => {
        const response = await fetch(`${BASE_URL}${apiEndPoint}`);
        const responseData = await response.json();
        return responseData
      }
    )

    export const fetchManagerConversionList = createAsyncThunk(
      'manager/conversionList',
      async (apiEndPoint) => {
        const response = await fetch(`${BASE_URL}${apiEndPoint}`);
        const responseData = await response.json();
        return responseData
      }
    )
    export const fetchManagerSentlogsList = createAsyncThunk(
      'sentLogs/PublisherManagerSentLogList',
      async (apiEndPoint) => {
        const response = await fetch(`${BASE_URL}${apiEndPoint}`);
        const responseData = await response.json();
        return responseData
      }
    )

    export const fetchManagerImpressionList = createAsyncThunk(
      'manager/impList',
      async (managerId) => {
        const response = await fetch(`${BASE_URL}manager/impList?publisherManagerId=${managerId}`);
        const responseData = await response.json();
        console.log("managerImpressionList>>>>",responseData)
        return responseData
      }
    )

    export const fetchManagerPublisherDetail = createAsyncThunk(
      'manager/viewPublisherData',
      async ({partners_Id,managerId,publisherId}) => {
        const response = await fetch(`${BASE_URL}manager/viewPublisherData?partners_Id=${partners_Id}&managerId=${managerId}&publisherId=${publisherId}`);
        const responseData = await response.json();
        return responseData
      }
    )

    export const addManagerPublisher = createAsyncThunk(
      'manager/managerAddPublisher',
      async ({managerId,formData}) => {
        const response = await fetch(`${BASE_URL}manager/managerAddPublisher?managerId=${managerId}`, {
          method: "POST",
          headers: {
              'accept': 'application/json'
          },
          body:  new URLSearchParams(formData)
        });
        const responseData = await response.json();
        console.log("manager addPublisher res",responseData)
        return responseData
      }
    )
    

export const managerSlice = createSlice({
  name: 'manager',
  initialState: {
    list : [],
    detail : null,
    postbackDetail : null,
    publisherList: [],
    clickList: [],
    clickLoading: [],
    conversionList: [],
    sentlogList: [],
    conversionLoading: [],
    impressionList: [],
    PublisherDetail: null,
    loggedInManager : null,
    loading : false,
    error : null
  },

  reducers: {
    
  },

  extraReducers: (builder) => {
    builder.addCase(fetchManagerList.pending, (state, action) => {
      state.loading =  true;
    });
    builder.addCase(fetchManagerList.fulfilled, (state, action) => {
      state.list =  action.payload.responseResult?.reverse()
    });
    builder.addCase(fetchManagerList.rejected, (state, action) => {
      state.error =  true
    });
    // detail
    builder.addCase(fetchManagerDetail.pending, (state, action) => {
      state.loading =  true;
    });
    builder.addCase(fetchManagerDetail.fulfilled, (state, action) => {
      state.detail =  action.payload.responsResult
    });
    builder.addCase(fetchManagerDetail.rejected, (state, action) => {
      state.error =  true
    });
    // postback detail
    builder.addCase(fetchManagerPostbackDetail.pending, (state, action) => {
      state.loading =  true;
    });
    builder.addCase(fetchManagerPostbackDetail.fulfilled, (state, action) => {
      state.postbackDetail =  action.payload.resposneResult
      state.loading =  false;
    });
    builder.addCase(fetchManagerPostbackDetail.rejected, (state, action) => {
      state.error =  true
      state.loading =  false;
    });
    // uploadImage
    builder.addCase(managerUploadImage.pending, (state, action) => {
      state.loading =  true;
    });
    builder.addCase(managerUploadImage.fulfilled, (state, action) => {
      state.loading =  false;
      state.error =  false
    });
    builder.addCase(managerUploadImage.rejected, (state, action) => {
      state.error =  true
    });

    // fetch publisher

    builder.addCase(fetchManagerPublisherList.pending, (state, action) => {
      state.loading =  true;
      document.querySelector('body').classList.add('loading')
    });
    builder.addCase(fetchManagerPublisherList.fulfilled, (state, action) => {
      state.publisherList =  action.payload.responseResult?.reverse()
      console.log('manager publist res', action.payload)
      document.querySelector('body').classList.remove('loading')
    });
    builder.addCase(fetchManagerPublisherList.rejected, (state, action) => {
      state.error =  true
      document.querySelector('body').classList.remove('loading')
    });

    // fetch click

    builder.addCase(fetchManagerClickList.pending, (state, action) => {
      state.clickLoading =  true;
    });
    builder.addCase(fetchManagerClickList.fulfilled, (state, action) => {
      state.clickList =  action.payload.responseResult
      state.clickLoading =  false;
      state.error =  false
    });
    builder.addCase(fetchManagerClickList.rejected, (state, action) => {
      state.error =  true
      state.clickLoading =  false;
    });

     // fetch conversion

     builder.addCase(fetchManagerConversionList.pending, (state, action) => {
      state.conversionLoading =  true;
    });
    builder.addCase(fetchManagerConversionList.fulfilled, (state, action) => {
      state.conversionList =  action.payload.responseResult
      state.conversionLoading =  false;
      state.error =  false;
    });
    builder.addCase(fetchManagerConversionList.rejected, (state, action) => {
      state.error =  true;
      state.conversionLoading =  false;
    });
     // fetch conversion

     builder.addCase(fetchManagerSentlogsList.pending, (state, action) => {
      state.conversionLoading =  true;
    });
    builder.addCase(fetchManagerSentlogsList.fulfilled, (state, action) => {
      state.sentlogList =  action.payload.responseResult
      state.loading =  false;
      state.error =  false;
    });
    builder.addCase(fetchManagerSentlogsList.rejected, (state, action) => {
      state.error =  true;
      state.conversionLoading =  false;
    });

     // fetch impression

     builder.addCase(fetchManagerImpressionList.pending, (state, action) => {
      state.loading =  true;
      document.querySelector('body').classList.add('loading')
    });
    builder.addCase(fetchManagerImpressionList.fulfilled, (state, action) => {
      state.impressionList =  action.payload.responseResult;
      document.querySelector('body').classList.remove('loading')
    });
    builder.addCase(fetchManagerImpressionList.rejected, (state, action) => {
      state.error =  true;
      document.querySelector('body').classList.remove('loading')
    });
     // fetch publisher detail

     builder.addCase(fetchManagerPublisherDetail.pending, (state, action) => {
      state.loading =  true;
    });
    builder.addCase(fetchManagerPublisherDetail.fulfilled, (state, action) => {
      state.PublisherDetail =  action.payload.responseResult
    });
    builder.addCase(fetchManagerPublisherDetail.rejected, (state, action) => {
      state.error =  true
    });
     // Add manager
     builder.addCase(addManager.pending, (state, action) => {
      state.loading =  true;
    });
    builder.addCase(addManager.fulfilled, (state, action) => {
      state.loading =  false;
      state.error = null;
    });
  builder.addCase(addManager.rejected, (state, action) => {
      state.loading =  false;
      state.error =  action.payload;
    });
      // Add publisher
      builder.addCase(addManagerPublisher.pending, (state, action) => {
        state.loading =  true;
      });
    builder.addCase(addManagerPublisher.fulfilled, (state, action) => {
      state.loading =  false;
      state.error = null;
    });
    builder.addCase(addManagerPublisher.rejected, (state, action) => {
        state.loading =  false;
        state.error =  action.payload;
      });
      // Add postback
      builder.addCase(addManagerPostback.pending, (state, action) => {
        state.loading =  true;
      });
    builder.addCase(addManagerPostback.fulfilled, (state, action) => {
      state.loading =  false;
      state.error = null;
    });
    builder.addCase(addManagerPostback.rejected, (state, action) => {
        state.loading =  false;
        state.error =  action.payload;
      });
      // delete postback
      builder.addCase(deletePubManagerPostback.pending, (state, action) => {
        state.loading =  true;
      });
    builder.addCase(deletePubManagerPostback.fulfilled, (state, action) => {
      state.loading =  false;
      state.error = null;
    });
    builder.addCase(deletePubManagerPostback.rejected, (state, action) => {
        state.loading =  false;
        state.error =  action.payload;
      });
      // update postback
      builder.addCase(updateManagerPostback.pending, (state, action) => {
        state.loading =  true;
      });
    builder.addCase(updateManagerPostback.fulfilled, (state, action) => {
      state.loading =  false;
      state.error = null;
    });
    builder.addCase(updateManagerPostback.rejected, (state, action) => {
        state.loading =  false;
        state.error =  action.payload;
      });
  },
})

export const {} = managerSlice.actions

export default managerSlice.reducer