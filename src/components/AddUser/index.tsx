import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';

const index = ({ count }: any) => {
  const showEcharts = () => {
    let chartDom = document.getElementById('add') as HTMLElement;
    let myChart = echarts.init(chartDom);
    myChart.setOption({
      title: {
        text: '用户注册情况',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['买家', '卖家'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2023-1', '2023-2', '2023-3', '2023-4', '2023-5'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '买家',
          type: 'line',
          stack: 'Total',
          data: count.buy,
          label: {
            show: true,
          },
        },
        {
          name: '卖家',
          type: 'line',
          stack: 'Total',
          data: count.sell,
          label: {
            show: true,
          },
        },
      ],
    });
  };

  useEffect(() => {
    if (count.buy.length > 0) {
      showEcharts();
    }
  }, [count]);
  return (
    <div
      id="add"
      style={{
        width: '600px',
        height: '300px',
      }}
    ></div>
  );
};

export default index;
