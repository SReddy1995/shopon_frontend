import { createSlice } from "@reduxjs/toolkit";


const overlayMenuSlice = createSlice({
    name: 'overlayMenu',
    initialState: {
        show : false,
    },
    reducers: {
        updateOverlayMenuState: (state, action) => {
            state.show = action.payload
        }
    }
})

export const { updateOverlayMenuState } = overlayMenuSlice.actions;

export default overlayMenuSlice.reducer;