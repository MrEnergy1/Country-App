import {configureStore} from '@reduxjs/toolkit'
import storeSlice from '../Hooks/storeSlice'


const store = configureStore({
    reducer:{
        store: storeSlice,
    },
})
export default store