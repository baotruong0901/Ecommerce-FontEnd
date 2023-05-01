import React from 'react';
import Banner from '../component/homepage/Banner';
import CardProduct from '../component/homepage/CardProduct';
import PopularProduct from '../component/homepage/PopularProduct';
import '.././scss/home.scss'
import MovingBrand from '../component/homepage/MovingBrand';
const Home = () => {
    return (
        <div className='home'>
            <Banner />
            <PopularProduct />
            <MovingBrand />
        </div>
    );
};

export default Home;