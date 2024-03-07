import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
// eslint-disable-next-line import/no-extraneous-dependencies
import { motion, AnimatePresence } from 'framer-motion';

import { Box, TextField } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// eslint-disable-next-line import/no-extraneous-dependencies
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { isFormInvalid } from 'src/utils/isForm-invalid';
import { findInputError } from 'src/utils/find-input-error';

export default function CusInputField({ name, label, validation, multiline, type }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputErrors = findInputError(errors, name);
  const isInvalid = isFormInvalid(inputErrors);

  return (
    <Box sx={{ width: '100%' }}>
      {type === 'date' ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker label={label} sx={{ width: '100%' }} {...register(name, validation)} />
          </DemoContainer>
        </LocalizationProvider>
      ) : (
        <TextField
          label={label}
          multiline={multiline}
          error={isInvalid}
          helperText={isInvalid && inputErrors.message}
          {...register(name, validation)}
          sx={{ width: '100%' }}
        />
      )}
      <AnimatePresence mode="wait" initial={false}>
        {isInvalid && (
          <InputError message={inputErrors.error.message} key={inputErrors.error.message} />
        )}
      </AnimatePresence>
    </Box>
  );
}

const InputError = ({ message }) => (
  <motion.div
    className="flex items-center gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md"
    {...framer_error}
  >
    {message}
  </motion.div>
);

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};

CusInputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  validation: PropTypes.object, // You may want to refine this
  multiline: PropTypes.bool,
  type: PropTypes.string.isRequired,
};
InputError.propTypes = {
  message: PropTypes.string.isRequired,
};
