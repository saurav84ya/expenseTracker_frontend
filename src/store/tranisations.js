import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"



const initialState = {
    isFetchIncomeLoading : false ,
    fetchData : null,
    message : null
}

export const addIncome = createAsyncThunk(
    "/a/addIncome", 
    async (formData) => {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL_SERVER}a/add-income`,
            formData
        )
        // console.log(response.data)
        return response.data
    }
)

export const getIncome = createAsyncThunk(
    "/a/getIncome", 
    async (userId) => {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL_SERVER}a/fetch-income/${userId}`,
        )
        // console.log(response.data)
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


    }
})


export default incomeSlice.reducer;