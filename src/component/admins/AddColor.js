import React, { useState } from 'react';
import CustomerInput from './CustomerInput';
import { createColor } from '../../service/homeService';
import { toast } from 'react-toastify'
const AddColor = ({ name }) => {
    const [value, setValue] = useState({
        colorname: "",
        colorcode: ""
    })

    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }
    const handleCreate = async () => {
        let { colorname, colorcode } = value
        let res = await createColor(colorname, colorcode)
        if (res && res?.success === true) {
            toast.success(res?.msg)
            setValue({
                colorname: "",
                colorcode: ""
            })
        }
    }

    return (
        <>
            <CustomerInput
                name="colorname"
                placeholder='example: While'
                handleChange={handleChange}
                value={value.colorname} type='text' label='Enter Color Name'
            />
            <CustomerInput
                name="colorcode"
                placeholder='example: #fff'
                handleChange={handleChange}
                value={value.colorcode} type='text' label='Enter Color Code'
            />
            <button type='button' onClick={handleCreate} className='btn btn-primary mt-3'>Create {name}</button>
        </>
    );
};

export default AddColor;