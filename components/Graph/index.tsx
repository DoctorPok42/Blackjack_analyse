import React, { useState } from 'react';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import styles from './style.module.scss';

interface GraphProps {
  title?: string;
  value?: string;
  data: any;
  size?: 'small' | 'medium' | 'large';
}

const Graph = ({
  title,
  value,
  size = 'medium',
  data,
}: GraphProps) => {
  const [dataSample] = useState({
    options: {
      chart: {
        type: "bar",
        style: {
          color: "#4A4A4A",
          border: "1px solid #000",
          borderRadius: "5px",
        },
      },
      colors: "#FF0000",
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "14px",
          fontFamily: "Poppins",
        },
      },
      stroke: {
        show: false,
        width: 3,
      },
      legend: {
        show: true,
        fontSize: "18px",
        fontWeight: 600,
        position: "right",
        offsetX: -40,
        offsetY: 25,
        itemMargin: {
          vertical: 7,
        },
        labels: {
          useSeriesColors: true,
        },
      },
      labels: data.map((item: any) => item.label),
    },
    series: data.map((item: any) => item.value),
  }) as any;

  if (!data) return null;

  return (
    <div className={styles.Graph_container} style={{
      width: size === 'small' ? '24%' : size === 'medium' ? '49%' : '100%',
    }}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <h2 className={styles.value}>{value}</h2>
      </div>


      <Chart
          options={dataSample.options}
          series={dataSample.series}
          type="bar"
          width="100%"
          height={size === 'small' ? 200 : size === 'medium' ? 250 : 300}
        />
    </div>
  );
};

export default Graph;
