import React, { useEffect, useState } from 'react';
import { Column } from '@ant-design/plots';
import { getBookingForMonth } from '../../service/homeService';
import { NumericFormat } from 'react-number-format'

const Dashboard = () => {
    const [allBooking, setAllBooking] = useState({
        completed: [],
        confirm: [],
        cancelled: [],
        received: []
    })
    const [totalOrder, setTotalOrder] = useState(0)
    const [averageOrder, setAverageOrder] = useState(0)
    const [selectedMonth, setSelectedMonth] = useState('all')
    const data = [
        {
            type: '1',
            // type: 'Jan',
            sales: 1,
        },
        {
            type: '2',
            // type: 'Jan',
            sales: 38,
        },
        {
            // type: 'Feb',
            type: '3',
            sales: 52,
        },
        {
            // type: 'Apr',
            type: '4',
            sales: 61,
        },
        {
            // type: 'May',
            type: '5',
            sales: 145,
        },
        {
            // type: 'Jun',
            type: '6',
            sales: 48,
        },
        {
            // type: 'Jul',
            type: '7',
            sales: 38,
        },
        {
            // type: 'Aug',
            type: '8',
            sales: 38,
        },
        {
            // type: 'Sept',
            type: '9',
            sales: 38,
        },
        {
            // type: 'Oct',
            type: '10',
            sales: 38,
        },
        {
            // type: 'Nov',
            type: '11',
            sales: 38,
        },
        {
            // type: 'Dec',
            type: '12',
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
            }
        },
    };

    const fetchAllBooking = async () => {
        let res = await getBookingForMonth(selectedMonth)
        console.log(res);
        if (res && res?.success === true) {
            if (Object.values(res?.data).length > 0) {
                setAllBooking({
                    completed: res?.data?.completedBookings,
                    confirm: res?.data?.confirmBookings,
                    cancelled: res?.data?.cancelledBookings,
                    received: res?.data?.receivedBookings
                })
                setTotalOrder(Math.floor(res?.data?.completedBookings.reduce((sum, item) => sum + (+item?.total), 0)))
            } else {
                setAllBooking({
                    completed: [],
                    confirm: [],
                    cancelled: [],
                    received: []
                })
                setTotalOrder(0)
            }
        }
    }
    console.log(averageOrder, allBooking);

    useEffect(() => {
        fetchAllBooking()
    }, [selectedMonth])

    const handleSelectedMonth = async (e) => {
        setSelectedMonth(e.target.value)
    }

    return (
        <div className='dashboard'>
            <div className='dashboard-header'>
                <h3 className='title'>Dashboard</h3>
                <select
                    onChange={(e) => handleSelectedMonth(e)}
                    className='form-control form-select select-month'>
                    <option selected value="all">--Tổng--</option>
                    <option value="1">Tháng 1</option>
                    <option value="2">Tháng 2</option>
                    <option value="3">Tháng 3</option>
                    <option value="4">Tháng 4</option>
                    <option value="5">Tháng 5</option>
                    <option value="6">Tháng 6</option>
                    <option value="7">Tháng 7</option>
                    <option value="8">Tháng 8</option>
                    <option value="9">Tháng 9</option>
                    <option value="10">Tháng 10</option>
                    <option value="11">Tháng 11</option>
                    <option value="12">Tháng 12</option>
                </select>
            </div>
            <div className='dashboard-main'>
                <div className='item'>
                    <p className='top text-success'>Total sells</p>
                    <div className='bottom'>
                        <h4>{allBooking.completed.length}</h4>
                        <div className='bottom-right'>
                            <p className='text-success'>Compeleted</p>
                        </div>
                    </div>
                </div>
                <div className='item'>
                    <p className='top text-info'>Total sells</p>
                    <div className='bottom'>
                        <h4>{allBooking.received.length}</h4>
                        <div className='bottom-right'>
                            <p className='text-info'>receive</p>
                        </div>
                    </div>
                </div>
                <div className='item'>
                    <p className='top text-danger'>Total sells</p>
                    <div className='bottom'>
                        <h4>{allBooking.cancelled.length}</h4>
                        <div className='bottom-right'>
                            <p className='text-danger'>cancelled</p>
                        </div>
                    </div>
                </div>
                <div className='item'>
                    <p className='top text-warning'>Total sells</p>
                    <div className='bottom'>
                        <h4>{allBooking.confirm.length}</h4>
                        <div className='bottom-right'>
                            <p className='text-warning'>Confirm</p>
                        </div>
                    </div>
                </div>
                <div className='item'>
                    <p className='top'>Total orders</p>
                    <div className='bottom'>
                        <h4>
                            <NumericFormat
                                value={totalOrder}
                                displayType="text"
                                thousandSeparator={true}
                                suffix={'đ'}
                            />
                        </h4>
                        {/* <div className='bottom-right'>
                            <p>Total sells</p>
                        </div> */}
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