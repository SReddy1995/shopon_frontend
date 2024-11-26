import React, { useState } from 'react';
import GenericChart from './GenericChart';

const BuyerFeeChart = ({ data, labels, type }: any) => {
  const [customRange, setCustomRange] = useState({ start: null, end: null });
  const categories = ['totalOrders', 'avgOrderValue', 'totalSales', 'buyerFinderFees'];

  return (
    <GenericChart
      data={data}
      labels={labels}
      type={type}
      title="Buyer Finder Fee"
      categories={categories}
      customRange={customRange}
      setCustomRange={setCustomRange}
      showComparativeFilters = {false}
    />
  );
};

export default BuyerFeeChart;