import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from './sideBarSlice';
import overlayMenuReducer from './overlayMenuSlice';
import storesReducer from './storesSlice';
import referenceValuesReducer from './referenceValuesSlice';
import productsReducer from './productsSlice';
import storeSwitchReducer from './storeSwitchSlice';

const appStore = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        overlayMenu: overlayMenuReducer,
        stores: storesReducer,
        refValues: referenceValuesReducer,
        products: productsReducer,
        storeSwitch: storeSwitchReducer
    }
});


export default appStore;