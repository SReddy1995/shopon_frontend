import { createSlice } from "@reduxjs/toolkit";


const storesSlice = createSlice({
    name: 'stores',
    initialState: {
        storesList : null,
        selectedStore : null
    },
    reducers: {
        updateStoresList: (state, action) => {
            state.storesList = action.payload
        },
        updateSelectedStore: (state, action) => {
            console.log("updating")
            state.selectedStore = action.payload
            console.log("updated")
        }
    }
})

export const { updateStoresList, updateSelectedStore } = storesSlice.actions;

export default storesSlice.reducer;