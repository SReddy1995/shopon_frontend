import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import '@splidejs/splide/dist/css/splide.min.css';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { updateProductsColumnsList, updateProductsListFilters, updateSelectedCategoryForProductsList, updateSelectedProductsList, updateSourcePage } from '../../utils/reduxStore/productsSlice';
import { showWarningMessage } from '../../shared/notificationProvider';
import { CATEGORY_NOT_REGISTERED, NO_CATEGORIES_REGISTERED, NO_PRODUCTS_SELECTED } from '../../utils/constants/NotificationConstants';
import { useNavigate } from 'react-router-dom';
import SearchableMultiselectList from './SearchableMultiselectList';
import ModalWindow from './ModalWindow';
import MapComponent from './MapComponent';
import { getSearchResults, getSellersList, getSpecialityList, initiateSearch } from '../../services/ProductsService';
import { getOnlineStore } from '../../services/AccountService';
import ProductDetails from './ProductDetails';
import moment from 'moment';
import ConfirmDelete from './ConfirmDelete';
import ProductThumbnail from './ProductThumbnail';

const haversineDistance = (lat1: any, lon1: any, lat2: any, lon2: any) => {
    const toRadians = (degree: any) => degree * (Math.PI / 180);
  
    const R = 6371; // Radius of Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
  
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c; // Distance in kilometers
  };

