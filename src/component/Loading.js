import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import '../scss/loading.scss'
const LoadingIcon = () => (
    <div className="loading-icon">
        <AiOutlineLoading3Quarters className='icon' />
    </div>
);

export default LoadingIcon;