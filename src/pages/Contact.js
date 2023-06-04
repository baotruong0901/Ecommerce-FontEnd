import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../scss/contact.scss'
import BreadCrumb from '../component/homepage/BreadCrumb';
import { AiFillHome, AiFillMail } from 'react-icons/ai'
import { BsTelephoneFill } from 'react-icons/bs'

const Contact = () => {
    const product = useSelector((state) => state?.AllProducts?.products)

    const images = product[0]?.images?.map((img) => ({
        original: img.url,
        thumbnail: img.url,
        originalClass: 'featured-slide',
        thumbnailClass: 'featured-thumb',
    }));
    useEffect(() => {
        document.title = 'E-commerce | mua hàng online'; // Thay đổi title của trang web
    }, []);
    return (
        <div className="contact">
            <div className="header">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <BreadCrumb title="Contact" />
                        </div>
                    </div>
                </div>
            </div>
            <div className='contact-main pb-5 pt-4'>
                <div className='container-xxl'>
                    <div className='maps'>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.8921344197147!2d108.25102347488102!3d16.019129640777727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142174c5bd6e88b%3A0x17735e5bdd074de0!2zMzIgxJAuIE5ndXnhu4VuIFhp4buDbiwgS2h1w6ogTeG7uSwgTmfFqSBIw6BuaCBTxqFuLCDEkMOgIE7hurVuZywgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1682347704702!5m2!1svi!2s"
                            className='maps'
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                    <div className='contact-form'>
                        <div className='contact-form-left'>
                            <h6>Contact</h6>
                            <form>
                                <input className='form-control' type='text' placeholder='Name'></input>
                                <input className='form-control' type='email' placeholder='Email*'></input>
                                <input className='form-control' type='text' placeholder='Phone number'></input>
                                <input className='form-control' type='text' placeholder='Comment'></input>
                                <button type='button'>Send</button>
                            </form>
                        </div>
                        <div className='contact-form-right'>
                            <h6>Get In Touch With Us</h6>
                            <div className='item gap-10'>
                                <AiFillHome size={"14px"} /> <p>32 Nguyen Xien, Da Nang
                                    Viet Nam</p>
                            </div>
                            <div className='item gap-10'>
                                <BsTelephoneFill size={"14px"} />
                                <a href="tel:+84 943147155">(+84) 943 147 155</a>
                            </div>
                            <div className='item gap-10'>
                                <AiFillMail size={"14px"} />
                                <a href="mailto:baotqde130113@fpt.edu.vn">baotqde130113@fpt.edu.vn</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;