import Multiselect from 'multiselect-react-dropdown';
import React, { useEffect, useRef, useState } from 'react';
import '@splidejs/splide/dist/css/splide.min.css';
import { v4 as uuidv4 } from 'uuid';

import { Options, Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { useDispatch, useSelector } from 'react-redux';
import { updateProductsColumnsList, updateProductsListFilters, updateSelectedCategoryForProductsList, updateSelectedProductsList, updateSourcePage } from '../../utils/reduxStore/productsSlice';
import { showSuccessMessage, showWarningMessage } from '../../shared/notificationProvider';
import { NO_PRODUCTS_SELECTED } from '../../utils/constants/NotificationConstants';
import { useNavigate } from 'react-router-dom';
import SearchableMultiselectList from './SearchableMultiselectList';
import ModalWindow from './ModalWindow';
import MapComponent from './MapComponent';
import { getSearchResults, getSellersList, getSpecialityList, initiateSearch } from '../../services/ProductsService';
import { getOnlineStore } from '../../services/AccountService';
import ProductDetails from './ProductDetails';
import moment from 'moment';

const ProductsList = () => {


    const [columns_from_api, setColumnsFromApi] = useState<any[]>([
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
            minWidth:'100px'
        },
        {
            coltitle: "Seller",
            visibilityDisplayName: "Seller",
            column: "seller",
            type: "text",
            serialNo: 2,
            isVisible: true
        },
        {
            coltitle: "Source",
            visibilityDisplayName: "Source",
            column: "source",
            type: "text",
            serialNo: 2,
            isVisible: true
        },
        {
            coltitle: "Measure",
            visibilityDisplayName: "Measure",
            column: "measure",
            type: "text",
            serialNo: 2,
            isVisible: true
        },
        {
            coltitle: "Availability",
            visibilityDisplayName: "Availability",
            column: "availability",
            type: "text",
            serialNo: 2,
            isVisible: true
        },
        {
            coltitle: "Max Quantity",
            visibilityDisplayName: "Max Quantity",
            column: "maximumQuantity",
            type: "text",
            serialNo: 2,
            isVisible: true
        },
        {
            coltitle: "Price",
            visibilityDisplayName: "Price",
            column: "price",
            type: "text",
            serialNo: 2,
            isVisible: true
        },
        {
            coltitle: "Category",
            visibilityDisplayName: "Category",
            column: "category",
            type: "text",
            serialNo: 2,
            isVisible: true
        },
        {
            coltitle: "Seller Location",
            visibilityDisplayName: "Seller Location",
            column: "sellerLocation",
            type: "text",
            serialNo: 2,
            isVisible: true
        },
        {
            coltitle: "Returnable",
            visibilityDisplayName: "Returnable",
            column: "returnable",
            type: "text",
            serialNo: 2,
            isVisible: true
        },
        {
            coltitle: "Cancellable",
            visibilityDisplayName: "Cancellable",
            column: "cancellable",
            type: "text",
            serialNo: 2,
            isVisible: true
        },
        {
            coltitle: "COD",
            visibilityDisplayName: "COD",
            column: "cod",
            type: "text",
            serialNo: 2,
            isVisible: true
        },
        {
            coltitle: "Shipping time",
            visibilityDisplayName: "Shipping time",
            column: "shippingTime",
            type: "text",
            serialNo: 2,
            isVisible: true
        },
        {
            coltitle: "Seller return",
            visibilityDisplayName: "Seller return",
            column: "sellerPickupReturn",
            type: "text",
            serialNo: 2,
            isVisible: true
        },
        {
            coltitle: "Return Window",
            visibilityDisplayName: "Return window",
            column: "returnWindow",
            type: "text",
            serialNo: 2,
            isVisible: true
        },
        {
            coltitle: "Manufacturer",
            visibilityDisplayName: "Manufacturer",
            column: "manufacturer",
            type: "text",
            serialNo: 2,
            isVisible: true
        },
        {
            coltitle: "Fulfillment",
            visibilityDisplayName: "Fulfillment",
            column: "fulfillment",
            type: "text",
            serialNo: 2,
            isVisible: true
        },
        {
            coltitle: "Deliverable At",
            visibilityDisplayName: "Deliverable At",
            column: "deliverableAt",
            type: "text",
            serialNo: 2,
            isVisible: true
        },
        
    ])

    

    const [vendors_list,setVendorsList] = useState<any>([]);
      
      const sort_list = [
        { value: 'product_ame', label: 'Product Name'},
        { value: 'seller', label: 'Seller'},
        { value: 'category', label: 'Category'},
      ]

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
    const [isSpecialityDropdownOpen, setIsSpecialityDropdownOpen] = useState(false);
    const [selectedSpecialities, setSelectedSpecialities] = useState([])
    const [isSortByOpen, setSortByOpen] = useState(false);
    const [selectedSortBy, setSelectedSortBy] = useState('')
    const [isColumnVisibilityOpen, setIsColumnVisibilityOpen] = useState(false);
    const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [selectedLocation, setSelectedLocation] = useState('')
    const [showTable, setShowTable] = useState(false)
    const [searchString, setSearchString] = useState('')
    const user_details = localStorage.getItem('user_details') ? JSON.parse(localStorage.getItem('user_details') || '{}') : null;
    const intervalIdRef =  useRef<number |any>(null)
    const [lastId, setLastId]= useState<any>(null)
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [open, setModalOpen] = useState(false);
    const [fullPageLoading, setFullPageLoading] = useState(true)
    const [searchResultsLoading, setSearchResultsLoading] = useState(true)
    const [categories, setCategories] = useState([])
    const [onSearchStatus, setOnSearchStatus] = useState('not-started')
    const [selectedProductToViewDetails, setSelectedProductToViewDetails] = useState<any>(null)




    const [messageID, setMessageID] = useState<any>(null);

    const sourcePage = useSelector((store: any) => store.products.sourcePage);
    const selectedCategoryToLoad = useSelector((store: any) => store.products.selectedCategoryForProductList);
    const productsFromStore = useSelector((store: any) => store.products.selectedProductsList);
    const filtersFromStore = useSelector((store: any) => store.products.productListFilters);
    const msgIdFromStore = useSelector((store: any) => store.products.productListFilters).messageID
    
    const tablescrollstyles = {
        loadonscroll:{
          maxHeight: showBackButton ==='show' ? "300px" : "340px",
          overflowY: 'scroll' as 'scroll',
        }
      };

    const setFiltersObject = (filters: any)=>{
        setSelectedCategory(filters.category)
        setSelectedLocation(filters.location)
        setSearchString(filters.searchString)
        // setMessageID(filters.messageID)   
    }

    useEffect(() => {
        // setSelectedCategory(categories.filter((x:any)=> x.id === "Food and beverages")[0])
        fetchCategoriesFromOnlineStore();

        return () => {
            dispatch(updateSourcePage(''));
        }

    },[]);

    const setData = (data: any) => {
        setColumns(data);
      }

      const clearLocation = (event: any) => {
        setSelectedLocation('')
      }

      const openSelectLocationWindow = () => {
        setModalOpen(true);
      }

      const closeSelectLocationWindow = () => {
        setModalOpen(false);
      };

    const setSelectedCategoryValue = (cat : any) => {
        setSelectedCategory(cat)
        setIsOpen(false)
      }

    const handleSearchStringChange = (event: any) => {
        setSearchString(event.target.value);
      };

    const fetchCategoriesFromOnlineStore = () => {
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
                dispatch(updateSourcePage(''));
                fetchSearchResults(messageIDForPayload);
                // set messageid from store
                // update category, location and search string, lastid and do fetch results call
            }
            else if(sourcePage && sourcePage === 'collections'){
                dispatch(updateSourcePage(''));
                dispatch(updateSelectedCategoryForProductsList(''));
                setShowBackButton('show')
                initiateSearchForProducts()
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
    }

    const setCategiesData = (values: any) => {
        if(values.categoryCityMappings.length> 0){
            const result = values.categoryCityMappings.reduce((acc: any, item: any) => {
                // Check if the category_id already exists in the accumulator
                const existingCategory = acc.find((c: any) => c.category_id === item.category_id);
                
                if (!existingCategory) {
                    // Add the category with additional fields
                    acc.push({
                        category_id: item.category_id,
                        ondc_categories_code: item.category.ondc_categories_code,
                        description: item.category.description
                    });
                }
                
                return acc;
            }, []);
            
            setCategories(result)
            
        }

    }

    const getMessageIdFromStore = () => {
        const id = msgIdFromStore;
        setTimeout(()=>{
            setMessageID(id)
        },0)
        return id;
    }

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

      const resetData =() =>{
        setTimeout(()=>{
            setProductList([]);
            setSelectedProducts([])
        },0)
      }

    const initiateSearchForProducts = () => {
        resetData();
        if(selectedCategory === null){
            showWarningMessage("No Category selected")
        }
        else{
            let messageIDForPayload: any;
            messageIDForPayload = getNewMessageId();
            setSearchResultsLoading(true)
            setOnSearchStatus('initiated')
            setLastId(null)
            console.log(messageID)
            let payload = {
                message_id: messageIDForPayload,
                criteria: {
                    category_id: selectedCategory? selectedCategory.ondc_categories_code : '',
                    search_string: searchString
                },
                categories: [selectedCategory?.category_id]
            }
            initiateSearch(payload)
            .then((data: any) => {
                console.log(data)
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
                setSearchResultsLoading(false)
            });
        }

      }

    const fetchSearchResults = (msgId: any) => {
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
                // showSuccessMessage("fetched search results")
                setLastId(res.lastId)
                if (intervalIdRef.current !== null) {
                    console.log("here")
                    clearInterval(intervalIdRef.current); // Clear the interval when stopping
                    intervalIdRef.current = null;  
                }

                  if(res.searched_products && res.searched_products.length>0 && res.searched_products.filter((x: any)=>x.data.prodSearchResponse).length>0){
                    let results = formatSearchResults(res.searched_products.filter((x: any)=>x.data.prodSearchResponse))
                    setTimeout(()=>{
                          setProductList((prevData: any) => [...prevData, ...results]);
                          setLoading(false);
                        }, 1000)
                        setShowTable(true)
                  }
                  else{
                    setTimeout(()=>{
                        setHasMore(false)
                        setLoading(false);
                      }, 1500)
                      setShowTable(true)
                  }
            }
            else{
                setHasMore(false)
                setLoading(false);
            }
            setOnSearchStatus('finished')
        })
        .catch(err => {
            console.log(err)
            setLoading(false);
            setOnSearchStatus('finished')
            showWarningMessage("error fetching search results")
        });
    }

      const formatSearchResults = (res: any) => {
        let arr : any[] = []
        res.forEach((element: any, index: any)=>{
            if(element.data.prodSearchResponse.message && 
                element.data.prodSearchResponse.message.catalog && 
                element.data.prodSearchResponse.message.catalog['bpp/providers'] &&
                element.data.prodSearchResponse.message.catalog['bpp/descriptor'])
                {
                    let catelog = element.data.prodSearchResponse.message.catalog;
                    arr.push(...formatEachBppProviderResult(catelog['bpp/providers'], catelog['bpp/descriptor']))
                }
        })
        return arr
        
      }

      const formatEachBppProviderResult = (bppproviders: any, bppdescriptors: any) => {
        let arr : any[] = []
        bppproviders.forEach((element: any, index: any)=>{
            arr.push(...formatEachItem(element, bppdescriptors))
        })
        return arr
      }

      const formatEachItem = (provider: any, bppdescriptors: any) => {
        let arr: any[] = []
            provider.items.forEach((item: any, index: any)=>{
                arr.push({
                    product_id: item.id,
                    thumbnail: item.descriptor.images && item.descriptor.images.length>0? item.descriptor.images[0] : '',
                    product: item.descriptor.name? item.descriptor.name: '',
                    source: bppdescriptors.name? bppdescriptors.name : '',
                    measure: item.quantity.unitized? `${item.quantity.unitized.measure.value}  ${item.quantity.unitized.measure.unit}`: '',
                    availability: item.quantity.available?`${item.quantity.available.count}` : '',
                    maximumQuantity: item.quantity.maximum?`${item.quantity.maximum.count}`:'',
                    seller: provider.descriptor? provider.descriptor.name : '',
                    price: item.price? getPrice(item.price.value, item.price.maximum_value)
                      :
                      '',
                    category: item.category_id? item.category_id : '',
                    sellerLocation: item.location_id? getLocation(item.location_id,provider.locations): '',
                    returnable: item['@ondc/org/returnable'] === true? 'Yes': 'No',
                    cancellable: item['@ondc/org/cancellable'] === true? 'Yes': 'No',
                    cod: item['@ondc/org/available_on_cod'] === true? 'Yes': 'No',
                    shippingTime: item['@ondc/org/time_to_ship']? getHumanizedData(item['@ondc/org/time_to_ship']): '',
                    sellerPickupReturn: item['@ondc/org/seller_pickup_return'] == true? 'Yes': 'No',
                    returnWindow: item['@ondc/org/return_window']? getHumanizedData(item['@ondc/org/return_window']): '',
                    manufacturer: item['@ondc/org/statutory_reqs_packaged_commodities']?
                        item['@ondc/org/statutory_reqs_packaged_commodities'].manufacturer_or_packer_name : '',
                    fulfillment: item.fulfillment_id? getFulfillment(item.fulfillment_id,provider.fulfillments) : '',
                    deliverableAt: getDeliverableDetails(provider.tags,provider.locations),
                    gallery: item.descriptor.images && item.descriptor.images.length>0?
                     getSlides(item.descriptor.images) : []
                })
                
            })
        return arr;
      }

      const getHumanizedData = (value:any) => {
            return 'In ' +moment.duration(value).humanize()
      }

      const getDeliverableDetails = (tags: any, locations: any) =>{
        let locationId : any;
            if(tags.filter((x: any)=>x.code === 'serviceability') && tags.filter((x: any)=>x.code === 'serviceability').length>0){
                let list = tags.filter((x: any)=>x.code === 'serviceability')[0].list;
                if(list && list.length>0){
                    locationId = list.filter((x:any)=> x.code === 'location')[0].value
                }
            }
            
        return getLocation(locationId, locations) +' '+ getCircle(locationId, locations)

      }

      const getFulfillment = (id: any, fulfillments: any) => {
        let fulfillment: any;
        if(fulfillments.length>0 && fulfillments.filter((loc: any) => loc.id === id).length>0){
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

      const getPrice = (price1: any, price2:any)=>{
        if (price1 === price2){
           return formatCurrency(price1)
        }
        else{
            return `${formatCurrency(price1)} to ${formatCurrency(price2)}`
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

    const handleScroll = (event: any) => {
        const { scrollTop, scrollHeight, clientHeight } = event.target;
        // Check if user has scrolled to the bottom of the table
        if (scrollHeight - scrollTop <= clientHeight + 10) {
          loadMore();
        }
      };

    const loadMore = () => {
        setHasMore(true)
        console.log(messageID)
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

        return result;
    }

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
        console.log("applied filter for = ", selectedVendors)
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

        return result;
    }
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
       
    }

    // sort by

    const handleSortByClick = (values: any) => {
        setSortByOpen(!isSortByOpen)
    }

    const toggleSortByOption = (option: any) => {
        setSelectedSortBy(option);
        setSortByOpen(false);
      };

    // products

    const openProductDetails = (product: any, col: any) => {
        if (col.column == "product") {
            if (!isProductDetailsOpen) {
                setSelectedProductToViewDetails(product)
                setIsProductDetailsOpen(true)
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
                if (prevSelected.some((obj: any) => obj.product_id === product.product_id)) {
                  return prevSelected.filter((item: any) => item.product_id !== product.product_id);
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
                category: selectedCategory,
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

    const loadSimilarProductsOfACategory = () => {
        setSelectedCategory(categories.filter((x:any)=> x.id === selectedCategoryToLoad)[0])
    }

    const navigateToCollectionsList = () => {
        navigate('/landing-page/products/collections')
    }

    const setLocation = (e:any)=>{
        setSelectedLocation(e)
        closeSelectLocationWindow();

    }
    

    return (
        <>
        {
            !fullPageLoading && (
                <div className="container-fluid h-auto mt-4 px-5">
                {
                    showBackButton ==='show' && (
                        <div className="row d-flex">
                        <div className="col text-left">
                            <div onClick={navigateToCollectionsList} className='back-button-container cursor-pointer'>
                                <i className='fa fa-arrow-left'></i>
                                <h6 className='pl-2 mb-0'>Back</h6>
                            </div>
    
                        </div>
    
                    </div>
                    )
                }

                <div className="row mt-2">
                    <div className="col-6 text-left">
                        <h3>Products</h3>
                    </div>
                    {
                        selectedProducts.length>0 && (
                            <div className="col-6 text-right">
                                <a className="btn-link"><button type="button"
                                    className="btn-custom" onClick={previewSelected}>Preview Selected</button></a>
                            </div>
                        )
                    }

                </div>
                <div className="row mt-4">
                    <div className="col-12 ">
                        <div className="card shadow bg-white table-padding mb-3 p-3">
                            <div className="row">
                                <div className="col-3">
                                    <div className="select-location-container text-left">
                                        <div className='d-flex cursor-pointer' onClick={openSelectLocationWindow}>
                                        <i className="fas fa-location-dot" ></i>
                                        <p className='mb-0 pl-3'>{selectedLocation !== '' ? selectedLocation : ('Select location')}</p>
                                        </div>

                                        <i className="fa fa-close fa-sm pr-3 cursor-pointer" onClick={clearLocation}> </i>
                                    </div>
                                </div>
                                <div className="col-9">
                                    <div className="category-search-container">
                                        <div className="category-dropdown-toggler w-auto cursor-pointer" onClick={toggleDropdown} >
                                            <p className="category-text w-auto mb-0">
                                            {
                                             selectedCategory ?
                                              selectedCategory.description
                                              :
                                              ('Select category')
                                            } </p>
                                            <i className="fa fa-caret-down " ></i>
                                        </div>
                                        {isOpen && (
                                            <div className="category-dropdown-menu w-100 p-0 pt-0 fs-6">
                                                <div className="megamenu_search rounded-3 overflow-hidden p-0 ">
                                                    <div className="row g-0 flex-row h-100">
                                                        <div className="col-12 col-sm-12 d-flex flex-column flex-nowrap">
                                                            <div className="megamenu_search-nav flex-fill overflow-auto px-3 pt-1 pb-3">
                                                                <ul className="list-unstyled m-0">
                                                                    <li><a className="dropdown-item small oneline_ellipsis pl-1 mt-2"
                                                                            role="button" title="All">-- select a category -- </a></li>
                                                                    {
                                                                        categories
                                                                        .map((cat: any,index:any)=>{
                                                                            return  <li key={index}><a className="dropdown-item small fw-semibold ellipsis pl-1"
                                                                            role="button" title="All" onClick={()=>setSelectedCategoryValue(cat)}>{cat.description} </a></li>
                                                                        })
                                                                    }
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <input className="search_input category-selector-search-input" type="text" name="" value={searchString} placeholder="search here" 
                                        onChange={handleSearchStringChange}/>
                                        <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit" onClick={initiateSearchForProducts}>
                                            <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
                                                <path fill="#666666"
                                                    d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                                            </svg>
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        (onSearchStatus == 'finished' && showTable) ?
                        (
                            <div className="col-12">
                            <div className="card shadow bg-white table-padding mb-3 py-3 ">
                                {/* <div className="row">
                                    <div className="col"> */}
                                <div className='filter-sort-container pb-2 px-3'>
                                    <div className='filters-container'>
                                        <div className='products-vendor-filter-container'>
                                        <div className="vendor-selection-container mr-2 px-2" >
                                            <p className='mb-0 pl-2 cursor-pointer' onClick={handleVendorSelectionClick}>Product vendor
                                                {
                                                    selectedVendors.length > 0 ?
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
                                                            <span>&nbsp; <i className='fa fa-close pl-2 cursor-pointer' onClick={clearVendorList}></i> </span>
    
                                                        </>
    
                                                        :
    
                                                        !isVendorDropdownOpen && selectedVendors.length == 0 ?
                                                            <span>&nbsp; <i className='fa fa-caret-down pr-2 cursor-pointer float-right' ></i> </span>
    
                                                            :
    
                                                            <></>
                                                }
                                            </p>
    
                                        </div>
                                        {
                                                isVendorDropdownOpen && (
                                                    <div className="vendor-selection-dropdown">
    
                                                        <SearchableMultiselectList
                                                            list={vendors_list}
                                                            selectedItems={selectedVendors}
                                                            selectedItemsChanged={updateSelectedVendorList}
                                                            clearSelectedItemsList={clearSelectedVendorList}
                                                            applySelectedList={applyFilterOfVendorList}>
    
                                                        </SearchableMultiselectList>
                                                    </div>
                                                )
                                            }
                                        </div>
    
                                        <div className='products-speciality-filter-container'>
                                        <div className='speciality-selection-container px-2'>
                                            <p className='mb-0 pl-2 cursor-pointer' onClick={handleSpecialitySelectionClick}>Speciality
                                                {
                                                    selectedSpecialities.length > 0 ?
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
                                                            <span>&nbsp; <i className='fa fa-close pl-2 cursor-pointer' onClick={clearSpecialityList}></i> </span>
    
                                                        </>
    
                                                        :
    
                                                        !isSpecialityDropdownOpen && selectedSpecialities.length == 0 ?
                                                            <span>&nbsp; <i className='fa fa-caret-down pr-2 cursor-pointer float-right' onClick={handleSpecialitySelectionClick}></i> </span>
    
                                                            :
    
                                                            <></>
                                                }
                                            </p>
                                            </div>
                                            {
                                                isSpecialityDropdownOpen && (
    
                                                    <div className="speciality-selection-dropdown">
                                                        <SearchableMultiselectList
                                                            list={speciality_list}
                                                            selectedItems={selectedSpecialities}
                                                            selectedItemsChanged={updateSelectedSpecialityList}
                                                            clearSelectedItemsList={clearSelectedSpecialityList}
                                                            applySelectedList={applyFilterOfSpecialityList}>
    
                                                        </SearchableMultiselectList>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className="column-visibility-sortby-container">
                                    <div className='column-visibility-container mr-2'>
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
                                                                        return <li key={index} className='d-flex flex-row px-2'>
                                                                            <input type="checkbox"
                                                                                checked={col.isVisible}
                                                                                onChange={() => toggleColumnVisibility(col)}
                                                                            />
                                                                            <a className="dropdown-item ml-0 pl-2 small fw-semibold oneline_ellipsis"
                                                                                role="button" title="All">{col.visibilityDisplayName}</a></li>
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
                                    {/* <div className='sort-container'>
                                        <button
                                            className="btn btn-custom-light float-right sortby-selection-container"
                                            type="button"
                                            onClick={handleSortByClick}
                                        >
                                            <i className="fa fa-sort" style={{ fontSize: '17px' }}
                                            ></i>
    
                                        </button>
                                        {
                                            isSortByOpen && (
                                                <div className="sortby-selection-dropdown">
                                                    <ul className="list-unstyled mt-2 ">
                                                        <span style={{ paddingLeft: '6px' }}>Sort By</span>
                                                        {
                                                            sort_list
                                                                .map((vendor: any, index: any) => {
                                                                    return <li key={index}>
                                                                        <a className="dropdown-item d-flex flex-row justify-content-between" onClick={() => toggleSortByOption(vendor.value)}>
                                                                            {vendor.label}
                                                                            {
                                                                                selectedSortBy == vendor.value ?
                                                                                    <span className="acc-icons" style={{ color: 'green' }}>
                                                                                        <i className="fa fa-check-circle"></i>
                                                                                    </span>
    
                                                                                    :
    
                                                                                    <span className="acc-icons">
                                                                                        <i className="fa fa-circle-thin"></i>
                                                                                    </span>
                                                                            }
    
                                                                        </a>
                                                                    </li>
                                                                })
                                                        }
                                                    </ul>
                                                </div>
                                            )
                                        }
    
                                    </div> */}
                                    </div>
    
                                </div>
    
                                    {
                                        selectedProducts.length>0 && (
                                        <div className="mb-2 mt-2 me-2" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div className="px-3" style={{ marginTop: 'auto' }}>
                                                <span><strong><i className="fa fa-minus-square"></i><span className="px-3">{selectedProducts.length} products selected </span></strong></span>
                                            </div>
                                        </div>  
                                        )
                                    }
    
                                <div className='table-responsive'                            
                                onScroll={handleScroll}
                                style={tablescrollstyles.loadonscroll}>                            
                                <table className="table table-hover  product-table text-left" style={{ marginBottom: '0px', cursor: 'pointer' }}>
    
                                    <thead className="table-light">
                                        <tr>
                                            <th ></th>
                                            {
                                                columns.map((col: any, index: any) => {
                                                    return col.isVisible && <th key={index} className={col.minWidth? 'min-width-column':'common-width'}>{col.coltitle}</th>
                                                })
                                            }
    
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            productsList
                                                .map((product: any, index: any) => {
                                                    return <tr key={index}>
                                                        <td className='products-list'><input type="checkbox" 
                                                        checked={selectedProducts.some((obj: any) => obj.product_id === product.product_id)}
                                                        onChange={() => toggleProductSelection(product)} /></td>
                                                        {
                                                            columns
                                                                .map((col: any, i: any) => {
                                                                    return col.isVisible &&
                                                                        (
                                                                            col.type == "image" ?
                                                                                <td onClick={()=>openProductDetails(product, col)} key={i} className="product-small-image px-0" style={{ paddingLeft: '0px !important' }}><a href="#" className="pop">
                                                                                    <img src={product[col.column]} alt="" />
                                                                                </a></td>
                                                                                :
    
                                                                                (
                                                                                    col.type == "active-draft-button" ?
                                                                                        <td onClick={()=>openProductDetails(product, col)} key={i}><span className={product[col.column] == 'Active' ? "product-active" : "product-draft"}>{product[col.column]}</span></td>
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
                                        {!hasMore && <p className='mt-2' style={{ textAlign: 'center',color: 'darkgray' }}>No more data to load.</p>}
                            </div>
                        </div>
                        )

                        :

                        onSearchStatus == 'not-started' ?

                        <></>

                        :

                        onSearchStatus == 'initiated'
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

        </>
    ) 

}

export default ProductsList;