import React from 'react';
import { GiChargedArrow } from 'react-icons/gi'
import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiYoutube } from 'react-icons/fi'
import "../scss/footer.scss"
const Footer = () => {
    return (
        <footer>
            <section className='footer-top'>
                <div className='container-xxl'>
                    <div className='row py-4 d-flex align-items-center'>
                        <div className='col-12 col-sm-5'>
                            <div className='d-flex align-items-center justify-content-center gap-10'>
                                <GiChargedArrow color='white' size='28px' />
                                <h3 className='text-white'>Sign Up for Newsletter</h3>
                            </div>
                        </div>
                        <div className=' col-12 col-sm-7'>
                            <div className="input-group">
                                <input type="search"
                                    className="form-control"
                                    placeholder="Your Email Address"
                                    aria-label="Search"
                                    aria-describedby="search-addon" />
                                <span className="input-group-text" id="search-addon">
                                    Subscribe
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='footer-middle'>
                <div className='container-xxl'>
                    <div className='row'>
                        <div className='item col-7 col-md-4 col-sm-3'>
                            <h5>Contact Us</h5>
                            <div className='infor-links d-flex flex-column'>
                                <address className='text-white'>
                                    Shop Web <br />
                                    No. 32 Nguyen Xien, Da Nang<br />
                                    Viet Nam
                                </address>
                                <a className='text-white d-block my-1' href="tel:+84 943147155">+84 943 147 155</a>
                                <a className='text-white d-block my-2' href="mailto:baotqde130113@fpt.edu.vn">baotqde130113@fpt.edu.vn</a>
                                <div className='social'>
                                    <a href=''><FiFacebook color='white' size='24px' /></a>
                                    <a href=''><FiInstagram color='white' size='24px' /></a>
                                    <a href=''><FiYoutube color='white' size='24px' /></a>
                                </div>
                            </div>
                        </div>
                        <div className='item col-5 col-md-3 col-sm-2'>
                            <h5>Information</h5>
                            <div className='infor-links d-flex flex-column'>
                                <Link className='text-white py-1' to='/'>Privacy Policy</Link>
                                <Link className='text-white py-1' to='/'>Refund Policy</Link>
                                <Link className='text-white py-1' to='/'>Shipping Policy</Link>
                                <Link className='text-white py-1' to='/'>Terms Of Service</Link>
                                <Link className='text-white py-1' to='/'>Blogs</Link>
                            </div>
                        </div>
                        <div className='item col-7 col-md-2 col-sm-2'>
                            <h5>
                                Account
                            </h5>
                            <div className='account-links d-flex flex-column'>
                                <Link className='text-white py-1 ' to='/'>Search</Link>
                                <Link className='text-white py-1' to='/'>About Us</Link>
                                <Link className='text-white py-1 ' to='/'>Faq</Link>
                                <Link className='text-white py-1 ' to='/'>Contact</Link>
                                <Link className='text-white py-1 ' to='/'>Size Chart</Link>
                            </div>
                        </div>
                        <div className='item col-5 col-md-3 col-sm-2'>
                            <h5>Quick Links</h5>
                            <div className='category-links d-flex flex-column'>
                                <Link className='text-white py-1' to='/'>Laptops</Link>
                                <Link className='text-white py-1' to='/'>Headphones</Link>
                                <Link className='text-white py-1' to='/'>Tablets</Link>
                                <Link className='text-white py-1' to='/'>Watch</Link>
                                <Link className='text-white py-1' to='/'>Accessories</Link>
                            </div>
                        </div>
                        <div className='item my-md-2 col-12 col-md-12 col-sm-3'>
                            <h5>Our App</h5>
                            <span className='text-white'>Download our App and get extra 15% Discount on your first Order...!</span>
                        </div>
                    </div>
                </div>
            </section>
            <section className='footer-bottom'>
                <div className='container-xxl'>
                    <div className='row'>
                        <div className='col-12'>
                            <p className='text-center text-white py-3'>
                                &copy; {new Date().getFullYear()}: Powered by Developer's Baotq
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    );
};

export default Footer;

