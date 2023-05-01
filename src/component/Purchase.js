import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '../scss/purchase.scss'
import All from './Purchase/All';
const Purchase = () => {
    const [activeTab, setActiveTab] = useState("ALL");

    const handleTabSelect = (eventKey) => {
        setActiveTab(eventKey);

    }

    return (
        <div className='purchase'>
            <div className='purchase-header'>
                <Tabs
                    defaultActiveKey="ALL"
                    id="uncontrolled-tab-example"
                    className="mb-3 tabs-container"
                    onSelect={handleTabSelect}
                >
                    <Tab eventKey="ALL" title="All">
                        <All activeTab={activeTab} />
                    </Tab>
                    <Tab eventKey="CONFIRM" title="Confirm">
                        <All activeTab={activeTab} />
                    </Tab>
                    <Tab eventKey="RECEIVE" title="To Receive">
                        <All activeTab={activeTab} />
                    </Tab>
                    <Tab eventKey="CANCELLED" title="Cancelled">
                        <All activeTab={activeTab} />
                    </Tab>
                    <Tab eventKey="COMPLETED" title="Completed">
                        <All />
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
};

export default Purchase;