import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import RegistrationForm from './RegistrationForm';
import LegalEntityForm from './LegalEntityForm';
import OnlineStoreForm from './OnlineStoreForm';
import BankEscrowForm from './BankEscrowForm';
import moment from 'moment';
import DocumentsUpload from './DocumentsUpload';
import { getStoreStatusDetails } from '../../services/AccountService';


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

    const user_details = localStorage.getItem('user_details') ? JSON.parse(localStorage.getItem('user_details') || '{}') : null;
    const [loading, setLoading] = useState(false);

    const account_status= [
            { title: "Registration", tabTitle:"Registration", status: "", status_desc:"pending", stepref: "REG", showInTabs: true},
            { title: "Entity Setup", tabTitle:"Legal Entity",status: "", status_desc:"pending",stepref: "LED", showInTabs: true},
            { title: "Store Setup", tabTitle:"Online Store",status: "", status_desc:"pending",stepref: "OSI", showInTabs: true},
            { title: "Bank Escrow", tabTitle:"Bank Escrow",status: "", status_desc:"pending",stepref: "BEA", showInTabs: true},
            { title: "Documents", tabTitle:"Documents",status: "", status_desc:"pending",stepref: "DOC", showInTabs: true},
            { title: "KYC", tabTitle:"KYC",status: "", status_desc:"pending",stepref: "LED", showInTabs: false},
            { title: "Whitelisting", tabTitle:"Whitelisting",status: "", status_desc:"pending",stepref: "WHL", showInTabs: false}
        ]
    const [storeStatus, setStoreStatus] = useState<any[]>(account_status);

    const [percentage,setPercentage] = useState(0);

    useEffect(()=>{
        fetchStoreStatusDetails()
    },[])

    const fetchStoreStatusDetails = () => {
        setLoading(true)
        getStoreStatusDetails()
        .then((response: any)=>{
            setData(response)
        })
        .catch(err=>{
            setLoading(false)
        })
    }

    const setData = (res: any) => {
        let details = storeStatus;
        res.forEach((element: any, index: any)=> {
            if(details.filter((x:any)=> x.stepref === element.step.stepref)[0]){
            details.filter((x:any)=> x.stepref === element.step.stepref)[0].status = element.status.status;
            details.filter((x:any)=> x.stepref === element.step.stepref)[0].status_desc = element.status.description;
            if(element.step.stepref === "LED"){
                details.filter((x:any)=> x.stepref === element.step.stepref)[1].status = element.status.status;
                details.filter((x:any)=> x.stepref === element.step.stepref)[1].status_desc = element.status.description;
            }
            }
        })
        setProgressBar(details);
        setStoreStatus(details)
        setLoading(false)
    }
    const [subscriber_plan, setSubscriber_plan]= useState("Gold");

    const [activeTab, setActiveTab] = useState(0);

    const getActiveClass = (index : any, className: any) =>
        activeTab === index ? className : "";

    const getCompletedClass = (status: any) => {
        return status ==="COMPLETED" ? "fa fa-check-circle" :  "fa fa-times-circle"
    }

    const setProgressBar = (res: any) => {

        if(res.filter((x: any)=> x.status === "COMPLETED").length>0){
            let length = res.filter((x: any)=> x.status === 'COMPLETED').length;
            let perPercentage = 100/7;
            let totalPercent = perPercentage * length;
            setPercentage(Math.ceil(totalPercent))
        }


        
    }

    const renderTabComponent = () => {
        switch (activeTab) {
            case 0 :
                return <RegistrationForm reloadStatus={fetchStoreStatusDetails}></RegistrationForm>;
            case 1 :
                return <LegalEntityForm reloadStatus={fetchStoreStatusDetails}></LegalEntityForm>;
            case 2 :
                return <OnlineStoreForm reloadStatus={fetchStoreStatusDetails}></OnlineStoreForm>;
            case 3 :
                return <BankEscrowForm reloadStatus={fetchStoreStatusDetails}></BankEscrowForm>;
            case 4 :
                return <DocumentsUpload reloadStatus={fetchStoreStatusDetails}></DocumentsUpload>;
        }
    }
      

    return (
        <>
        {
            !loading?
            <>
            <AccountInfoOverviewContainer>
                <SubscriptionInfoContainer>
                    <div className="card shadow p-3 bg-grey payment-info-card">
                        <div className="d-flex">
                            <div className="flex-grow">
                                <p className="font-weight-bold"><strong>Subscriber ID : </strong><span>{user_details.subscriber_id}</span></p>
                            </div>
                            <div className="flex-grow">
                                <p className="font-weight-bold"><strong>Subscription Plan : </strong><span>{subscriber_plan}</span></p>
                            </div>
                            <div className="flex-grow">
                                <p className="font-weight-bold"><strong>Registration Date :</strong><span>{moment(user_details.createdAt).format("DD/MM/YYYY")}</span></p>
                        </div>

                    </div>

                    <hr className="payment-border"/>

                        <div className="d-flex mt-1">
                            {
                                storeStatus.map((details_type: any, index: number) => (
                                    <div key={index} className="flex-grow">
                                        <div style={{ textAlign: 'center' }}>
                                            <h5 className="icon-title">{details_type.title}</h5>
                                            <span className={"payment-icons " + (details_type.status === "COMPLETED" ? "text-success" : "text-warning")}
                                            ><i className={(details_type.status === "COMPLETED" ? "fa fa-check-circle" : (details_type.status === "FAILED" ? "fa fa-times-circle" : "fa fa-exclamation-circle"))}></i></span>
                                            <p className="icon-text">{details_type.status_desc}</p>
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
                                storeStatus.map((tab: any, index: number) => {
                                    return tab.showInTabs &&  
                                    
                                    <li key={index} className="nav-item " role="presentation">
                                    <button className={`nav-link text-primary fw-semibold position-relative ${getActiveClass(index, "active")}`}  type="button" role="tab"
                                        onClick={() => setActiveTab(index)}
                                        aria-selected={(activeTab === index ? true: false)}>{tab.tabTitle}<span className="acc-icons"><i className={getCompletedClass(tab.status)}></i></span></button>    
                                    </li>
                                    })
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

            : <></>
        }

        </>
    ) 

}

export default Account;