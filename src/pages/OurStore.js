import React, { useEffect, useState } from 'react';
import ReactStars from "react-rating-stars-component";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { NavLink, useParams } from 'react-router-dom';
import { getColor, getSize, addProductToWishApi, deleteProductWishlist, getProductApi } from '../service/homeService';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify'
import { setWishList } from '../store/actions/productActions';
import { AiOutlineBars } from 'react-icons/ai'
import CardProduct from '../component/homepage/CardProduct';
// import { AiOutlineHeart } from 'react-icons/ai'
import '../scss/ourStore.scss'
import Paginate from '../component/Paginate';
// import { setProducts } from '../store/actions/productActions';
const OurStore = () => {
    const isLogin = useSelector(state => state.user.isLogin)
    const allProducts = useSelector((state) => state?.AllProducts?.products)
    const category = useSelector((state) => state.categories.categories)
    const userId = useSelector((state) => state?.user?.account?._id)
    const [colors, setColors] = useState([])
    const [sizes, setSizes] = useState([])
    const [pageCount, setPageCount] = useState(0)
    // const [countProd, setCountProd] = useState(allProducts.length)
    const [currentPage, setCurrentPage] = useState(1);
    const [prod, setProd] = useState([])
    //sort category
    const [sortCategory, setSortCategory] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState(null);
    //sort size
    const [sortSize, setSortSize] = useState(null)
    const [selectedSize, setSelectedSize] = useState(null);
    //sortcolor
    const [sortColor, setSortColor] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null);
    //sort by price
    const [sortGtePrice, setSortGtePrice] = useState(null)
    const [sortLtePrice, setSortLtePrice] = useState(null)
    //sort price desc asc
    const [sortPrice, setSortPrice] = useState("")
    //sort by brand
    const { filter } = useParams();
    const sortBrand = filter.split('&')[0];
    const [seemore, setSeemore] = useState({
        category: false,
        color: false,
        size: false
    })
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const LIMIT = 15

    const fetchAllColors = async () => {
        const res = await getColor()
        if (res && res.success === true) {
            setColors(res?.data)
        }
    }

    const fetchAllProducts = async (page) => {
        let pageCount = Math.ceil(+allProducts.length / LIMIT)
        let data = { sortCategory, sortColor, sortSize, sortPrice, sortGtePrice, sortLtePrice }
        navigate(`/our-store/${data?.sortCategory ? `category=${data?.sortCategory}&` : ""}${sortBrand ? `${sortBrand}&` : ""}${data?.brand ? `brand=${data?.brand}&` : ""}${data?.sortColor ? `color=${data?.sortColor}&` : ""}${data?.sortSize ? `size=${data?.sortSize}&` : ""}${data?.sortGtePrice ? `price[gte]=${data?.sortGtePrice}&` : ""}${data?.sortLtePrice ? `price[lte]=${data?.sortLtePrice}&` : ""}${data?.sortPrice ? `sort=${data?.sortPrice}&` : ""}${page !== undefined ? `page=${page}` : `page=${1}`}`)
        const res = await getProductApi(data, LIMIT, page)
        if (res && res?.success === true) {
            setProd(res.data)
            setPageCount(pageCount)
        }
    }

    const fetchAllSizes = async () => {
        const res = await getSize()
        if (res && res.success === true) {
            setSizes(res?.data)
        }
    }
    useEffect(() => {
        fetchAllColors()
        fetchAllSizes()
    }, [])

    useEffect(() => {
        fetchAllProducts()
    }, [sortCategory, sortColor, sortSize, sortPrice, sortGtePrice, sortLtePrice])


    const detailProduct = async (item) => {
        navigate(`/product/${item.slug}&${item._id}`)
    }

    const addWishList = async (item) => {
        if (!isLogin) {
            window.scrollTo(0, 128)
            const returnUrl = window.location.pathname + window.location.search;
            navigate('/login', { state: { returnUrl } });
        } else {
            let productId = item?._id
            if (item.active) {
                let res = await deleteProductWishlist(productId, userId)
                if (res && res.success === true) {
                    item.active = false
                    toast.success(res.msg)
                }
            } else {
                let res = await addProductToWishApi({ userId, productId })
                if (res && res.success === true) {
                    item.active = true
                    toast.success(res.msg)
                    dispatch(setWishList(res?.data))
                } else {
                    toast.error(res.msg)
                }
            }
        }
    }

    const handleSelected = (item, type) => {
        window.scrollTo(0, 40);
        if (type === "category") {
            if (sortCategory === item?._id) {
                setSelectedCategory(null)
                setSortCategory(null)
            }
            else {
                setSelectedCategory(item?._id);
                setSortCategory(item?._id)
                setCurrentPage(1)
                if (allProducts.length !== prod.length) {
                    setCurrentPage(Math.ceil(+prod.length / LIMIT))
                }
            }
        }

        if (type === "color") {
            if (sortColor === item?._id) {
                setSelectedColor(null)
                setSortColor(null)
            }
            else {
                setSelectedColor(item?._id);
                setSortColor(item?._id)
                setCurrentPage(1)
                if (allProducts.length !== prod.length) {
                    setCurrentPage(Math.ceil(+prod.length / LIMIT))
                }
            }
        }

        if (type === "size") {
            if (sortSize === item?._id) {
                setSelectedSize(null)
                setSortSize(null)
            }
            else {
                setSelectedSize(item?._id);
                setSortSize(item?._id)
                setCurrentPage(1)
                if (allProducts.length !== prod.length) {
                    setCurrentPage(Math.ceil(+prod.length / LIMIT))
                }
            }
        }
    }

    const handlePriceFrom = (e) => {
        setSortGtePrice(e.target.value)
    }
    const handlePriceTo = (e) => {
        setSortLtePrice(e.target.value)
    }

    const handleSeeMore = (type) => {
        if (type === "category") {
            setSeemore({
                ...seemore,
                category: true
            })
        }
        if (type === "color") {
            setSeemore({
                ...seemore,
                color: true
            })
        }
        if (type === "size") {
            setSeemore({
                ...seemore,
                size: true
            })
        }

    }
    const handleSelectedPrice = (e) => {
        setCurrentPage(1)
        setSortPrice(e.target.value)
        if (allProducts.length !== prod.length) {
            setCurrentPage(Math.ceil(+prod.length / LIMIT))
        }
    }

    const scroll = () => {
        window.scrollTo(0, 128)
    }

    return (
        <div className='our-store'>
            <div className="header mb-3">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <Breadcrumb className='new-header'>
                                <NavLink to="/" className="breadcrumb-item">Home</NavLink>
                                <Breadcrumb.Item active>Our Store</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                </div>
            </div>
            <div className='our-store-main pb-3'>
                <div className='container-xxl'>
                    <div className="row">
                        <div className="left">
                            <div className="filter-card mb-3">
                                <h3 className="filter-title">
                                    <AiOutlineBars size={'24px'} style={{ fontWeight: '600' }} /><span>Shop By Categories</span>
                                </h3>
                                <div>
                                    <ul className="ps-0 category"
                                        style={{ height: `${seemore.category === true ? "" : "120px"}` }}
                                    >
                                        {category && category.length > 0 && category.map((item, index) => {
                                            return (
                                                <li
                                                    key={`${index}-category`}
                                                    onClick={() => handleSelected(item, "category")}
                                                    className={selectedCategory === item?._id ? 'active' : ''}
                                                >{item?.name}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                    {category.length > 4 && seemore.category === false && <span onClick={() => handleSeeMore("category")} className='see-more'>See more</span>}
                                </div>
                            </div>
                            <div className="filter-card mb-3">
                                <h3 className="filter-title">
                                    <span>Filter By</span>
                                </h3>
                                <div>
                                    <h5 className="sub-title">Price</h5>
                                    <div className="d-flex align-items-center gap-10">
                                        <div className="form-floating">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="From"
                                                value={sortGtePrice}
                                                onChange={(e) => handlePriceFrom(e)}
                                            />
                                            <label htmlFor="floatingInput">From</label>
                                        </div>
                                        <div className="form-floating">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="To"
                                                onChange={(e) => handlePriceTo(e)}
                                                value={sortLtePrice}

                                            />
                                            <label htmlFor="floatingInput1">To</label>
                                        </div>
                                    </div>
                                    <h5 className="sub-title">Colors</h5>
                                    <div style={{ height: `${seemore.color === true ? "" : "70px"}` }} className='colors'>
                                        {colors && colors.length > 0 && colors.map((item, index) => {
                                            return (
                                                <button
                                                    onClick={() => handleSelected(item, "color")}
                                                    key={`${index}-color`}
                                                    style={{
                                                        backgroundColor: `${item?.colorCode}`
                                                    }}
                                                    className={selectedColor === item?._id ? 'active item' : 'item'}
                                                >

                                                </button>
                                            )
                                        })}
                                    </div>
                                    {colors.length > 10 && seemore.color === false && <span onClick={() => handleSeeMore("color")} className='see-more'>See more</span>}
                                    <h5 className="sub-title">Size</h5>
                                    <div className='size' style={{ height: `${seemore.size === true ? "" : "125px"}` }}>
                                        {sizes && sizes.length > 0 && sizes.map((item, index) => {
                                            return (
                                                <div key={`${index}-size`} className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        id={item?._id}
                                                        checked={sortSize === item?._id}
                                                        onChange={() => handleSelected(item, "size")}
                                                        value={sortSize}
                                                    />
                                                    <label className="form-check-label" htmlFor={item?._id}>
                                                        {item?.name}
                                                    </label>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    {sizes.length > 4 && seemore.size === false && <span onClick={() => handleSeeMore("size")} className='see-more'>See more</span>}
                                </div>
                            </div>
                            <div className="filter-card mb-3">
                                <h3 className="filter-title">
                                    <span>
                                        Product Tags
                                    </span>
                                </h3>
                                <div>
                                    <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                                        <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                                            Headphone
                                        </span>
                                        <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                                            Laptop
                                        </span>
                                        <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                                            Mobile
                                        </span>
                                        <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                                            Wire
                                        </span>
                                        <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                                            Headphone
                                        </span>
                                        <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                                            Laptop
                                        </span>
                                        <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                                            Mobile
                                        </span>

                                    </div>
                                </div>
                            </div>
                            <div className="filter-card mb-3">
                                <h3 className="filter-title">
                                    <span>Random Product</span>
                                </h3>
                                <div>

                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <div className="filter-sort-grid mb-3">
                                <div className="sort-by gap-10">
                                    <p>
                                        Sort By:
                                    </p>
                                    <select
                                        onChange={(e) => handleSelectedPrice(e)}
                                        className="form-control form-select sort-by-item"
                                    >
                                        <option selected value="">Price</option>
                                        <option value="asc">Price, low to high</option>
                                        <option value="desc">Price, high to low</option>

                                    </select>
                                </div>
                            </div>
                            <div className="products-list pb-3">
                                <div className='products-list-item gap-10'>
                                    {prod && prod.length > 0 && prod.map((item) => {
                                        return (
                                            <>
                                                <CardProduct
                                                    active={!item.active ? false : item.active}
                                                    addWishList={() => addWishList(item)}
                                                    detailProduct={() => detailProduct(item)}
                                                    brand={item?.brand[0]?.name}
                                                    description={item?.description}
                                                    title={item?.title}
                                                    price={item?.price}
                                                    image={item?.images[0]?.url}
                                                    slug={item?.slug}
                                                    star={item?.totalrating}
                                                    width={`19.2%`}
                                                    coupon={item?.coupon}
                                                    sold={item?.sold}
                                                />
                                            </>
                                        )
                                    })}

                                </div>
                            </div>
                            {pageCount !== 1 &&
                                <div className='paginate'>
                                    <Paginate
                                        pageCount={pageCount}
                                        fetchAllProducts={fetchAllProducts}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        scroll={scroll}
                                    />
                                </div>
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurStore;