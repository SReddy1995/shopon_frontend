import React, { useEffect, useState } from 'react';
import AddUserForm from './AddUserForm';
import ModalWindow from './ModalWindow';
import { getUsersList } from '../../services/UsersService';

const UserManagement = () => {
    const [open, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [mode, setMode] = useState('Add');
    const [users_list, setUsersList] = useState([]);
    const [selectedUser, setSelectedUser] = useState({user_id: null, firstname: null, lastname: null, email_address: null,
        contact_number: null, roles: null, enabled: null})

    useEffect(() => {
        fetchData();
      }, []);

    const fetchData = () => {
        getUsersList()
        .then((data: any) => {
            if(data.length>0){
                console.log("users list = ", data)
                setUsersList(data)
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

    const toggleModal = () => {
      setModalOpen(!open);
    };

    const openModal = () => {
        setModalOpen(true);
      };

      const closeModal = () => {
        setModalOpen(false);
      };

      const closeModalAndUpdateTable = async () => {
        await fetchData();
        setModalOpen(false);
      };

      const addUser = (name: any) => {
        setMode('Add')
        setSelectedUser({user_id: null, firstname: null, lastname: null, email_address: null,
            contact_number: null, roles: null, enabled: null})
        openModal();
      }

      const openEditUser = (user: any) => {
        setMode('Edit')
        setSelectedUser({user_id: user.user_id,firstname : user.firstname, lastname: user.lastname, email_address: user.email_address,
            contact_number:user.contact_number, roles: user.roles.map((role: any)=> {return {id: role, name: role}}), enabled: user.isActive})
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
                {
                    !loading ?

                        <div className="row mt-4">
                            <div className="col-12 ">
                                <div className="table-cards shadow bg-white">




                                    <div className="table-responsive card-radius text-left">
                                        <table className="table rounded-3 p-1 table-sm table-striped">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Contact No</th>
                                                    <th>Role</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="custom-td-space">
                                                {
                                                    users_list
                                                        .map((user: any, index: any) => {
                                                            return  <tr key={index}>
                                                                        <td><a data-bs-toggle="modal" data-bs-target="#myModal">{user.firstname + user.lastname}</a></td>
                                                                        <td>{user.email_address}</td>
                                                                        <td>{user.contact_number}</td>
                                                                        <td>
                                                                        {
                                                                            user.roles
                                                                            .map((role: any) => {
                                                                                return (role)
                                                                            })
                                                                        }
                                                                        </td>
                                                                        {
                                                                            user.isActive === 'Y'
                                                                            ?
                                                                            <td className='text-success'> Enabled</td>

                                                                            :

                                                                            <td className='text-danger'> Disabled</td>
                                                                        }
                                                                        <td>
                                                                            <i className='fa fa-eye cursor-pointer text-danger'
                                                                            onClick={() => {
                                                                                openEditUser(user)
                                                                            }}></i>
                                                                        </td>
                                                                    </tr>
                                                        })
                                                }
                                            </tbody>
                                        </table>


                                    </div>
                                </div>

                            </div>
                        </div>

                        :

                        <></>
                }
                <ModalWindow show={open} modalClosed={closeModal}>
                    <AddUserForm mode={mode} modalClosed={closeModal} closeAndUpdate={closeModalAndUpdateTable} selectedUser={selectedUser} />
                </ModalWindow>
            </div>

        </>
    ) 

}

export default UserManagement;