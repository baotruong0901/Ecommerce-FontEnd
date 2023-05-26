import React from 'react';
import { Stepper } from 'react-form-stepper';
const AddCoupon = () => {
    return (
        <div>
            <Stepper
                steps={[{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]}
                activeStep={1}
            />
        </div>
    );
};

export default AddCoupon;