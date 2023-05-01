import React, { useEffect, useState } from 'react';
import Marquee from "react-fast-marquee";
import { getAllBrandApi } from '../../service/homeService';
import cartbanner1 from '../../public/images/catbanner-01.jpg'
import '../../scss/MovingBrand.scss'
const MovingBrand = () => {
    const [brands, setBrands] = useState([])

    useEffect(() => {
        fetchAllBrand()
    }, [])

    const fetchAllBrand = async () => {
        let res = await getAllBrandApi()
        if (res && res.success === true) {
            setBrands(res.data)
        }
    }

    return (
        <div className='moving-brand pb-5'>
            <div className='container-xxl'>
                <div className='row'>
                    <div className='col-12'>

                        <Marquee>
                            {brands && brands.length > 0 && brands.map((item, index) => {
                                return (
                                    <div key={`${index}-moving-banner`} className='item' style={{ backgroundImage: `url(${item.images[0].url})` }}>
                                    </div>
                                )
                            })}
                        </Marquee>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovingBrand;