import React from 'react';
import ReactStars from "react-rating-stars-component";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { NumericFormat } from 'react-number-format'
import '../../scss/cardProduct.scss'
const CardProduct = (props) => {
    const { image, brand, title, coupon, sold, price, slug, width, detailProduct, addWishList, star, active } = props
    const cardStyle = { width: width ? width : '100%' }
    const discounted = price * (1 - (+coupon) / 100)
    console.log(active);
    return (
        <>
            <div
                className="card-product"
                style={cardStyle}
            >
                <div className='card-main'
                    onClick={detailProduct}
                >
                    <img src={image} className="card-img" alt={slug} />
                    <div className="card-body">
                        <p className="card-title mb-1">{title}</p>
                        <p className='card-price my-2'>
                            {coupon && coupon !== "0" ?

                                <>
                                    <span className="original-price">
                                        <NumericFormat
                                            value={price}
                                            displayType="text"
                                            thousandSeparator={true}
                                            suffix={'đ'}
                                        />
                                    </span>
                                    <span className="discounted-price">
                                        <NumericFormat
                                            value={discounted}
                                            displayType="text"
                                            thousandSeparator={true}
                                            suffix={'đ'}
                                        />
                                    </span>

                                </>
                                :
                                <NumericFormat
                                    value={price}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    suffix={'đ'}
                                />
                            }
                        </p>
                        <span className='card-start mb-1'>
                            <ReactStars
                                key={star}
                                count={5}
                                size={10}
                                value={star}
                                edit={false}
                                activeColor="#ffd700"
                            />
                            {sold !== 0 &&
                                <span className='sold'>{sold} sold</span>
                            }
                        </span>
                    </div>
                </div>
                {coupon && +coupon !== 0 &&
                    <span className='coupon'>{coupon}%</span>
                }
                <span
                    onClick={addWishList}
                    className='wish'>
                    {active === true ?
                        <AiFillHeart color={'bf4800'} size={"20px"} /> :
                        <AiOutlineHeart size={"20px"} />
                    }
                </span>
            </div>
        </>
    );
};

export default CardProduct;