import React, { useRef, useState } from 'react';
import { uploadDocument } from '../../services/AccountService';
import { showSuccessMessage, showWarningMessage } from '../../shared/notificationProvider';
import { DOC_UPLOAD_ERROR, DOC_UPLOAD_SUCCESS } from '../../utils/constants/NotificationConstants';

const UploadFileForm = (props: any) => {
    const [loading, setLoading] = useState(false);
    const [filename, setFileName] = useState('');
    const [file, setFile] = useState('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const closeModal = () =>{
        props.modalClosed();
      }

      const handleInputChange = (event: any) => {
        const files = event.target.files;
        if (files && files.length > 0) {
          console.log('Selected file:', files[0].name);
          setFileName(files[0].name); 
          setFile(files[0]);
          // Additional handling can go here
        }
      };



      const handleChooseButtonClick = () => {
        // Programmatically trigger the file input click
        if (fileInputRef.current) {
            fileInputRef.current.click();
          }
      };

      const handleUploadButtonClick = () => {
        const formData = new FormData();
        formData.append('document', file); // 'file' is the key
        formData.append('description', props.uploadFileDetails.description);
        formData.append('document_type', props.uploadFileDetails.document_type);
        uploadDocument(formData)
        .then((data: any) => {
            showSuccessMessage(DOC_UPLOAD_SUCCESS)
            props.refreshData();
            closeModal();
        })
        .catch(err => {
            // setAllowEnterOtp(false);
            showWarningMessage(DOC_UPLOAD_ERROR)
        });
      }

    return (
    <>
      {
        !loading ?
          <section className="wrapper">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-right">
                        <i className="fa fa-close cursor-pointer fa-lg" onClick={closeModal}></i>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-left">
                    <h6>Upload {props.uploadFileDetails.title}</h6>
                    </div>
                </div>
                
            </div>
            <div className="dropdown-divider"></div>
        
                        <div className="container my-4" >
                            <div className="row">
                                <div className="col-12">
                                <div className="drop_box mt-4">
                                        <label className='form-label required'>Select file here</label>
                                        <p >Files Supported: PDF, TEXT, DOC , DOCX</p>
                                        <input type="file" hidden accept=".doc,.docx,.pdf"
                                         ref={fileInputRef}
                                         style={{ display: 'none' }} // Hide the file input
                                         onChange={handleInputChange} /> 
                                        {
                                            filename
                                            ?
                                            <>
                                                <button className="btn btn-success btn-sm mt-2" type="button" onClick={handleUploadButtonClick}>Upload Now</button>
                                                <p className='mt-2'>Selected file:<b> {filename}</b></p>
                                                <p className='mt-2 text-link' onClick={handleChooseButtonClick}>Cancel and choose another file</p>
                                            </>
                                            :
                                            <button className="btn btn-primary btn-sm" type="button" onClick={handleChooseButtonClick}>Choose File</button>
                                        }
                                    </div>
                                </div>

                            </div>

                        </div>

          </section>
          :
          <></>
      }

        </>
    ) 

}

export default UploadFileForm;