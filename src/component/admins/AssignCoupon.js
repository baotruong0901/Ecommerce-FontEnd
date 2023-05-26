import React, { useState, useEffect } from 'react';
import CustomerSelect from './CustomerSelect';
import CustomerInput from './CustomerInput';
import { getProductApi, assignCoupon } from '../../service/homeService';
import { toast } from 'react-toastify';
const AssignCoupon = () => {
    const [productOptions, setProductOptions] = useState([])
    const [coupon, setCoupon] = useState('')
    const [select, setSelect] = useState({
        selectProduct: []
    })
    const getAllProduct = async () => {
        let res = await getProductApi()
        let newOptions = res?.data?.map((item, index) => ({
            value: item?._id,
            label: `${index + 1}- ${item?.title}-(${+item?.coupon}%)`,
        }))

        setProductOptions([...productOptions, ...newOptions])
    }
    const handleSelectChange = (selectoption, event) => {
        setSelect({ ...select, [event.name]: selectoption })
    }
    useEffect(() => {
        getAllProduct()
    }, [coupon])
    const handleCreate = async () => {
        let productId = select.selectProduct.value
        let res = await assignCoupon(productId, coupon)
        if (res && res?.success === true) {
            toast.success(res?.msg)
            setCoupon("")
            setSelect({
                selectProduct: []
            })
        }
    }
    const handleChange = (e) => {
        setCoupon(e.target.value)
    }
    return (
        <>
            <CustomerSelect options={productOptions}
                selectedOptions={select.selectProduct}
                isMulti={false}
                handleSelectChange={handleSelectChange}
                name="selectProduct"
                placeholder='Choose Product...'
                className='select mb-3'
                classNamePrefix='select'
            />
            <CustomerInput
                name="coupon"
                placeholder='example: 20'
                handleChange={handleChange}
                value={coupon} type='text' label='Enter coupon ex: 20' />
            <button type='button' onClick={handleCreate} className='btn btn-primary mt-3'>Assign</button>
        </>
    );
};

export default AssignCoupon;