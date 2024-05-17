import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import BASE_URL from '../Api/base';

// export const fetchEventList = createAsyncThunk(
//   'offer/eventList',
//   async(offerId) => {
//     const response = await fetch(`${BASE_URL}offer/eventList?offerId=${offerId}`);
//     const responseData = await response.json();
//     console.log(" event value res>>>>",responseData)
//     return responseData
//   }
// )

// export const addEventValue = createAsyncThunk(
//     'offer/addEventValue',
//     async ({offerId,formData}) => {
//       const response = await fetch(`${BASE_URL}offer/addEventValue?offerId=${offerId}`, {
//         method: "POST",
//         headers: {
//             'accept': 'application/json'
//         },
//         body:  new URLSearchParams(formData)
//       });
//       const responseData = await response.json();
//       console.log("eventValue",responseData)
//       return responseData
//     }
//   )

//   export const updateEvent = createAsyncThunk(
//     'offer/updateEventData',
//     async ({offerId,eventId, formData}) => {
//       const response = await fetch(`${BASE_URL}offer/updateEventData?offerId=${offerId}&eventId=${eventId}`, 
//       {
//         method: "PUT",
//         headers: {
//             'accept': 'application/json'
//         },
//         body: new URLSearchParams(formData)
//       });
//       const responseData = await response.json();
//       return responseData
//     }
//   )

  export const updateStatus = createAsyncThunk(
    'offer/deleteEventData',
        async ({adminId, clientId}) => {
            const response = await fetch(`${BASE_URL}admin/block?adminId=${adminId}&_id=${}`,{
              method: "DELETE",
              headers: {
                'accept': 'application/json'
            }
            });
            const responseData = await response.json();
            return responseData
        }
    )


const AdminSlice = createSlice({
  name: 'admin',
  initialState: {
    list: [],
    details: [],
    loading : false,
    error : null
  },

  reducers: {
    
  },

  extraReducers: (builder) => {
     // fetch builder
    builder.addCase(fetchEventList.pending, (state, action) => {
      state.loading =  true;
    });

    builder.addCase(fetchEventList.fulfilled, (state, action) => {
      state.loading =  false; 
      state.error = null;
    state.list =  action.payload.responseResult
    });

    builder.addCase(fetchEventList.rejected, (state, action) => {
      state.error =  action.payload;
      state.loading =  false;
    });

    // add builder
    builder.addCase(addEventValue.pending, (state, action) => {
        state.loading =  true;
      });
    builder.addCase(addEventValue.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
      state.details =  action.payload.responseResult
    });
    builder.addCase(addEventValue.rejected, (state, action) => {
        state.error =  action.payload;
        state.loading =  false;
      });
        
      // update builder
      builder.addCase(updateEvent.pending, (state, action) => {
          state.loading =  true;
        });
      builder.addCase(updateEvent.fulfilled, (state, action) => {
          state.loading =  false;
          state.list =  action.payload.responseResult.event
          state.error = null;
      });
      builder.addCase(updateEvent.rejected, (state, action) => {
          state.error =  action.payload;
          state.loading =  false;
        });

        // delete builder
      builder.addCase(deleteEvent.pending, (state, action) => {
        state.loading =  true;
      });
    builder.addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading =  false;
        state.error = null;
    });
    builder.addCase(deleteEvent.rejected, (state, action) => {
        state.error =  action.payload;
        state.loading =  false;
      });

  },
})

export default AdminSlice.reducer