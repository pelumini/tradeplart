import React from 'react';
import { DataGrid } from 'components';
import { useGetTopTradesQuery } from 'services';
import { topTradesColDef } from '../config';
import { DashboardTile } from './DashboardTile';

export const TopTrades: React.FC = () => {
  const { data, isFetching, isError } = useGetTopTradesQuery();
  return (
    <DashboardTile
      title="Total Trades"
      minWidth="30%"
      isLoading={isFetching}
      isError={isError}
    >
      <DataGrid
        gridData={data?.topTrades || []}
        colDef={topTradesColDef}
        size={{ width: '100%', height: 400 }}
      />
    </DashboardTile>
  );
};
