import React, { useState, useEffect } from 'react';
import '../scss/splash.scss';
import splashimg from "../public/images/airpod.jpeg"
const Splash = () => {
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        // Simulate loading time
        setTimeout(() => {
            setShowSplash(false);
        }, 2000); // Thay đổi thời gian tải tùy ý
    }, []);

    return (
        <div className={`splash ${showSplash ? 'show' : 'hide'}`}>
            {/* Thêm nội dung màn hình splash ở đây */}
            <img src={splashimg} alt="Splash Screen" />
        </div>
    );
};

export default Splash;