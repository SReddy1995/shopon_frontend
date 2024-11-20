import React from 'react';

const ConfirmDelete = (props : any) => {

    const closeModal = () =>{
        props.confirmModalClosed();
    }

    const deleteRecord = () => {
        props.deleteRecord();
    }
  
    return (
        <section className="wrapper">
            <div className='container'>
                <div className="row">
                    <div className="col-12 text-right">
                        <i className="fa fa-close cursor-pointer fa-lg" onClick={closeModal}></i>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-left">
                        <h6>Warning</h6>
                    </div>
                </div>
                
            </div>
            <div className="dropdown-divider"></div>
            <div className="container py-4" >
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-12 mt-0 text-left">
                                <h6>{props.msg}</h6>
                            </div>
                            <div className="col-12 mt-0 text-right">
                                <button className="btn btn-success btn-sm mt-2" type="button" onClick={closeModal}>Cancel</button>
                                <button className="btn btn-danger btn-sm mt-2 ml-2" type="button" onClick={deleteRecord}>{props.deleteText}</button>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
  };

  
export default ConfirmDelete;