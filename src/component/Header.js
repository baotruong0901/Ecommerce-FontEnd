import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs'
import { BiCategory } from 'react-icons/bi'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'
import { AiOutlineHeart, AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { NumericFormat } from 'react-number-format'
import { Typeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css';
import "../scss/Header.scss"
import {
    getAllCategory
} from '../service/homeService';
import { useSelector } from 'react-redux';


const Header = () => {
    const cart = useSelector((state) => state?.cart?.pCart)
    const [category, setCategory] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("Shop categories");
    const isLogin = useSelector(state => state?.user?.isLogin)
    const userInfo = useSelector(state => state?.user?.account)
    const productState = useSelector(state => state?.AllProducts?.products)
    const blogState = useSelector(state => state?.blogs?.blogs)
    const [paginate, setPaginate] = useState(true);
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    //search 
    const [dataOpt, setDataOpt] = useState([])

    //end search
    useEffect(() => {
        let data = []
        for (let i = 0; i < productState?.length; i++) {
            const ele = productState[i]
            data.push({ _id: ele?._id, image: ele?.images[0]?.url, slug: ele?.slug, title: ele?.title, type: "product" })
        }
        for (let i = 0; i < blogState?.length; i++) {
            const ele = blogState[i]
            data.push({ _id: ele?._id, image: ele?.image[0]?.url, title: ele?.title, type: "blog" })
        }
        setDataOpt(data)
    }, [productState, blogState])


    const fetchAllCategories = async () => {
        let res = await getAllCategory()
        if (res && res.success === true) {
            setCategory(res.data)
        }
    }

    const handleSelectCategory = (e, item) => {
        const selected = category.find((item) => item.name === e.target.innerText);
        setSelectedCategory(selected.name);
        // navigate(`/our-store/${item._id}`)
    };

    const handleChange = (selected) => {
        if (selected[0]) {
            if (selected[0]?.type === "product") {
                navigate(`/product/${selected[0]?.slug}&${selected[0]?._id}`);
            }
            if (selected[0]?.type === "blog") {
                navigate(`/blogs/${selected[0]?.slug}&${selected[0]?._id}`);
            }
        }
    }
    const renderMenuItemChildren = (option, props, index) => (
        <div className='search-item' key={option.id}>
            <img className='search-image' src={option.image} alt={option.title} />
            <p className='search-title'>{option.title}</p>
        </div>
    );
    useEffect(() => {
        fetchAllCategories()
    }, [])
    return (
        <header>
            <section className='header-top py-2'>
                <div className='container-xxl'>
                    <div className='row'>
                        <div className='col-6'>
                            <p className='text-white'>
                                Free Shipping Over $100 & Free Return
                            </p>
                        </div>
                        <div className='col-6'>
                            <p className='text-end text-white'>
                                Hotline: <a className='text-white' href="tel:+84 943147155">0943 147 155</a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className='header-middle py-2'>
                <div className='container-xxl'>
                    {/* <div className='row align-items-center'>
                        <div className='col-2'>
                            <h2>
                                <Link className='text-white' to="/">E-commerce</Link>
                            </h2>
                        </div>
                        {userInfo && userInfo.role === "admin" ?
                            <>
                                <div className='col-5 my-3'>
                                    <div className="input-group">
                                        <Typeahead
                                            id="pagination-example"
                                            onPaginate={() => console.log('Results paginated')}
                                            minLength={'2'}
                                            onChange={handleChange}
                                            options={dataOpt}
                                            paginate={paginate}
                                            labelKey={'title'}
                                            placeholder="Search..."
                                            renderMenuItemChildren={renderMenuItemChildren}
                                        />
                                        <span className="input-group-text" id="search-addon">
                                            <BsSearch />
                                        </span>
                                    </div>
                                </div>
                                <div className='col-5'>
                                    <div className='header-middle-links '>
                                        <NavLink to="admin/dashboard" className='nav-link d-flex justify-content-center align-items-center gap-10'>
                                            <MdOutlineAdminPanelSettings color='white' size='28px' />
                                            <p className='text-white'>
                                                Admin
                                            </p>
                                        </NavLink>
                                        <NavLink to="wish-list" className='nav-link d-flex justify-content-center align-items-center gap-10'>
                                            <AiOutlineHeart color='white' size='28px' />
                                            <p className='text-white'>
                                                Favourite <br /> Wishlist
                                            </p>
                                        </NavLink>

                                        {isLogin === true ?
                                            <NavLink to='/user/account' className=' nav-link d-flex justify-content-center align-items-center gap-10'>
                                                <AiOutlineUser color='white' size='28px' />
                                                <p className='text-white'>
                                                    My Account
                                                </p>
                                            </NavLink>
                                            :
                                            <NavLink to='/login' className='nav-link d-flex justify-content-center align-items-center gap-10'>
                                                <AiOutlineUser color='white' size='28px' />
                                                <p className='text-white'>
                                                    Log in
                                                </p>
                                            </NavLink>
                                        }
                                        <Link to="/cart" className='d-flex justify-content-center align-items-center gap-10'>
                                            <AiOutlineShoppingCart color={"#ccac00"} size='28px' />
                                            <div className='d-flex flex-column'>
                                                <span className='badge'>{cart?.products?.length === 0 || cart?.length === 0 ? 0 : cart?.products?.length}</span>
                                                <p className='text-white'>{cart?.products?.length === 0 || cart?.length === 0
                                                    ?
                                                    "0.00đ"
                                                    :
                                                    <NumericFormat
                                                        value={
                                                            cart?.cartTotal
                                                        }
                                                        displayType={"text"}
                                                        thousandSeparator={true}
                                                        suffix={'đ'}
                                                    />
                                                }
                                                </p>
                                            </div>
                                        </Link>

                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <div className='col-6 my-3'>
                                    <div className="input-group">
                                        <Typeahead
                                            id="pagination-example"
                                            onPaginate={() => console.log('Results paginated')}
                                            minLength={'2'}
                                            onChange={handleChange}
                                            options={dataOpt}
                                            paginate={paginate}
                                            labelKey={'title'}
                                            placeholder="Search..."
                                        />
                                        <span className="input-group-text" id="search-addon">
                                            <BsSearch />
                                        </span>
                                    </div>
                                </div>
                                <div className='col-4'>
                                    <div className='header-middle-links '>
                                        <NavLink to="wish-list" className='nav-link d-flex justify-content-center align-items-center gap-10'>
                                            <AiOutlineHeart color='white' size='28px' />
                                            <p className='text-white'>
                                                Favourite <br /> Wishlist
                                            </p>
                                        </NavLink>

                                        {isLogin === true ?
                                            <NavLink to='/user/account' className=' nav-link d-flex justify-content-center align-items-center gap-10'>
                                                <AiOutlineUser color='white' size='28px' />
                                                <p className='text-white'>
                                                    My Account
                                                </p>
                                            </NavLink>
                                            :
                                            <NavLink to='/login' className='nav-link d-flex justify-content-center align-items-center gap-10'>
                                                <AiOutlineUser color='white' size='28px' />
                                                <p className='text-white'>
                                                    Log in
                                                </p>
                                            </NavLink>
                                        }
                                        <Link to="/cart" className='d-flex justify-content-center align-items-center gap-10'>
                                            <AiOutlineShoppingCart color={"#ccac00"} size='28px' />
                                            <div className='d-flex flex-column'>
                                                <span className='badge'>{cart?.products?.length === 0 || cart?.length === 0 ? 0 : cart?.products?.length}</span>
                                                <p className='text-white'>{cart?.products?.length === 0 || cart?.length === 0
                                                    ?
                                                    "0.00đ"
                                                    :
                                                    <NumericFormat
                                                        value={
                                                            cart?.cartTotal
                                                        }
                                                        displayType={"text"}
                                                        thousandSeparator={true}
                                                        suffix={'đ'}
                                                    />
                                                }
                                                </p>
                                            </div>
                                        </Link>

                                    </div>
                                </div>
                            </>
                        }
                    </div > */}
                    <Navbar expand="lg">
                        <Navbar.Brand><NavLink className='nav-link' to="/">E-commerce</NavLink></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Form className="d-flex me-auto search">
                                <Typeahead
                                    className="me-2"
                                    id="pagination-example"
                                    onPaginate={() => console.log('Results paginated')}
                                    minLength={'2'}
                                    onChange={handleChange}
                                    options={dataOpt}
                                    paginate={paginate}
                                    labelKey={'title'}
                                    placeholder="Search..."
                                    renderMenuItemChildren={renderMenuItemChildren}
                                />
                                <span className="input-group-text" id="search-addon">
                                    <BsSearch />
                                </span>
                            </Form>
                            <Nav >
                                <NavLink to="admin/dashboard" className='nav-link d-flex align-items-center d-flex gap-10'>
                                    <MdOutlineAdminPanelSettings color='white' size='28px' />
                                    <p className='text-white'>
                                        Admin
                                    </p>
                                </NavLink>
                                <NavLink to="wish-list" className='nav-link d-flex align-items-center gap-10'>
                                    <AiOutlineHeart color='white' size='28px' />
                                    <p className='text-white'>
                                        Wishlist
                                    </p>
                                </NavLink>

                                {isLogin === true ?
                                    <NavLink to='/user/account' className='account nav-link d-flex align-items-center gap-10'>
                                        <AiOutlineUser color='white' size='28px' />
                                        <p className='text-white'>
                                            Welcome! {userInfo?.firstname}
                                        </p>
                                    </NavLink>
                                    :
                                    <NavLink to='/login' className='nav-link d-flex align-items-center gap-10'>
                                        <AiOutlineUser color='white' size='28px' />
                                        <p className='text-white'>
                                            Log in
                                        </p>
                                    </NavLink>
                                }
                                <Link to="/cart" className='total d-flex align-items-center gap-10'>
                                    <AiOutlineShoppingCart color={"#ccac00"} size='28px' />
                                    <div className='d-flex flex-column'>
                                        <span className='badge'>{cart?.products?.length === 0 || cart?.length === 0 ? 0 : cart?.products?.length}</span>
                                        <p className=' text-white'>{cart?.products?.length === 0 || cart?.length === 0
                                            ?
                                            "0.00đ"
                                            :
                                            <NumericFormat
                                                value={
                                                    cart?.cartTotal
                                                }
                                                displayType={"text"}
                                                thousandSeparator={true}
                                                suffix={'đ'}
                                            />
                                        }
                                        </p>
                                    </div>
                                </Link>

                            </Nav>

                        </Navbar.Collapse>

                    </Navbar>

                </div >

            </section >
            <section className='header-bottom'>
                <div className='container-xxl'>
                    <div className='row'>
                        <div className='col-12 my-3'>
                            <div className='header-bottom-menu d-flex align-items-center gap-25'>
                                <div className='dropdown-category'>
                                    <Dropdown>
                                        <Dropdown.Toggle className='d-flex align-items-center' variant="success" id="dropdown-basic">
                                            <BiCategory size={"1.75rem"} />
                                            <span>{selectedCategory}</span>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {category && category.length > 0 && category.map((item, index) => {
                                                return (
                                                    < Dropdown.Item
                                                        onClick={(e) => handleSelectCategory(e, item)}
                                                        key={`category ${index}`}

                                                    >
                                                        {item.name}
                                                    </Dropdown.Item>
                                                )
                                            })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div className='menu-links d-flex align-items-center gap-25'>
                                    <NavLink className='nav-link' to="/">Home</NavLink>
                                    <NavLink className='nav-link' to={`/our-store/all&page=1`}>Our Store</NavLink>
                                    <NavLink className='nav-link' to="/blogs">Blogs</NavLink>
                                    <NavLink className='nav-link' to="/contact">Contact</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </header >
    );
};

export default Header;