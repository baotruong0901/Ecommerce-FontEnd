import React, { useState } from 'react';
import CustomerInput from './CustomerInput';
import UploadImage from './UploadImage';
import { createCategory } from '../../service/homeService';
import { toast } from 'react-toastify'

const AddCategory = ({ name }) => {
    const [categoryname, setCategoryname] = useState("")
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleChange = (e) => {
        setCategoryname(e.target.value)
    }
    const handleCreate = async () => {
        let res = await createCategory(categoryname, selectedFiles)
        if (res && res.success === true) {
            toast.success(res?.msg)
            setCategoryname('')
            setSelectedFiles([])
        }
    }
    return (
        <>
            <CustomerInput
                name="categoryname"
                placeholder='example: Apple'
                handleChange={handleChange}
                value={categoryname} type='text' label='Enter Category Name'
            />
            <UploadImage
                setImages={setSelectedFiles}
                images={selectedFiles}
                type="only"
                url="https://ecommerce-bga8.onrender.com/api/category"
            />
            <button type='button' onClick={handleCreate} className='btn btn-primary mt-3'>Create {name}</button>
        </>
    );
};

export default AddCategory;