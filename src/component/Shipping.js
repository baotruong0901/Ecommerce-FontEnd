import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Input from '../component/Input';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { getAddress, editAddress, createAddress } from '../service/homeService';
import "../scss/checkout.scss"
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify'
// import { setBooking, setCart } from '../store/actions/productActions';
import { addressShipping } from '../store/actions/userActions';
const Shipping = () => {
    const user = useSelector((state) => state?.user?.account)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        document.title = 'E-commerce Shipping'; // Thay đổi title của trang web
    }, []);
    const [values, setValues] = useState({
        fullName: "",
        phoneNumber: "",
        address: "",
        city: ""
    })
    const [addnew, setAddnew] = useState(false)
    const [type, setType] = useState("")
    const [addr, setAddr] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const fetchAddress = async () => {
        let res = await getAddress(user?._id)
        if (res && res?.success === true) {
            setAddr(res?.data)
        }
    }

    useEffect(() => {
        fetchAddress()
    }, [])

    const handleContinue = async () => {
        setIsLoading(true)
        if (!values.fullName || !values.phoneNumber || !values.address || !values.city) {
            setTimeout(() => {
                setIsLoading(false)
                toast.error("Please enter full information!")
            }, 2000)
            return
        }

        let data = {
            fullName: values.fullName,
            phoneNumber: values.phoneNumber,
            address: values.address,
            city: values.city
        }

        if (type === "edit") {
            let res = await editAddress(values?.id, data)
            if (res && res?.success === true) {
                dispatch(addressShipping(values?.id))
            }
        }
        if (type === "new") {
            let res = await createAddress(data)
            console.log(res);
            if (res && res?.success === true) {
                dispatch(addressShipping(res?.data?._id))
            }
        }

        setTimeout(() => {
            setIsLoading(false)
            navigate('/checkout/payment')
        }, 2000)

    }

    const handleAddnew = () => {
        setAddnew(true)
        setType("new")
        setValues(
            {
                fullName: "",
                phoneNumber: "",
                address: "",
                city: "",
                id: ""
            }
        )
    }

    const handleChooseAddress = (item) => {
        setAddnew(true)
        setValues(
            {
                fullName: item?.fullName,
                phoneNumber: item?.phoneNumber,
                address: item?.address,
                city: item?.city,
                id: item?._id
            }
        )
        setType("edit")
    }
    return (
        <div className="checkout-left-data" >
            <div className='title'>
                <h4>Delivery address</h4>
                <button onClick={() => handleAddnew()} className='btn new-address'><IoMdAdd color={'4267b2'} size={"24px"} />
                    <span>New address</span></button>
            </div>
            <div className='address-shipping'>
                {
                    addr?.map((item, index) => {
                        return (
                            <div onClick={() => handleChooseAddress(item)} key={`infor-${index}`} className='infor'>
                                <div className='left'>
                                    <div className='fullname'>
                                        <span className='name'>{item?.fullName}</span>
                                        <span className='phone'>{item?.phoneNumber}</span>
                                    </div>
                                    <p className='address'>
                                        {item?.address}, {item?.city}
                                    </p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {
                addnew === true &&
                <div className='shipping'>
                    {/* <h4 className='mb-2'>Shipping Address</h4> */}
                    <form
                        className='row'
                    >
                        <div className="col-12 col-sm-6">
                            <Input
                                name="fullName"
                                type="text"
                                label="Full Name"
                                placeholder="FullName"
                                pattern="^[A-Za-z0-9À-ỹ ]+$"
                                value={values.fullName}
                                onChange={handleChange}
                                errorMessage="Please enter your correct name!"
                            />
                        </div>

                        <div className="col-sm-6 col-12">
                            <Input
                                name="phoneNumber"
                                type="text"
                                label="PhoneNumber*"
                                placeholder="PhoneNumber"
                                pattern="^[0-9]{10}$"
                                value={values.phoneNumber}
                                onChange={handleChange}
                                errorMessage="Invalid phone number!"
                            />
                        </div>

                        <div className="col-12">
                            <Input
                                name="address"
                                type="text"
                                label="Adress*"
                                placeholder="specific pronouns"
                                pattern="^[A-Za-z0-9À-ỹ, ]+$"
                                value={values.address}
                                onChange={handleChange}
                                errorMessage="Please enter your Street-Ward-District!"
                            />
                        </div>

                        <div className="col-12">
                            <Input
                                name="city"
                                type="text"
                                label="City*"
                                placeholder="Ward - District - City"
                                pattern="^[A-Za-zÀ-ỹ ]+$"
                                value={values.city}
                                onChange={handleChange}
                                errorMessage="Please enter your City!"
                            />
                        </div>

                    </form>
                </div>
            }
            <div className="w-100 mt-3">
                <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className=" back-to-cart btn">
                        <BiArrowBack className="me-2" />
                        Return to Cart
                    </Link>
                    {addnew === true &&
                        <button
                            type='button'
                            className="submit btn"
                            onClick={handleContinue}
                            disabled={isLoading}
                        >
                            {isLoading === true && <AiOutlineLoading3Quarters className='loading-icon' />}
                            <span>Continue</span>
                        </button>
                    }
                </div>
            </div>

        </div >
    );
};

export default Shipping;