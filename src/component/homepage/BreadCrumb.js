import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { NavLink } from 'react-router-dom';

const BreadCrumb = (props) => {
    const { title } = props
    return (
        <>
            <Breadcrumb className='new-header'>
                <NavLink to="/" className="breadcrumb-item">Home</NavLink>
                <Breadcrumb.Item active>{title}</Breadcrumb.Item>
            </Breadcrumb>
        </>
    );
};

export default BreadCrumb;