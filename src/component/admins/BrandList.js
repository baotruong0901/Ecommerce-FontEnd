import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { getAllBrandApi, deleteBrand, editBrand } from '../../service/homeService';
import Highlighter from 'react-highlight-words';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { toast } from 'react-toastify'
import UpdateCatalog from '../modal/UpdateCatelog';
const BrandList = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [data, setData] = useState(null)
    const [show, setShow] = useState(false)
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
                    <div className='table-image'>
                        <img src={text} />
                    </div>
                )
            }
        },
        {
            title: 'Brand Name',
            dataIndex: 'BrandName',
            key: 'BrandName',
            width: '20%',
            ...getColumnSearchProps('BrandName'),
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

    const fetchAllBrand = async () => {
        let res = await getAllBrandApi()
        const newBrand = []
        for (let i = 0; i < res?.data?.length; i++) {
            newBrand.push({
                key: i,
                No: i + 1,
                Image: res?.data[i]?.images?.map((item) => item?.url),
                BrandName: res?.data[i]?.name,
                Id: res?.data[i]?._id
            })
        }
        setData(newBrand)
    }
    useEffect(() => {
        fetchAllBrand()
    }, [])

    const handleUpdate = async (record) => {
        const fileList = [{
            uid: '1',
            name: `${record?.BrandName}.png`,
            status: 'done',
            thumbUrl: `${record?.Image}`
        }]
        setSelectedFiles(fileList)
        setValue(record)
        setShow(true)
    }

    const handleDelete = async (record) => {
        let res = await deleteBrand(record?.Id)
        if (res && res?.success === true) {
            toast.success(res?.msg)
            fetchAllBrand()
        }
    }
    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }
    console.log(value);

    const handleSubmit = async () => {
        let id = value?.Id
        let name = value?.BrandName
        let res = await editBrand(id, name, selectedFiles)
        if (res && res?.success === true) {
            toast.success(res?.msg)
            fetchAllBrand()
            setShow(false)
        }
    }
    return (
        <div className='brand-list'>
            <h3 className='title mb-3'>Brand List</h3>
            <div className='table'>
                <Table columns={columns} dataSource={data} />
            </div>
            <UpdateCatalog
                show={show}
                setShow={setShow}
                value={value}
                setSelectedFiles={setSelectedFiles}
                selectedFiles={selectedFiles}
                handleUpdate={handleSubmit}
                handleChange={handleChange}
                name="Brand"
                catalogName={value?.BrandName}

            />
        </div>
    );
};

export default BrandList;