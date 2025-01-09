import { createSlice } from "@reduxjs/toolkit";


const sellerSlice = createSlice({
    name: 'seller',
    initialState: {
        selectedSeller : null
    },
    reducers: {
        updateSelectedSeller: (state, action) => {
            localStorage.setItem('selected_seller', JSON.stringify(action.payload))
            state.selectedSeller = action.payload
        },
    }
})

export const { updateSelectedSeller } = sellerSlice.actions;

export default sellerSlice.reducer;