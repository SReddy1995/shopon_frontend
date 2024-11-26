import React, { useState } from 'react';
import GenericChart from './GenericChart';

const OrderStatusChart = ({ data, labels, type }: any) => {
  const [customRange, setCustomRange] = useState({ start: null, end: null });
  const categories = ['totalOrders', 'successfulOrders', 'canceledOrders', 'deliveredOrders'];

  return (
    <GenericChart
      data={data}
      labels={labels}
      type={type}
      title="Order Status"
      categories={categories}
      customRange={customRange}
      setCustomRange={setCustomRange}
      showComparativeFilters = {false}
    />
  );
};

export default OrderStatusChart;