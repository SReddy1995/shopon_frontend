import React, { useRef, useState } from 'react';

const UploadFileForm = (props: any) => {
    const [loading, setLoading] = useState(false);
    const [filename, setFileName] = useState('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const closeModal = () =>{
        props.modalClosed();
      }

      const handleInputChange = (event: any) => {
        const files = event.target.files;
        if (files && files.length > 0) {
          console.log('Selected file:', files[0].name);
          setFileName(files[0].name); 
          // Additional handling can go here
        }
      };

      const handleUploadButtonClick = () => {
        // Programmatically trigger the file input click
        if (fileInputRef.current) {
            fileInputRef.current.click();
          }
      };

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
                                                <button className="btn btn-success btn-sm mt-2" type="button" >Upload Now</button>
                                                <p className='mt-2'>Selected file:<b> {filename}</b></p>
                                                <p className='mt-2 text-link' onClick={handleUploadButtonClick}>Cancel and choose another file</p>
                                            </>
                                            :
                                            <button className="btn btn-primary btn-sm" type="button" onClick={handleUploadButtonClick}>Choose File</button>
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