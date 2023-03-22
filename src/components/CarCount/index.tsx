import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';

const index = ({ count }: any) => {
  const showEcharts = () => {
    let chartDom = document.getElementById('car') as HTMLElement;
    let myChart = echarts.init(chartDom);
    let option;

    option = {
      title: {
        text: '各品牌汽车数量',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: count,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
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
      id="car"
      style={{
        width: '600px',
        height: '300px',
      }}
    ></div>
  );
};

export default index;
