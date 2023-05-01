import React, { useEffect, useState } from 'react';
import { getBooking, confirmBookingApi } from '../../service/homeService';
import { useDispatch, useSelector } from 'react-redux';
import { setBooking, setCart } from '../../store/actions/productActions';
import { AiOutlineShop } from 'react-icons/ai'
import { SiVirustotal } from 'react-icons/si'
import { Link } from 'react-router-dom';
import NoProduct from '../../public/images/no-product.jpeg'
import { toast } from 'react-toastify'

const All = (props) => {
    const type = props.activeTab
    const booking = useSelector((state) => state?.booking?.booking)
    const dispatch = useDispatch()
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
        const type = "CANCEL"
        let res = await confirmBookingApi(bookingId, type)
        if (res && res.success == true) {
            fetchBooking()
            toast.success(res?.msg)
        }
    }

    return (
        <>
            {booking && booking.length > 0 && booking.map((item) => {
                console.log(item?.products[0])
                return (
                    <div className='all-booking' key={item._id}>
                        <div className='booking-header'>
                            <Link to="/our-store" className='btn view'><AiOutlineShop /><span>View Shop</span></Link>
                            <div className='status'>
                                <div className='status-name'>{item?.status === "TO CONFIRM" && "Waiting for seller to confirm"
                                    || item?.status === "TO RECEIVE" && "Orders are being delivered"
                                    || item?.status === "CANCEL" && "The order has been canceled by the seller"
                                    || item?.status === "COMPLETE" && "Order has been successfully delivered"}
                                </div>
                                <div className='status-code'>{item?.status === "TO CONFIRM" && "TO CONFIRM"
                                    || item?.status === "TO RECEIVE" && "TO RECEIVE"
                                    || item?.status === "CANCEL" && "CANCEL"
                                    || item?.status === "COMPLETE" && "COMPLETE"}
                                </div>
                            </div>
                        </div>
                        <div className="product">
                            {item?.status === "S3" && <div className='isCancel'></div>}
                            <div className='image'>
                                <img src={item?.products[0]?.product?.images[0].url} className="img-fluid" alt="product image" />
                            </div>
                            <div className='content'>
                                <p>Name: {item?.products[0]?.product?.title}</p>
                                <p>Brand: {item?.products[0]?.product?.brand[0]?.name}</p>
                                <p> x{item?.products[0]?.count}
                                </p>
                            </div>
                            <h6 className="price">$ {item?.products[0]?.product?.price}x{item?.products[0]?.count}</h6>
                        </div>
                        {item?.products.length > 1 &&
                            <div className='view-more'>
                                <button>View more products</button>
                            </div>
                        }
                        <div className='total-booking'>
                            <div className='left'>
                                {item?.products?.reduce((acc, product) => acc + product.count, 0)} products
                            </div>
                            <div className='right'>
                                {item?.status === "S1" &&
                                    <button onClick={() => handleCancelBooking(item)} className='cancel'>
                                        Cancel
                                    </button>
                                }
                                {item?.status === "S3" &&
                                    <span className='cancel-by'>{item?.cancelBy}</span>
                                }
                                <div>
                                    <SiVirustotal color={'bf4800'} size={'24px'} />
                                    <span>Order Total:</span>
                                </div>
                                <span className='price'>${item?.total}</span>
                            </div>
                        </div>
                    </div>
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