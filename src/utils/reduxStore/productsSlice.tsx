import { createSlice } from "@reduxjs/toolkit";


const productsSlice = createSlice({
    name: 'products',
    initialState: {
        selectedProductsList : [],
        selectedColumnsList: [],
        sourcePage: ''
    },
    reducers: {
        updateSelectedProductsList: (state, action) => {
            state.selectedProductsList = action.payload
        },
        updateProductsColumnsList: (state, action) => {
            state.selectedColumnsList = action.payload
        },
        updateSourcePage: (state, action) => {
            state.sourcePage = action.payload
        }
    }
})

export const { updateSelectedProductsList, updateProductsColumnsList, updateSourcePage } = productsSlice.actions;

export default productsSlice.reducer;