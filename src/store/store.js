import { configureStore }  from '@reduxjs/toolkit'

import authSlice from './authSlice';
import incomeSlice from './tranisations'




const store = configureStore({
    reducer : {
        authSlice : authSlice,
        incomeSlice : incomeSlice
    }
})

export default store;