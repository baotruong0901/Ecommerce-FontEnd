import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { getAllBlog, deleteBlog, putOutstandingBlog } from '../../service/homeService';
import Highlighter from 'react-highlight-words';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { toast } from 'react-toastify'
import moment from 'moment';

const BlogList = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [data, setData] = useState(null)
    // const [show, setShow] = useState(false)
    const [value, setValue] = useState(null)
    const [selectedFiles, setSelectedFiles] = useState([]);
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
            width: '20%',
            ...getColumnSearchProps('Id'),
        },
        {
            title: 'Image',
            dataIndex: 'Image',
            key: 'Image',
            width: '10%',
            render: (text) => {
                return (
                    <div className='table-image'>
                        <img className='image' src={text} />
                    </div>
                )
            }
        },
        {
            title: 'Title',
            dataIndex: 'Title',
            key: 'Title',
            width: '25%',
            ...getColumnSearchProps('Title'),
        },
        {
            title: 'Post date',
            dataIndex: 'Date',
            key: 'Date',
            width: '15%',
            render: (text) => {
                const formattedDate = moment(text).format('HH:mm:ss DD/MM/YY');
                return (
                    <span>
                        {formattedDate}
                    </span>
                )
            }
        },
        {
            title: 'Outstanding',
            dataIndex: 'Outstanding',
            key: 'Outstanding',
            width: '10%',
            render: (text, record) => {
                return (
                    <span className='outstanding'>
                        <span className={text === false ? "active" : ""} onClick={() => handleOutstanding(record)}>Off</span>
                        <span className={text === true ? "active" : ""} onClick={() => handleOutstanding(record)}>On</span>
                    </span>
                );
            }
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            key: 'Action',
            width: '12%',
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

    const fetchAllBlog = async () => {
        let res = await getAllBlog()
        const newBlog = []
        for (let i = 0; i < res?.data?.length; i++) {
            newBlog.push({
                key: i,
                No: i + 1,
                Image: res?.data[i]?.image?.map((item) => item?.url),
                Title: res?.data[i]?.title,
                Date: res?.data[i]?.createdAt,
                Outstanding: res?.data[i]?.outstanding,
                Id: res?.data[i]?._id
            })
        }
        setData(newBlog)
    }
    useEffect(() => {
        fetchAllBlog()
    }, [])

    const handleUpdate = async (record) => {

    }
    const handleOutstanding = async (record) => {
        let id = record?.Id
        let res = await putOutstandingBlog(id)
        if (res && res?.success === true) {
            fetchAllBlog()
            toast.success(res?.msg)
        }
    }


    const handleDelete = async (record) => {
        let res = await deleteBlog(record.Id)
        if (res && res?.success === true) {
            toast.success(res?.msg)
            fetchAllBlog()
        }
    }

    return (
        <div className='blog-list'>
            <h3 className='title mb-3'>Blog List</h3>
            <div className='table'>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    );
};

export default BlogList;