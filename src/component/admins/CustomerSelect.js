import React from 'react';
import Select, { StylesConfig } from 'react-select';
import chroma from 'chroma-js';

const CustomerSelect = (props) => {
    const { options, handleSelectChange, selectedOptions, className, classNamePrefix, placeholder, name } = props
    return (
        <>
            <Select
                defaultValue={[options[0]]}
                isMulti
                name={name}
                options={options}
                className={className}
                placeholder={placeholder}
                onChange={handleSelectChange}
                value={selectedOptions}
                classNamePrefix={classNamePrefix}
            />
            {/* <Select
                closeMenuOnSelect={false}
                defaultValue={[colourOptions[0], colourOptions[1]]}
                isMulti
                options={colourOptions}
                styles={colourStyles}
            /> */}
        </>
    );
};

export default CustomerSelect;