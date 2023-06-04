import React, { useState, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '../scss/purchase.scss'
import All from './Purchase/All';
import Progress from './Purchase/Progress';
import { useNavigate } from 'react-router-dom';
const Purchase = () => {
    const [activeTab, setActiveTab] = useState("ALL");
    const [progress, setProgress] = useState(false)
    const [value, setValue] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        document.title = 'E-commerce | mua hàng online'; // Thay đổi title của trang web
    }, []);
    const handleTabSelect = (eventKey) => {
        setActiveTab(eventKey);
        navigate(`/user/purchase/type=${eventKey}`)
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