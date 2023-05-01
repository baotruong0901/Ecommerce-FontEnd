import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { getAllBooking } from '../../service/homeService';
import Highlighter from 'react-highlight-words';
import { AiFillEye } from 'react-icons/ai'
import BlockAccount from '../modal/BlockAccount';
import { toast } from 'react-toastify'
const Order = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [data, setData] = useState(null)
    const [show, setShow] = useState(false)
    const [blocked, setBlocked] = useState([])
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
                    <Button onClick={() => handleDetail(record)}>View</Button>
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
                if (record.Status === 'TO CONFIRM') {
                    return (
                        <span>
                            <Button className='mr-5' onClick={() => handleConfirm(record)}>Confirm</Button>
                            <Button onClick={() => handleRefuse(record)}>refuse</Button>
                        </span>
                    );
                } else {
                    return null;
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
                    <span className='detail-order' onClick={() => handleConfirm(record)}><AiFillEye color={'777777'} size='24px' />
                    </span >
                );
            }
        },

    ];
    const fetchAllCustomer = async () => {

        let res = await getAllBooking()
        console.log(res);
        const newCustomer = []
        for (let i = 0; i < res?.data?.length; i++) {
            newCustomer.push({
                key: i,
                Orderer: `${res?.data[i]?.userId?.firstname} ${res?.data[i]?.userId?.lastname}`,
                Email: res?.data[i]?.userId?.email,
                Mobile: res?.data[i]?.mobile,
                Product: `${res?.data[i]?.products?.reduce((acc, product) => acc + product.count, 0)} Product`,
                Status: res?.data[i]?.status,
                id: res?.data[i]?._id
            })
        }
        setData(newCustomer)
    }

    useEffect(() => {
        fetchAllCustomer()
    }, [])
    const handleConfirm = async (record) => {
        // let res = await BlockUser(record?.id)
        // if (res && res.success === true) {
        //     toast.success(res?.msg)
        //     fetchAllCustomer()
        //     fetchUserIsBlocked()
        // } else {
        //     toast.error(res?.msg)
        // }

    };
    const handleRefuse = async (record) => {

    }

    const handleDetail = async (record) => {

    }


    return (
        <div className='orders'>
            <h3 className='title mb-3'>Orders</h3>
            <div className='table'>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    );
}

export default Order;