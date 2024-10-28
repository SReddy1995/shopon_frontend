import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage, FormikValues, FormikHelpers, FieldArray } from 'formik';
import { showSuccessMessage } from '../../shared/notificationProvider';
import Multiselect from 'multiselect-react-dropdown';
import { useSelector } from 'react-redux';
import { deleteDocument, downloadDocuments, getDocumentDetailsList, getLegalEntityDetails, getOnlineStore, saveOnlineStore } from '../../services/AccountService';
import ModalWindow from './ModalWindow';
import UploadFileForm from './UploadFileForm';
import ConfirmDelete from './ConfirmDelete';


const DocumentsUpload = ({ onUpdate }: any) => {
    const refValues = useSelector((store: any) => store.refValues.referenceList);
    const [loading, setLoading] = useState(true)
    const user_details = localStorage.getItem('user_details') ? JSON.parse(localStorage.getItem('user_details') || '{}') : null;
    const [open, setModalOpen] = useState(false);
    const [uploadFileDetails, setUploadFileDetails] = useState<any>();
    const [openDeleteConfirm, setConfirmDeleteModalOpen] = useState(false);

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
            title: "Authorized Signatory AADHAAR ",
            key: "authorized_signatory_aadhaar",
            uploadedFile: '',
            details: "Authorized signatory's AADHAR for identity validation identity verification, enabling smoother processing of  KYC with ONDC.",
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
            title: "Cancelled Check Leaf OR Pass Book Front Page ",
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

    useEffect(() => {
        
        fetchOrgTypeData();
      }, []);

      const fetchOrgTypeData = () => {
        setLoading(true);
        getLegalEntityDetails()
        .then((data: any) => {
            if(data){
                setData(data[0]);
                fetchDocumentsDetails();
            }
        })
        .catch(err => {
            setLoading(false);
        });
      }

      const fetchDocumentsDetails = () => {
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
      }

    const setData = (values: any) => {
        console.log(values)
        let docs = documentsList;
        let org_type = values.nature_of_organization_type;
        if(org_type === "SOLE_PROP" || org_type === "COMP" || org_type === "AOP" || org_type === "PART_FIRM" || org_type === "LLP"){
            docs.filter((x: any) => x.document_type === "CPAN")[0].applicable = true
            docs.filter((x: any) => x.document_type === "COI")[0].applicable = true
        }
        setDocumentsList(docs)

    }

    
    const setDocumentData = (values: any) => {
        
        let docs = documentsList;
        values.forEach((element: any , index: any) => {
            docs.filter((x: any) => x.document_type === element.document_type)[0].description = element.document_description;
            docs.filter((x: any) => x.document_type === element.document_type)[0].uploadedFile = element.document ? element.document : null;
        })
        setDocumentsList(docs)
    }

    const openModal = () => {
            setModalOpen(true);

      };

      const closeModal = () => {
        setUploadFileDetails(null)
        setModalOpen(false);
      };

      const openUploadFileModal = (key: any) => {
        let data = documentsList.filter((x: any)=> x.document_type == key)[0];
        setUploadFileDetails(data)
        openModal();
    }

    const openConfirmDeleteModal = (key: any) => {
        let data = documentsList.filter((x: any)=> x.document_type == key)[0];
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
                closeConfirmDeleteModal();
                fetchOrgTypeData();
        })
        .catch(err => {
            
        });
    }

    const downloadFiles = () => {
        downloadDocuments()
        .then((res: any) => {
            
                const url = window.URL.createObjectURL(res); // Create a URL for the Blob
                const a = document.createElement('a'); // Create an anchor element
                a.href = url;
                a.download = 'documents.zip'; // Set the file name for download
                document.body.appendChild(a);
                a.click(); // Programmatically click the anchor to trigger the download
                a.remove(); // Clean up
        })
        .catch(err => {
            
        });
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
                                    <div className="accordion-item mt-4">
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
                                                            <button type="button"
                                                                className="btn btn-sm btn-success m-2"
                                                                onClick={() => openUploadFileModal(doc.document_type)}>
                                                                <i className="fa fa-plus"></i>
                                                            </button>
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
                                                                <span>
                                                                    <i className='fa fa-close fa-md text-danger ml-4 mt-2 cursor-pointer' onClick={() => openConfirmDeleteModal(doc.document_type)}></i>
                                                                </span>
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
                <UploadFileForm uploadFileDetails={uploadFileDetails} modalClosed={closeModal} refreshData={fetchOrgTypeData}/>
            </ModalWindow>

            <ModalWindow show={openDeleteConfirm} modalClosed={closeConfirmDeleteModal}>
                <ConfirmDelete confirmModalClosed={closeConfirmDeleteModal}  deleteRecord={deleteRecord}/>
            </ModalWindow>

        </>
    ) 

}

export default DocumentsUpload;