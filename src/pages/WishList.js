import React, { useEffect, useState } from "react";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineClose, AiOutlineEye } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { getWishList, deleteProductWishlist } from "../service/homeService";
import { toast } from 'react-toastify'
import NoProduct from '../public/images/no-product.jpeg'
import '.././scss/wishList.scss'
import { setWishList } from "../store/actions/productActions";
const Wishlist = () => {
    const userId = useSelector((state) => state?.user?.account?._id)
    // const wishlist = useSelector((state) => state?.wishList?.pWishList?.data)
    const [wishlist, setWishlist] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        fetchWishListUser()
    }, [])

    const fetchWishListUser = async () => {
        let res = await getWishList()
        if (res && res?.success === true) {
            setWishlist(res?.wishlist)
            // dispatch(setWishList(res?.wishlist))
        }
    }

    const handleRemoveProduct = async (product) => {
        let productId = product?._id
        let res = await deleteProductWishlist(productId, userId)
        if (res && res.success === true) {
            toast.success(res.msg)
            fetchWishListUser()
        }
    }

    const handleViewDetail = (item) => {
        navigate(`/product/${item.slug}&${item._id}`)
    }

    console.log(wishlist);
    return (
        <>
            <div className="wishlist">
                <div className="header">
                    <div className="container-xxl">
                        <div className="row">
                            <div className="col-12">
                                <Breadcrumb className='new-header'>
                                    <NavLink to="/" className="breadcrumb-item">Home</NavLink>
                                    <Breadcrumb.Item active>WishList</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main">
                    <div className="container-xxl">
                        <div className="card-wishlist gap-10">
                            {wishlist && wishlist.length > 0 && wishlist.map((item, index) => {
                                return (
                                    <div key={`${index}-wish`} className="item">
                                        <img className="card-image" src={item?.images[0]?.url} alt="Product image" />
                                        <div className="card-body">
                                            <h5 className="card-title">{item.title}</h5>
                                            <p className="card-price">${item.price}</p>
                                        </div>
                                        <span onClick={() => handleRemoveProduct(item)} className="close-wish"><AiOutlineClose size={"20px"} /></span>
                                        <span className="detail" onClick={() => handleViewDetail(item)}><AiOutlineEye size={"20px"} /></span>
                                    </div>
                                )
                            })}
                        </div>
                        {wishlist?.length === 0 &&
                            <div style={{ backgroundImage: `url(${NoProduct})` }} className='no-product'>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Wishlist;