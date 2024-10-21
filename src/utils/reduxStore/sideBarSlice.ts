import { createSlice } from "@reduxjs/toolkit";


const sideBarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        show : window.matchMedia("(min-width: 768px)").matches,
        device : window.matchMedia("(min-width: 768px)").matches ? 'desktop' : 'mobile'
    },
    reducers: {
        updateSidebarState: (state, action) => {
            state.show = action.payload
        }
    }
})

export const { updateSidebarState } = sideBarSlice.actions;

export default sideBarSlice.reducer;