import React, { useState } from 'react';
import CustomerInput from './CustomerInput';
import UploadImage from './UploadImage';
import { createBrand } from '../../service/homeService';
import { toast } from 'react-toastify'
const AddBrand = ({ name }) => {
    const [brandname, setBrandname] = useState("")
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleChange = (e) => {
        setBrandname(e.target.value)
    }
    const handleCreate = async () => {
        let res = await createBrand(brandname, selectedFiles)
        if (res && res.success === true) {
            toast.success(res?.msg)
            setBrandname('')
            setSelectedFiles([])
        }
    }
    return (
        <>
            <CustomerInput
                name="brandname"
                placeholder='example: Apple'
                handleChange={handleChange}
                value={brandname} type='text' label='Enter Brand Name'
            />
            <UploadImage
                setImages={setSelectedFiles}
                type="only"
                images={selectedFiles}
                url="https://ecommerce-bga8.onrender.com/api/brand"
            />
            <button type='button' onClick={handleCreate} className='btn btn-primary mt-3'>Create {name}</button>
        </>
    );
};

export default AddBrand;