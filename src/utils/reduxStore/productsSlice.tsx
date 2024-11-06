import { createSlice } from "@reduxjs/toolkit";


const productsSlice = createSlice({
    name: 'products',
    initialState: {
        selectedProductsList : [],
        selectedColumnsList: [],
        sourcePage: '',
        selectedCategoryForProductList: '',
        productListFilters: {
            location: null,
            category: null,
            searchString: null,
            seller: null,
            speciality: null,
            messageID: null
        }
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
        updateProductsListFilters: (state, action) => {
            state.productListFilters = action.payload
        },
        updateSelectedCategoryForProductsList: (state, action) => {
            state.selectedCategoryForProductList = action.payload
        }
    }
})

export const { updateSelectedProductsList, updateProductsColumnsList, updateSourcePage, updateSelectedCategoryForProductsList, updateProductsListFilters } = productsSlice.actions;

export default productsSlice.reducer;