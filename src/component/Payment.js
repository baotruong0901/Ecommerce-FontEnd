import React, { useState, useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { emptyCartApi, postBooking } from '../service/homeService';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setCart } from '../store/actions/productActions';
const Payment = () => {
    const address = useSelector((state) => state?.address?.shippingAddress)
    const cart = useSelector((state) => state?.cart)
    const user = useSelector((state) => state?.user?.account)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const handleChangeAddress = () => {
        navigate('/checkout/shipping')
    }
    useEffect(() => {
        document.title = 'E-commerce Payment'; // Thay đổi title của trang web
    }, []);
    const handleSubmit = async () => {
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
            newBooking()
        }, 2000)

    }

    const newBooking = async () => {
        let customer = address?.fullName
        let total = cart?.pCart?.cartTotal
        let res = await postBooking({
            products: cart?.pCart?.products,
            userId: user?._id,
            address: `${address?.address}, ${address?.city}`,
            phoneNumber: address?.phoneNumber,
            customer,
            total
        })
        if (res && res.success === true) {
            toast.success(res?.msg)
            emptyCart()
            navigate(`/booking/state=${res?.success}&${res?.data?._id}`)
        }
    }

    const emptyCart = async () => {
        let res = await emptyCartApi()
        if (res && res.success === true) {
            dispatch(setCart(res?.data))
        }
    }

    return (
        <div className='checkout-left-data'>
            <div className='title'>
                <h4 className='title'>Confirm Information</h4>
            </div>

            <div className='infor mb-2 mb-sm-3'>
                <div className='left'>
                    <div className='fullname'>
                        <span className='name'>{address?.fullName}</span>
                        <span className='phone'>{address?.phoneNumber}</span>
                    </div>
                    <p className='address'>
                        {address?.address}, {address?.city}
                    </p>
                </div>
                <div className='right'>
                    <button onClick={() => handleChangeAddress()} className='btn change'>Change</button>
                </div>
            </div>
            <div className='payment'>
                <input
                    className="form-check-input"
                    type="radio"
                    id={`${address?._id}-1`}
                    value={"Thanh toán khi nhận hàng"}
                />
                <label className="form-check-label" htmlFor={`${address?._id}-1`}>
                    Thanh toán khi nhận hàng
                </label>
            </div>
            <div className="w-100 mt-3">
                <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className=" back-to-cart btn">
                        {/* <BiArrowBack className="me-2" /> */}
                        Cancel
                    </Link>
                    <button
                        type='button'
                        className="submit btn"
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading === true && <AiOutlineLoading3Quarters className='loading-icon' />}
                        <span>Order</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Payment;