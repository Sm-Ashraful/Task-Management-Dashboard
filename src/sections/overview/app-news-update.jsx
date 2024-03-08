import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import TabList from '@mui/lab/TabList';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

import { fToNow } from 'src/utils/format-time';

import FormModal from 'src/layouts/dashboard/common/form-popup';
// import FilterTab from 'src/components/FilterTabs';

import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';

import ShopProductCard from '../products/product-card';

// ----------------------------------------------------------------------

export default function AppNewsUpdate({ title, lists }) {
  const [value, setValue] = React.useState('all');
  const [open, setOpen] = React.useState(false);
  const handleOpenForm = () => setOpen(true);
  const handleCloseForm = () => setOpen(false);

  const lgUp = useResponsive('up', 'lg');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filteredLists = () => {
    switch (value) {
      case 'active':
        return lists.filter((task) => task.status === 'active');
      case 'complete':
        return lists.filter((task) => task.status === 'completed');
      default:
        return lists;
    }
  };
  return (
    <Card>
      <CardHeader title={title} />
      <Box sx={{ px: 3.5, pt: 3 }}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              display: 'flex',
              flexDirection: `${lgUp ? "row" : "column"}`,
              justifyContent: 'space-between',
            }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{ flexGrow: 1, flexShrink: 1, flexBasis: "0%", order: `${!lgUp ? 1 : 0}` }}>
              <Tab label="All Task" value="all" />
              <Tab label="Active Task" value="active" />
              <Tab label="Complete Task" value="complete" />
            </TabList>
            <Box>
              <Button onClick={handleOpenForm} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
                Add Task
              </Button>
            </Box>


            <FormModal open={open} handleClose={handleCloseForm} />
          </Box>
          <TabPanel value="all">
            <Stack
              sx={{
                gap: 2,
                display: 'grid',
                gridTemplateColumns: `${lgUp ? 'repeat(3, 1fr)' : '1fr'}`,
              }}
            >
              {filteredLists()?.length > 0 ? filteredLists().map((list) => (
                <ShopProductCard key={list.title} product={list} />
              )) : <Typography>Task List is Empty</Typography>}
            </Stack>
          </TabPanel>
          <TabPanel value="active">
            <Stack
              sx={{
                gap: 2,
                display: 'grid',
                gridTemplateColumns: `${lgUp ? 'repeat(3, 1fr)' : '1fr'}`,
              }}
            >
              {
                filteredLists()?.length > 0 ? filteredLists().map((list) => (
                  <ShopProductCard key={list.title} product={list} />
                )) : <Typography>There is no item left in active list</Typography>
              }
            </Stack>
          </TabPanel>
          <TabPanel value="complete">
            <Stack
              sx={{
                gap: 2,
                display: 'grid',
                gridTemplateColumns: `${lgUp ? 'repeat(3, 1fr)' : '1fr'}`,
              }}
            >
              {filteredLists()?.length > 0 ? filteredLists().map((list) => (
                <ShopProductCard key={list.titles} product={list} />
              )) : <Typography>Complete item is empty</Typography>}
            </Stack>
          </TabPanel>
        </TabContext>
      </Box >
    </Card >
  );
}

AppNewsUpdate.propTypes = {
  title: PropTypes.string,
  lists: PropTypes.array.isRequired,
};

// ----------------------------------------------------------------------

function NewsItem({ news }) {
  const { image, title, description, postedAt } = news;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={title}
        src={image}
        sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
      />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
          {title}
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {description}
        </Typography>
      </Box>

      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {fToNow(postedAt)}
      </Typography>
    </Stack>
  );
}

NewsItem.propTypes = {
  news: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    postedAt: PropTypes.instanceOf(Date),
  }),
};
