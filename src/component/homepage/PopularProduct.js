import React, { useEffect, useState } from 'react';
import { getCategoryApi } from '../../service/homeService';
import { getAllByCategoryApi, addProductToWishApi, deleteProductWishlist, getProductApi } from '../../service/homeService';
import CardProduct from './CardProduct';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setWishList, fetchCategoryStart } from '../../store/actions/productActions';
import { setProducts } from '../../store/actions/productActions';
import { toast } from 'react-toastify'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../scss/popular.scss'

const PopularProduct = () => {
    const [category, setCategory] = useState([])
    const [product, setProduct] = useState([])
    const [activeIndex, setActiveIndex] = useState(0);
    const [isExist, setIsExist] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const userId = useSelector((state) => state?.user?.account?._id)

    useEffect(() => {
        fetchCategory()
        fetchAllProducts()
    }, [])
    useEffect(() => {
        if (category.length > 0) {
            fetchProductByCategory(category[0])
        }
    }, [category])

    const fetchCategory = async () => {
        let res = await getCategoryApi()
        if (res && res?.success === true) {
            setCategory(res.data)
            dispatch(fetchCategoryStart(res?.data))
        }
    }

    const fetchAllProducts = async () => {
        const res = await getProductApi()
        if (res && res?.success === true) {
            dispatch(setProducts(res?.data))
        }
    }

    const fetchProductByCategory = async (category) => {
        let res = await getAllByCategoryApi(category._id)
        if (res && res?.success === true) {
            setProduct(res.data.reverse())
        }
    }
    const handleClicktab = async (category, index) => {
        setActiveIndex(index);
        fetchProductByCategory(category)
    }
    const detailProduct = async (item) => {
        navigate(`/product/${item.slug}&${item._id}`)
    }

    const addWishList = async (item) => {
        // let productId = item?._id
        // let res = await addProductToWishApi({ userId, productId })
        // if (res && res.success === true) {
        //     toast.success(res.msg)
        //     dispatch(setWishList(res))
        // } else {
        //     toast.error(res.msg)
        // }
        let productId = item?._id
        if (isExist === false) {
            let res = await addProductToWishApi({ userId, productId })
            if (res && res.success === true) {
                item.active = true
                toast.success(res.msg)
                dispatch(setWishList(res?.data))
                setIsExist(true)
            } else {
                toast.error(res.msg)
            }
        } else {
            let res = await deleteProductWishlist(productId, userId)
            if (res && res.success === true) {
                item.active = false
                toast.success(res.msg)
                setIsExist(false)
            }
        }
    }
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        centerPadding: 30

    };
    return (<>
        <section className='popular pb-3'>
            <div className='container-xxl'>
                <div className='row'>
                    <div className="col-12 mb-3">
                        <h3 className="section-heading">Our Popular Products</h3>
                    </div>
                    <div className='popular-container'>
                        <div className=' popular-tabs'>
                            {category && category.length > 0 && category.map((item, index) => {
                                return (
                                    <div
                                        className={`d-flex item ${index === activeIndex ? 'active' : ''}`}
                                        key={`${index}-tab-category`}
                                        onClick={() => handleClicktab(item, index)}
                                    >
                                        <img src={item.image[0].url} alt=''></img>
                                        <button>{item.name}</button>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='popular-product'>
                            <Slider {...settings}>
                                {product && product.length > 0 && product.map((item, index) => {
                                    return (
                                        <CardProduct
                                            isExist={item?.active}
                                            addWishList={() => addWishList(item)}
                                            detailProduct={() => detailProduct(item)}
                                            brand={item?.brand[0]?.name}
                                            description={item?.description}
                                            title={item?.title}
                                            price={item?.price}
                                            image={item?.images[0]?.url}
                                            slug={item?.slug}
                                            star={item?.totalrating}
                                            coupon={item?.coupon}
                                            sold={item?.sold}
                                        />
                                    )
                                })}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
    );
};

export default PopularProduct;
