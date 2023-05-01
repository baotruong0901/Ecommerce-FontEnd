import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { NavLink } from 'react-router-dom';
import Input from '../component/Input';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { postBooking, emptyCartApi } from '../service/homeService';
import "../scss/checkout.scss"
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify'
import { setBooking, setCart } from '../store/actions/productActions';
const Checkout = () => {
    const user = useSelector((state) => state?.user?.account)
    const cart = useSelector((state) => state?.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [values, setValues] = useState({
        firstname: user?.firstname,
        lastname: user?.lastname,
        mobile: user?.mobile,
        address: "",
        city: ""
    })
    const [totalShipping, setTotalShipping] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    console.log(cart?.pCart);
    const newBooking = async () => {
        let customer = `${values.firstname} ${values.lastname}`
        let total = cart?.pCart?.cartTotal
        let res = await postBooking({
            products: cart?.pCart?.products,
            userId: user?._id,
            city: values?.city,
            address: values?.address,
            mobile: values?.mobile,
            customer,
            total
        })
        if (res && res.success === true) {
            toast.success(res?.msg)
            emptyCart()
            navigate('/')
        }
    }

    const emptyCart = async () => {
        let res = await emptyCartApi()
        console.log(res);
        if (res && res.success === true) {
            dispatch(setCart(res?.data))
        }
    }

    const handleSubmit = () => {
        setIsLoading(true)
        if (!values.firstname || !values.lastname || !values.mobile || !values.address || !values.city) {
            setTimeout(() => {
                setIsLoading(false)
                toast.error("Please enter full information!")
            }, 2000)
            return
        }
        setTimeout(() => {
            newBooking()
            setIsLoading(false)
        }, 2000)

    }

    return (
        <div className='checkout'>
            < div className='header' >
                <div className='container-xxl'>
                    <div className='row'>
                        <div className='col-12'>
                            <Breadcrumb className='new-header'>
                                <NavLink to="/cart" className="breadcrumb-item">Cart</NavLink>
                                <Breadcrumb.Item active>Order</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                </div>
            </div >
            <div className='checkout-main py-4'>
                <div className='container-xxl'>
                    <div className="row">
                        <div className="col-7">
                            <div className="checkout-left-data">
                                <h4 className="title">Delivery address</h4>
                                <p className="user-details total mb-3">
                                    {`${user?.firstname} ${user?.lastname}(${user?.email})`}
                                </p>
                                <h4>Shipping Address</h4>
                                <form
                                    className='row'
                                >
                                    <div className="col-4">
                                        <Input
                                            name="firstname"
                                            type="text"
                                            label="First Name"
                                            placeholder="Firstname"
                                            pattern="^[A-Za-z]+$"
                                            value={values.firstname}
                                            onChange={handleChange}
                                            errorMessage="Please enter your correct first name!"
                                        />
                                    </div>
                                    <div className="col-4">
                                        <Input
                                            name="lastname"
                                            type="text"
                                            label="Last Name"
                                            placeholder="Lastname"
                                            pattern="^[A-Za-z0-9]+$"
                                            value={values.lastname}
                                            onChange={handleChange}
                                            errorMessage="Please enter your correct last name!"
                                        />
                                    </div>

                                    <div className="col-4">
                                        <Input
                                            name="mobile"
                                            type="text"
                                            label="Mobile*"
                                            placeholder="PhoneNumber"
                                            pattern="^[0-9]{10}$"
                                            value={values.mobile}
                                            onChange={handleChange}
                                            errorMessage="Invalid phone number!"
                                        />
                                    </div>

                                    <div className="col-8 pb-3">
                                        <Input
                                            name="address"
                                            type="text"
                                            label="Address*"
                                            placeholder="No,Street - Ward - District"
                                            pattern="^[A-Za-z0-9 ]+$"
                                            value={values.address}
                                            onChange={handleChange}
                                            errorMessage="Please enter your Street-Ward-District!"
                                        />
                                    </div>

                                    <div className="col-4 pb-3">
                                        <Input
                                            name="city"
                                            type="text"
                                            label="City*"
                                            placeholder="City"
                                            pattern="^[A-Za-z ]+$"
                                            value={values.city}
                                            onChange={handleChange}
                                            errorMessage="Please enter your City!"
                                        />
                                    </div>

                                    <div className="w-100">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <Link to="/cart" className=" back-to-cart btn">
                                                <BiArrowBack className="me-2" />
                                                Return to Cart
                                            </Link>
                                            <button
                                                type='button'
                                                className="submit btn"
                                                onClick={handleSubmit}
                                                disabled={isLoading}
                                            >
                                                {isLoading === true && <AiOutlineLoading3Quarters className='loading-icon' />}

                                                <span>Continue</span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-5 right">
                            <div className="border-bottom pb-2">
                                {cart && cart?.pCart?.products.length > 0 && cart?.pCart?.products.map((item, index) => {
                                    console.log(item?.product?.images[0]);
                                    return (
                                        <div key={`${index}-checkout`} className="d-flex gap-10 mb-3 align-items-center">
                                            <div className="w-75 d-flex align-items-center d-flex gap-10">
                                                <div className="w-25 product">
                                                    <span
                                                        className="count"
                                                    >
                                                        {item.count}
                                                    </span>
                                                    <img className="image" src={item?.product?.images[0].url} alt="product" />
                                                </div>
                                                <div>
                                                    <h5 className="total-price">{item?.product?.description}</h5>
                                                    <p className="total-price">s / #agfgfd</p>
                                                </div>
                                            </div>

                                            <div className="flex-grow-1">
                                                <h5 className="price total">$ {item?.price}</h5>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                            <div className="border-bottom py-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="total">Subtotal</p>
                                    <p className="total-price">$ {cart?.pCart?.cartTotal}</p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-0 total">Shipping</p>
                                    <p className="mb-0 total-price">$ {totalShipping}</p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center border-bootom py-4">
                                <h4 className="total">Total</h4>
                                <h5 className="total-price">$ {cart?.pCart?.cartTotal + totalShipping}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;