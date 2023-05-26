import React, { useState } from 'react';
import CustomerInput from './CustomerInput';
import { createSize } from '../../service/homeService';
import { toast } from 'react-toastify'
const AddSize = ({ name }) => {
    const [size, setSize] = useState('')
    const handleChange = (e) => {
        setSize(e.target.value)
    }
    const handleCreate = async () => {
        let res = await createSize(size)
        if (res && res?.success === true) {
            toast.success(res?.msg)
            setSize('')
        }
    }
    return (
        <>
            <CustomerInput
                name="name"
                placeholder='example: IP14'
                handleChange={handleChange}
                value={size} type='text' label='Enter Size'
            />
            <button type='button' onClick={handleCreate} className='btn btn-primary mt-3'>Create {name}</button>

        </>
    );
};

export default AddSize;