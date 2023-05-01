import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AddProduct from './AddProduct';

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
                        {/* <All activeTab={activeTab} /> */}
                        2
                    </Tab>
                    <Tab eventKey="Category" title="New Category">
                        {/* <All activeTab={activeTab} /> */}
                        3
                    </Tab>
                    <Tab eventKey="Color" title="New Color">
                        {/* <All activeTab={activeTab} /> */}
                        4
                    </Tab>
                    <Tab eventKey="Blogs" title="New Blogs">
                        {/* <All activeTab={activeTab} /> */}
                        5
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