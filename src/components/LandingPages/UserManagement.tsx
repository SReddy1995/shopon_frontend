import React, { useState } from 'react';
import AddUserForm from './AddUserForm';
import ModalWindow from './ModalWindow';

const UserManagement = () => {
    const [open, setModalOpen] = useState(false);
    const [mode, setMode] = useState('Add');
    const [selectedUser, setSelectedUser] = useState({firstname: null, lastname: null, email_address: null, role: null, enabled: null})

    const toggleModal = () => {
      setModalOpen(!open);
    };

    const openModal = () => {
        setModalOpen(true);
      };

      const closeModal = () => {
        setModalOpen(false);
      };

      const addUser = (name: any) => {
        setMode('Add')
        setSelectedUser({firstname: null, lastname: null, email_address: null, role: null, enabled: null})
        openModal();
      }

      const openEditUser = (firstname: any, email: any, role: any, enabled: any) => {
        setMode('Edit')
        setSelectedUser({firstname : firstname, lastname: null, email_address: email, role: role, enabled: enabled})
        openModal();
      }

    return (
        <>
            <div className="container-fluid h-auto mt-4 px-5">
                <div className="row">
                    <div className="col-6 text-left">
                            <h3>User Management</h3>
                    </div>
                    <div className="col-6 text-right">
                    <a className="btn-link"><button type="button"
                                className="btn-custom" onClick={addUser}>Add User</button></a>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12 ">
                        <div className="table-cards shadow bg-white">




                        <div className="table-responsive card-radius text-left">
                            <table className="table rounded-3 p-1 table-sm table-striped">
                                <thead className="table-light">
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Enabled</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="custom-td-space">
                                    <tr>
                                        <td><a data-bs-toggle="modal" data-bs-target="#myModal">John Admin</a></td>
                                        <td>john@example.com</td>
                                        <td>Admin</td>
                                        <td>Yes</td>
                                        <td>
                                            <i className='fa fa-pencil cursor-pointer text-danger'></i>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Mary</td>
                                        <td>Moe</td>
                                        <td>mary@example.com</td>
                                        <td>No</td>
                                        <td>
                                            <i className='fa fa-pencil cursor-pointer text-danger'></i>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>July</td>
                                        <td>Dooley</td>
                                        <td>july@example.com</td>
                                        <td>Yes</td>
                                        <td>
                                            <i className='fa fa-pencil cursor-pointer text-danger'></i>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><a data-bs-toggle="modal" data-bs-target="#myModal">John Admin</a></td>
                                        <td>john@example.com</td>
                                        <td>Admin</td>
                                        <td>No</td>
                                        <td>
                                            <i className='fa fa-pencil cursor-pointer text-danger'></i>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Mary</td>
                                        <td>Moe</td>
                                        <td>mary@example.com</td>
                                        <td>No</td>
                                        <td>
                                            <i className='fa fa-pencil cursor-pointer text-danger'></i>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>July</td>
                                        <td>Dooley</td>
                                        <td>july@example.com</td>
                                        <td>Yes</td>
                                        <td>
                                            <i className='fa fa-pencil cursor-pointer text-danger'></i>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><a data-bs-toggle="modal" data-bs-target="#myModal">John Admin username</a></td>
                                        <td>john@example.com</td>
                                        <td>Super Admin</td>
                                        <td>No</td>
                                        <td>
                                            <i className='fa fa-pencil cursor-pointer text-danger'></i>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Mary</td>
                                        <td>Moe</td>
                                        <td>mary@example.com</td>
                                        <td>No</td>
                                        <td>
                                            <i className='fa fa-pencil cursor-pointer text-danger'></i>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>July</td>
                                        <td>Dooley</td>
                                        <td>july@example.com</td>
                                        <td>Yes</td>
                                        <td>
                                            <i 
                                                className='fa fa-pencil cursor-pointer text-danger'
                                                onClick={() => {
                                                    openEditUser('July','Dooley@dtm.com','Operator','Y')
                                                }}>

                                            </i>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>


                        </div>
                        </div>
     
                    </div>
                </div>
                <ModalWindow show={open} modalClosed={closeModal}>
                    <AddUserForm mode={mode} modalClosed={closeModal} selectedUser={selectedUser}/>
                </ModalWindow>
            </div>

        </>
    ) 

}

export default UserManagement;