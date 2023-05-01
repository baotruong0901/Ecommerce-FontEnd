import React from 'react';
import banner1 from '../../public/images/main-banner.jpg'
import banner2 from '../../public/images/main-banner-1.jpg'
import cartbanner1 from '../../public/images/catbanner-01.jpg'
import cartbanner2 from '../../public/images/catbanner-02.jpg'
import cartbanner3 from '../../public/images/catbanner-03.jpg'
import cartbanner4 from '../../public/images/catbanner-04.jpg'
import { Link } from 'react-router-dom'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../scss/banner.scss'
const Banner = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 8000,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <section className='banner'>
            <div className='container-xxl'>
                <div className='row'>
                    <div className='col-6'>
                        <div className='banner-main'>
                            <Slider {...settings}>
                                <div className='banner-item my-5'>
                                    <div className='image' style={{ backgroundImage: `url(${banner1})` }}>

                                    </div>
                                    <div className='banner-content'>
                                        <span>suppercharged for pros.</span>
                                        <h2>Special Sale</h2>
                                        <p>
                                            From $999.00 or $41.62/moth<br />
                                            for 24 moth.Footnote*
                                        </p>
                                        <button><Link >buy now</Link></button>
                                    </div>
                                </div>
                                <div className='banner-item my-5'>
                                    <div className='image' style={{ backgroundImage: `url(${banner2})` }}>

                                    </div>
                                    <div className='banner-content'>
                                        <span>suppercharged for pros.</span>
                                        <h2>Special Sale</h2>
                                        <p>
                                            From $999.00 or $41.62/moth<br />
                                            for 24 moth.Footnote*
                                        </p>
                                        <button><Link >buy now</Link></button>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='banner-right my-5'>
                            <div className='item' style={{ backgroundImage: `url(${cartbanner1})` }}>
                                <div className='banner-content'>
                                    <span>best sale</span>
                                    <h2>Laptops Max</h2>
                                    <p>
                                        From $1699.00 or $64.62/moth<br />
                                        for 24 moth.Footnote*
                                    </p>
                                </div>
                            </div>
                            <div className='item' style={{ backgroundImage: `url(${cartbanner2})` }}>
                                <div className='banner-content'>
                                    <span>new arrinal for pros.</span>
                                    <h2>Buy IPad Air</h2>
                                    <p>
                                        From $599.00 or $49.91/moth<br />
                                        for 24 moth.Footnote*
                                    </p>
                                </div>
                            </div>
                            <div className='item ' style={{ backgroundImage: `url(${cartbanner3})` }}>
                                <div className='banner-content'>
                                    <span>15% off</span>
                                    <h2>Smartwatch 7</h2>
                                    <p>
                                        Shop the latest band<br />
                                        style and colors
                                    </p>
                                </div>
                            </div>
                            <div className='item' style={{ backgroundImage: `url(${cartbanner4})` }}>
                                <div className='banner-content'>
                                    <span>free engraving</span>
                                    <h2>AirPods Max</h2>
                                    <p>
                                        High-fidelity &<br />
                                        ultra-low distortion
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;