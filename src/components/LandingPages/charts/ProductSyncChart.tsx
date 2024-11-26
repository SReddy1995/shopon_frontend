import React, { useState } from 'react';
import GenericChart from './GenericChart';

const ProductSyncChart = ({ data, labels, type }: any) => {
  const [customRange, setCustomRange] = useState({ start: null, end: null });
  const categories = ['grocery', 'fashion', 'health'];

  return (
    <GenericChart
      data={data}
      labels={labels}
      type={type}
      title="Product Sync"
      categories={categories}
      customRange={customRange}
      setCustomRange={setCustomRange}
      showComparativeFilters = {false}
    />
  );
};

export default ProductSyncChart;