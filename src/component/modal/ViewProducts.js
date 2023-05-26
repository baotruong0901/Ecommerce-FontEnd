import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { NumericFormat } from 'react-number-format'
import '../../scss/ViewProduct.scss'
const ViewProducts = (props) => {
    const { show, setShow, value } = props
    const handleClose = () => {
        setShow(false)
    }

    return (
        <>
            <Modal show={show}
                onHide={handleClose}
                size="lg"
                className='modal-review'
            >
                <Modal.Header closeButton>
                    <Modal.Title>View {value.length} Products</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='view-product'>
                        {value?.length > 0 && value?.map((item, index) => {
                            return (
                                <div className='product'>
                                    <div className='image'>
                                        <img src={item?.product?.images[0].url} className="img-fluid" alt="product image" />
                                    </div>
                                    <div className='content'>
                                        <p className='title'><b>Name</b>: {item?.product?.title}</p>
                                        {item?.product?.brand &&
                                            <p><b>Brand</b>: {item?.product?.brand[0]?.name}</p>
                                        }
                                        {item?.size &&
                                            <p><b>Size</b>: {item?.size}</p>
                                        }
                                        <b> x{item?.count}
                                        </b>
                                    </div>
                                    <h6 className="price">
                                        {item?.product?.coupon && +item?.product?.coupon !== 0 ?
                                            <>
                                                <span className="original-price">
                                                    <NumericFormat
                                                        value={item?.product?.price}
                                                        displayType="text"
                                                        thousandSeparator={true}
                                                        suffix={'đ'}
                                                    />
                                                </span>
                                                <span className="discounted-price">
                                                    <NumericFormat
                                                        value={(item?.product?.price * (1 - (+item?.product?.coupon) / 100))}
                                                        displayType="text"
                                                        thousandSeparator={true}
                                                        suffix={'đ'}
                                                    />
                                                </span>
                                            </>
                                            :
                                            <NumericFormat
                                                value={item?.product?.price}
                                                displayType={"text"}
                                                thousandSeparator={true}
                                                suffix={'đ'}
                                            />
                                        }
                                        x{item?.count}</h6>
                                </div>
                            )
                        })}
                    </div>
                </Modal.Body>
            </Modal >
        </>
    );
};

export default ViewProducts;