import React from 'react';
import { Typography } from '@mui/material';
import { useGetTotalClientsQuery } from 'services';
import { DashboardTile } from './DashboardTile';

export const TotalClients: React.FC = () => {
  const { data, isFetching, isError } = useGetTotalClientsQuery();
  return (
    <DashboardTile
      title="Total Clients"
      minWidth="10%"
      isLoading={isFetching}
      isError={isError}
    >
      <Typography variant="h2" sx={{ color: '#5d71e2' }}>
        {data?.totalClients}
      </Typography>
    </DashboardTile>
  );
};
