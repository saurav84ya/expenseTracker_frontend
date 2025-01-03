import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  isServerLoading : false,
  user: null,
  otpLoading : false,
  otpMessage : null
};




export const registerUser = createAsyncThunk(
  "/auth/register",

  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL_SERVER}auth/logup`,
      formData,
      {
        withCredentials: true, // Ensures cookies are sent and stored
      }
    );
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "/auth/loginUser",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL_SERVER}auth/login`,
      formData,
      {
        withCredentials: true, // Ensures cookies are sent and stored
      }
    );
    return response.data;
  }
);

export const checkAuth = createAsyncThunk(
  "/auth/checkauth",

  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL_SERVER}auth/checkauth`,
      {
        withCredentials: true,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
    // //("response?.data",response?.data)
    return response.data;
  }
);


export const logout = createAsyncThunk("/auth/logout", async () => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL_SERVER}auth/logout`,
    {}, // Empty body
    {
      withCredentials: true, // Include credentials for cross-origin
    }
  );
  // //(response.data);
  return response.data;
});

export const getOtp = createAsyncThunk("/auth/getOtp" , async(email) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL_SERVER}auth/logup/getOtp/${email}`,
  )
  // console.log(response.data)
  return response.data
})




const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

    .addCase(getOtp.pending, (state) => {
      state.otpLoading = true;
    })
    .addCase(getOtp.fulfilled, (state, action) => {
      state.otpLoading = false;
        state.otpMessage = action.payload.success ? action.payload.message : null;
    })
    .addCase(getOtp.rejected, (state) => {
      state.otpLoading = false;
    })


      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isAuthenticated = action.payload.success),
          (state.user = action.payload.success ? action.payload.user : null);
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isAuthenticated = action.payload.success),
          (state.user = action.payload.success ? action.payload.user : null);
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
      })



      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.isServerLoading  = true
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
        
        state.isServerLoading  = false
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        
        state.isServerLoading  = false
      })


      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null  ;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })


  },
});

export default authSlice.reducer;
