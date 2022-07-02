import React from 'react';
import { DataGrid } from '../../../components';
import { useGetRejectedTradesQuery } from '../../../services';
import { rejectedTradesColDef } from '../config';
import { DashboardTile } from './DashboardTile';

export const RejectedTrades: React.FC = () => {
  const { data, isFetching, isError } = useGetRejectedTradesQuery();
  return (
    <DashboardTile
      title="Rejected Trades"
      minWidth="69%"
      isLoading={isFetching}
      isError={isError}
    >
      <DataGrid
        colDef={rejectedTradesColDef}
        gridData={data || []}
        size={{ width: '100%', height: 400 }}
      />
    </DashboardTile>
  );
};
