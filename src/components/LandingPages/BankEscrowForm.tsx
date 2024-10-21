import React, { useEffect } from 'react';

const BankEscrowForm = () => {

    useEffect(() => {
        console.log("inside bank escrow")
    });

    return (
        <>
            <div className="accordion mt-1" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                            aria-expanded="true" aria-controls="collapseOne">
                            Fund Holding Account

                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <p>This section collects the Bank Escrow on behalf of ONDC which is to ensure - to ensure secure,
                                transparent, and trustworthy transactions between buyers and sellers.</p>
                        </div>
                    </div>
                </div>


            </div>

            <form name="signin" className="form" >
                <div className="name-field">
                    <div className="custom-radio-box">
                        <div className="input-control custom-radio-label">
                            <label htmlFor="email" className="input-label required">Do you have Escrow Account?</label>
                        </div>
                        <div className="radio-buttons-container-dashboard dashboard-namefield">

                            <div className="radio-button">
                                <input name="radio-group" id="radio3" className="radio-button__input" type="radio" />
                                <label htmlFor="radio2" className="radio-button__label">
                                    <span className="radio-button__custom"></span>

                                    Yes
                                </label>
                            </div>
                            <div className="radio-button">
                                <input name="radio-group" id="radio4" className="radio-button__input" type="radio" />
                                <label htmlFor="radio1" className="radio-button__label">
                                    <span className="radio-button__custom"></span>

                                    No
                                </label>
                            </div>
                        </div>

                    </div>

                    <div className="mb-3 form-field-container-full-width">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Escrow Account Number</label>
                        <input type="text" className="form-control dashboard-namefield" id="exampleFormControlInput1"
                            placeholder="Escrow Account Number" />
                    </div>

                </div>

                <div className="name-field">
                    <div className="mb-3 form-field-container-full-width">
                        <label htmlFor="exampleFormControlInput1" className="form-label">IFSC</label>
                        <input type="text" className="form-control dashboard-namefield" id="exampleFormControlInput1" placeholder="IFSC" />
                    </div>

                    <div className="mb-3 form-field-container-full-width">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Bank Name</label>
                        <input type="text" className="form-control dashboard-namefield " id="exampleFormControlInput1" placeholder="Bank Name" />
                    </div>


                </div>

                <div className="text-center">
                    <a href="./thankyou.html" className="btn-link"><button type="button"
                        className="btn-custom  mt-2 btn-right" >Submit</button></a>
                </div>
            </form>
        </>
    ) 

}

export default BankEscrowForm;