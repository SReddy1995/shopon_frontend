import React from 'react';
import ReactFrappeChart from 'react-frappe-charts';

const CartAbandonedRate = ({ categoryData }: any) => {
  const { category, payment_completed, drop_off, checked_out } = categoryData;

  return (
    <>
      <h6 >{category}</h6>
      <p className='mb-0'>
        Addition to cart - {categoryData.added_to_cart}
      </p>
      <ReactFrappeChart
        type="pie"
        data={{
            labels: ['Payment Completed', 'Drop Off', 'Checked Out'],
            datasets: [
              {
                name: category,
                chartType: 'pie',
                values: [payment_completed, drop_off, checked_out],
              },
            ],
          }}
        height={250}
        colors={[ '#32CD32', '#FF6347', '#40B6B4']}
      />
    </>
  );
};

export default CartAbandonedRate;