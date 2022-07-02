/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react';
import { Button, Stack } from '@mui/material';
import { useHistory } from 'react-router';
import { BLOTTER } from 'routes';
import {
  useGetNewTicketIdQuery,
  useLazyCalculateEconomicsQuery,
  useLazyExecuteTradeQuery,
} from 'services';
import { purgeAction } from 'store/actions';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { updateEconomics } from 'store/reducers/economicsSlice';
import {
  usePayloadValidation,
  ValidationType,
} from '../hooks/usePayloadValidation';

export const TicketActionBar = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { validatePayload } = usePayloadValidation();
  const {
    ticketDefaultState,
    selectedBondDataState,
    settlementState,
    economicsState,
    counterPartyState,
  } = useAppSelector((state) => state);

  const { cleanPrice, haircut, startCash } = { ...economicsState };
  const { duration, transactionType, fixed } = { ...ticketDefaultState };
  const { quantity, repoRate, repoYearBasis, repoRateType } = {
    ...settlementState,
  };
  const { isin } = { ...selectedBondDataState };

  const { data: ticketId } = useGetNewTicketIdQuery();
  const [executeTradeTrigger, executeResult] = useLazyExecuteTradeQuery();
  const [calculateTradeTrigger, caclulateResult] =
    useLazyCalculateEconomicsQuery();

  const onCaclusate = useCallback(
    async (e: React.MouseEvent) => {
      const payload = {
        quantity,
        startCash,
        haircut,
        duration,
        cleanPrice,
        isin,
        repoRate,
        repoYearBasis,
        transactionType,
        fixed,
        repoRateType,
      };
      const validation = await validatePayload(
        payload,
        ValidationType.CalculationRequestPayload
      );
      if (validation.error) {
        console.log(validation.error);
      }
      if (validation.valid) calculateTradeTrigger(payload);
    },
    [
      calculateTradeTrigger,
      cleanPrice,
      duration,
      fixed,
      haircut,
      isin,
      quantity,
      repoRate,
      repoRateType,
      repoYearBasis,
      startCash,
      transactionType,
      validatePayload,
    ]
  );

  const onExecute = useCallback(
    async (e: React.MouseEvent) => {
      const payload = {
        ...economicsState,
        ...ticketDefaultState,
        ...settlementState,
        ...selectedBondDataState,
        fullname: counterPartyState.fullname,
        ticketId: ticketId?.newId,
      };
      const validation = await validatePayload(
        payload,
        ValidationType.ExecutionRequestPayload
      );
      if (validation.error) {
        // TODO: show a popup / modal for error Message. TASK for dear viewers
        console.log(validation.error);
      }
      if (validation.valid) executeTradeTrigger(payload);
    },
    [
      calculateTradeTrigger,
      counterPartyState.fullname,
      economicsState,
      selectedBondDataState,
      settlementState,
      ticketDefaultState,
      ticketId?.newId,
    ]
  );

  useEffect(() => {
    dispatch(updateEconomics({ ...caclulateResult.data }));
  }, [caclulateResult, dispatch]);

  useEffect(() => {
    console.log(executeResult.data);
    if (executeResult.data?.status === 'success') {
      setTimeout(() => {
        history.push(BLOTTER);
        dispatch(purgeAction());
        // TODO: show a popup / modal for trade confirmation. TASK for dear viewers
      }, 3000);
    }
  }, [executeResult, history]);

  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems="center"
      justifyContent="center"
    >
      <Button color="primary" variant="contained" onClick={onCaclusate}>
        Calculate
      </Button>
      <Button color="primary" variant="contained" onClick={onExecute}>
        Execute
      </Button>
    </Stack>
  );
};
