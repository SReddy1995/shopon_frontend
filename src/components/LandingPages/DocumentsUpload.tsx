import React, { useCallback, useEffect, useState } from 'react';
import { showSuccessMessage, showWarningMessage } from '../../shared/notificationProvider';
import { deleteDocument, downloadDocuments, getDocumentDetailsList, getLegalEntityDetails } from '../../services/AccountService';
import ModalWindow from './ModalWindow';
import UploadFileForm from './UploadFileForm';
import ConfirmDelete from './ConfirmDelete';
import { DOC_DELETE_SUCCESS, DOCUMENTS_DOWNLOADED, NO_DOCS_UPLOADED } from '../../utils/constants/NotificationConstants';


const DocumentsUpload = (props: any) => {
    const store_status = localStorage.getItem('user_details') ? (JSON.parse(localStorage.getItem('user_details') || '{}').is_active) : null
    const store_active = store_status === "ACTIVE" ? true : false;
    const [loading, setLoading] = useState(true)
    const user_details = localStorage.getItem('user_details') ? JSON.parse(localStorage.getItem('user_details') || '{}') : null;
    const [open, setModalOpen] = useState(false);
    const [uploadFileDetails, setUploadFileDetails] = useState<any>();
    const [openDeleteConfirm, setConfirmDeleteModalOpen] = useState(false);
    const confirmDeleteMsg = "Are you sure you want to delete the uploaded file? This action can't be undone."
    const deleteText = "Delete"

    const documents_list = [
        {
            document_type: "ASPAN",
            description:"",
            title: "Authorized Signatory PAN ",
            key: "authorized_signatory_pan",
            uploadedFile: '',
            details: "Authorized signatory's PAN  to comply with legal and regulatory requirements, ensure identity verification, and facilitate the KYC for ONDC.",
            applicable: true
        },
        {
            document_type: "ASUIDAI",
            description:"",
            title: "Authorized Signatory Aadhaar ",
            key: "authorized_signatory_aadhaar",
            uploadedFile: '',
            details: "Authorized signatory's Aadhaar for identity validation identity verification, enabling smoother processing of  KYC with ONDC.",
            applicable: true
        },
        {
            document_type: "GSTN",
            description:"",
            title: "Goods and Services Tax Identification Number ",
            key: "gstn",
            uploadedFile: '',
            details: "GSTIN to ensure compliance with tax regulations for transparency in  business transactions and for KYC with ONDC",
            applicable: true
        },
        {
            document_type: "BANK",
            description:"",
            title: "Canceled Cheque Leaf / Passbook Front Page",
            key: "bank_cancelled_cheque_leaf",
            uploadedFile: '',
            details: "To verify bank account details to ensure accuracy in any transactions for payments, refunds, and prevent errors or frauds.",
            applicable: true
        },
        {
            document_type: "CPAN",
            description:"",
            title: "Company PAN",
            key: "company_pan",
            uploadedFile: '',
            details: "Official document to verify the company identity, for compliance and tax regulations , and facilitate accurate financial reporting and transactions.",
            applicable: false
        },
        {
            document_type: "COI",
            description:"",
            title: "Certificate of Incorporation",
            key: "certificate_of_incorporation",
            uploadedFile: '',
            details: "Official document to verify company's legal status, ensure regulatory compliance, and facilitate secure business dealings.",
            applicable: false
        },


    ]

    const [documentsList, setDocumentsList] = useState(documents_list);

    const setData = useCallback((values: any) => {
        console.log(values)
        let docs = documentsList;
        let org_type = values.nature_of_organization_type;
        if(org_type === "TRUST" || org_type === "COMP" || org_type === "AOP" || org_type === "PART_FIRM" || org_type === "LLP"){
            docs.filter((x: any) => x.document_type === "CPAN")[0].applicable = true
            docs.filter((x: any) => x.document_type === "COI")[0].applicable = true
        }
        setDocumentsList(docs)

    },[documentsList])

    
    const setDocumentData = useCallback((values: any) => {
        
        let docs = documentsList;
        values.forEach((element: any , index: any) => {
            docs.filter((x: any) => x.document_type === element.document_type)[0].description = element.document_description;
            docs.filter((x: any) => x.document_type === element.document_type)[0].uploadedFile = element.document ? element.document : null;
        })
        setDocumentsList(docs)
    },[documentsList])

    const fetchDocumentsDetails = useCallback(() => {
        getDocumentDetailsList()
        .then((data: any) => {
            if(data){
                setDocumentData(data);
            }
            setLoading(false)
        })
        .catch(err => {
            setLoading(false);
        });
      },[setDocumentData])

      const fetchOrgTypeData = useCallback(() => {
        setLoading(true);
        getLegalEntityDetails()
        .then((data: any) => {
            if(Array.isArray(data) && data.length>0){
                setData(data[0]);  
            }
            console.log("calling fetxh documents")
            fetchDocumentsDetails();
        })
        .catch(err => {
            setLoading(false);
        });
      },[fetchDocumentsDetails, setData])

      useEffect(() => {
        
        fetchOrgTypeData();
      }, [fetchOrgTypeData, setData]);


    const openModal = () => {
            setModalOpen(true);

      };

      const closeModal = () => {
        setUploadFileDetails(null)
        setModalOpen(false);
      };

      const openUploadFileModal = (key: any) => {
        let data = documentsList.filter((x: any)=> x.document_type === key)[0];
        setUploadFileDetails(data)
        openModal();
    }

    const openConfirmDeleteModal = (key: any) => {
        let data = documentsList.filter((x: any)=> x.document_type === key)[0];
        setUploadFileDetails(data)
        setConfirmDeleteModalOpen(true);
    }

    const closeConfirmDeleteModal = () => {
        setConfirmDeleteModalOpen(false);
      }

    const deleteRecord = () => {
        deleteDocument(uploadFileDetails.uploadedFile.doc_reference_id)
        .then((data: any) => {
                setUploadFileDetails(null)
                showSuccessMessage(DOC_DELETE_SUCCESS)
                closeConfirmDeleteModal();
                refreshData();
        })
        .catch(err => {
            
        });
    }

    const refreshData = () => {
        props.reloadStatus();
    }

    const downloadFiles = () => {
        if(documentsList.filter((x: any)=> x.uploadedFile !== '' && x.uploadedFile !== null).length>0){
            downloadDocuments(user_details.buyer_id)
            .then((res: any) => {
                
                    const url = window.URL.createObjectURL(res); // Create a URL for the Blob
                    const a = document.createElement('a'); // Create an anchor element
                    a.href = url;
                    a.download = 'documents.zip'; // Set the file name for download
                    document.body.appendChild(a);
                    a.click(); // Programmatically click the anchor to trigger the download
                    a.remove(); // Clean up
                    showSuccessMessage(DOCUMENTS_DOWNLOADED)
            })
            .catch(err => {
                
            });
        }
        else{
            showWarningMessage(NO_DOCS_UPLOADED)
        }

    }
    

    return (
        <>

            {
                !loading
                    ?
                    <>

                        <div className="container-fluid">
                            <div className="row justify-content-center">
                                <div className="col-12 text-right px-0">
                                    <button type="button"
                                        className="btn-custom download-button"
                                        onClick={() => downloadFiles()}>
                                        Download
                                    </button>
                                </div>
                            </div>
                        </div>

                        {
                             documentsList
                             .map((doc: any, index: any) => {
                                    return <div key={index} className={"accordion mt-1 " +( doc.applicable ? 'd-block': 'd-none')} id="accordionExample">
                                    <div className="accordion-item mt-3">
                                        <h2 className="accordion-header documents-tab-accordian" id="headingOne">
                                            <button className="accordion-button" type="button"  
                                                aria-expanded="true" aria-controls="collapseOne">
                                                {doc.title}
                                                {
                                                    doc.uploadedFile !== '' && doc.uploadedFile !== null
                                                    ?
                                                    <span className='ml-2 text-success'>
                                                    <i className='fa fa-check-circle'></i>
                                                    </span>
                                                    :
                                                    <></>
                                                }


                                            </button>
                                            {
                                                        doc.uploadedFile !== '' && doc.uploadedFile !== null
                                                            ?
                                                            <></>

                                                            :
                                                            <div className='add-document-button-Container'>
                                                                {
                                                                    !store_active && <button type="button"
                                                                        className="btn btn-sm btn-success m-2"
                                                                        onClick={() => openUploadFileModal(doc.document_type)}>
                                                                        <i className="fa fa-plus"></i>
                                                                    </button>
                                                                }
                                                            
                                                            </div>


                                            }
                                        </h2>
                                        <div className="accordion-collapse collapse show" aria-labelledby="headingOne"
                                            data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <p>{doc.details}</p>
                                                {
                                                doc.uploadedFile !== '' && doc.uploadedFile !== null 
                                                ?

                                                            <p className='uploaded-file-info mt-2'>Uploaded file: <b>{doc.uploadedFile.document_name}</b>&nbsp;&nbsp;
                                                            {
                                                                !store_active && <span>
                                                                    <i className='fa fa-close fa-md text-danger ml-4 mt-2 cursor-pointer' onClick={() => openConfirmDeleteModal(doc.document_type)}></i>
                                                                </span>
                                                            }
                                                            </p>
                                                :
                                                <></>
                                            }
                                            </div>
                                        </div>
                                    </div>
    
    
                                </div>
                             })
                        }
                    </>
            :

            <></>
        }
            <ModalWindow show={open} modalClosed={closeModal}>
                <UploadFileForm uploadFileDetails={uploadFileDetails} modalClosed={closeModal} refreshData={refreshData}/>
            </ModalWindow>

            <ModalWindow show={openDeleteConfirm} modalClosed={closeConfirmDeleteModal}>
                <ConfirmDelete confirmModalClosed={closeConfirmDeleteModal}  deleteRecord={deleteRecord} msg={confirmDeleteMsg} deleteText={deleteText}/>
            </ModalWindow>

        </>
    ) 

}

export default DocumentsUpload;