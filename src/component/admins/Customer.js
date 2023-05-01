import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { BlockUser, getAllUser, unBlockUser, DeleteUser, updateUser } from '../../service/homeService';
import Highlighter from 'react-highlight-words';
import BlockAccount from '../modal/BlockAccount';
import { toast } from 'react-toastify'
const Customer = () => {
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
            title: 'Username',
            dataIndex: 'Username',
            key: 'Username',
            width: '30%',
            ...getColumnSearchProps('Username'),
        },
        {
            title: 'Email',
            dataIndex: 'Email',
            key: 'Email',
            width: '30%',
            ...getColumnSearchProps('Email'),
        },
        {
            title: 'Mobile',
            dataIndex: 'Mobile',
            key: 'Mobile',
            width: '20%',
            ...getColumnSearchProps('Mobile'),
        },

        {
            title: 'Action',
            dataIndex: 'Action',
            key: 'Action',
            width: '20%',
            render: (text, record) => (
                <span>
                    <Button onClick={() => handleBlock(record)}>Block</Button>
                </span>
            ),
        },
    ];
    const fetchAllCustomer = async () => {

        let res = await getAllUser("ALL")
        const newCustomer = []
        for (let i = 0; i < res?.data?.length; i++) {
            newCustomer.push({
                key: i,
                Username: `${res?.data[i]?.firstname} ${res?.data[i]?.lastname}`,
                Email: res?.data[i]?.email,
                Mobile: res?.data[i]?.mobile,
                id: res?.data[i]?._id
            })
        }
        setData(newCustomer)
    }

    useEffect(() => {
        fetchAllCustomer()
    }, [])
    const fetchUserIsBlocked = async () => {
        let res = await getAllUser("BLOCK")
        setBlocked(res?.data)
    }
    useEffect(() => {
        fetchUserIsBlocked()
    }, [])
    const handleUnblock = async (item) => {
        let res = await unBlockUser(item?._id)
        if (res && res.success === true) {
            toast.success(res?.msg)
            fetchUserIsBlocked()
            fetchAllCustomer()
        }
    }

    const handleDeleteUser = async (item) => {
        let res = await DeleteUser(item?._id)
        if (res && res.success === true) {
            toast.success(res?.msg)
            fetchUserIsBlocked()
        }
    }

    const handleBlock = async (record) => {
        let res = await BlockUser(record?.id)
        if (res && res.success === true) {
            toast.success(res?.msg)
            fetchAllCustomer()
            fetchUserIsBlocked()
        } else {
            toast.error(res?.msg)
        }

    };
    const handleClickAccountBlock = () => {
        setShow(true)
    }
    return (
        <div className='customer'>
            <h3 className='title mb-3'>Customer</h3>
            <div className='account-block'>
                <span onClick={() => handleClickAccountBlock()}>Blocked Account</span>
            </div>
            <div className='table'>
                <Table columns={columns} dataSource={data} />
            </div>
            <BlockAccount
                setShow={setShow}
                show={show}
                blocked={blocked}
                handleUnblock={handleUnblock}
                handleDeleteUser={handleDeleteUser}
            />

        </div>
    );
}

export default Customer;