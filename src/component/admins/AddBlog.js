import React, { useState } from 'react';
import CustomerInput from './CustomerInput';
import QuillText from './QuillText';
import UploadImage from './UploadImage';
import { addNewBlog } from '../../service/homeService';
import { toast } from 'react-toastify'

const AddBlog = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleDesc = (value) => {
        setDescription(value)
    }
    const handleCreate = async () => {
        let res = await addNewBlog(title, description, selectedFiles)
        if (res && res?.success === true) {
            toast.success(res?.msg)
            setTitle('')
            setDescription('')
            setSelectedFiles([])
        }

    }
    return (
        <div className='add-new-blog'>
            <h3 className='title mb-3'>Create Blog</h3>
            <div className='main'>
                <CustomerInput
                    name="title"
                    placeholder='example: We are one'
                    handleChange={handleChange}
                    value={title} type='text' label='Enter Blog Title'
                />
                <QuillText
                    text={description}
                    setText={setDescription}
                    handleDesc={handleDesc}
                />
                <UploadImage
                    setImages={setSelectedFiles}
                    type="only"
                    images={selectedFiles}
                    url="http://localhost:8800/api/blog"
                />
                <button type='button' onClick={handleCreate} className='btn btn-primary mt-3'>Create Blog</button>

            </div>
        </div>
    );
};

export default AddBlog;