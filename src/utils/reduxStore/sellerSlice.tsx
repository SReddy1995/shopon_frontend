import { createSlice } from "@reduxjs/toolkit";


const sellerSlice = createSlice({
    name: 'seller',
    initialState: {
        selectedSeller : null,
        selectedOrderInfo: null
    },
    reducers: {
        updateSelectedSeller: (state, action) => {
            localStorage.setItem('selected_seller', JSON.stringify(action.payload))
            state.selectedSeller = action.payload
        },
        updateSelectedOrderInfo: (state, action) => {
            localStorage.setItem('selected_order_info', JSON.stringify(action.payload))
            state.selectedOrderInfo = action.payload
        },
    }
})

export const { updateSelectedSeller, updateSelectedOrderInfo } = sellerSlice.actions;

export default sellerSlice.reducer;