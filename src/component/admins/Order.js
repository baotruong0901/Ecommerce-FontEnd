import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { getAllBooking, confirmBookingApi } from '../../service/homeService';
import Highlighter from 'react-highlight-words';
import { AiFillEye } from 'react-icons/ai'
import BlockAccount from '../modal/BlockAccount';
import { toast } from 'react-toastify'
import ViewProducts from '../modal/ViewProducts';
const Order = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [data, setData] = useState(null)
    const [show, setShow] = useState(false)
    const [value, setValue] = useState([])
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const columns = [
        {
            title: 'Orderer',
            dataIndex: 'Orderer',
            key: 'Orderer',
            width: '15%',
            ...getColumnSearchProps('Orderer'),
        },
        {
            title: 'Email',
            dataIndex: 'Email',
            key: 'Email',
            width: '20%',
            ...getColumnSearchProps('Email'),
        },
        {
            title: 'Mobile',
            dataIndex: 'Mobile',
            key: 'Mobile',
            width: '12%',
            ...getColumnSearchProps('Mobile'),
        },
        {
            title: 'Product',
            dataIndex: 'Product',
            key: 'Product',
            width: '15%',
            render: (text, record) => (
                <span>
                    <span className='mr-5'>{text}</span>
                    <Button onClick={() => handleViewMore(record)}>View</Button>
                </span>
            )
        },
        {
            title: 'Status',
            dataIndex: 'Status',
            key: 'Status',
            width: '12%',
        },

        {
            title: 'Confirm',
            dataIndex: 'Confirm',
            key: 'Confirm',
            width: '18%',
            render: (text, record) => {
                if (record.Status === 'CONFIRM') {
                    return (
                        <span>
                            <Button className='mr-5' onClick={() => handleConfirm(record)}>Confirm</Button>
                            <Button onClick={() => handleRefuse(record)}>refuse</Button>
                        </span>
                    );
                } else {
                    if (record.CancelBy) {
                        return (
                            <span style={{ color: 'red' }}>{record.CancelBy}</span>
                        )
                    }
                    else if (record?.Status === "RECEIVE") {
                        return (
                            <Button onClick={() => handleCompleted(record)}>{record.Status}</Button>
                        )
                    }
                    else if (record?.Status === "COMPLETED") {
                        return (
                            <span>{record.Status}</span>
                        )
                    }
                }
            },
        },
        {
            title: 'ViewDetail',
            dataIndex: 'ViewDetail',
            key: 'ViewDetail',
            width: '3%',
            render: (text, record) => {
                return (
                    <span className='detail-order' onClick={() => handleViewDetail(record)}><AiFillEye color={'777777'} size='24px' />
                    </span >
                );
            }
        },

    ];
    const fetchAllBooking = async () => {
        let res = await getAllBooking()
        let data = res?.data?.reverse()
        const newCustomer = []
        for (let i = 0; i < data?.length; i++) {
            newCustomer.push({
                key: i,
                Orderer: `${data[i]?.userId?.firstname} ${data[i]?.userId?.lastname}`,
                Email: data[i]?.userId?.email,
                Mobile: data[i]?.mobile,
                Product: `${data[i]?.products?.reduce((acc, product) => acc + product.count, 0)} Product`,
                Status: data[i]?.status,
                ProductMore: data[i]?.products?.map((item) => item),
                CancelBy: data[i]?.cancelBy,
                id: data[i]?._id
            })
        }
        setData(newCustomer)
    }

    useEffect(() => {
        fetchAllBooking()
    }, [])
    const handleConfirm = async (record) => {
        const bookingId = record?.id
        const type = "CONFIRM"
        console.log(record);
        let res = await confirmBookingApi(bookingId, type)
        if (res && res.success == true) {
            fetchAllBooking()
            toast.success(res?.msg)
        }

    };
    const handleRefuse = async (record) => {
        const bookingId = record?.id
        const type = "CANCELLED"
        let res = await confirmBookingApi(bookingId, type)
        if (res && res.success == true) {
            fetchAllBooking()
            toast.success(res?.msg)
        }
    }
    const handleCompleted = async (record) => {
        const bookingId = record?.id
        const type = "COMPLETED"
        let res = await confirmBookingApi(bookingId, type)
        if (res && res.success == true) {
            fetchAllBooking()
            toast.success(res?.msg)
        }
    }

    const handleViewMore = async (record) => {
        setShow(true)
        setValue(record?.ProductMore)
    }

    const handleViewDetail = async (record) => {

    }



    return (
        <div className='orders'>
            <h3 className='title mb-3'>Orders</h3>
            <div className='table'>
                <Table columns={columns} dataSource={data} />
            </div>
            <ViewProducts
                show={show}
                setShow={setShow}
                value={value}
            />
        </div>
    );
}

export default Order;