import React from 'react';

const UserManagement = () => {

    return (
        <>
            <div className="container-fluid h-auto mt-4 px-5">
                <div className="row justify-content-center">
                    <div className="col-12 d-flex px-3">
                        <div>
                            <h3>User Management</h3>
                        </div>
                        <div>
                            <a className="btn-link"><button type="button"
                                className="btn-custom" data-bs-toggle="modal" data-bs-target="#myModal">Add User</button></a>
                        </div>
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
                                    </tr>
                                </thead>
                                <tbody className="custom-td-space">
                                    <tr>
                                        <td><a data-bs-toggle="modal" data-bs-target="#myModal">John Admin</a></td>
                                        <td>john@example.com</td>
                                        <td>Admin</td>
                                        <td>Yes</td>
                                    </tr>
                                    <tr>
                                        <td>Mary</td>
                                        <td>Moe</td>
                                        <td>mary@example.com</td>
                                        <td>No</td>
                                    </tr>
                                    <tr>
                                        <td>July</td>
                                        <td>Dooley</td>
                                        <td>july@example.com</td>
                                        <td>Yes</td>
                                    </tr>
                                    <tr>
                                        <td><a data-bs-toggle="modal" data-bs-target="#myModal">John Admin</a></td>
                                        <td>john@example.com</td>
                                        <td>Admin</td>
                                        <td>No</td>
                                    </tr>
                                    <tr>
                                        <td>Mary</td>
                                        <td>Moe</td>
                                        <td>mary@example.com</td>
                                        <td>No</td>
                                    </tr>
                                    <tr>
                                        <td>July</td>
                                        <td>Dooley</td>
                                        <td>july@example.com</td>
                                        <td>Yes</td>
                                    </tr>
                                    <tr>
                                        <td><a data-bs-toggle="modal" data-bs-target="#myModal">John Admin username</a></td>
                                        <td>john@example.com</td>
                                        <td>Super Admin</td>
                                        <td>No</td>
                                    </tr>
                                    <tr>
                                        <td>Mary</td>
                                        <td>Moe</td>
                                        <td>mary@example.com</td>
                                        <td>No</td>
                                    </tr>
                                    <tr>
                                        <td>July</td>
                                        <td>Dooley</td>
                                        <td>july@example.com</td>
                                        <td>Yes</td>
                                    </tr>
                                </tbody>
                            </table>


                        </div>
                        </div>
     
                    </div>
                </div>

            </div>
        </>
    ) 

}

export default UserManagement;