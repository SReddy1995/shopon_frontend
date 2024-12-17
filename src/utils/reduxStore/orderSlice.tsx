import { createSlice } from "@reduxjs/toolkit";


const orderSlice = createSlice({
    name: 'order',
    initialState: {
        selectedOrder : [],
        sourcePage: '',
        ordersListFilters: {
            order_id: null,
            customer_name: null,
            payment_status: null,
            order_status: null,
            fulfillment_status: null,
            from_date: null,
            to_date: null
        }
    },
    reducers: {
        updateSelectedOrder: (state, action) => {
            state.selectedOrder = action.payload
        },
        updateOrdersListFilters: (state, action) => {
            state.ordersListFilters = action.payload
        }
    }
})

export const { updateSelectedOrder, updateOrdersListFilters} = orderSlice.actions;

export default orderSlice.reducer;