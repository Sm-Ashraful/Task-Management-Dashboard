import { useState } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch } from 'react-redux';

import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';

import { fDate } from 'src/utils/format-time';

import { taskDeleted, updateStatus, taskModalOpen, setSelectedTask, } from 'src/store/slices/taskSlice';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import ReactionButtons from 'src/components/ReactionButton';



// ----------------------------------------------------------------------

export default function ShopProductCard({ product }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    dispatch(taskDeleted(product.id))
    setOpen(false);
  };
  const updatedStatusHandler = () => {
    dispatch(updateStatus(product.id))
  }
  const handleSelectedTask = () => {
    dispatch(taskModalOpen(true))
    dispatch(setSelectedTask(product))
    console.log("Product: ", product)
  }


  const renderDate = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        display: 'flex',
        alignItems: 'center',
        color: product.status === 'completed' ? 'text.disabled' : 'error.main',
      }}
    >
      {fDate(product.dueDate)}
    </Typography>
  );

  return (
    <Card onClick={handleSelectedTask}>
      <Stack
        spacing={2}
        sx={{
          zIndex: -10,
          p: 2,
          backgroundColor: product.status === 'completed' ? 'success.lighter' : 'primary.light',
        }}
      >
        <Link color="inherit" underline="hover" variant="subtitle2" sx={{ paddingTop: 3 }}>
          {product.title}
        </Link>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {product.description}
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="caption">Due Date:</Typography>

          {renderDate}
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {product.status !== 'completed' ? (
            <Button onClick={(e) => {
              e.stopPropagation();
              updatedStatusHandler();
            }} direction="row" component="button" variant="contained" color="success">
              <Iconify width={16} icon="noto-v1:check-mark" sx={{ mr: 0.5 }} />
              <Typography variant="caption">Mark as Complete</Typography>
            </Button>
          ) : (
            <ReactionButtons post={product} />
          )}

          <Button
            component="button"
            type="button"
            sx={{
              color: 'error.main',
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleClickOpen();
            }}
          >
            <Iconify width={16} icon="mingcute:delete-2-fill" sx={{ mr: 0.5 }} />
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              Are you sure you want to delete this item?
            </DialogContent>
            <DialogActions>
              <Button onClick={(e) => {
                e.stopPropagation()
                handleClose()
              }} color="primary">
                Cancel
              </Button>
              <Button onClick={(e) => {
                e.stopPropagation()
                handleConfirmDelete()
              }} color="error" autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Stack>

        {product.status === 'completed' && (
          <Label
            sx={{
              position: 'absolute',
              left: '50%',
              top: 0,
              transform: 'translateX(-50%)',
            }}
            color="info"
          >
            {product.status}
          </Label>
        )}
      </Stack>

    </Card>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
};
