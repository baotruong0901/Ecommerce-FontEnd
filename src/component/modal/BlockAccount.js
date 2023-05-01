import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { MdDeleteForever } from 'react-icons/md'
import Nodata from '../../public/images/no-data.jpeg'
import '../../scss/review.scss'
const BlockAccount = (props) => {
    const { show, setShow, blocked, handleUnblock, handleDeleteUser } = props
    const handleClose = () => {
        setShow(false)
    }

    console.log(blocked);
    return (
        <>
            <Modal show={show}
                onHide={handleClose}
                size="md"
                className='modal-review'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Blocked Accounts</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='list-user'>
                        {blocked?.length > 0
                            ?
                            blocked.map((item, index) => {
                                return (
                                    <div key={`${index}-blocked`} className='item'>
                                        <h5>{item?.email}</h5>
                                        <div className='action'>
                                            <span onClick={() => handleUnblock(item)} className='unblock'>UnBlock</span>
                                            <span onClick={() => handleDeleteUser(item)} className='delete'><MdDeleteForever size={'30px'} color='red' /></span>
                                        </div>
                                    </div>
                                )
                            }) :
                            <div style={{ backgroundImage: `url(${Nodata})` }} className='no-product'>
                            </div>
                        }
                    </div>
                </Modal.Body>
            </Modal >
        </>
    );
};

export default BlockAccount;