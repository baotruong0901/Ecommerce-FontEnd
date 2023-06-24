import React, { useEffect } from 'react';
import Banner from '../component/homepage/Banner';
import PopularProduct from '../component/homepage/PopularProduct';
import '.././scss/home.scss'
import MovingBrand from '../component/homepage/MovingBrand';
import Blogs from '../component/homepage/Blogs';
const Home = () => {

    useEffect(() => {
        document.title = 'E-commerce | mua hàng online'; // Thay đổi title của trang web
    }, []);
    return (
        <>
            <div className='home'>
                <Banner />
                <PopularProduct />
                <Blogs />
                <MovingBrand />
            </div>

        </>
    );
};

export default Home;