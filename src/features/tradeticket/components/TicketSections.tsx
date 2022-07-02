import React from 'react';
import { Stack } from '@mui/material';
import { RepoFormField } from 'components';
import { useAppSelector } from 'store/hooks';
import { CurrencyResponse, CptyResponse, BondListResponse } from 'types';
import { BondList } from './Bond';
import { Counterparty } from './Counterparty';
import { OpenOrFixed } from './OpenOrFixed';
import { Quantity } from './Quantity';
import { RepoLeg } from './RepoLeg';
import { RepoTypeDropDown } from './RepoTypeDropDown';
import { Settlement } from './Settlement';
import { TicketActionBar } from './TicketActionBar';

interface Props {
  ticketId: string | undefined;
  ccyList: CurrencyResponse[] | undefined;
  cptyList: CptyResponse[] | undefined;
  bondList: BondListResponse[] | undefined;
}

export const TicketSections: React.FC<Props> = ({
  ticketId,
  bondList,
  cptyList,
  ccyList,
}) => {
  const { trader } = useAppSelector((state) => state.ticketDefaultState);
  return (
    <Stack direction="column" spacing={2}>
      <RepoFormField
        disabled
        name="ticketId"
        label="Ticket Id"
        type="text"
        value={ticketId}
      />
      <RepoFormField
        disabled
        name="trader-id"
        label="Trader Id"
        type="text"
        value={trader}
      />
      <RepoTypeDropDown />
      <OpenOrFixed />
      <BondList bondListData={bondList} />
      <Counterparty cptyList={cptyList} />
      <Settlement currencyList={ccyList} />
      <Quantity />
      <RepoLeg />
      <TicketActionBar />
    </Stack>
  );
};
