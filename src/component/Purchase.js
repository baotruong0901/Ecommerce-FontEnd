import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '../scss/purchase.scss'
import All from './Purchase/All';
import Progress from './Purchase/Progress';
const Purchase = () => {
    const [activeTab, setActiveTab] = useState("ALL");
    const [progress, setProgress] = useState(false)
    const [value, setValue] = useState([])
    const handleTabSelect = (eventKey) => {
        setActiveTab(eventKey);
    }

    return (
        <div className='purchase'>
            {progress === false ?
                <div className='purchase-header'>
                    <Tabs
                        defaultActiveKey="ALL"
                        id="uncontrolled-tab-example"
                        className="mb-3 tabs-container"
                        onSelect={handleTabSelect}
                    >
                        <Tab eventKey="ALL" title="All">
                            <All activeTab={activeTab}
                                setProgress={setProgress}
                                setVal={setValue}
                            />
                        </Tab>
                        <Tab eventKey="CONFIRM" title="Confirm">
                            <All activeTab={activeTab}
                                setProgress={setProgress}
                                setVal={setValue}
                            />
                        </Tab>
                        <Tab eventKey="RECEIVE" title="To Receive">
                            <All activeTab={activeTab}
                                setProgress={setProgress}
                                setVal={setValue}
                            />
                        </Tab>
                        <Tab eventKey="CANCELLED" title="Cancelled">
                            <All activeTab={activeTab}
                                setProgress={setProgress}
                                setVal={setValue}
                            />
                        </Tab>
                        <Tab eventKey="COMPLETED" title="Completed">
                            <All activeTab={activeTab}
                                setProgress={setProgress}
                                setVal={setValue}
                            />
                        </Tab>
                    </Tabs>
                </div>
                :
                <Progress
                    setProgress={setProgress}
                    value={value}
                />
            }

        </div>
    );
};

export default Purchase;