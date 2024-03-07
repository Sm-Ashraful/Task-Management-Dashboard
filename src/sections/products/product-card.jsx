import PropTypes from 'prop-types';
import { faker } from '@faker-js/faker';

import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import ReactionButtons from 'src/components/ReactionButton';

// ----------------------------------------------------------------------

export default function ShopProductCard({ product }) {
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
      {fDate(faker.date.past())}
    </Typography>
  );

  return (
    <Card>
      <Stack
        spacing={2}
        sx={{
          p: 3,
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
            <Button direction="row" component="button" variant="contained" color="success">
              <Iconify width={16} icon="noto-v1:check-mark" sx={{ mr: 0.5 }} />
              <Typography variant="caption">Mark as Complete</Typography>
            </Button>
          ) : (
            <ReactionButtons post={product} />
          )}

          <Button
            component="button"
            sx={{
              color: 'error.main',
            }}
          >
            <Iconify width={16} icon="mingcute:delete-2-fill" sx={{ mr: 0.5 }} />
          </Button>
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
