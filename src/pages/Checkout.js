import React, { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import "../scss/checkout.scss"
import { useSelector } from 'react-redux';
import { NumericFormat } from 'react-number-format'
const Checkout = () => {
    const cart = useSelector((state) => state?.cart)
    const [totalShipping, setTotalShipping] = useState(0)
    // useEffect(() => {
    //     document.title = 'E-commerce | mua hàng online'; // Thay đổi title của trang web
    // }, []);
    return (
        <div className='checkout'>
            <div className='checkout-main py-4'>
                <div className='container-xxl'>
                    <div className="row main">
                        <div className="col-12 col-sm-6">
                            <Outlet />
                        </div>
                        <div className="col-12 col-sm-6 right">
                            <div className="border-bottom pb-2">
                                {cart && cart?.pCart?.products.length > 0 && cart?.pCart?.products.map((item, index) => {
                                    return (
                                        <div key={`${index}-checkout`} className="d-flex gap-10 mb-3 align-items-center">
                                            <div className="d-flex align-items-center d-flex gap-10">
                                                <div className="product">
                                                    <span
                                                        className="count"
                                                    >
                                                        {item.count}
                                                    </span>
                                                    <img className="image" src={item?.product?.images[0].url} alt="product" />
                                                </div>
                                                <div>
                                                    <h5 className="description" dangerouslySetInnerHTML={{
                                                        __html: item?.product?.title
                                                    }} />

                                                    <p className="total-price">s / #agfgfd</p>
                                                </div>
                                            </div>

                                            <div className="flex-grow-1">
                                                <h5 className="price total">
                                                    <NumericFormat
                                                        value={item?.price}
                                                        displayType={"text"}
                                                        thousandSeparator={true}
                                                        suffix={'đ'}
                                                    />
                                                </h5>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                            <div className="border-bottom py-2 py-sm-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="total">Subtotal</p>
                                    <p className="total-price">
                                        <NumericFormat
                                            value={cart?.pCart?.cartTotal}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            suffix={'đ'}
                                        />
                                    </p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-0 total">Shipping</p>
                                    <p className="mb-0 total-price">
                                        <NumericFormat
                                            value={totalShipping}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            suffix={'đ'}
                                        />
                                    </p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center border-bootom py-2 py-sm-4">
                                <h4 className="total">Total</h4>
                                <h5 className="total-price">
                                    <NumericFormat
                                        value={cart?.pCart?.cartTotal + totalShipping}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        suffix={'đ'}
                                    />
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;