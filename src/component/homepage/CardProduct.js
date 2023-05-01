import React from 'react';
import ReactStars from "react-rating-stars-component";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import '../../scss/cardProduct.scss'
const CardProduct = (props) => {
    const { image, brand, title, description, price, slug, width, detailProduct, addWishList, star, active } = props
    const cardStyle = { width: width ? width : '100%' }
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
                        <p className='card-price my-2'>${price}</p>
                        {/* <p className='card-brand mb-1'>{brand}</p> */}
                        {/* <p className="card-text mb-1">{description}</p> */}
                        <span className='card-start d-block mb-1'>
                            <ReactStars
                                key={star}
                                count={5}
                                size={10}
                                value={star}
                                edit={false}
                                activeColor="#ffd700"
                            />
                        </span>
                    </div>
                </div>
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