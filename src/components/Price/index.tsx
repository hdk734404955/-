import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const index = ({ count }: { count: Array<number> }) => {
  const showEcharts = () => {
    var chartDom = document.getElementById('price') as HTMLElement;
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      title: {
        text: '销售统计',
      },
      xAxis: {
        type: 'category',
        data: ['2023-1', '2023-2', '2023-3', '2023-4', '2023-5'],
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} 万元',
        },
      },

      series: [
        {
          data: count,
          type: 'line',
          label: {
            show: true,
          },
        },
      ],
    };

    option && myChart.setOption(option);
  };
  useEffect(() => {
    if (count.length > 0) {
      showEcharts();
    }
  }, [count]);
  return (
    <div
      id="price"
      style={{
        width: '600px',
        height: '300px',
      }}
    ></div>
  );
};

export default index;
