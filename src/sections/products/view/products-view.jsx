import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSelector } from 'react-redux';

import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// import { products } from 'src/_mock/products';
import { selectAllTasks } from 'src/store/slices/taskSlice';
import FormModal from 'src/layouts/dashboard/common/form-popup';

import Iconify from 'src/components/iconify';

import ProductCard from '../product-card';
import ProductSort from '../product-sort';


// ----------------------------------------------------------------------

export default function ProductsView() {
  const tasks = useSelector(selectAllTasks)
  const [open, setOpen] = React.useState(false);
  const handleOpenForm = () => setOpen(true);
  const handleCloseForm = () => setOpen(false);
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        All Tasks
      </Typography>
      <Button onClick={handleOpenForm} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
        Add Task
      </Button>
      <FormModal open={open} handleClose={handleCloseForm} />
      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>


          <ProductSort />
        </Stack>
      </Stack>

      <Grid container spacing={2}>
        {tasks?.map((product) => (
          <Grid key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
