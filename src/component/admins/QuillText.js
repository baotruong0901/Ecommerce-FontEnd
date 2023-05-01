import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuillText = (props) => {
    const { text, setText, handleDesc } = props;

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ['link', 'image'],
            ['clean'],
        ],
    };
    // const formats = [
    //     'header',
    //     'bold',
    //     'italic',
    //     'underline',
    //     'strike',
    //     'blockquote',
    //     'code-block',
    //     'list',
    //     'bullet',
    //     'indent',
    //     'color',
    //     'background',
    //     'align',
    //     'link',
    //     'image',
    // ];
    return (
        <>
            <ReactQuill
                className='mb-3'
                theme='snow' value={text} onChange={handleDesc}
                modules={modules}
            // formats={formats}
            />
        </>
    );
};

export default QuillText;