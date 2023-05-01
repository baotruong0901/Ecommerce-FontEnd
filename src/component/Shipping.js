import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { NavLink } from 'react-router-dom';

const Shipping = () => {
    return (
        <div className='shipping'>
            < div className='header' >
                <div className='container-xxl'>
                    <div className='row'>
                        <div className='col-12'>
                            <Breadcrumb className='new-header'>
                                <NavLink to="/cart" className="breadcrumb-item">Cart</NavLink>
                                <NavLink to="/checkout/infomation" className="breadcrumb-item">Information</NavLink>
                                <Breadcrumb.Item active>Shipping</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    );
};

export default Shipping;