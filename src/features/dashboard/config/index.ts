import { currencyFormatter } from 'utils';

export const rejectedTradesColDef = [
  { field: 'ticketId' },
  {
    field: 'cptyName',
    headerName: 'Counterparty',
    sortable: true,
    sort: 'asc',
  },
  { field: 'isin', sortable: true, headerName: 'Bond Id' },
  { field: 'ticketStatus', headerName: 'Ticket status' },
  { field: 'error', flex: 2 },
];

export const topTradesColDef = [
  { field: 'tradeId', flex: 2 },
  {
    field: 'value',
    headerName: 'Amounts',
    filter: 'agNumberColumnFilter',
    valueFormatter: (params: any) => currencyFormatter.format(params.value),
    flex: 1,
    type: 'leftAligned',
  },
];
