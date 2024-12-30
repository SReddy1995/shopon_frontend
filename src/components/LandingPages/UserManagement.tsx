import React, { useEffect, useState } from 'react';
import AddUserForm from './AddUserForm';
import ModalWindow from './ModalWindow';
import { getUsersList } from '../../services/UsersService';
import { useLocation } from 'react-router-dom';

const UserManagement = () => {
    const [open, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [mode, setMode] = useState('Add');
    const [users_list, setUsersList] = useState([]);
    const [selectedUser, setSelectedUser] = useState({user_id: null, firstname: null, lastname: null, email_address: null,
        contact_number: null, roles: null, enabled: null})
        const location = useLocation();


        useEffect(() => {
            fetchData();
          }, [location]); 

    useEffect(() => {
        fetchData();
      }, []);

    const fetchData = () => {
        setLoading(true);
       getUsersList()
        .then((data: any) => {
            if(data){
                setUsersList(data)
                console.log(data)
            setLoading(false);

            }
            else{
                // let default initial values load
            }
        })
        .catch(err => {
            setLoading(false);
        });
    }

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
        setSelectedUser({user_id: user.users.user_id,firstname : user.users.firstname, lastname: user.users.lastname, email_address: user.users.email_address,
            contact_number:user.users.contact_number, roles: user.roles.map((role: any)=> {return {id: role, name: role}}), enabled: user.status})
        openModal();
      }

    return (
        <>
            <div className="container-fluid h-auto mt-3 px-3">
                <div className="row">
                    <div className="col-6 text-left">
                        <h3>User Management</h3>
                    </div>
                    <div className="col-6 text-right">
                        <button type="button"
                            className="btn-custom" onClick={addUser}>Add User</button>
                    </div>
                </div>
                
                {
                    !loading ?

                        <div className="row mt-2">
                            <div className="col-12 ">
                            <div className="card shadow bg-white table-padding mb-3 pb-0">
                                    <div className="table-responsive text-left" style={{borderRadius:'0.75rem'}}>
                                        <table className="table user-table" style={{padding:'0.375rem 0.375rem 0.375rem 0.75rem !important'}}>
                                            <thead className="table-light">
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Contact No</th>
                                                    <th>Role</th>
                                                    <th>Status</th>
                                                    <th className="text-center">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="custom-td-space">
                                                {
                                                    users_list
                                                        .map((user: any, index: any) => {
                                                            return  <tr key={index}>
                                                                        <td><p className='mb-0' data-bs-toggle="modal" data-bs-target="#myModal">{user.users.firstname} &nbsp;{user.users.lastname}</p></td>
                                                                        <td>{user.users.email_address}</td>
                                                                        <td>{user.users.contact_number}</td>
                                                                        <td>
                                                                        {
                                                                            
                                                                            user.roles
                                                                            .map((role: any, index: any) => {
                                                                                return index>0 ? ', '+(role) : (role)
                                                                            })
                                                                        }
                                                                        </td>
                                                                        {
                                                                            user.status === 'Y'
                                                                            ?
                                                                            <td className='text-success'> Enabled</td>

                                                                            :

                                                                            <td className='text-danger'> Disabled</td>
                                                                        }
                                                                        <td className="text-center">
                                                                            <i className='fa fa-pencil cursor-pointer'
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