import React, { useEffect, useState, useRef } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { NavLink, useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import { BsCartPlus } from "react-icons/bs"
import { MdOutlineBroadcastOnPersonal, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md"
import { getAProductApi, postAddToCart } from '../service/homeService';
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct, removeSelectedProduct, setCart } from '../store/actions/productActions';
import Comment from '../component/detailProduct/Comment';
import { toast } from 'react-toastify'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/scss/image-gallery.scss";

import '.././scss/detailProduct.scss'
// import Review from '../component/modal/Review';

const DetailProduct = () => {
    const product = useSelector((state) => state.Product)
    const reviewBoxRef = useRef(null);
    const [show, setShow] = useState(false)
    const { slug } = useParams();
    const [productSlug, id] = slug.split('&');
    const dispash = useDispatch()
    const { price, title, description, totalrating, color, size } = product
    // const [showReview, setShowReview] = useState(false)
    const [productColor, setProductColor] = useState([])
    const [productSize, setProductSize] = useState([])
    const [quantity, setQuantity] = useState(1)
    const cart = {
        productId: "",
        count: "",
        color: "",
        size: ""
    }
    console.log(product);


    useEffect(() => {
        setProductSize(size)
    }, [size])
    useEffect(() => {
        setProductColor(color)
    }, [color])

    const fetchDetailProduct = async () => {
        let limit = 2
        let page = 1
        let res = await getAProductApi(limit, page, id)
        if (res && res.success === true) {
            dispash(selectProduct(res.data))
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            if (slug && slug !== "") {
                fetchDetailProduct()
            }
        }, 2000)
        return () => {
            dispash(removeSelectedProduct())
        }
    }, [slug])

    const handleRemoveToReview = () => {
        // Scroll to the review box when the "Review" button is clicked
        if (reviewBoxRef && reviewBoxRef.current) {
            reviewBoxRef.current.scrollIntoView({ behavior: 'instant' });
        }
    };

    const handleClickBtnColor = (c) => {
        if (productColor && productColor.length > 0) {
            const updateProductColor = productColor.map(item => {
                if (item._id === c._id) {
                    item.isSelected = true;
                    return item
                } else {
                    item.isSelected = false;
                    return item
                }
            })
            setProductColor(updateProductColor)
        }
    }

    const handleClickBtnSize = (s) => {
        if (productSize && productSize.length > 0) {
            const updateProductSize = productSize.map(item => {
                if (item._id === s._id) {
                    item.isSelected = true;
                    return item
                } else {
                    item.isSelected = false;
                    return item
                }
            })
            setProductSize(updateProductSize)
        }
    }

    const handleOnchangeQuantity = (e) => {
        setQuantity(e.target.value)
    }

    const handleAddToCart = async () => {
        cart.productId = product?._id
        cart.count = +quantity
        if (color && color?.length > 0) {
            let newColor = color.find(item => item.isSelected === true)
            cart.color = newColor?.color
        }

        if (size && size?.length > 0) {
            let newSize = size.find(item => item.isSelected === true)
            cart.size = newSize?.name
        }

        let data = {
            cart: [
                cart
            ]
        }
        console.log(cart);
        let res = await postAddToCart(data)
        if (res && res.success === true) {
            dispash(setCart(res?.data))
            toast.success(res.msg)
        }
    }
    console.log(product);

    const images = product?.images?.map((img) => ({
        original: img.url,
        thumbnail: img.url,
        originalClass: 'featured-slide',
        thumbnailClass: 'featured-thumb',
    }));
    console.log(images);

    return (
        <div className='detail-product pb-5'>
            {Object.keys(product).length === 0 ? (
                <div className='container-xxl'>
                    <div className='loading pt-3'>Loading
                        <span className='dots'>...</span>
                    </div>
                </div>
            )
                :
                (<>
                    < div className='detail-product-container mb-4' >
                        <div className='container-xxl'>
                            <div className='row'>
                                <div className='col-12'>
                                    <Breadcrumb className='new-header'>
                                        <NavLink to="/" className="breadcrumb-item">Home</NavLink>
                                        <Breadcrumb.Item active>{title}</Breadcrumb.Item>
                                    </Breadcrumb>
                                </div>
                            </div>
                        </div>
                    </div >
                    < div className='detail-product-content' >
                        <div className='container-xxl'>
                            <div className='row item p-3 m-1'>
                                <div className='col-5 p-0'>
                                    <div className='box-image'>
                                        <ImageGallery items={images}
                                            // showFullscreenButton={false}
                                            showPlayButton={false}
                                            showNav={false}
                                            thumbnailClass={(isSelected) =>
                                                `featured-thumb ${isSelected ? 'active' : ''}`
                                            }
                                            slideDuration={0}
                                        />
                                    </div>

                                </div>
                                <div className='col-7'>
                                    <div className="main-product-details">
                                        <div>
                                            <h4 className="title">
                                                {title}
                                            </h4>
                                        </div>
                                        <div className="box-price pt-3">
                                            <div className="rating gap-10">
                                                <ReactStars
                                                    key={totalrating}
                                                    count={5}
                                                    size={16}
                                                    value={totalrating}
                                                    edit={false}
                                                    activeColor="#ffd700"
                                                />
                                                <p onClick={handleRemoveToReview} className="mb-0 count-review"> {product?.ratings?.length} Reviews </p>
                                            </div>
                                            <p className="price ">$ {price}</p>
                                        </div>
                                        <div className="pb-3">
                                            <div className="d-flex gap-10 align-items-center my-2">
                                                <h3 className="product-heading">Type :</h3>
                                                <p className="product-data">Watch</p>
                                            </div>
                                            <div className="d-flex gap-10 align-items-center my-2">
                                                <h3 className="product-heading">Brand :</h3>
                                                <p className="product-data">{product?.brand[0]?.name}</p>
                                            </div>
                                            <div className="d-flex gap-10 align-items-center my-2">
                                                <h3 className="product-heading">Category :</h3>
                                                <p className="product-data">{product?.category[0]?.name}</p>
                                            </div>
                                            <div className="d-flex gap-10 align-items-center my-2">
                                                <h3 className="product-heading">Tags :</h3>
                                                <p className="product-data">Watch</p>
                                            </div>
                                            <div className="d-flex gap-10 align-items-center my-2">
                                                <h3 className="product-heading">Availablity :</h3>
                                                <p className="product-data">In Stock</p>
                                            </div>
                                            {
                                                productSize?.length > 0 &&
                                                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                                                    <h3 className="product-heading">Size :</h3>
                                                    <div className="d-flex flex-wrap gap-15">
                                                        {productSize && productSize.length > 0 && productSize.map((item, index) => {
                                                            return (
                                                                <button key={`${index}-size`}
                                                                    className={item.isSelected === true ? "size active" : "size"}
                                                                    onClick={() => handleClickBtnSize(item)}
                                                                >
                                                                    {item?.name}
                                                                </button>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            }
                                            {
                                                productColor?.length > 0 &&
                                                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                                                    <h3 className="product-heading">Color :</h3>
                                                    <div className="d-flex flex-wrap gap-15">
                                                        {productColor && productColor.length > 0 && productColor.map((item, index) => {
                                                            return (
                                                                <button key={`${index}-size`} className={item.isSelected === true ? "color active" : "color"}
                                                                    style={{ backgroundColor: `${item.colorCode}` }}
                                                                    onClick={() => handleClickBtnColor(item)}
                                                                >
                                                                </button>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            }

                                            <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                                                <h3 className="product-heading">Quantity :</h3>
                                                <div className="">
                                                    <input
                                                        type="number"
                                                        name=""
                                                        // defaultValue={1}
                                                        value={quantity}
                                                        min={1}
                                                        max={10}
                                                        className="form-control"
                                                        style={{ width: "70px" }}
                                                        onChange={(e) => handleOnchangeQuantity(e)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center gap-30">
                                                <button
                                                    className="button button-add border-0"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#staticBackdrop"
                                                    type="button"
                                                    onClick={() => handleAddToCart()}
                                                >
                                                    <BsCartPlus size={"22px"} />
                                                    <span>Add to Cart</span>
                                                </button>
                                                <button className="button button-buy signup">Buy It Now</button>
                                            </div>

                                            <div className="d-flex gap-10 flex-column  my-3">
                                                <h3
                                                    className="product-heading"
                                                    onClick={() => setShow(!show)}
                                                >
                                                    Shipping & Returns
                                                    <div>
                                                        {show === true ?
                                                            <MdOutlineKeyboardArrowUp size={"25px"} />
                                                            :
                                                            <MdOutlineKeyboardArrowDown size={"25px"} />
                                                        }</div>
                                                </h3>
                                                {show === true &&
                                                    <p className="product-data">
                                                        Free shipping and returns available on all orders! <br /> We
                                                        ship all US domestic orders within
                                                        <b>5-10 business days!</b>
                                                    </p>
                                                }
                                            </div>
                                            <div className="d-flex gap-10 align-items-center my-3">
                                                <h3 className="product-heading">Product Link:</h3>
                                                <a
                                                // href="javascript:void(0);"
                                                // onClick={() => {
                                                //     copyToClipboard(
                                                //         "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
                                                //     );
                                                // }}
                                                >
                                                    Copy Product Link
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                    <div className='detail-product-comment'>
                        <div className='container-xxl'>
                            <div className='row'>
                                <div ref={reviewBoxRef} className='col-9'>
                                    <Comment />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <Review
                        show={showReview}
                        setShow={setShowReview}
                    /> */}

                </>
                )
            }
        </div >
    );
};

export default DetailProduct;