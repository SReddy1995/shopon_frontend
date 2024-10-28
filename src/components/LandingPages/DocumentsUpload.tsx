import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage, FormikValues, FormikHelpers, FieldArray } from 'formik';
import { showSuccessMessage } from '../../shared/notificationProvider';
import Multiselect from 'multiselect-react-dropdown';
import { useSelector } from 'react-redux';
import { getOnlineStore, saveOnlineStore } from '../../services/AccountService';
import ModalWindow from './ModalWindow';
import UploadFileForm from './UploadFileForm';
import ConfirmDelete from './ConfirmDelete';


const DocumentsUpload = ({ onUpdate }: any) => {
    const refValues = useSelector((store: any) => store.refValues.referenceList);
    const [loading, setLoading] = useState(true)
    const user_details = localStorage.getItem('user_details') ? JSON.parse(localStorage.getItem('user_details') || '{}') : null;
    const [open, setModalOpen] = useState(false);
    const [uploadFileDetails, setUploadFileDetails] = useState({
        document_type: '',
        title: '',
        key: '',
        uploadedFile: ''
    });
    const [openDeleteConfirm, setConfirmDeleteModalOpen] = useState(false);

    const documents_list = [
        {
            document_type: "Authorized Signatory PAN",
            title: "Authorized Signatory PAN",
            key: "authorized_signatory_pan",
            uploadedFile: "ELAPS1472G.pdf",
        },
        {
            document_type: "Authorized Signatory AADHAAR",
            title: "Authorized Signatory AADHAAR",
            key: "authorized_signatory_aadhaar",
            uploadedFile: "64061276438.pdf",
        },
        {
            document_type: "Company PAN",
            title: "Company PAN",
            key: "company_pan",
            uploadedFile: "GHTDF1472I.pdf",
        },
        {
            document_type: "Date of Incorporation",
            title: "Certificate of Incorporation",
            key: "date_of_incorporation",
            uploadedFile: '',
        },
        {
            document_type: "Bank cancelled cheque leaf",
            title: "Bank cancelled cheque leaf",
            key: "bank_cancelled_cheque_leaf",
            uploadedFile: "chequeleaf.pdf",
        },
        {
            document_type: "Bank Passbook frontpage",
            title: "Bank Passbook Frontpage",
            key: "bank_passbook_frontpage",
            uploadedFile: '',
        },

    ]

    const openModal = () => {
        setModalOpen(true);
      };

      const closeModal = () => {
        setModalOpen(false);
      };

      const openUploadFileModal = (key: any) => {
        setUploadFileDetails(documents_list.filter((x: any)=> x.key === key)[0])
        openModal();
    }

    const openConfirmDeleteModal = () => {
        setConfirmDeleteModalOpen(true);
    }

    const closeConfirmDeleteModal = () => {
        setConfirmDeleteModalOpen(false);
      }

    const deleteFile = (file: any) => {
        // perform delete
    }

    const downloadFile = (file: any) => {
        // perform download file
    }


    useEffect(() => {
        // fetchData();
        setLoading(false);
      }, []);

      const fetchData = () => {
        getOnlineStore()
        .then((data: any) => {
            if(data){
                setData(data[0])
            }
            else{
                // let default initial values load
            }
            setLoading(false);
        })
        .catch(err => {
            setLoading(false);
        });
      }

    const setData = (values: any) => {
        setLoading(false)

    }
    

    return (
        <>

            {
                !loading
                    ?
                    <>
                        <div className="accordion mt-1" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                                        aria-expanded="true" aria-controls="collapseOne">
                                        Upload Documents
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne"
                                    data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p>This section collects the documents.</p>
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div className="container-fluid mt-4">
                            <div className="row justify-content-center">
                                <div className="col-12 px-0">
                                    <table className="table table-bordered rounded-3" id="tab_logic">
                                        <thead className="border-white">
                                            <tr >
                                                <th className='text-left'>
                                                    Type of document
                                                </th>
                                                <th className='text-left'>
                                                    Document name
                                                </th>

                                                <th className='text-left'>
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                    documents_list
                                                        .map((doc: any, index: any) => {
                                                            return <tr key={index} id='addr0' data-id="0" className="hidden">

                                                            <td className='text-left'>
                                                                {doc.title}
                                                            </td>
                                                            <td className='text-left'>
                                                                {doc.uploadedFile}
                                                            </td>
            
                                                            <td className="d-flex flex-start">

                                                                <a className="btn-link">
                                                                  
                                                                {
                                                                    doc.uploadedFile ?
                                                                    <>
                                                                        <button type="button"
                                                                                className="btn-custom download-button mr-2" 
                                                                                onClick={() => downloadFile(doc.key)}>
                                                                                    <i className="fa fa-cloud-download"></i>
                                                                        </button>
                                                                        <button type="button"
                                                                                className="btn-custom btn-danger" 
                                                                                onClick={() => openConfirmDeleteModal()}>
                                                                                    <i className="fa fa-trash"></i>
                                                                        </button>
                                                                    </>
                                                                    :
                                                                            <button type="button"
                                                                                className="btn-custom btn-success" 
                                                                                onClick={() => openUploadFileModal(doc.key)}>
                                                                                <i className="fa fa-plus"></i>
                                                                            </button>
                                                                    
                                                                }
                                                                </a>                        
                                                            </td>
                                                        </tr>
                                                        })
                                                }
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>



                    </>
            :

            <></>
        }
            <ModalWindow show={open} modalClosed={closeModal}>
                <UploadFileForm uploadFileDetails={uploadFileDetails} modalClosed={closeModal} />
            </ModalWindow>

            <ModalWindow show={openDeleteConfirm} modalClosed={closeConfirmDeleteModal}>
                <ConfirmDelete confirmModalClosed={closeConfirmDeleteModal} />
            </ModalWindow>

        </>
    ) 

}

export default DocumentsUpload;