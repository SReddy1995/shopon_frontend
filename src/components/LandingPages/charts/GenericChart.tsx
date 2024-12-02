import { useState, useEffect } from 'react';
import ReactFrappeChart from 'react-frappe-charts';
import { filterData, summarizeByMonth, summarizeByWeek } from '../../../utils/functions/ChartUtils';

const GenericChart = ({ data, type, title, categories, customRange, setCustomRange, showComparativeFilters }: any) => {
  const [chartData, setChartData] = useState(data);
  const [timeRange, setTimeRange] = useState('date');

  useEffect(() => {
    if (timeRange !== 'custom' || (customRange.start && customRange.end)) {
      setChartData(filterData(data, timeRange, customRange, (d: any, f: any) => summarizeByMonth(d, f, categories), (d: any, f: any) => summarizeByWeek(d, f, categories)));
    }
  }, [data, timeRange, customRange, categories]);

  const handleFilterChange = (e: any) => {
    const range = e.target.value;
    setTimeRange(range);
  };

  const handleCustomRangeChange = (startDate: any, endDate: any) => {
    setCustomRange({ start: startDate, end: endDate });
  };

  return (
    <>
      <div className="row">
        <div className="col-12 chart-title-with-filter-container">
        <div>
          <h6 className='pl-3'>{title}</h6>
        </div>
        <div >
          <div className="charts-filter-container px-2 text-right">
          {timeRange === 'custom' && (
              <>
                <div className='filter-element'>
                <label className='charts-filter-label'>Start Date: </label>
                <input
                  type="date"
                  onChange={(e) => handleCustomRangeChange(e.target.value, customRange.end)}
                />
                <label className='charts-filter-label'>End Date: </label>
                <input
                  type="date"
                  onChange={(e) => handleCustomRangeChange(customRange.start, e.target.value)}
                />
                </div>
              </>
            )}
            <div className='filter-element'>
            <label htmlFor="exampleFormControlInput1" className='charts-filter-label'>Period:</label>
            <select value={timeRange} onChange={handleFilterChange} className='custom-select custom-select-charts-filter period-selector-filter'>
              <option value="date">By Date</option>
              <option value="weekWithoutRange">By Week</option>
              <option value="weekWithRange">By Week-range</option>
              <option value="allmonth">By Months</option>
              <option value="monthwisetext">By Months text</option>
              {
                showComparativeFilters && (
                  <>
                    <option value="todayVsYesterday">Today vs Yesterday</option>
                    <option value="thisWeekVsLastWeek">This Week vs Last Week</option>
                    <option value="thisMonthVsLastMonth">This Month vs Last Month</option>
                  </>
                )
              }
              <option value="custom">Custom Date Range</option>
            </select>
            </div>
           
          </div>
        </div>
        </div>

        <div className="col-12">
          <div className="dropdown-divider"></div>
        </div>
        <div className="col-12">
          <ReactFrappeChart
            title={title}
            data={{
              labels: chartData.map((item: any) => item.date),
              datasets: categories.map((category: any) => ({
                name: `${category.charAt(0).toUpperCase() + category.slice(1)}`,
                chartType: type,
                values: chartData.map((entry: any) => entry[category] || 0),
              })),
            }}
            type={type}
            height={250}
            colors={['#1E90FF', '#32CD32', '#FF6347', '#FFD700']}
          />
        </div>
      </div>
    </>
  );
};

export default GenericChart;