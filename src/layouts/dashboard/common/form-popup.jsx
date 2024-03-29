// eslint-disable-next-line import/no-extraneous-dependencies
// import dayjs from 'dayjs';
import { useState } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';

import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import { Card, Stack, Button } from '@mui/material';

// import { fDate } from 'src/utils/format-time';
import { date_validation, desc_validation, title_validation } from 'src/utils/input-validation';

import { taskAdded } from 'src/store/slices/taskSlice';

import CusInputField from 'src/components/Input';
// import DateInputField from 'src/components/Input/DateInputField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function FormModal({ open, handleClose }) {
  const methods = useForm();
  const dispatch = useDispatch()
  const [success, setSuccess] = useState(false);




  const onSubmit = methods.handleSubmit((data) => {
    dispatch(taskAdded(data.title, data.description, data.dueDate))
    setSuccess(true);
    handleClose()
    console.log("success: ", success)
  });
  const submitHandle = (e) => {

    e.preventDefault()
  }

  const renderForm = (
    <FormProvider {...methods}>
      <form onSubmit={submitHandle} noValidate autoComplete="off">
        <Stack spacing={3} paddingTop={3}>
          <CusInputField {...title_validation} />
          <CusInputField {...desc_validation} />
          <CusInputField {...date_validation} />

        </Stack>
        <Button type="submit" onClick={onSubmit}>
          On Submit
        </Button>
      </form>
    </FormProvider>
  );
  return (
    <div>
      <Modal
        aria-labelledby="form-modal"
        aria-describedby="form-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
              <Card
                sx={{
                  p: 5,
                  width: 1,
                  maxWidth: '100%',
                }}
              >
                <Typography variant="h4">Enter Your Task Info.</Typography>
                {renderForm}
              </Card>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

FormModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
