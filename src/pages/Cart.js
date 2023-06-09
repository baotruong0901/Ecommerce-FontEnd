import React, { useEffect, useState } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { AiFillDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { getProductCart, deleteProductInCart, postAddToCart, putCountProductCart } from '../service/homeService';
import { toast } from 'react-toastify'
import { setCart } from '../store/actions/productActions';
import NoProduct from '../public/images/no-product.jpeg'
import { useDispatch } from 'react-redux';
import { removeAProductInCart } from '../store/actions/productActions';
import { NumericFormat } from 'react-number-format'
import '../scss/cart.scss'


const Cart = () => {
    const dispash = useDispatch()
    const navigate = useNavigate()
    const [cartProduct, setCartProduct] = useState([])
    useEffect(() => {
        document.title = 'E-commerce Cart'; // Thay đổi title của trang web
    }, []);

    const fetchProductInCart = async () => {
        const res = await getProductCart()
        if (res && res.success === true) {
            setCartProduct(res?.data)
            dispash(setCart(res?.data))
        }
    }
    useEffect(() => {
        fetchProductInCart()
    }, [])

    const handleDeleteProduct = async (item) => {
        let productId = item?.product?._id
        let color = item?.color
        let size = item?.size
        const res = await deleteProductInCart(productId, color, size)
        if (res && res.success === true) {
            toast.success(res.msg)
            dispash(removeAProductInCart(res?.data))
            fetchProductInCart()
        }
    }


    const handleCheckOut = () => {
        navigate("/checkout/shipping")
    }

    return (
        <>
            <div className="cart">
                <div className="header">
                    <div className="container-xxl">
                        <div className="row">
                            <div className="col-12">
                                <Breadcrumb className='new-header'>
                                    <NavLink to="/" className="breadcrumb-item">Home</NavLink>
                                    <Breadcrumb.Item active>Cart</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='cart-main pt-3'>
                    <div className='container-xxl'>
                        <div className='row'>
                            <div className='col-12'>
                                {cartProduct?.products?.length === 0 || cartProduct?.length === 0 ?
                                    (<div className='col-12'>
                                        <div style={{ backgroundImage: `url(${NoProduct})` }} className='no-product'>
                                        </div>
                                    </div>)
                                    :
                                    (
                                        <>
                                            <table className='table'>
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className="w-50">Product</th>
                                                        <th scope="col" className="w-10">Price</th>
                                                        <th scope="col" className="w-25">Quantity</th>
                                                        <th scope="col" className="w-15">Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {cartProduct &&
                                                        cartProduct.products &&
                                                        cartProduct.products.length > 0 &&
                                                        cartProduct.products.map((item, index) => {
                                                            return (
                                                                <tr key={`${index}-cart`}>
                                                                    <td>
                                                                        <div className="box-cart gap-15 d-flex align-items-center">
                                                                            <div className='w-25 image'>
                                                                                <img src={item?.product?.images[0]?.url} className="img-fluid" alt="product image" />
                                                                            </div>
                                                                            <div className='w-75'>
                                                                                <p className='description'
                                                                                    dangerouslySetInnerHTML={{
                                                                                        __html: item?.product?.title,
                                                                                    }}
                                                                                >
                                                                                </p>
                                                                                {item?.size && <p>Size: {item?.size}</p>}
                                                                                {item?.color && <p>Color: {item?.color}</p>}
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <h5 className="price">
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


                                                                        </h5>

                                                                    </td>
                                                                    <td>
                                                                        <div className="quantity d-flex align-items-center gap-15">
                                                                            <div>
                                                                                <input
                                                                                    className="form-control"
                                                                                    type="number"
                                                                                    id={"cart" + item?.product?._id}
                                                                                    value={item?.count}
                                                                                // onChange={(e) => handleChangeQuantity(e, item)}
                                                                                />
                                                                            </div>
                                                                            <div>
                                                                                <AiFillDelete
                                                                                    className="delete text-danger "
                                                                                    onClick={() => handleDeleteProduct(item)} />
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <h5 className="price-total">
                                                                            <NumericFormat
                                                                                value={item?.price}
                                                                                displayType={"text"}
                                                                                thousandSeparator={true}
                                                                                suffix={'đ'}
                                                                            />
                                                                        </h5>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}
                                                </tbody>
                                            </table>
                                            <div className="sub-total mt-sm-5 pb-2 pb-sm-5">
                                                <div className="d-flex justify-content-between align-items-baseline">
                                                    <Link to="/our-store/all&page=1" className="button back">
                                                        Continue To Shopping
                                                    </Link>
                                                    <div className="bottom d-flex flex-column align-items-end">
                                                        <h4>
                                                            <span>SubTotal: </span>
                                                            <NumericFormat
                                                                value={cartProduct?.cartTotal}
                                                                displayType={"text"}
                                                                thousandSeparator={true}
                                                                suffix={' đ'}
                                                            />
                                                        </h4>
                                                        <p>Taxes and shipping calculated at checkout</p>
                                                        <button type='button'
                                                            onClick={() => handleCheckOut()} className="button">
                                                            Checkout
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        </>
    );
};

export default Cart;