import React, { useEffect, useState } from 'react';
import Marquee from "react-fast-marquee";
import { getAllBrandApi, getProductApi } from '../../service/homeService';
import { useNavigate } from 'react-router-dom';
import '../../scss/MovingBrand.scss'
const MovingBrand = () => {
    const [brands, setBrands] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetchAllBrand()
    }, [])

    const fetchAllBrand = async () => {
        let res = await getAllBrandApi()
        if (res && res.success === true) {
            setBrands(res.data)
        }
    }

    const handleProductOnBrand = async (brand) => {
        window.scrollTo(0, 40);
        navigate(`/our-store/${`brand=${brand?._id}`}`)
    }

    return (
        <div className='moving-brand'>
            <div className='container-xxl'>
                <div className='row'>
                    <div className='col-12 pb-4 pb-sm-4'>

                        <Marquee>
                            {brands && brands.length > 0 && brands.map((item, index) => {
                                return (
                                    <div
                                        key={`${index}-moving-banner`}
                                        className='item'
                                        style={{ backgroundImage: `url(${item.images[0].url})` }}
                                        onClick={() => handleProductOnBrand(item)}>
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