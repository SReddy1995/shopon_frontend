import React, { useEffect, useState } from "react";


const SearchableMultiselectList = (props : any) => {


    const [searchTerm, setSearchTerm] = useState('');
    const [selectedList, setSelectedItems] = useState(props.selectedItems)

    const filteredItems = props.list.filter((item: any) =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchTermChange = (event: any) => {
      setSearchTerm(event.target.value);
    };


    const toggleSelectedOption = (option: any) => {
        setSelectedItems((prevSelected: any) => {
          if (prevSelected.some((obj: any) => obj.value === option.value)) {
            let res = prevSelected.filter((item: any) => item.value !== option.value);
            return res
          } else {
            let res = [...prevSelected, option];
            return res
          }
        });
        
    };

    useEffect(()=>{
        props.selectedItemsChanged(selectedList)
    },[selectedList])


    const clearSelectedList = () => {
        setSelectedItems([])
        setSearchTerm('')
        props.clearSelectedItemsList();
    }

    const applyFilterForList = () => {
        props.applySelectedList();
    }

    const handleCheckboxNoAction = () => {
        
    }

    return (
        <>
            <div className='mt-2'>
                <input
                    type="text"
                    className='mx-2 filter-search-input-box'
                    placeholder="Search ..."
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                />
            </div>
            <ul className="list-unstyled mt-3 searchable-multiselction-list">

                {
                    filteredItems
                        .map((item: any, index: any) => {
                            return <li key={item.value} className='d-flex flex-row px-2' onClick={() => toggleSelectedOption(item)}>
                                <input type="checkbox"
                                    checked={selectedList.some((obj: any) => obj.value === item.value)}
                                    onChange={handleCheckboxNoAction}
                                />
                                <a className="dropdown-item ml-0 pl-2 small fw-semibold ellipsis"
                                    role="button" title="All">{item.label}</a></li>
                        })
                }

            </ul>
            <ul className="list-unstyled mt-4 ">
            <li className='d-flex flex-row px-2'>
                    <p className='clear-text mb-0 cursor-pointer' onClick={clearSelectedList}>
                        Clear
                    </p>

                    {
                        props.showApply &&
                        <p className='clear-text mb-0 cursor-pointer' onClick={applyFilterForList}>
                        Apply
                    </p>
                    }
                  
                </li>
            </ul>
        </>
    )
}

export default SearchableMultiselectList