import React, { useEffect, useState } from 'react';
import { MdArrowBackIosNew } from 'react-icons/md'
import { Stepper, Step } from 'react-form-stepper';
import { NumericFormat } from 'react-number-format'
import { AiOutlineShop } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom';

const Progress = (props) => {
    const { setProgress, value } = props
    const navigate = useNavigate()
    const [activeStep, setActiveStep] = useState(0);
    useEffect(() => {
        if (value?.status === "CONFIRM") {
            setActiveStep(0);
        } else if (value?.status === "RECEIVE") {
            setActiveStep(2);
        } else if (value?.status === "COMPLETED") {
            setActiveStep(3);
        } else if (value?.status === "CANCELLED") {
            setActiveStep(1);
        }
        else {
            setActiveStep(0);
        }
    }, [value?.status]);

    const handleBack = () => {
        setProgress(false)
        navigate(`/user/purchase/type=ALL`)
    }
    return (
        <>
            <div className='progress-header'>
                <span onClick={() => handleBack()} className='back'>
                    <MdArrowBackIosNew size={"20px"} />
                    <span className='btn-back'>back</span>
                </span>
                <span className='progress-header-right'>ORDER ID. {value?._id} | <span className='status'>order {value?.status}</span> </span>
            </div>
            <div className='progress-body'>
                <div className='progress-bar'>
                    {value?.status !== "CANCELLED" ?
                        <Stepper activeStep={activeStep}>

                            <Step label="Order Placed" />
                            <Step label="Order Confirm" />
                            <Step label="Order Receiver" />
                            <Step label="Order Completed" />

                        </Stepper>
                        :
                        <Stepper activeStep={activeStep}>
                            <Step label="Order Placed" />
                            <Step label="Order Cancelled" />
                        </Stepper>
                    }
                </div>
                <Link to="/our-store" className='btn view'><AiOutlineShop /><span>View Shop</span></Link>
                <div className='box-product'>
                    {value?.products?.map((item, index) => {
                        return (
                            <div className='product'>

                                <div className='image'>
                                    <img src={item?.product?.images[0].url} className="img-fluid" alt="product image" />
                                </div>
                                <div className='content'>
                                    <p>Name: {item?.product?.title}</p>
                                    <p>Brand: {item?.product?.brand[0]?.name}</p>
                                    <p> x{item?.count}
                                    </p>
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
                                    x{item?.count}
                                </h6>
                            </div>
                        )
                    })}
                </div>
                <div className='total'>
                    <div className='total-order d-flex align-item-center justify-content-between'>
                        <span className='text'>Order Total</span>
                        <span className='total-price'>
                            <NumericFormat
                                value={value?.total}
                                displayType={"text"}
                                thousandSeparator={true}
                                suffix={' Vnđ'}
                            />
                        </span>
                    </div>
                </div>
            </div >

        </>
    );
};

export default Progress;