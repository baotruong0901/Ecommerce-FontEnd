import React, { useState } from 'react';
import CustomerInput from './CustomerInput';
import QuillText from './QuillText';
import CustomerSelect from './CustomerSelect';
import UploadImage from './UploadImage';
import { addNewBlog } from '../../service/homeService';
import { toast } from 'react-toastify'

const AddBlog = () => {
    const [value, setValue] = useState({
        title: '',
        topic: ''
    })
    const [description, setDescription] = useState('')
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }
    const handleDesc = (value) => {
        setDescription(value)
    }
    const handleCreate = async () => {
        let res = await addNewBlog(value.title, value.topic, description, selectedFiles)
        if (res && res?.success === true) {
            toast.success(res?.msg)
            setValue({
                title: '',
                topic: ''
            })
            setDescription('')
            setSelectedFiles([])
        }

    }
    return (
        <div className='add-new-blog'>
            <h3 className='title mb-3'>Create Blog</h3>
            <div className='main'>
                {/* <CustomerSelect options={topicOptions}
                    selectedOptions={select.selectTopic}
                    isMulti={true}
                    handleSelectChange={handleSelectChange}
                    name="selectColor"
                    placeholder='Choose topic...'
                    className='select mb-3'
                    classNamePrefix='select'
                /> */}
                <CustomerInput
                    name="title"
                    placeholder='example: We are one'
                    handleChange={handleChange}
                    value={value.title} type='text' label='Title'
                />
                <CustomerInput
                    name="topic"
                    placeholder='example: football'
                    handleChange={handleChange}
                    value={value.topic} type='text' label='Topic'
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