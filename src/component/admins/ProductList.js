import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { getProductApi } from '../../service/homeService';
import Highlighter from 'react-highlight-words';
import { toast } from 'react-toastify'
const ProductList = () => {
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
            // <div style={{
            //     display: '-webkit-box',
            //     WebkitBoxOrient: 'vertical',
            //     WebkitLineClamp: 2,
            //     overflow: 'hidden',
            //     textOverflow: 'ellipsis',
            // }}>
            // {
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
            )
        // }
        // </div>
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
            width: '20%',
            ...getColumnSearchProps('Id'),
        },
        {
            title: 'Product Name',
            dataIndex: 'ProductName',
            key: 'ProductName',
            width: '25%',
            ...getColumnSearchProps('ProductName'),
            render: (text) => {
                return (
                    <div
                        style={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {searchedColumn === "ProductName" ? (
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
                        )}
                    </div >
                );
            },
        },
        {
            title: 'Price',
            dataIndex: 'Price',
            key: 'Price',
            width: '10%',
        },
        {
            title: 'Brand',
            dataIndex: 'Brand',
            key: 'Brand',
            width: '10%',
            ...getColumnSearchProps('Brand'),
        },

        {
            title: 'Categories',
            dataIndex: 'Categories',
            key: 'Categories',
            width: '12%',
            render: (categories) => (
                <div>
                    {categories.map((category) => (
                        <div className='mr-5' key={category?._id}>{category?.name}</div>
                    ))}
                </div>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            key: 'Action',
            width: '18%',
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

    const fetchAllProduct = async () => {
        let res = await getProductApi()
        const newCustomer = []
        for (let i = 0; i < res?.data?.length; i++) {
            newCustomer.push({
                key: i,
                No: i + 1,
                ProductName: res?.data[i]?.title,
                Price: res?.data[i]?.price,
                Brand: res?.data[i]?.brand.map((item) => item?.name),
                Categories: res?.data[i]?.category,
                Id: res?.data[i]?._id
            })
        }
        setData(newCustomer)
    }
    useEffect(() => {
        fetchAllProduct()
    }, [])

    const handleUpdate = async (record) => {

    }

    const handleDelete = async (record) => {

    }
    return (
        <div className='product-list'>
            <h3 className='title mb-3'>Product List</h3>
            <div className='table'>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    );
};

export default ProductList;