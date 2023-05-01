import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { getCategoryApi } from '../../service/homeService';
import Highlighter from 'react-highlight-words';
import { toast } from 'react-toastify'
const CategoryList = () => {
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
            title: 'Image',
            dataIndex: 'Image',
            key: 'Image',
            width: '20%',
            render: (text) => {
                return (
                    <div className='table-category-image'>
                        <img src={text} />
                    </div>
                )
            }
        },
        {
            title: 'Category Name',
            dataIndex: 'CategoryName',
            key: 'CategoryName',
            width: '20%',
            ...getColumnSearchProps('CategoryName'),
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            key: 'Action',
            width: '20%',
            render: (text, record) => {
                return (
                    <span>
                        <Button className='mr-5' onClick={() => handleUpdate(record)}>Update</Button>
                        <Button onClick={() => handleDelete(record)}>Detele</Button>
                    </span>
                );
            }
        },
    ];

    const fetchAllCategory = async () => {
        let res = await getCategoryApi()
        const newBrand = []
        for (let i = 0; i < res?.data?.length; i++) {
            newBrand.push({
                key: i,
                No: i + 1,
                Image: res?.data[i]?.image.map((item) => item?.url),
                CategoryName: res?.data[i]?.name,
                Id: res?.data[i]?._id
            })
        }
        setData(newBrand)
    }
    useEffect(() => {
        fetchAllCategory()
    }, [])

    const handleUpdate = async (record) => {

    }

    const handleDelete = async (record) => {

    }
    return (
        <div className='category-list'>
            <h3 className='title mb-3'>Categories List</h3>
            <div className='table'>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    );
};

export default CategoryList;