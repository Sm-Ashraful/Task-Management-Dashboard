import React from 'react'
import PropTypes from 'prop-types';

// // eslint-disable-next-line import/no-extraneous-dependencies
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// // eslint-disable-next-line import/no-extraneous-dependencies
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// // eslint-disable-next-line import/no-extraneous-dependencies
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// // eslint-disable-next-line import/no-extraneous-dependencies
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField } from '@mui/material';

export default function DateInputField({ value, setValue }) {


    return (
        <TextField
            id="dueDate"
            name="dueDate"
            label="Due Date"
            type="date"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            InputLabelProps={{
                shrink: true,
            }}
        // disabled={!isEditable}
        />
    )
}

DateInputField.propTypes = {
    value: PropTypes.string,
    setValue: PropTypes.func
};