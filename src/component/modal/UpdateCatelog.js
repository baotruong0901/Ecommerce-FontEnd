import React from 'react';
import Modal from 'react-bootstrap/Modal';
import CustomerInput from '../admins/CustomerInput';
import UploadImage from '../admins/UploadImage';

const UpdateCatalog = (props) => {
    const { show, setShow, name, catalogName, value, handleUpdate, handleChange, setSelectedFiles, selectedFiles } = props

    const handleClose = () => {
        setShow(false)
    }
    return (
        <>
            <Modal show={show}
                onHide={handleClose}
                size="lg"
                className='modal-update'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update {name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CustomerInput
                        name={`${name}Name`}
                        placeholder='example: Apple'
                        handleChange={handleChange}
                        value={catalogName} type='text' label={`Enter New ${name} Name`}
                    />
                    <UploadImage
                        setImages={setSelectedFiles}
                        type="only"
                        images={selectedFiles}
                        url="https://ecommerce-clone-if2t.onrender.com/api/brand"
                    />
                    <button type='button' onClick={handleUpdate} className='btn btn-primary mt-3'>Update {name}</button>
                </Modal.Body>
            </Modal >
        </>
    );
};

export default UpdateCatalog;