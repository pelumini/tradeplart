import React from 'react';
import { Typography } from '@mui/material';
import { useGetTotalTradesQuery } from '../../../services';
import { DashboardTile } from './DashboardTile';

export const TotalTrades: React.FC = () => {
  const { data, isFetching, isError } = useGetTotalTradesQuery();
  return (
    <DashboardTile
      title="Total Trades"
      minWidth="10%"
      isLoading={isFetching}
      isError={isError}
    >
      <Typography variant="h2" sx={{ color: '#5d71e2' }}>
        {data?.totalTrades}
      </Typography>
    </DashboardTile>
  );
};
