import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Input from '../Input';
import Nodata from '../../public/images/no-data.jpeg'
import '../../scss/UpdateUser.scss'
const UpdateUser = (props) => {
    const { show, setShow, userInfo, handleChange, submitChange } = props
    const handleClose = () => {
        setShow(false)
    }
    return (
        <>
            <Modal show={show}
                onHide={handleClose}
                size="md"
                className='modal-update'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update User: {userInfo?.Email} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='update-user'>
                        <form>
                            <label>Email</label>
                            <input
                                className='form-control mb-2'
                                placeholder="email"
                                value={userInfo?.email}
                                disabled
                            />
                            <label>First Name</label>
                            <input
                                className='form-control mb-2'
                                placeholder="First Name"
                                name='firstname'
                                value={userInfo?.firstname}
                                onChange={handleChange}

                            />
                            <label>Last Name</label>
                            <input
                                className='form-control mb-2'
                                placeholder="Last Name"
                                value={userInfo?.lastname}
                                name='lastname'
                                onChange={handleChange}
                            />
                            <label>Mobile</label>
                            <input
                                className='form-control mb-2'
                                placeholder="mobile"
                                name="Mobile"
                                value={userInfo?.mobile}
                                onChange={handleChange}
                            />
                            <button onClick={submitChange} className='btn btn-primary' type='button'>Save</button>
                        </form>

                    </div>
                </Modal.Body>
            </Modal >
        </>
    );
};

export default UpdateUser;