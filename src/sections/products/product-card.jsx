import PropTypes from 'prop-types';
import { faker } from '@faker-js/faker';

import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';

import Label from 'src/components/label';


// ----------------------------------------------------------------------

export default function ShopProductCard({ product }) {

  const renderDate = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        display: "flex",
        alignItems: "center",
        color: 'text.disabled',

      }}
    >
      {fDate(faker.date.past(),)}
    </Typography>
  );

  return (
    <Card>
      <Stack spacing={2} sx={{ p: 3, border: 2, borderRadius: 2, borderColor: product.status === 'completed' ? "success.main" : "primary.main" }}>
        <Link color="inherit" underline="hover" variant="subtitle2" sx={{ paddingTop: 3 }}>
          {product.title}
        </Link>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {product.description}
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant='caption'>
            Due Date:
          </Typography>

          {renderDate}
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {product.status !== 'completed' && (
            <Button component="button" variant='outlined'>
              Complete
            </Button>
          )}
          <Button
            component="button"
            variant={product.status === 'completed' ? 'contained' : 'outlined'}
            sx={{
              color: 'error.main',
              backgroundColor: product.status === 'completed' ? 'warning.lighter' : "",
              width: product.status === 'completed' ? '100%' : 'auto',
            }}
          >
            Delete
          </Button>
        </Stack>

        {
          product.status === 'completed' && <Label sx={{
            position: "absolute", left: "50%", top: 0,
            transform: "translateX(-50%)",
          }} color='info'>{product.status}</Label>
        }
      </Stack>
    </Card>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
};
