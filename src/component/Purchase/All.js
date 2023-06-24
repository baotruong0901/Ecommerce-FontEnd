import React, { useEffect, useState } from 'react';
import { getBooking, confirmBookingApi } from '../../service/homeService';
import { useDispatch, useSelector } from 'react-redux';
import { setBooking, setCart } from '../../store/actions/productActions';
import { AiOutlineShop } from 'react-icons/ai'
import { SiVirustotal } from 'react-icons/si'
import { Link, useNavigate } from 'react-router-dom';
import NoProduct from '../../public/images/no-product.jpeg'
import { toast } from 'react-toastify'
import { NumericFormat } from 'react-number-format'
import ViewProducts from '../modal/ViewProducts';

const All = (props) => {
    const type = props.activeTab
    const { setProgress, setVal } = props
    const booking = useSelector((state) => state?.booking?.booking)
    const [show, setShow] = useState(false)
    const [value, setValue] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const fetchBooking = async () => {
        let data = {
            type,
            page: 1,
            limit: 7
        }
        let res = await getBooking(data)
        if (res && res.success === true) {
            dispatch(setBooking(res?.data.reverse()))
        }
    }
    useEffect(() => {
        fetchBooking()
    }, [type])

    const handleCancelBooking = async (bookingItem) => {
        const bookingId = bookingItem?._id
        const type = "CANCELLED"
        let res = await confirmBookingApi(bookingId, type)
        if (res && res.success == true) {
            fetchBooking()
            toast.success(res?.msg)
        }
    }
    const handleViewMore = (product) => {
        setShow(true)
        setValue(product)
    }
    const handleProgress = (booking) => {
        navigate(`/user/purchase/orderId=${booking?._id}`)
        setProgress(true)
        setVal(booking)
    }

    return (
        <>
            {booking && booking.length > 0 && booking.map((item) => {
                return (
                    <>
                        <div className='all-booking' key={item._id}>
                            <div className='booking-header'>
                                <Link to="/our-store" className='btn view'><AiOutlineShop /><span>View Shop</span></Link>
                                <div className='status'>
                                    <div onClick={() => handleProgress(item)} className='status-name'>{item?.status === "CONFIRM" && "Waiting for seller to confirm"
                                        || item?.status === "RECEIVE" && "Orders are being delivered"
                                        || item?.status === "CANCELLED" && "The order has been canceled by the seller"
                                        || item?.status === "COMPLETED" && "Order has been successfully delivered"}
                                    </div>
                                    <div className='status-code'>{item?.status === "CONFIRM" && "TO CONFIRM"
                                        || item?.status === "RECEIVE" && "TO RECEIVE"
                                        || item?.status === "CANCELLED" && "CANCEL"
                                        || item?.status === "COMPLETED" && "COMPLETED"}
                                    </div>
                                </div>
                            </div>
                            <div onClick={() => handleProgress(item)} className="product">
                                {item?.status === "CANCELLED" && <div className='isCancel'></div>}
                                <div className='image'>
                                    <img src={item?.products[0]?.product?.images[0].url} className="img-fluid" alt="product image" />
                                </div>
                                <div className='content'>
                                    <p>Name: {item?.products[0]?.product?.title}</p>
                                    <p>Brand: {item?.products[0]?.product?.brand[0]?.name}</p>
                                    <p> x{item?.products[0]?.count}
                                    </p>
                                </div>
                                <h6 className="price">
                                    {item?.products[0]?.product?.coupon && +item?.products[0]?.product?.coupon !== 0 ?
                                        <>
                                            <span className="original-price">
                                                <NumericFormat
                                                    value={item?.products[0]?.product?.price}
                                                    displayType="text"
                                                    thousandSeparator={true}
                                                    suffix={'đ'}
                                                />
                                            </span>
                                            <span className="discounted-price">
                                                <NumericFormat
                                                    value={(item?.products[0]?.product?.price * (1 - (+item?.products[0]?.product?.coupon) / 100))}
                                                    displayType="text"
                                                    thousandSeparator={true}
                                                    suffix={'đ'}
                                                />
                                            </span>
                                        </>
                                        :
                                        <NumericFormat
                                            value={item?.products[0]?.product?.price}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            suffix={'đ'}
                                        />
                                    }
                                    x{item?.products[0]?.count}</h6>
                            </div>
                            {item?.products.length > 1 &&
                                <div className='view-more'
                                    onClick={() => handleViewMore(item.products)}
                                >
                                    <button>View more products</button>
                                </div>
                            }
                            <div className='total-booking'>
                                <div className='left'>
                                    {item?.products?.reduce((acc, product) => acc + product.count, 0)} products
                                </div>
                                <div className='right'>
                                    {item?.status === "CONFIRM" &&
                                        <button onClick={() => handleCancelBooking(item)} className='cancel'>
                                            Cancel
                                        </button>
                                    }
                                    {item?.status === "CANCELLED" &&
                                        <span className='cancel-by'>{item?.cancelBy}</span>
                                    }
                                    <div>
                                        <SiVirustotal color={'bf4800'} size={'24px'} />
                                        <span>Order Total:</span>
                                    </div>
                                    <span className='price'>
                                        <NumericFormat
                                            value={item?.total}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            suffix={'đ'}
                                        />
                                    </span>
                                </div>
                            </div>

                        </div>
                        <ViewProducts
                            show={show}
                            setShow={setShow}
                            value={value}
                        />
                    </>
                )
            })}
            {booking && booking.length === 0 &&
                <div style={{ backgroundImage: `url(${NoProduct})` }} className='no-product'>
                </div>
            }

        </>
    );
};

export default All;