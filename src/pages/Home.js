import React from 'react';
import Banner from '../component/homepage/Banner';
import PopularProduct from '../component/homepage/PopularProduct';
import '.././scss/home.scss'
import MovingBrand from '../component/homepage/MovingBrand';
import Blogs from '../component/homepage/Blogs';
const Home = () => {
    return (
        <div className='home'>
            <Banner />
            <PopularProduct />
            <Blogs />
            <MovingBrand />
        </div>
    );
};

export default Home;