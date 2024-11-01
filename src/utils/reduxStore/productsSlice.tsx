import { createSlice } from "@reduxjs/toolkit";


const productsSlice = createSlice({
    name: 'products',
    initialState: {
        selectedProductsList : [],
        selectedColumnsList: [],
        sourcePage: '',
        selectedCategoryForProductList: ''
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
        },
        updateSelectedCategoryForProductsList: (state, action) => {
            state.selectedCategoryForProductList = action.payload
        },
    }
})

export const { updateSelectedProductsList, updateProductsColumnsList, updateSourcePage, updateSelectedCategoryForProductsList } = productsSlice.actions;

export default productsSlice.reducer;