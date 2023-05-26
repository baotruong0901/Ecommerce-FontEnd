import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { getAllSize } from '../../service/homeService';
import Highlighter from 'react-highlight-words';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { toast } from 'react-toastify'
const SizeList = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [data, setData] = useState(null)
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
            record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
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
            title: 'No',
            dataIndex: 'No',
            key: 'No',
            width: '5%',
        },
        {
            title: 'Id',
            dataIndex: 'Id',
            key: 'Id',
            width: '25%',
            ...getColumnSearchProps('Id'),
        },
        {
            title: 'Size Name',
            dataIndex: 'SizeName',
            key: 'SizeName',
            width: '30%',
            ...getColumnSearchProps('SizeName'),
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            key: 'Action',
            width: '20%',
            render: (text, record) => {
                return (
                    <span>
                        <Button className='mr-5' onClick={() => handleUpdate(record)}><AiFillEdit /></Button>
                        <Button onClick={() => handleDelete(record)}><AiFillDelete /></Button>
                    </span>
                );
            }
        },
    ];

    const fetchAllSize = async () => {
        let res = await getAllSize()
        const newSize = []
        for (let i = 0; i < res?.data?.length; i++) {
            newSize.push({
                key: i,
                No: i + 1,
                SizeName: res?.data[i]?.name,
                Id: res?.data[i]?._id
            })
        }
        setData(newSize)
    }
    useEffect(() => {
        fetchAllSize()
    }, [])

    const handleUpdate = async (record) => {

    }

    const handleDelete = async (record) => {

    }
    return (
        <div className='size-list'>
            <h3 className='title mb-3'>Size List</h3>
            <div className='table'>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    );
};

export default SizeList;