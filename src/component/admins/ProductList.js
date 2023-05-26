import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { Button, Input, Space, Table } from 'antd';
import { getProductApi } from '../../service/homeService';
import Highlighter from 'react-highlight-words';
import { NumericFormat } from 'react-number-format'
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
            // width: '2%',
        },
        {
            title: 'Id',
            dataIndex: 'Id',
            key: 'Id',
            // width: '20%',
            ...getColumnSearchProps('Id'),
        },


        {
            title: 'Product Name',
            dataIndex: 'ProductName',
            key: 'ProductName',
            ...getColumnSearchProps('ProductName'),
            width: '27%',
            render: (text, record) => {
                console.log(record);
                return (
                    <div
                        style={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 1,
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
            title: 'Coupon',
            dataIndex: 'Coupon',
            key: 'Coupon',
            // width: '5%',
            render: (text) => {
                return (
                    <>
                        < span className='coupon'>{text}%</span >
                    </>
                )
            },
        },

        {
            title: 'Price',
            dataIndex: 'Price',
            key: 'Price',
            // width: '18%',
            render: (text, record) => {
                return (
                    <>
                        {+record?.Coupon !== 0 ?
                            <>
                                <span className="original-price">
                                    <NumericFormat
                                        value={text}
                                        displayType="text"
                                        thousandSeparator={true}
                                        suffix={'đ'}
                                    />
                                </span>
                                <span className="discounted-price">
                                    <NumericFormat
                                        value={(text * (1 - (+record?.Coupon / 100)))}
                                        displayType="text"
                                        thousandSeparator={true}
                                        suffix={'đ'}
                                    />
                                </span>
                            </>
                            :
                            < NumericFormat
                                value={text}
                                displayType={"text"}
                                thousandSeparator={true}
                                suffix={'đ'}
                            />
                        }
                    </>

                )
            },
        },
        {
            title: 'Brand',
            dataIndex: 'Brand',
            key: 'Brand',
            // width: '10%',
            render: (text) => {
                return (
                    <>
                        < span>{text}</span >
                    </>
                )
            },
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            key: 'Action',
            // width: '18%',
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

    const fetchAllProduct = async () => {
        let res = await getProductApi()
        const newCustomer = []
        for (let i = 0; i < res?.data?.length; i++) {
            newCustomer.push({
                key: i,
                No: i + 1,
                ProductName: res?.data[i]?.title,
                Coupon: res?.data[i].coupon,
                Price: res?.data[i]?.price,
                Brand: res?.data[i]?.brand.map((item) => item?.name),
                Categories: res?.data[i]?.category.map((item) => item?.name),
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