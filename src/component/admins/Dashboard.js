import React from 'react';
import { Column } from '@ant-design/plots';

const Dashboard = () => {
    const data = [
        {
            type: 'Jan',
            sales: 38,
        },
        {
            type: 'Feb',
            sales: 52,
        },
        {
            type: 'Apr',
            sales: 61,
        },
        {
            type: 'May',
            sales: 145,
        },
        {
            type: 'Jun',
            sales: 48,
        },
        {
            type: 'Jul',
            sales: 38,
        },
        {
            type: 'Aug',
            sales: 38,
        },
        {
            type: 'Sept',
            sales: 38,
        },
        {
            type: 'Oct',
            sales: 38,
        },
        {
            type: 'Nov',
            sales: 38,
        },
        {
            type: 'Dec',
            sales: 38,
        },
    ];
    const config = {
        data,
        xField: 'type',
        yField: 'sales',
        color: ({ type }) => {
            return '#ffd333'
        },
        label: {
            position: 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 1,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: 'Month',
            },
            sales: {
                alias: 'Income',
            },
        },
    };
    return (
        <div className='dashboard'>
            <h3 className='title'>Dashboard</h3>
            <div className='dashboard-header'>
                <div className='dashboard-header-item'>
                    <p className='top'>Total sells</p>
                    <div className='bottom'>
                        <h4>$1100</h4>
                        <div className='bottom-right'>
                            <h6>32%</h6>
                            <p>Total sells</p>
                        </div>
                    </div>
                </div>
                <div className='dashboard-header-item'>
                    <p className='top'>Average order value</p>
                    <div className='bottom'>
                        <h4>$1100</h4>
                        <div className='bottom-right'>
                            <h6>32%</h6>
                            <p>Total sells</p>
                        </div>
                    </div>
                </div>
                <div className='dashboard-header-item'>
                    <p className='top'>Total orders</p>
                    <div className='bottom'>
                        <h4>$1100</h4>
                        <div className='bottom-right'>
                            <h6>32%</h6>
                            <p>Total sells</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                <h3 className='mb-4'>Income Statics</h3>
                <div>
                    <Column {...config} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;