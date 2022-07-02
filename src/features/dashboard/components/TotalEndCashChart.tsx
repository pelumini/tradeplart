import React, { useEffect, useRef, useState } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useGetCashByMonthChartDataQuery } from 'services';
import { CashByMonthApiResponse } from 'types';
import { useHighChartOptions } from '../config/useHighChartOptions';
import { DashboardTile } from './DashboardTile';

export const TotalEndCashChart: React.FC = () => {
  const { data, isFetching, isError, isSuccess } =
    useGetCashByMonthChartDataQuery();
  const highChartOptions = useHighChartOptions();
  const [enhancedChartOptions, setEnhancedChartOptions] =
    useState<Highcharts.Options>({ ...highChartOptions });
  const chartRef = useRef<HighchartsReact.RefObject>(null);

  useEffect(() => {
    if (!isFetching && !isError && isSuccess) {
      setEnhancedChartOptions({
        ...enhancedChartOptions,
        series: data as CashByMonthApiResponse[],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isError, isFetching, isSuccess]);

  return (
    <DashboardTile
      title=""
      minWidth="90%"
      isLoading={isFetching}
      isError={isError}
    >
      <HighchartsReact
        highcharts={Highcharts}
        options={enhancedChartOptions}
        ref={chartRef}
      />
    </DashboardTile>
  );
};
