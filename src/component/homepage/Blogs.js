import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../scss/blogs.scss'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBlog } from '../../store/actions/blogAction';
import CardBlog from './CardBlog';
import { useNavigate } from 'react-router-dom';
const Blogs = () => {
    const blogs = useSelector((state) => state.blogs.blogs)
    const dispash = useDispatch()
    const navigate = useNavigate()
    const getBlogs = () => {
        dispash(fetchAllBlog())
    }
    useEffect(() => {
        getBlogs()
    }, [])
    const detailBlog = async (item) => {
        navigate(`/blogs/${item?.slug}&${item?._id}`)
    }
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        centerPadding: 30,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false
                }
            },
            {
                breakpoint: 425,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    centerMode: true,
                    centerPadding: '12px'
                }
            },
        ]

    };
    return (
        <section className='blog'>
            <div className='container-xxl'>
                <div className='row'>
                    <div className="col-12 mb-2 mb-sm-3">
                        <h3 className="section-heading">News</h3>
                    </div>
                    <div className='col-12 main'>
                        <Slider {...settings}>
                            {blogs && blogs.length > 0 && blogs.map((item, index) => {
                                return (
                                    <CardBlog
                                        description={item?.description}
                                        title={item?.title}
                                        slug={item?.slug}
                                        image={item?.image[0]?.url}
                                        detailBlog={() => detailBlog(item)}
                                    />
                                )
                            })}
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Blogs;