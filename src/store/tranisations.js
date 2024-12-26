import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"



const initialState = {
    isFetchIncomeLoading : false ,
    isFetchExpanseLoading : false,
    fetchData : null,
    fetchDataExpanse : null,
    message : null,
    balance : null ,
    dashBoardIncome : null,
    dashBoardExpnses : null,
    dashBoardLoading : false
}

export const addIncome = createAsyncThunk(
    "/a/addIncome", 
    async (formData) => {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL_SERVER}a/add-income`,
            formData
        )
        // //(response.data)
        return response.data
    }
)

export const getIncome = createAsyncThunk(
    "/a/getIncome", 
    async (userId) => {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL_SERVER}a/fetch-income/${userId}`,
            
        )
        // //(response.data)
        return response.data
    }
)

export const getDashBoard = createAsyncThunk(
    "/a/getDashBoard", 
    async (userId) => {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL_SERVER}a/fetch-dashBoard/${userId}`,
        )
        // //(response.data)
        return response.data
    }
)

export const delIncome = createAsyncThunk(
    "/a/delIncome",
    async({userId,incomeId}) => {
        const response = await axios.delete(
            `${import.meta.env.VITE_API_URL_SERVER}a/delete-income/${userId}/${incomeId}`,
        )
        return response.data
    }
)






export const addExpanse = createAsyncThunk(
    "/a/addExpanse", 
    async (formData) => {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL_SERVER}a/add-expanse`,
            formData
        )
        // //(response.data)
        return response.data
    }
)

export const getExpanse = createAsyncThunk(
    "/a/getExpanse", 
    async (userId) => {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL_SERVER}a/fetch-expanse/${userId}`,
        )
        // //(response.data)
        return response.data
    }
)

export const delExpanse = createAsyncThunk(
    "/a/delExpanse",
    async({userId,expanseId}) => {
        const response = await axios.delete(
            `${import.meta.env.VITE_API_URL_SERVER}a/delete-expanse/${userId}/${expanseId}`,
        )
        return response.data
    }
)




const incomeSlice = createSlice({
    name : "income",
    initialState ,
    extraReducers : (builder) => {
        builder
        .addCase(addIncome.pending , (state) => {
            state.isFetchIncomeLoading = true;
        })
        .addCase(addIncome.fulfilled , (state  , action) => {
            state.isFetchIncomeLoading = false;
            state.message =  action.payload.message
        })
        .addCase(addIncome.rejected , (state) => {
            state.isFetchIncomeLoading = false;
            state.message =  action.payload.message;
        })


        .addCase(getIncome.pending , (state) => {
            state.isFetchIncomeLoading = true;
        })
        .addCase(getIncome.fulfilled , (state  , action) => {
            state.isFetchIncomeLoading = false;
            state.fetchData = action.payload.success ? action.payload.data : null
            state.balance = action.payload.success ? action.payload.balance : null
            state.message =  action.payload.message;
        })
        .addCase(getIncome.rejected , (state) => {
            state.isFetchIncomeLoading = false;
            state.message =  action.payload.message;
        })



        .addCase(delIncome.pending , (state) => {
            state.isFetchIncomeLoading = true;
        })
        .addCase(delIncome.fulfilled , (state  , action) => {
            state.isFetchIncomeLoading = false;
            state.message =  action.payload.message
        })
        .addCase(delIncome.rejected , (state) => {
            state.isFetchIncomeLoading = false;
            state.message =  action.payload.message;
        })





        .addCase(addExpanse.pending , (state) => {
            state.isFetchExpanseLoading = true;
        })
        .addCase(addExpanse.fulfilled , (state  , action) => {
            state.isFetchExpanseLoading = false;
            state.message =  action.payload.message
        })
        .addCase(addExpanse.rejected , (state) => {
            state.isFetchExpanseLoading = false;
            state.message =  action.payload.message;
        })


        .addCase(getExpanse.pending , (state) => {
            state.isFetchExpanseLoading = true;
        })
        .addCase(getExpanse.fulfilled , (state  , action) => {
            state.isFetchExpanseLoading = false;
            state.fetchDataExpanse = action.payload.success ? action.payload.data : null
            state.balance = action.payload.success ? action.payload.balance : null
            state.message =  action.payload.message;
        })
        .addCase(getExpanse.rejected , (state) => {
            state.isFetchExpanseLoading = false;
            state.message =  action.payload.message;
        })


        
        .addCase(delExpanse.pending , (state) => {
            state.isFetchExpanseLoading = true;
        })
        .addCase(delExpanse.fulfilled , (state  , action) => {
            state.isFetchExpanseLoading = false;
            state.message =  action.payload.message
        })
        .addCase(delExpanse.rejected , (state) => {
            state.isFetchExpanseLoading = false;
            state.message =  action.payload.message;
        })




        .addCase(getDashBoard.pending , (state) => {
            state.dashBoardLoading = true;
        })
        .addCase(getDashBoard.fulfilled , (state  , action) => {
            state.dashBoardLoading = false;
            state.message =  action.payload.message
            state.dashBoardIncome = action.payload.success ? action.payload.incomes : null
            state.dashBoardExpnses = action.payload.success ? action.payload.expnses : null
        })
        .addCase(getDashBoard.rejected , (state) => {
            state.dashBoardLoading = false;
            state.message =  action.payload.message;
        })



    }
})


export default incomeSlice.reducer;