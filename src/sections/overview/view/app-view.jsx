import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { tasks } from 'src/_mock/task';

import AppNewsUpdate from '../app-news-update';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';

// ----------------------------------------------------------------------

export default function AppView() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Welcome To Task Management Dashboard 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="All Task"
            total={10}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/allTask.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Completed Task"
            total={5}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/completed.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Active Task"
            total={8}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/activetask.png" />}
          />
        </Grid>
        <Grid xs={12}>
          <AppNewsUpdate title="Task List" lists={tasks} />
        </Grid>

        <Grid xs={12}>
          <AppWebsiteVisits title="Website Visits" subheader="(+43%) than last year" />
        </Grid>
      </Grid>
    </Container>
  );
}
