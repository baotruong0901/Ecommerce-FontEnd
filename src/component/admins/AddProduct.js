import React, { useEffect, useState, useRef } from 'react';
import CustomerInput from './CustomerInput';
import QuillText from './QuillText';
import CustomerSelect from './CustomerSelect';
import { getAllCategories, getAllBrandApi, getColor, createAProduct } from '../../service/homeService';
import '../../scss/addProduct.scss'
import UploadImage from './UploadImage';
import { toast } from 'react-toastify';
const AddProduct = ({ name }) => {
    const [categoryOptions, setCategoryOptions] = useState([])
    const [colorOptions, setColorOptions] = useState([])
    const [brandOptions, setBrandOptions] = useState([])

    const [value, setValue] = useState({
        title: "",
        price: "",
        quantity: ""
    })
    const [select, setSelect] = useState({
        selectCategory: [],
        selectColor: [],
        selectBrand: [],
    })
    const [text, setText] = useState('')

    // const [images, setImages] = useState([])

    const [selectedFiles, setSelectedFiles] = useState([]);
    const handleDesc = (value) => {
        setText(value)
    }
    const getCategoryOption = async () => {
        let res = await getAllCategories()
        let newOptions = res?.data?.map((item) => ({
            value: item?._id,
            label: item?.name,
        }))
        setCategoryOptions([...categoryOptions, ...newOptions])
    }
    const getColorOption = async () => {
        let res = await getColor()
        console.log(res);
        let newOptions = res?.data?.map((item) => ({
            value: item?._id,
            label: `${item?.color}-${item?.colorCode}`,
        }))
        setColorOptions([...colorOptions, ...newOptions])
    }
    const getBrandOption = async () => {
        let res = await getAllBrandApi()
        let newOptions = res?.data?.map((item) => ({
            value: item?._id,
            label: item?.name,
        }))
        setBrandOptions([...brandOptions, ...newOptions])
    }
    useEffect(() => {
        getCategoryOption()
        getColorOption()
        getBrandOption()
    }, [])
    const handleSelectChange = (selectoption, event) => {
        setSelect({ ...select, [event.name]: selectoption })
    }

    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    const handleCreate = async () => {
        let { title, price, quantity } = value
        let description = text
        let category = select?.selectCategory.map((item) => item.value)
        let brand = select?.selectBrand.map((item) => item.value)
        let color = select?.selectColor.map((item) => item.value)
        let images = selectedFiles
        let res = await createAProduct(title, description, price, brand, color, category, images, quantity)
        if (res && res.success === true) {
            toast.success(res?.msg)
            setSelectedFiles([])
            setValue(
                {
                    title: "",
                    price: "",
                    quantity: ""
                }
            )
            setText('')
            setSelect({
                selectCategory: [],
                selectColor: [],
                selectBrand: [],
            })
        }
    }

    return (
        <>
            <CustomerInput
                name="title"
                placeholder='example: Iphone 14'
                handleChange={handleChange}
                value={value?.title} type='text' label='Enter Product Title' />
            <QuillText
                text={text}
                setText={setText}
                handleDesc={handleDesc}
            />
            <CustomerInput
                placeholder='example: 100VND'
                name="price"
                handleChange={handleChange}
                value={value?.price}
                type='number' label='Enter Product Price' />
            <CustomerInput
                placeholder='example: 1000'
                name="quantity"
                handleChange={handleChange}
                value={value?.quantity}
                type='number' label='Enter Product Quantity' />
            <CustomerSelect options={categoryOptions}
                selectedOptions={select.selectCategory}
                isMulti={true}
                name="selectCategory"
                handleSelectChange={handleSelectChange}
                placeholder='Choose Categories...'
                className='select mb-3'
                classNamePrefix='select'
            />
            <CustomerSelect options={brandOptions}
                selectedOptions={select.selectBrand}
                isMulti={true}
                handleSelectChange={handleSelectChange}
                name="selectBrand"
                placeholder='Choose Brands...'
                className='select mb-3'
                classNamePrefix='select'
            />
            <CustomerSelect options={colorOptions}
                selectedOptions={select.selectColor}
                isMulti={true}
                handleSelectChange={handleSelectChange}
                name="selectColor"
                placeholder='Choose colors...'
                className='select mb-3'
                classNamePrefix='select'
            />
            <UploadImage
                setImages={setSelectedFiles}
                images={selectedFiles}
                url="https://ecommerce-bga8.onrender.com/api/product"
            />
            {/* <input type="file" ref={fileInputRef} multiple onChange={handleFileInputChange} /> */}
            <button type='button' onClick={handleCreate} className='btn btn-primary mt-3'>Create {name}</button>
        </>
    );
};

export default AddProduct;