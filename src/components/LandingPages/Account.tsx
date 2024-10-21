import React, { useState } from 'react';
import styled from 'styled-components';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import RegistrationForm from './RegistrationForm';
import LegalEntityForm from './LegalEntityForm';
import OnlineStoreForm from './OnlineStoreForm';
import BankEscrowForm from './BankEscrowForm';


const AccountInfoOverviewContainer = styled.div`
    width: 100%;
    height: 180px;
    display: flex;
    gap: 1.2rem;
    margin-top: 15px;
    justify-content: center;
`;

const AccountInfoDetailsContainer = styled.div`
    width: 100%;
    display: flex;
    gap: 1.2rem;
    margin-top: 15px;
    justify-content: center;
`;

const SubscriptionInfoContainer = styled.div`
    display: flex;
    width: 78%;
    height: 100%;
`;

const AccountDetailsInfoCardContainer = styled.div`
    display: flex;
    width: 94.4%;
    height: 100%;
`;

const SubscriptionProgressContainer = styled.div`
    display: flex;
    width: 15%;
    height: 100%;
`;

const CircularProgressbarContainer = styled.div`
    width: 48%;
`;

const Account = () => {

    const percentage = 80;

    const subscription_details = {
        subscriber_id : "maxfashion.opteamix.com",
        subscriber_plan: "Gold",
        registration_date: "30th Sep 2024",
        store_subscription: false,
        account_status: [
            { title: "Registration", status: "completed"},
            { title: "Entity Setup", status: "pending"},
            { title: "Store Setup", status: "pending"},
            { title: "Bank Escrow", status: "pending"},
            { title: "KYC", status: "pending"},
            { title: "Whitelisting", status: "pending"}
        ]
    }

    const [activeTab, setActiveTab] = useState(0);

    const getActiveClass = (index : any, className: any) =>
        activeTab === index ? className : "";

    const getCompletedClass = (status: any) => {
        return status ==="completed" ? "fa fa-check-circle" :  "fa fa-times-circle"
    }

    const account_setup_tabs = [
        {
          title: "Registration",
          status: "completed",
        },
        {
            title: "Legal Entity",
            status: "pending",
        },
        {
            title: "Online Store",
            status: "pending",
        },
        {
            title: "Bank Escrow",
            status: "pending",
        },
      ];

    const renderTabComponent = () => {
        switch (activeTab) {
            case 0 :
                return <RegistrationForm></RegistrationForm>;
            case 1 :
                return <LegalEntityForm></LegalEntityForm>;
            case 2 :
                return <OnlineStoreForm></OnlineStoreForm>;
            case 3 :
                return <BankEscrowForm></BankEscrowForm>;
        }
    }
      

    return (
        <>
            <AccountInfoOverviewContainer>
                <SubscriptionInfoContainer>
                    <div className="card shadow p-3 bg-grey payment-info-card">
                        <div className="d-flex">
                            <div className="flex-grow">
                                <p className="font-weight-bold"><strong>Subscriber ID : </strong><span>{subscription_details.subscriber_id}</span></p>
                            </div>
                            <div className="flex-grow">
                                <p className="font-weight-bold"><strong>Subscriber Plan : </strong><span>{subscription_details.subscriber_plan}</span></p>
                            </div>
                            <div className="flex-grow">
                                <p className="font-weight-bold"><strong>Registration Date :</strong><span>{subscription_details.registration_date}</span></p>
                        </div>

                    </div>

                    <hr className="payment-border"/>

                        <div className="d-flex mt-1">
                            {
                                subscription_details.account_status.map((details_type: any, index: number) => (
                                    <div key={index} className="flex-grow">
                                        <div style={{ textAlign: 'center' }}>
                                            <h5 className="icon-title">{details_type.title}</h5>
                                            <span className={"payment-icons " + (details_type.status === "completed" ? "text-success" : "text-warning")}
                                            ><i className={(details_type.status === "completed" ? "fa fa-check-circle" : "fa fa-exclamation-circle")}></i></span>
                                            <p className="icon-text">{details_type.status === "completed" ? ("Done") : ("Pending")}</p>
                                        </div>
                                    </div>
                                ))
                            }


                        </div>

                    </div>
                </SubscriptionInfoContainer>
                <SubscriptionProgressContainer>
                    <div className="card-progress shadow p-3">
                        <CircularProgressbarContainer>
                            <CircularProgressbar value={percentage} text={`${percentage}%`} strokeWidth={12} 
                            styles={buildStyles({
                                strokeLinecap: 'butt',
                                textSize: '16px',
                                pathTransitionDuration: 1,
                                pathColor: `#FFC107`,
                                textColor: 'white',
                                trailColor: '#d6d6d6',
                                backgroundColor: '#3e98c7',
                              })}/>
                        </CircularProgressbarContainer>
                        <h6 className="text-center pt-4">Progress</h6>
                    </div>
                </SubscriptionProgressContainer>
            </AccountInfoOverviewContainer>

            <h3 className="text-center mb-3 mt-4">
                Account Setup
            </h3>

            <AccountInfoDetailsContainer>
                <AccountDetailsInfoCardContainer>
                    <div className="card mt-3 mb-3 shadow p-3">
                        <ul className="nav nav-pills mb-3 border-bottom border-2" id="pills-tab" role="tablist">
                            {
                                account_setup_tabs.map((tab: any, index: number) => (
                                    <li key={index} className="nav-item " role="presentation">
                                    <button className={`nav-link text-primary fw-semibold position-relative ${getActiveClass(index, "active")}`}  type="button" role="tab"
                                        onClick={() => setActiveTab(index)}
                                        aria-selected={(activeTab === index ? true: false)}>{tab.title} <span className="acc-icons"><i className={getCompletedClass(tab.status)}></i></span></button>    
                                    </li>
                                ))
                            }
                        </ul>
                        <div className="tab-content border rounded-3 border-primary p-3 " id="pills-tabContent">
                            <div className="tab-pane fade show active" role="tabpanel">
                            {
                                renderTabComponent()
                            }
                            </div>
                        </div>
                    </div>
                </AccountDetailsInfoCardContainer>
            </AccountInfoDetailsContainer>
        </>
    ) 

}

export default Account;