const ProductsList = () => {

    const handleDistanceCalculate = (lat1: any, lon1: any, lat2: any, lon2: any) => {
        if (lat1 && lon1 && lat2 && lon2) {
          const dist = haversineDistance(parseFloat(lat1), parseFloat(lon1), parseFloat(lat2), parseFloat(lon2));
          return dist;
        } else {
          return null;
        }
      };


    const columns_from_api = useMemo(() => [
        {
            coltitle: "",
            column: "thumbnail",
            visibilityDisplayName: "Image",
            type: "image",
            serialNo: 1,
            isVisible: true
        },
        {
            coltitle: "Product",
            visibilityDisplayName: "Product",
            column: "product",
            type: "text",
            serialNo: 2,
            isVisible: true,
            minWidth:'180px'
        },
        {
            coltitle: "Seller",
            visibilityDisplayName: "Seller",
            column: "seller",
            type: "text",
            serialNo: 2,
            isVisible: true,
            minWidth:'150px'
        },
        {
            coltitle: "Source",
            visibilityDisplayName: "Source",
            column: "source",
            type: "text",
            serialNo: 2,
            isVisible: true,
            minWidth:'140px'
        },
        {
            coltitle: "Measure",
            visibilityDisplayName: "Measure",
            column: "measure",
            type: "text",
            serialNo: 2,
            isVisible: true,
             minWidth:'100px'
        },
        {
            coltitle: "Availability",
            visibilityDisplayName: "Availability",
            column: "availability",
            type: "text",
            serialNo: 2,
            isVisible: true,
            minWidth:'100px'
        },
        {
            coltitle: "Max Quantity",
            visibilityDisplayName: "Max Quantity",
            column: "maximumQuantity",
            type: "text",
            serialNo: 2,
            isVisible: true,
              minWidth:'110px'
        },
        {
            coltitle: "Price",
            visibilityDisplayName: "Price",
            column: "price",
            type: "text",
            serialNo: 2,
            isVisible: true,
             minWidth:'105px'
        },
        {
            coltitle: "Category",
            visibilityDisplayName: "Category",
            column: "category",
            type: "text",
            serialNo: 2,
            isVisible: true,
             minWidth:'160px'
        },
        {
            coltitle: "Seller Location",
            visibilityDisplayName: "Seller Location",
            column: "sellerLocation",
            type: "text",
            serialNo: 2,
            isVisible: true,
             minWidth:'145px'
        },
        {
            coltitle: "Returnable",
            visibilityDisplayName: "Returnable",
            column: "returnable",
            type: "text",
            serialNo: 2,
            isVisible: true,
             minWidth:'100px'
        },
        {
            coltitle: "Cancellable",
            visibilityDisplayName: "Cancellable",
            column: "cancellable",
            type: "text",
            serialNo: 2,
            isVisible: true,
              minWidth:'100px'
        },
        {
            coltitle: "COD",
            visibilityDisplayName: "COD",
            column: "cod",
            type: "text",
            serialNo: 2,
            isVisible: true,
              minWidth:'60px'
        },
        {
            coltitle: "Shipping time",
            visibilityDisplayName: "Shipping time",
            column: "shippingTime",
            type: "text",
            serialNo: 2,
            isVisible: true,
              minWidth:'110px'
        },
        {
            coltitle: "Seller return",
            visibilityDisplayName: "Seller return",
            column: "sellerPickupReturn",
            type: "text",
            serialNo: 2,
            isVisible: true,
              minWidth:'110px'
        },
        {
            coltitle: "Return Window",
            visibilityDisplayName: "Return window",
            column: "returnWindow",
            type: "text",
            serialNo: 2,
            isVisible: true,
              minWidth:'110px'
        },
        {
            coltitle: "Manufacturer",
            visibilityDisplayName: "Manufacturer",
            column: "manufacturer",
            type: "text",
            serialNo: 2,
            isVisible: true,
              minWidth:'160px'
        },
        {
            coltitle: "Fulfillment",
            visibilityDisplayName: "Fulfillment",
            column: "fulfillment",
            type: "text",
            serialNo: 2,
            isVisible: true,
              minWidth:'auto'
        },
        {
            coltitle: "Serviceability",
            visibilityDisplayName: "Serviceability",
            column: "serviceability",
            type: "text",
            serialNo: 2,
            isVisible: true,
              minWidth:'auto'
        },
        {
            coltitle: "Deliverable At",
            visibilityDisplayName: "Deliverable At",
            column: "deliverableAt",
            type: "text",
            serialNo: 2,
            isVisible: true,
              minWidth:'160px'
        },
        
    ], []);

    

    const [vendors_list,setVendorsList] = useState<any>([]);

      const [speciality_list, setSpecialityList] = useState<any>([]);

    const [productsList, setProductList] = useState<any[]>([])
    const [showBackButton,setShowBackButton] = useState('hide')
    const [selectedProducts, setSelectedProducts] = useState([])
    const [columns, setColumns] = useState<any[]>([])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isVendorDropdownOpen, setIsVendorDropdownOpen] = useState(false);
    const [selectedVendors, setSelectedVendors] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [isSpecialityDropdownOpen, setIsSpecialityDropdownOpen] = useState(false);
    const [selectedSpecialities, setSelectedSpecialities] = useState([])
    const [isColumnVisibilityOpen, setIsColumnVisibilityOpen] = useState(false);
    const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false);
    const [isProductThumbnailOpen, setIsProductThumbnailOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<any>(null)
    const [showTable, setShowTable] = useState(false)
    const [searchString, setSearchString] = useState('')
    const intervalIdRef =  useRef<number |any>(null)
    const [lastId, setLastId]= useState<any>(null)
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [open, setModalOpen] = useState(false);
    const [fullPageLoading, setFullPageLoading] = useState(true)
    const [categories, setCategories] = useState([])
    const [onSearchStatus, setOnSearchStatus] = useState('not-started')
    const [selectedProductToViewDetails, setSelectedProductToViewDetails] = useState<any>(null)




    const [messageID, setMessageID] = useState<any>(null);
    const [sellerFiltersForProducts, setSellerFiltersForProducts] = useState<any>([])
    const [specialityFiltersForProducts, setSpecialityFiltersForProducts] = useState<any>([])

    const sourcePage = useSelector((store: any) => store.products.sourcePage);
    const productsFromStore = useSelector((store: any) => store.products.selectedProductsList);
    const filtersFromStore = useSelector((store: any) => store.products.productListFilters);
    const msgIdFromStore = useSelector((store: any) => store.products.productListFilters).messageID
    const categoryFromCollections = useSelector((store: any) => store.products.selectedCategoryForProductList)

    const vendorPopupRef = useRef<any>(null);
    const specialityPopupRef = useRef<any>(null);
    const categoriesPopupRef = useRef<any>(null);
    const columnVisibilityPopupRef = useRef<any>(null);
    const [openRetrySearchConfirm, setConfirmRetrySearchModalOpen] = useState(false);
    const retrySearchConfirmationMsg = "Search results are removed from the Cache. Do you like to retry the search again?"
    const retrySearchConfirmationText = "Yes"

    // Close the popup if clicked outside
    useEffect(() => {
    const handleClickOutside = (event: any) => {
        if (vendorPopupRef.current && !vendorPopupRef.current.contains(event.target)) {
        setIsVendorDropdownOpen(false); // Close the popup if the click is outside
        }

        if (specialityPopupRef.current && !specialityPopupRef.current.contains(event.target)) {
            setIsSpecialityDropdownOpen(false); // Close the popup if the click is outside
        }

        if (categoriesPopupRef.current && !categoriesPopupRef.current.contains(event.target)) {
            setIsOpen(false); // Close the popup if the click is outside
        }

        if (columnVisibilityPopupRef.current && !columnVisibilityPopupRef.current.contains(event.target)) {
            setIsColumnVisibilityOpen(false); // Close the popup if the click is outside
        }
    };

    // Attach the event listener to the document
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
    }, []);
    const tablescrollstyles = {
        loadonscroll:{
          maxHeight: showBackButton ==='show' ? 'calc(100vh - 290px)' : 'calc(100vh - 270px)',
          overflowY: 'scroll' as 'scroll',
        }
      };

      const [filteredProducts, setFilteredProducts] = useState<any>(null)

    const setFiltersObject = (filters: any)=>{
        setSelectedCategories(filters.category)
        setSelectedLocation(filters.location)
        setSearchString(filters.searchString)
        // setMessageID(filters.messageID)   
    }

    const setData = (data: any) => {
        setColumns(data);
      }

      const clearLocation = (event: any) => {
        setSelectedLocation(null)
      }

      const openSelectLocationWindow = () => {
        setModalOpen(true);
      }

      const closeSelectLocationWindow = () => {
        setModalOpen(false);
      };

    const handleSearchStringChange = (event: any) => {
        setSearchString(event.target.value);
      };

    const getCategiesData = (values: any) => {
        if(values.categoryCityMappings.length> 0){
            const uniqueCategories = values.categoryCityMappings.reduce((acc: any, item: any) => {
                // Check if the category_id is already in the accumulator
                if (!acc.some((cat: any) => cat.value === item.category_id)) {
                  acc.push({
                    value: item.category_id,
                    label: item.category.description
                  });
                }
                return acc;
              }, []);
            
            return uniqueCategories
            
        }

        return []

    }

    const setCategiesData = (values: any) => {
        if(values.categoryCityMappings.length> 0){
            let uniqueCategories = values.categoryCityMappings.reduce((acc: any, item: any) => {
                // Check if the category_id is already in the accumulator
                if (!acc.some((cat: any) => cat.value === item.category_id)) {
                  acc.push({
                    value: item.category_id,
                    label: item.category.description
                  });
                }
                return acc;
              }, []);

              uniqueCategories.sort((a: any, b: any) => a.label.localeCompare(b.label));
            
            setCategories(uniqueCategories)
            
        }

    }

    const getMessageIdFromStore = useCallback(() => {
        const id = msgIdFromStore;
        setTimeout(()=>{
            setMessageID(id)
        },0)
        return id;
    },[msgIdFromStore])

    const getNewMessageId = () => {
        let id = "MSG"+uuidv4();
        setTimeout(()=>{
        setMessageID(id)
        },0)
        return id; 
    }

    useEffect(() => {
        
        if (messageID) {
            console.log(messageID)
        }
      }, [messageID]);

      const applySellersAndSpecialityFilters = useCallback(() => {
        setFilteredProducts(productsList.filter(product => 
            {
            const categoryFilter = specialityFiltersForProducts.length > 0 ? specialityFiltersForProducts.includes(product.category) : true;
            const sellerFilter = sellerFiltersForProducts.length > 0 ? sellerFiltersForProducts.includes(product.seller) : true;

            return categoryFilter && sellerFilter;
            }));
    },[productsList, specialityFiltersForProducts, sellerFiltersForProducts])

      const resetData = useCallback(() =>{
        setTimeout(()=>{
            setIsOpen(false);
            setSelectedVendors([])
            setSelectedSpecialities([])
            applySellersAndSpecialityFilters();
            setProductList([]);
            setSelectedProducts([])
            setIsVendorDropdownOpen(false)
            setIsSpecialityDropdownOpen(false)
            setIsColumnVisibilityOpen(false)
            setHasMore(true)
        },0)
      },[applySellersAndSpecialityFilters])

      const getSelectedCategories = (cats: any) => {
        return cats.map((item: any) => item.value);
      }

      const getSelectedLocation = useCallback(() => {
        if(selectedLocation){
            return selectedLocation;
        }
        else{
            if(sourcePage === 'preview'){
                return filtersFromStore.location
            }
        }
      },[filtersFromStore.location, selectedLocation, sourcePage])

      const getServiceability = useCallback((tags: any, locations: any) => {
        let locationselected = getSelectedLocation();
        if(locationselected && locationselected.length>0){
            let locationId : any;
            if(tags.filter((x: any)=>x.code === 'serviceability') && tags.filter((x: any)=>x.code === 'serviceability').length>0){
                let list = tags.filter((x: any)=>x.code === 'serviceability')[0].list;
                if(list && list.length>0){
                    locationId = list.filter((x:any)=> x.code === 'location')[0].value
                }

                
            let location: any  = getLatLongValues(locationId, locations)
            let lat1 = locationselected && locationselected[0] ? locationselected[0].location.latitude : null
            let long1 = locationselected && locationselected[0] ? locationselected[0].location.longitude : null
            let lat2 = location && location.location.length>0 ? location.location[0] : null
            let long2 = location && location.location.length>0 ? location.location[1] : null

            let dist = handleDistanceCalculate(lat1,
                long1,
                lat2,
                long2
            )

            if(dist === null){
                return 'NA'
            }
            else{
                return dist && location.radius  && dist <= location.radius.value ? 'Yes' : 'No'
            }

            
            }
            else{
                return 'NA'
            }

        }

        return 'NA'
      },[getSelectedLocation])

      const getDeliverableDetails = useCallback((tags: any, locations: any) =>{
        let locationId : any;
            if(tags.filter((x: any)=>x.code === 'serviceability') && tags.filter((x: any)=>x.code === 'serviceability').length>0){
                let list = tags.filter((x: any)=>x.code === 'serviceability')[0].list;
                if(list && list.length>0){
                    locationId = list.filter((x:any)=> x.code === 'location')[0].value
                }
            }
            
        return getLocation(locationId, locations) +' '+ getCircle(locationId, locations)

      },[])

      const getPrice = useCallback((price1: any, price2:any)=>{
        if (price1 === price2){
           return formatCurrency(price1)
        }
        else{
            return `${formatCurrency(price1)} to ${formatCurrency(price2)}`
        }
      },[])

      const formatEachItem = useCallback((provider: any, bppdescriptors: any, stream_id: any) => {
        let arr: any[] = []
            if(provider && provider.items && provider.items.length>0){
            provider.items.forEach((item: any, index: any)=>{
                arr.push({
                    stream_id: stream_id,
                    product_id: item.id,
                    selector_reference_id: stream_id+'.'+provider.id+'.'+item.id,
                    bpp_provider_id: provider? provider.id: '',
                    thumbnail: item.descriptor.images && item.descriptor.images.length>0? item.descriptor.images[0] : '',
                    product: item.descriptor.name? item.descriptor.name: '',
                    product_short_desc: item.descriptor.short_desc? item.descriptor.short_desc: '',
                    product_long_desc: item.descriptor.long_desc? item.descriptor.long_desc: '',
                    source: bppdescriptors.name? bppdescriptors.name : '',
                    measure: item.quantity && item.quantity.unitized && item.quantity.unitized.measure? `${item.quantity.unitized.measure.value}  ${item.quantity.unitized.measure.unit}`: '',
                    availability: item.quantity.available?`${item.quantity.available.count}` : '',
                    maximumQuantity: item.quantity.maximum?`${item.quantity.maximum.count}`:'',
                    seller: provider.descriptor? provider.descriptor.name : '',
                    seller_short_desc: provider.descriptor ? provider.descriptor.short_desc : '',
                    seller_long_desc: provider.descriptor ? provider.descriptor.long_desc : '',
                    seller_image: provider.descriptor && provider.descriptor.images.length>0 ? provider.descriptor.images[0] : '',
                    price: item.price? getPrice(item.price.value, item.price.maximum_value)
                      :
                      '',
                    category: item.category_id? item.category_id : '',
                    sellerLocation: item.location_id? getLocation(item.location_id,provider.locations): '',
                    returnable: item['@ondc/org/returnable'] && item['@ondc/org/returnable'] === true? 'Yes': 'No',
                    cancellable: item['@ondc/org/cancellable'] && item['@ondc/org/cancellable'] === true? 'Yes': 'No',
                    cod: item['@ondc/org/available_on_cod'] && item['@ondc/org/available_on_cod'] === true? 'Yes': 'No',
                    shippingTime: item['@ondc/org/time_to_ship']? getHumanizedData(item['@ondc/org/time_to_ship']): '',
                    sellerPickupReturn: item['@ondc/org/seller_pickup_return'] && item['@ondc/org/seller_pickup_return'] === true? 'Yes': 'No',
                    returnWindow: item['@ondc/org/return_window']? getHumanizedData(item['@ondc/org/return_window']): '',
                    manufacturer: 
                    (
                        item['@ondc/org/statutory_reqs_packaged_commodities']
                        &&
                        item['@ondc/org/statutory_reqs_packaged_commodities'].manufacturer_or_packer_name
                    )
                    ?
                        item['@ondc/org/statutory_reqs_packaged_commodities'].manufacturer_or_packer_name : '',
                    manufacturer_address: 
                    (
                        item['@ondc/org/statutory_reqs_packaged_commodities']
                        &&
                        item['@ondc/org/statutory_reqs_packaged_commodities'].manufacturer_or_packer_address
                    )
                        ?
                    item['@ondc/org/statutory_reqs_packaged_commodities'].manufacturer_or_packer_address : '',
                    commodity_name: 
                    (
                        item['@ondc/org/statutory_reqs_packaged_commodities']
                        &&
                        item['@ondc/org/statutory_reqs_packaged_commodities'].common_or_generic_name_of_commodity
                    )
                        ?
                    item['@ondc/org/statutory_reqs_packaged_commodities'].common_or_generic_name_of_commodity : '',
                    month_year_for_package: 
                    (
                        item['@ondc/org/statutory_reqs_packaged_commodities']
                        &&
                        item['@ondc/org/statutory_reqs_packaged_commodities'].month_year_of_manufacture_packing_import
                    )
                        ?
                    item['@ondc/org/statutory_reqs_packaged_commodities'].month_year_of_manufacture_packing_import : '',

                    fulfillment: item.fulfillment_id && provider.fulfillments? getFulfillment(item.fulfillment_id,provider.fulfillments) : '',
                    deliverableAt: provider.tags && provider.locations ? getDeliverableDetails(provider.tags,provider.locations): '',
                    serviceability: provider.tags && provider.locations ? getServiceability(provider.tags,provider.locations): '',
                    gallery: item.descriptor.images && item.descriptor.images.length>0?
                     getSlides(item.descriptor.images) : []
                })
                
            })
        }
        return arr;
      },[getDeliverableDetails, getPrice, getServiceability ])

      const formatEachBppProviderResult = useCallback((bppproviders: any, bppdescriptors: any, stream_id: any) => {
        let arr : any[] = []
        bppproviders.forEach((element: any, index: any)=>{
            arr.push(...formatEachItem(element, bppdescriptors,stream_id))
        })
        return arr
      },[formatEachItem])

      const formatSearchResults = useCallback((res: any) => {
        let arr : any[] = []
        res.forEach((element: any, index: any)=>{
            if(element.data.prodSearchResponse.message && 
                element.data.prodSearchResponse.message.catalog && 
                element.data.prodSearchResponse.message.catalog['bpp/providers'] &&
                element.data.prodSearchResponse.message.catalog['bpp/descriptor'])
                {
                    let catelog = element.data.prodSearchResponse.message.catalog;
                    arr.push(...formatEachBppProviderResult(catelog['bpp/providers'], catelog['bpp/descriptor'],element.id))
                }
        })
        return arr
        
      },[formatEachBppProviderResult])

      const fetchSearchResults = useCallback((msgId: any) => {
        setLoading(true)
        let payload : any = {
            message_id: msgId,
            subscriber_id: "ondc.opteamix.com",
            range: 25
        }
        if(lastId){
            payload['lastId'] = lastId;
        }
        getSearchResults(payload)
        .then((response: any) => {
           if (Array.isArray(response) && response.length> 0){
                let res = response[0];
                if (intervalIdRef.current !== null) {
                    clearInterval(intervalIdRef.current); // Clear the interval when stopping
                    intervalIdRef.current = null;  
                }

                  if(res.searched_products && res.searched_products.length>0 && res.searched_products.filter((x: any)=>x.data.prodSearchResponse).length>0){
                    setLastId(res.lastId)
                    let results = formatSearchResults(res.searched_products.filter((x: any)=>x.data.prodSearchResponse))
                    const uniqueProducts = results.reduce((acc: any, item: any) => {
                        // Check if the selector_reference_id is already in the accumulator
                        if (!acc.some((product: any) => product.selector_reference_id === item.selector_reference_id)) {
                          acc.push(item);
                        }
                        return acc;
                      }, []);
                    setTimeout(()=>{
                          setProductList((prevData: any) => [...prevData, ...uniqueProducts]);
                          setLoading(false);
                          if(sourcePage === 'preview'){
                            dispatch(updateSourcePage(''));
                          }
                        }, 1000)
                        setShowTable(true)
                  }
                  else if (!res.searched_products){
                    setTimeout(()=>{
                        setHasMore(false)
                        setLoading(false);
                        if(sourcePage === 'preview'){
                            dispatch(updateSourcePage(''));
                          }
                      }, 1500)
                      setShowTable(true)
                  }
            }
            else{
                if (intervalIdRef.current !== null) {
                    clearInterval(intervalIdRef.current); // Clear the interval when stopping
                    intervalIdRef.current = null;  
                }
                if(sourcePage === 'preview'){
                    dispatch(updateSourcePage(''));
                  }
                setHasMore(false)
                setLoading(false);
            }
            setOnSearchStatus('finished')
        })
        .catch(err => {
            if (intervalIdRef.current !== null) {
                clearInterval(intervalIdRef.current); // Clear the interval when stopping
                intervalIdRef.current = null;  
            }
            console.log(err)
            setLoading(false);
            setOnSearchStatus('finished')
            if(err && err.response && err.response.data && err.response.data.error && err.response.data.error.code && err.response.data.error.code === "2017004"){
                    openConfirmRetrySearchModal();
            }
            else{
                showWarningMessage(err.response.data.error.msg)
            }
        });
    },[dispatch, formatSearchResults, lastId, sourcePage])

      const initiateSearchForProducts = useCallback((cats: any) => {

        if(cats.length === 0){
            showWarningMessage("No Category selected")
        }
        else{
            resetData();
            let messageIDForPayload: any;
            messageIDForPayload = getNewMessageId();
            setOnSearchStatus('initiated')
            setLastId(null)
            let payload = {
                message_id: messageIDForPayload,
                criteria: {
                    
                    search_string: searchString
                },
                domain: getSelectedCategories(cats)
            }
            initiateSearch(payload)
            .then((data: any) => {
                if(data.error !== null){
                    // showSuccessMessage("search initiated successfully")
                    intervalIdRef.current = setInterval(()=>{
                        fetchSearchResults(messageIDForPayload);
                    },3000)
                }
            })
            .catch(err => {
                setLoading(false);
                showWarningMessage("error initiating")
                setOnSearchStatus('finished')
            });
        }

      },[fetchSearchResults, resetData, searchString])

      const fetchCategoriesFromOnlineStore = useCallback(() => {
        setFullPageLoading(true)
        getOnlineStore()
        .then((data: any) => {
            
            if(data && data.length>0){
                setCategiesData(data[0])
            }
            else{
                setCategories([]);
            }
            if(sourcePage && sourcePage === 'preview'){
                setSelectedProducts(productsFromStore)
                setFiltersObject(filtersFromStore);
                let messageIDForPayload = getMessageIdFromStore();
                fetchSearchResults(messageIDForPayload);
                // set messageid from store
                // update category, location and search string, lastid and do fetch results call
            }
            else if(sourcePage && sourcePage === 'collections'){
                dispatch(updateSourcePage(''));
                dispatch(updateSelectedCategoryForProductsList(''));
                setShowBackButton('show')
                if(data && data.length>0){
                    let cats = getCategiesData(data[0])
                    if(categoryFromCollections !== null){
                        setSelectedCategories(categoryFromCollections)
                        if(cats && cats.length>0 && cats.filter((x: any)=> x.value === categoryFromCollections[0].value).length>0){
                            initiateSearchForProducts(categoryFromCollections)
                        }
                        else{
                            showWarningMessage(CATEGORY_NOT_REGISTERED)
                        }
                    }
                    else{
                        setSelectedCategories(cats)
                        initiateSearchForProducts(cats)
                    }
                }
                else{
                    showWarningMessage(NO_CATEGORIES_REGISTERED)
                }

            }
            else{
                // setMessageID("MSG"+uuidv4())
            }
            setData(JSON.parse(JSON.stringify(columns_from_api)))
            setFullPageLoading(false);
        })
        .catch(err => {
            setFullPageLoading(false);
        });
    },[categoryFromCollections, columns_from_api, dispatch, fetchSearchResults, filtersFromStore, getMessageIdFromStore, initiateSearchForProducts, productsFromStore, sourcePage])

    useEffect(() => {
        // setSelectedCategory(categories.filter((x:any)=> x.id === "Food and beverages")[0])
        fetchCategoriesFromOnlineStore();

        return () => {
            dispatch(updateSourcePage(''));
        }
// eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

      const getHumanizedData = (value:any) => {
            return 'In ' +moment.duration(value).humanize()
      }

      const getLatLongValues = (locationId: any, locations: any) => {
        let location: any;
        if(locations.length>0 && locations.filter((loc: any) => loc.id === locationId).length>0){
         location = locations.filter((loc: any) => loc.id === locationId)[0];
        }
        // If the location is found, extract the city
        if (location && location.circle) {
          return  {location:location.circle.gps.split(','), radius: location.circle.radius} // Output: Bengaluru
        } else {
          return null
        }

        }

      const getFulfillment = (id: any, fulfillments: any) => {
        let fulfillment: any;
        if(fulfillments && fulfillments.length>0 && fulfillments.filter((loc: any) => loc.id === id).length>0){
            fulfillment = fulfillments.filter((loc: any) => loc.id === id)[0];
        }
        // If the location is found, extract the city
        if (fulfillment) {
          const type = fulfillment.type;
          return type;  // Output: Bengaluru
        } else {
          return ''
        }
      }

      const formatCurrency =(price: any) => {
        // Format the number with currency style
        const formattedPrice = new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
        }).format(price);
      
        // Check if the price has decimal part .00 and remove it
        if (formattedPrice.includes('.00')) {
          // Remove the decimal part
          return formattedPrice.split('.')[0];
        }
      
        return formattedPrice;
      }

      const getLocation = (locationId: any, locations: any) => {
        let location: any;
        if(locations.length>0 && locations.filter((loc: any) => loc.id === locationId).length>0){
         location = locations.filter((loc: any) => loc.id === locationId)[0];
        }
        // If the location is found, extract the city
        if (location) {
          const city = location.address.city;
          const area_code = location.address.area_code;
          return `${city}, ${area_code}`;  // Output: Bengaluru
        } else {
          return ''
        }
      }

      const getCircle = (locationId: any, locations: any) => {
        let location: any;
        if(locations.length>0 && locations.filter((loc: any) => loc.id === locationId).length>0){
         location = locations.filter((loc: any) => loc.id === locationId)[0];
        }
        // If the location is found, extract the city
        if (location && location.circle) {
          return `within ${location.circle.radius.value} ${location.circle.radius.unit}`;  // Output: Bengaluru
        } else {
          return ''
        }
      }

    const getSlides = (images: any) => {
        return images.reduce((acc: any, imageUrl: any) => {
            acc.push({ src: imageUrl, alt: '' });
            return acc;
          }, []); 
    }

    const [lastScrollTop, setLastScrollTop] = useState(0)
    const [lastScrollLeft, setLastScrollLeft] = useState(0)


    const handleScroll = (event: any) => {
        const { scrollTop, scrollHeight, clientHeight, scrollLeft} = event.target;

        // Calculate how much the user has scrolled
        const verticalScrollChange = Math.abs(scrollTop - lastScrollTop);
        const horizontalScrollChange = Math.abs(scrollLeft - lastScrollLeft);

        // Check if the user is scrolling vertically or horizontally
        const isVerticalScroll = verticalScrollChange > horizontalScrollChange;
        const isHorizontalScroll = horizontalScrollChange > verticalScrollChange;

        // Update last scroll positions
        setLastScrollTop(scrollTop);
        setLastScrollLeft(scrollLeft);

        // If vertical scroll is happening and it's at the bottom, load more
        const isAtBottom = scrollHeight - scrollTop <= clientHeight + 10;

        if (isVerticalScroll && isAtBottom && !isHorizontalScroll) {
            loadMore();
        }
      };

    const loadMore = () => {
        setHasMore(true)
        fetchSearchResults(messageID);
      };
    

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    // vendor selection

    const handleVendorSelectionClick = (values: any) => {
        if(isVendorDropdownOpen){
            setIsVendorDropdownOpen(false)
        }
        else{
            fetchSellersList();
        }
        
    }

    const fetchSellersList = () => {
        let payload : any = {
            message_id: messageID,
            subscriber_id: "ondc.opteamix.com",
        }

        getSellersList(payload)
        .then((response: any) => {
           if (Array.isArray(response) && response.length> 0){
                let result = getFormattedSellers(response);
                setVendorsList(result)
                setIsVendorDropdownOpen(true)
            }
            else{
                setVendorsList([])
                setIsVendorDropdownOpen(true)
            }
        })
        .catch(err => {
            console.log(err)
            setLoading(false);
        });
    }

    const getFormattedSellers = (sellers: any) => {
        let result: any = [];

        sellers.forEach((seller: any) => {
                    result.push({
                        value: seller.provider_id,
                        label: seller.provider_name
                    });

        });
        result.sort((a: any, b: any) => a.label.localeCompare(b.label));
        return result;
    }

    useEffect(()=>{
        setSellerFiltersForProducts(selectedVendors.map((item: any)=> item.label))
    },[selectedVendors])

    const clearVendorList = () => {
        setSelectedVendors([])
        setIsVendorDropdownOpen(false)
    }

    const updateSelectedVendorList = (list: any) => {
        setSelectedVendors(list)
    }

    const clearSelectedVendorList = () => {
        setSelectedVendors([])
    }

    const applyFilterOfVendorList  = () => {
        applySellersAndSpecialityFilters();
        setIsVendorDropdownOpen(false)
    }

    // category selection

    const updateSelectedCategoriesList = (list: any) => {
        setSelectedCategories(list)
    }

    const clearSelectedCategoriesList = () => {
        setSelectedCategories([])
    }

    const applyFilterOfCategoriesList  = () => {
        setIsOpen(false)
    }

    // speciality selection

    const handleSpecialitySelectionClick = (values: any) => {
        if(isSpecialityDropdownOpen){
            setIsSpecialityDropdownOpen(false)
        }
        else{
            fetchSpecialityList();
        }
        
    }

    const fetchSpecialityList = () => {
        let payload : any = {
            message_id: messageID,
            subscriber_id: "ondc.opteamix.com",
        }

        getSpecialityList(payload)
        .then((response: any) => {
           if (Array.isArray(response) && response.length> 0){
                let result = getFormattedSpeciality(response);
                setSpecialityList(result)
            setIsSpecialityDropdownOpen(true)
            }
            else{
                setSpecialityList([])
                setIsSpecialityDropdownOpen(true)
            }
        })
        .catch(err => {
            console.log(err)
            setLoading(false);
        });
    }

    const getFormattedSpeciality = (specialities: any) => {
        let result: any = [];

        specialities.forEach((speciality: any) => {
                    result.push({
                        value: speciality,
                        label: speciality
                    });

        });
        result.sort((a: any, b: any) => a.label.localeCompare(b.label));
        return result;
    }

    useEffect(()=>{
        setSpecialityFiltersForProducts(selectedSpecialities.map((item: any)=> item.label))
    },[selectedSpecialities])

    const updateSelectedSpecialityList = (list: any) => {
        setSelectedSpecialities(list)
    }



    const clearSpecialityList = () => {
        setSelectedSpecialities([])
        setIsSpecialityDropdownOpen(false)
    }

    const clearSelectedSpecialityList = () => {
        setSelectedSpecialities([])
    }

    const applyFilterOfSpecialityList = () => {
        applySellersAndSpecialityFilters();
        setIsSpecialityDropdownOpen(false)
    }

    useEffect(()=>{
        applySellersAndSpecialityFilters();
    },[sellerFiltersForProducts, applySellersAndSpecialityFilters])

    useEffect(()=>{
        applySellersAndSpecialityFilters();
    },[specialityFiltersForProducts, applySellersAndSpecialityFilters])

    useEffect(()=>{
        applySellersAndSpecialityFilters();
    },[productsList, applySellersAndSpecialityFilters])

    // products

    const openProductDetails = (product: any, col: any) => {
        if (col.column === "product") {
            if (!isProductDetailsOpen) {
                setSelectedProductToViewDetails(product)
                setIsProductDetailsOpen(true)
            }
        }
        if(col.column === "thumbnail"){
            if (!isProductThumbnailOpen) {
                setSelectedProductToViewDetails(product)
                setIsProductThumbnailOpen(true)
            }
        }
    }

    const closeProductDetails = () => {
        setIsProductDetailsOpen(false)
    }

    // column visibility
    const handleColumnVisiblityClick = (values: any) => {
        setIsColumnVisibilityOpen(!isColumnVisibilityOpen)
    }

    const toggleColumnVisibility = (col: any) => {
        setColumns((prevSelected: any) => {
            prevSelected.filter((x: any)=>x.column === col.column)[0].isVisible = !col.isVisible
              return [...prevSelected];
            }
          );
      }

      const resetColumnVisibility = () => {
        let data = JSON.parse(JSON.stringify(columns_from_api));
        setColumns(data)
      }

      const toggleProductSelection = (product: any) => {
        if(!isProductDetailsOpen){
            setSelectedProducts((prevSelected: any) => {
                if (prevSelected.some((obj: any) => obj.selector_reference_id === product.selector_reference_id)) {
                  return prevSelected.filter((item: any) => item.selector_reference_id !== product.selector_reference_id);
                } else {
                  return [...prevSelected, product];
                }
              });
        }
      }


      const previewSelected = () => {
        if(selectedProducts.length>0){
            dispatch(updateSelectedProductsList(selectedProducts));
            dispatch(updateProductsColumnsList(columns));
            dispatch(updateProductsListFilters({
                location: selectedLocation,
                category: selectedCategories,
                searchString: searchString,
                seller: null,
                speciality: null,
                messageID: messageID
            }))
            navigate("/landing-page/products/products-preview")

        }
        else{
            showWarningMessage(NO_PRODUCTS_SELECTED)
        }

    }

    const navigateToCollectionsList = () => {
        navigate('/landing-page/products/collections')
    }

    const setLocation = (e:any)=>{
        console.log("selected location = ",e)
        setSelectedLocation(e)
        closeSelectLocationWindow();

    }

    const handleCheckboxNoAction = () => {

    }

    const handleEnterPressForSearch = (event: any) => {
        if (event.key === 'Enter') {
            initiateSearchForProducts(selectedCategories);
        }
      };

    const openConfirmRetrySearchModal = () => {
        setConfirmRetrySearchModalOpen(true);
    }

    const closeConfirmRetrySearchModal = () => {
        setConfirmRetrySearchModalOpen(false);
      }

    const retrySearch = () => {
        initiateSearchForProducts(selectedCategories)
        closeConfirmRetrySearchModal();
    }

    const closeShowThumbnailModal = () => {
        setIsProductThumbnailOpen(false);
      }
    

    return (
        <>
        {
            !fullPageLoading && (
                <div className="container-fluid h-auto mt-3 px-3">
                
               
                

                <div className="row mt-0 mb-1">
                    <div className="col-6 text-left">
                    <h3>
                        {
                    showBackButton ==='show' && (
                        
                    <span onClick={navigateToCollectionsList} className='cursor-pointer'><i className='	fa fa-arrow-left me-2'></i></span>  )
}Products</h3>
                        {/* {
                            selectedLocation  &&
                            selectedLocation.map((location: any) => (
                                <div key={location.location.latitude}>
                                  <p>latitude: {location.location.latitude}</p>
                                  <p>longitude: {location.location.longitude}</p>
                                  <p>Formatted address: {location.formatted_address}</p>
                                </div>
                              ))
                        } */}
                    </div>
                    
                    {
                        selectedProducts.length>0 && (
                            <div className="col-6 text-right">
                                {
                                       
                                                <span><strong><i className="fa fa-minus-square"></i><span className="px-3">{selectedProducts.length} products selected </span></strong></span>
                                        
                                        
                                    }
                                <button type="button"
                                    className="btn-custom" onClick={previewSelected}>Preview Selected</button>
                            </div>
                        )
                    }

                </div>
                <div className="row mt-0">
                    <div className="col-12 ">
                        <div className="card shadow bg-white table-padding mb-2 px-1 py-1">
                            <div className="row">
                                <div className="col-3">
                                    <div className="select-location-container text-left">
                                        <div className='d-flex cursor-pointer' onClick={openSelectLocationWindow}>
                                        <i className="fas fa-location-dot" ></i>
                                        <p className='mb-0 pl-3 selected-location-text ellipsis'>{selectedLocation ? 
                                        selectedLocation.map((location: any) => (
                                              <span key={location.location.latitude}>{location.address}</span>
                                          ))
                                        
                                        : ('Select location')}</p>
                                        </div>

                                        <i className="fa fa-close fa-sm pl-0 pr-3 cursor-pointer" onClick={clearLocation}> </i>
                                    </div>
                                </div>
                                <div className="col-9" ref={categoriesPopupRef}>
                                    <div className="category-search-container">
                                        <div className="category-dropdown-toggler w-auto cursor-pointer" onClick={toggleDropdown} >
                                            <p className="category-text w-auto mb-0 ellipsis">
                                            {
                                                    selectedCategories && selectedCategories.length > 0 ?
                                                        <>
                                                            {
    
                                                                selectedCategories
                                                                    .map((category: any, index: any) => {
                                                                        return index > 0 ?
                                                                            <span key={category.value}>,&nbsp;{category.label}
                                                                            </span>
                                                                            :
                                                                            <span key={category.value}>&nbsp;{category.label}
                                                                            </span>
                                                                    })
                                                            }
                                                            {/* <span>&nbsp; <i className='fa fa-close pl-2 cursor-pointer' onClick={clearSelectedCategoriesList}></i> </span> */}
    
                                                        </>
    
                                                        :
    
                                                        <>Select Category</>
                                                } </p>
                                                {
                                                    isOpen?
                                                    <i className="fa fa-caret-up " ></i>
                                                    :
                                                    <i className="fa fa-caret-down " ></i>
                                                }
                                        </div>
                                        <div className="search w-100 d-flex">
                                            <input className="search_input category-selector-search-input" type="text" name="" value={searchString} placeholder="search here" 
                                            onChange={handleSearchStringChange} onKeyDown={handleEnterPressForSearch} onClick={applyFilterOfCategoriesList}/>
                                            <span className="search_icon cursor-pointer" onClick={()=>initiateSearchForProducts(selectedCategories)}><i className="fa fa-search"></i></span>
                                        </div>

                                    </div>
                                    {isOpen && (
                                                <div className="vendor-selection-dropdown">
                                                    
                                                <SearchableMultiselectList
                                                    list={categories}
                                                    selectedItems={selectedCategories}
                                                    selectedItemsChanged={updateSelectedCategoriesList}
                                                    clearSelectedItemsList={clearSelectedCategoriesList}
                                                    applySelectedList={applyFilterOfCategoriesList}
                                                    showApply={true}>

                                                </SearchableMultiselectList>
                                                </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        (onSearchStatus === 'finished' && showTable) ?
                        (
                            <div className="col-12">
                            <div className="card shadow bg-white table-padding mb-3 py-2 ">
                                {/* <div className="row">
                                    <div className="col"> */}
                                <div className='filter-sort-container pb-2 px-3'>
                                    <div className='filters-container'>
                                        <div className='products-vendor-filter-container' ref={vendorPopupRef}>
                                        <div className="vendor-selection-container mr-2 px-2 cursor-pointer" onClick={handleVendorSelectionClick}>
                                            <p className='mb-0 pl-2 cursor-pointer seller-text' >Product vendor
                                                {
                                                    selectedVendors.length > 0 &&
                                                        <>
                                                            <span>&nbsp; is </span>
                                                            {
    
                                                                selectedVendors
                                                                    .map((vendor: any, index: any) => {
                                                                        return index > 0 ?
                                                                            <span key={vendor.value}>,&nbsp;{vendor.label}
                                                                            </span>
                                                                            :
                                                                            <span key={vendor.value}>&nbsp;{vendor.label}
                                                                            </span>
                                                                    })
                                                            }
                                                            
    
                                                        </>
                                                }
                                            </p>
                                            {
                                                    selectedVendors.length > 0 &&
                                            <p className='mb-0'>&nbsp; <i className='fa fa-close cursor-pointer mb-0' onClick={clearVendorList}></i> </p>
                                            }
                                            {
                                                !isVendorDropdownOpen && selectedVendors.length === 0 &&
                                                    <p className='mb-0 d-flex'>&nbsp; <i className='fa fa-caret-down pr-2 cursor-pointer float-right align-self-center' ></i> </p>
                                            }
    
                                        </div>
                                        {
                                                isVendorDropdownOpen && (
                                                    <div className="vendor-selection-dropdown">
    
                                                        <SearchableMultiselectList
                                                            list={vendors_list}
                                                            selectedItems={selectedVendors}
                                                            selectedItemsChanged={updateSelectedVendorList}
                                                            clearSelectedItemsList={clearSelectedVendorList}
                                                            applySelectedList={applyFilterOfVendorList}
                                                            showApply={true}>
    
                                                        </SearchableMultiselectList>
                                                    </div>
                                                )
                                            }
                                        </div>
    
                                        <div className='products-speciality-filter-container' ref={specialityPopupRef}>
                                        <div className='speciality-selection-container px-2 cursor-pointer' onClick={handleSpecialitySelectionClick}>
                                            <p className='mb-0 pl-2 cursor-pointer speciality-text' >Speciality
                                                {
                                                    selectedSpecialities.length > 0 &&
                                                        <>
                                                            <span>&nbsp; is </span>
                                                            {
    
                                                                selectedSpecialities
                                                                    .map((speciality: any, index: any) => {
                                                                        return index > 0 ?
                                                                            <span key={speciality.value}>,&nbsp;{speciality.label}
                                                                            </span>
                                                                            :
                                                                            <span key={speciality.value}>&nbsp;{speciality.label}
                                                                            </span>
                                                                    })
                                                            }
                                                        </>
                                                }
                                            </p>
                                            {
                                                selectedSpecialities.length > 0 &&
                                                <p className='mb-0'>&nbsp; <i className='fa fa-close cursor-pointer' onClick={clearSpecialityList}></i> </p>
                                            }
                                            {
                                                !isSpecialityDropdownOpen && selectedSpecialities.length === 0 &&
                                                <p className='mb-0 d-flex'>&nbsp; <i className='fa fa-caret-down pr-2 cursor-pointer float-right align-self-center' onClick={handleSpecialitySelectionClick}></i> </p>
                                                
                                            }
                                            </div>
                                            {
                                                isSpecialityDropdownOpen && (
    
                                                    <div className="speciality-selection-dropdown">
                                                        <SearchableMultiselectList
                                                            list={speciality_list}
                                                            selectedItems={selectedSpecialities}
                                                            selectedItemsChanged={updateSelectedSpecialityList}
                                                            clearSelectedItemsList={clearSelectedSpecialityList}
                                                            applySelectedList={applyFilterOfSpecialityList}
                                                            showApply={true}>
    
                                                        </SearchableMultiselectList>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className="column-visibility-sortby-container">
                                    <div className='column-visibility-container mr-2' ref={columnVisibilityPopupRef}>
                                        <button
                                            className="btn btn-custom-light float-right column-visibility-selection-container"
                                            type="button"
                                            onClick={handleColumnVisiblityClick}
                                        >
                                            <i className="fa fa-bars" style={{ fontSize: '17px' }}
                                            ></i>
    
                                        </button>
                                        {
                                            isColumnVisibilityOpen && (
                                                <div className="column-visibility-selection-dropdown">
                                                    <p className='pl-2 mb-1 mt-1'>Show/Hide Columns</p>
                                                    <ul className="list-unstyled mt-1 mb-4">
                                                        
                                                        {
                                                                columns
                                                                    .map((col: any, index: any) => {
                                                                        return <li key={index} className='d-flex flex-row px-2' onClick={() => toggleColumnVisibility(col)}>
                                                                            <input type="checkbox"
                                                                                checked={col.isVisible}
                                                                                onChange={handleCheckboxNoAction}
                                                                            />
                                                                            <span className="dropdown-item ml-0 pl-2 small fw-semibold oneline_ellipsis"
                                                                                role="button" title="All">{col.visibilityDisplayName}</span></li>
                                                                    })
                                                            }
                                                    </ul>
                                                    <p className='clear-text mb-0 cursor-pointer pl-2 mt-2' onClick={resetColumnVisibility}>
                                                                    reset
                                                                </p>
                                                </div>
                                            )
                                        }
    
                                    </div>
                                    
                                    </div>
    
                                </div>
    
                                <div className='table-responsive'                            
                                onScroll={handleScroll}
                                style={tablescrollstyles.loadonscroll}>                            
                                <table className="table table-hover  product-table text-left" style={{ marginBottom: '0px', cursor: 'pointer' }}>
    
                                    <thead className="table-light">
                                        <tr>
                                            <th ></th>
                                            {
                                                columns.map((col: any, index: any) => {
                                                    return col.isVisible && <th key={index} style={{ padding: '0.375rem',minWidth:col.minWidth?col.minWidth:"auto"}}>{col.coltitle}</th>
                                                })
                                            }
    
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filteredProducts
                                                .map((product: any, index: any) => {
                                                    return <tr key={index}>
                                                        <td className='products-list'><input type="checkbox" 
                                                        checked={selectedProducts.some((obj: any) => obj.selector_reference_id === product.selector_reference_id)}
                                                        onChange={() => toggleProductSelection(product)} /></td>
                                                        {
                                                            columns
                                                                .map((col: any, i: any) => {
                                                                    return col.isVisible &&
                                                                        (
                                                                            col.type === "image" ?
                                                                                <td onClick={()=>openProductDetails(product, col)} key={i} className="product-small-image px-0" style={{ paddingLeft: '0px !important' }}>
                                                                                    <img src={product[col.column]} alt="" /></td>
                                                                                :
    
                                                                                (
                                                                                    col.type === "active-draft-button" ?
                                                                                        <td onClick={()=>openProductDetails(product, col)} key={i}><span className={product[col.column] === 'Active' ? "product-active" : "product-draft"}>{product[col.column]}</span></td>
                                                                                        :
                                                                                        <td onClick={()=>openProductDetails(product, col)} key={i}>{product[col.column]}</td>
                                                                                )
    
                                                                        )
    
                                                                })
                                                        }
                                                    </tr>
                                                })
                                        }
    
                                    </tbody>
                                </table>
                                </div>
                                {
                                            loading &&
                                            <div className="loader-container mt-2">
                                                <div className="loader">
    
                                                </div>
                                                <div>
                                                    <p className='mt-2 ml-2'>Loading</p>
                                                </div>
    
                                            </div>
                                        }
                                        {
                                        !hasMore && 
                                        <>
                                        <p className='mt-2 mb-0' style={{ textAlign: 'center',color: 'darkgray' }}>No more data.  &nbsp;&nbsp;
                                            <span className='mt-2 cursor-pointer check-more-text' onClick={loadMore}>Check for more data</span>
                                        </p>

                                        </>
                                        }
                            </div>
                        </div>
                        )

                        :

                        onSearchStatus === 'not-started' ?

                        <></>

                        :

                        onSearchStatus === 'initiated'
                        ?
                        
                        <div className="loader-container mt-2">
                        <div className="loader">

                        </div>
                        <div>
                            <p className='mt-2 ml-2'>Loading</p>
                        </div>

                    </div>

                        : 
                        <></>

                    }


                </div>
                {
                    isProductDetailsOpen && (
                        <div className='card product-details-window'>
                            <ProductDetails productDetails={selectedProductToViewDetails} closeProductDetails={closeProductDetails}></ProductDetails>
                        </div>
                    )
                }
                
                <ModalWindow show={open} modalClosed={closeSelectLocationWindow}>
                    <MapComponent  closeModal={closeSelectLocationWindow} setLocation={setLocation}/>
                </ModalWindow>
               
            </div>
            )
        }
            <ModalWindow show={openRetrySearchConfirm} modalClosed={closeConfirmRetrySearchModal}>
                <ConfirmDelete confirmModalClosed={closeConfirmRetrySearchModal}  deleteRecord={retrySearch} msg={retrySearchConfirmationMsg} deleteText={retrySearchConfirmationText}/>
            </ModalWindow>
            <ModalWindow show={isProductThumbnailOpen} modalClosed={closeShowThumbnailModal}>
                <ProductThumbnail productDetails={selectedProductToViewDetails} closeModal={closeShowThumbnailModal}/>
            </ModalWindow>

        </>
    ) 

}

export default ProductsList;