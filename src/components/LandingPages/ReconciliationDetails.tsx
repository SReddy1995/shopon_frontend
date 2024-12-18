import React from 'react';

const ReconciliationDetails = (props: any) => {

    const closeModal = () => {
        props.closeModal();
    }

    return (
        <>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 d-flex justify-content-between px-0">
                    <h4>Fulfillment status</h4>
                    <i className='fa fa-close fa-lg cursor-pointer mt-2' onClick={closeModal}></i>
                </div>
                <div className="col-12 px-0">
                    <div className="dropdown-divider"></div>
                </div>
                <div className="col-12 px-0">
                        <div className="d-flex">
                            <div>
                                <span className="text-grey">Transaction Id : </span>
                                <span className="text-default-black">#1234fhtr5</span>
                            </div>

                            <div>
                                <span className="text-grey">Fullfillment Type : </span>
                                <span className="text-default-black">cash</span>
                            </div>

                            <div>
                                <span className="text-grey">Fullfillment Status : </span>
                                <span className="text-default-black">Paid</span>
                            </div>
                        </div>
                </div>
                <div className="col-12 px-0">
                        <div className="d-flex py-2">
                            <div>
                                <span className="text-grey">Fullfillment Phone : </span>
                                <span className="text-default-black">+91 9888779787</span>
                            </div>

                            <div>
                                <span className="text-grey">Fullfillment Date : </span>
                                <span className="text-default-black">12th Dec 2024</span>
                            </div>

                            <div>
                                <span className="text-grey">Fullfillment Email : </span>
                                <span className="text-default-black">test@gmail.com</span>
                            </div>
                        </div>
                </div>
            </div>
        </div>
        </>
    ) 

}

export default ReconciliationDetails;