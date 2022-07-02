import React, { useEffect, useState } from 'react';
import {
  useGetBondListQuery,
  useGetCptysQuery,
  useGetCurrencyListQuery,
  useGetNewTicketIdQuery,
} from '../../../services';
import {
  BondListResponse,
  CptyResponse,
  CurrencyResponse,
  NewTicketIdResponse,
} from '../../../types';

type ReturnProps = {
  loading: boolean;
  error: boolean;
  ticketId: NewTicketIdResponse | undefined;
  ccyList: CurrencyResponse[] | undefined;
  cptyList: CptyResponse[] | undefined;
  bondList: BondListResponse[] | undefined;
};

export const useTicketApis = (): ReturnProps => {
  const {
    data: ticketId,
    isError: ticketIdError,
    isSuccess: isTicketIdSuccesss,
  } = useGetNewTicketIdQuery();
  const {
    data: bondList,
    isError: isBondListError,
    isSuccess: isBondListSuccess,
  } = useGetBondListQuery();
  const {
    data: cptyList,
    isError: isCptyError,
    isSuccess: isCptySuccess,
  } = useGetCptysQuery();
  const {
    data: ccyList,
    isError: isCcyError,
    isSuccess: isCcySuccess,
  } = useGetCurrencyListQuery();

  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<boolean>(false);

  useEffect(() => {
    if (
      isTicketIdSuccesss &&
      isBondListSuccess &&
      isCptySuccess &&
      isCcySuccess
    ) {
      setLoading(false);
    }
  }, [isBondListSuccess, isCcySuccess, isCptySuccess, isTicketIdSuccesss]);

  useEffect(() => {
    if (ticketIdError || isBondListError || isCptyError || isCcyError) {
      setLoading(false);
      setErr(true);
    }
  }, [isBondListError, isCcyError, isCptyError, ticketIdError]);

  return { loading, error: err, ticketId, ccyList, cptyList, bondList };
};
