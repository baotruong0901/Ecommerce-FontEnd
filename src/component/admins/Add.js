import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AddProduct from './AddProduct';
import AddBrand from './AddBrand';
import AddCategory from './AddCategory';
import AddColor from './AddColor';
import AddSize from './AddSize';
import AddCoupon from './AddCoupon';
import AssignCoupon from './AssignCoupon';

const Add = () => {
    const [activeTab, setActiveTab] = useState("Product");

    const handleTabSelect = (eventKey) => {
        setActiveTab(eventKey);
    }
    return (
        <div className='add-new'>
            <h3 className='title mb-3'>Create {activeTab} </h3>
            <div className='add-new-header'>
                <Tabs
                    defaultActiveKey="Product"
                    id="uncontrolled-tab-example"
                    className="mb-3 tabs-container"
                    onSelect={handleTabSelect}
                >
                    <Tab eventKey="Product" title="New Product">
                        <AddProduct name={activeTab} />
                    </Tab>
                    <Tab eventKey="Brand" title="New Brand">
                        <AddBrand name={activeTab} />
                    </Tab>
                    <Tab eventKey="Category" title="New Category">
                        <AddCategory name={activeTab} />
                    </Tab>
                    <Tab eventKey="Color" title="New Color">
                        <AddColor name={activeTab} />
                    </Tab>
                    <Tab eventKey="Size" title="New Size">
                        <AddSize name={activeTab} />
                    </Tab>
                    <Tab eventKey="Coupon" title="New Coupon">
                        <AddCoupon name={activeTab} />
                    </Tab>
                    <Tab eventKey="Coupon to product" title="Assign">
                        <AssignCoupon name={activeTab} />
                    </Tab>
                </Tabs>
            </div>
            <div className='add-new-product'>

            </div>



            {/* <div dangerouslySetInnerHTML={{ __html: text }} /> */}

        </div>
    );
};

export default Add;