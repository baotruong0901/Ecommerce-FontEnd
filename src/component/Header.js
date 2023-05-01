import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs'
import { BiGitCompare, BiCategory } from 'react-icons/bi'
import { AiOutlineHeart, AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai'
import Dropdown from 'react-bootstrap/Dropdown';
import "../scss/Header.scss"
import {
    getAllCategory
} from '../service/homeService';
import { useSelector } from 'react-redux';

const Header = () => {
    const cart = useSelector((state) => state?.cart?.pCart)
    const [category, setCategory] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("Shop categories");
    const isLogin = useSelector(state => state.user.isLogin)
    const fetchAllCategories = async () => {
        let res = await getAllCategory()
        if (res && res.success === true) {
            setCategory(res.data)
        }
    }

    const handleSelectCategory = (e) => {
        const selected = category.find((item) => item.name === e.target.innerText);
        setSelectedCategory(selected.name);
    };

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
                    <div className='row align-items-center'>
                        <div className='col-2'>
                            <h2>
                                <Link className='text-white' to="/">Shop Web</Link>
                            </h2>
                        </div>
                        <div className='col-6 my-3'>
                            <div className="input-group">
                                <input type="search"
                                    className="form-control"
                                    placeholder="Search"
                                    aria-label="Search"
                                    aria-describedby="search-addon" />
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
                                        <span className='badge'>{cart?.products?.length === 0 ? 0 : cart?.products?.length}</span>
                                        <p className='text-white'>$ {cart?.products?.length === 0 ? 0 : cart?.cartTotal}</p>
                                    </div>
                                </Link>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
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
                                                    < Dropdown.Item onClick={(e) => handleSelectCategory(e)} key={`category ${index}`}>
                                                        {item.name}
                                                    </Dropdown.Item>
                                                )
                                            })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div className='menu-links'>
                                    <div className='d-flex align-items-center gap-25'>
                                        <NavLink className='nav-link' to="/">Home</NavLink>
                                        <NavLink className='nav-link' to="/our-store">Our Store</NavLink>
                                        <NavLink className='nav-link' to="/blogs">Blogs</NavLink>
                                        <NavLink className='nav-link' to="/contact">Contact</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </header>
    );
};

export default Header;