import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from './sideBarSlice';
import overlayMenuReducer from './overlayMenuSlice';
import storesReducer from './storesSlice';
import referenceValuesReducer from './referenceValuesSlice';
import productsReducer from './productsSlice';
import storeSwitchReducer from './storeSwitchSlice';
import orderReducer from './orderSlice';
import sellerReducer from './sellerSlice';
import issueSlice from './issueSlice'

const appStore = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        overlayMenu: overlayMenuReducer,
        stores: storesReducer,
        refValues: referenceValuesReducer,
        products: productsReducer,
        storeSwitch: storeSwitchReducer,
        order: orderReducer,
        seller: sellerReducer,
        issue: issueSlice
    }
});


export default appStore;