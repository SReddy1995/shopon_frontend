import moment from 'moment';

export const filterData = (data: any, timeRange: any, customRange: any, summarizeByMonth: any, summarizeByWeek: any) => {
  let filteredData = [];
  switch (timeRange) {
    case 'week':
      filteredData = data.filter((item: any) =>
        moment(item.date).isSame(moment(), 'week')
      );
      break;
    case 'month':
      filteredData = data.filter((item: any) =>
        moment(item.date).isSame(moment(), 'month')
      );
      break;
    case 'allmonth':
      filteredData = summarizeByMonth(data, 'YYYY-MM');
      break;
    case 'monthwisetext':
      filteredData = summarizeByMonth(data, 'YYYY-MMM');
      break;
    case 'weekWithoutRange':
      filteredData = summarizeByWeek(data, null);
      break;
    case 'weekWithRange':
      filteredData = summarizeByWeek(data, 'YYYY-MM-DD');
      break;
      case 'todayVsYesterday':
        filteredData = getCumulativeData(data, 'day', 1);
        break;
      case 'thisWeekVsLastWeek':
        filteredData = getCumulativeData(data, 'week', 1);
        break;
      case 'thisMonthVsLastMonth':
        filteredData = getCumulativeData(data, 'month', 1);
        break;
      case 'thisYearVsLastYear':
        filteredData = getCumulativeData(data, 'year', 1);
        break;
    case 'custom':
      if (customRange.start && customRange.end) {
        filteredData = data.filter((item: any) =>
          moment(item.date).isBetween(customRange.start, customRange.end, null, '[]')
        );
      }
      break;
    case 'date':
    default:
      filteredData = data;
  }
  return filteredData;
};

const getCumulativeData = (data: any, unit: any, amount: number) => {
  const currentPeriod = moment().startOf(unit);
  const previousPeriod = moment().subtract(amount, unit).startOf(unit);

  const currentData = data.filter((item: any) =>
    moment(item.date).isSameOrAfter(currentPeriod)
  );
  const previousData = data.filter((item: any) =>
    moment(item.date).isSameOrAfter(previousPeriod) && moment(item.date).isBefore(currentPeriod)
  );

  const currentSum = getCumulativeSum(currentData);
  const previousSum = getCumulativeSum(previousData);

  return [
    { date: `Previous ${unit.charAt(0).toUpperCase() + unit.slice(1)} (${previousPeriod.format('YYYY-MM-DD')})`, ...previousSum },
    { date: `Current ${unit.charAt(0).toUpperCase() + unit.slice(1)} (${currentPeriod.format('YYYY-MM-DD')})`, ...currentSum }
  ];
};

const getCumulativeSum = (data: any) => {
  return data.reduce((acc: any, item: any) => {
    Object.keys(item).forEach(key => {
      if (key !== 'date') {
        acc[key] = (acc[key] || 0) + item[key];
      }
    });
    return acc;
  }, {});
};


export const summarizeByMonth = (data: any, format: any, keys: string[]) => {
  const groupedData = groupDataByMonth(data, format, keys);
  return convertGroupedDataToArray(groupedData, keys);
};

export const groupDataByMonth = (data: any, format: any, keys: string[]) => {
  const groupedData: any = {};
  data.forEach((entry: any) => {
    const month = moment(entry.date).format(format);
    if (!groupedData[month]) {
      groupedData[month] = keys.reduce((acc: any, key: string) => {
        acc[key] = 0;
        return acc;
      }, {});
    }
    keys.forEach((key: string) => {
      groupedData[month][key] += entry[key]? entry[key]: 0;
    });
  });
  return groupedData;
};

export const convertGroupedDataToArray = (groupedData: any, keys: string[]) => {
  return Object.keys(groupedData).map(key => {
    const result: any = { date: key };
    keys.forEach(k => {
      result[k] = groupedData[key][k];
    });
    return result;
  });
};

export const summarizeByWeek = (data: any, format: any, keys: string[]) => {
  const groupedData = groupDataByWeek(data, format, keys);
  return convertGroupedDataToArray(groupedData, keys);
};

export const groupDataByWeek = (data: any, format: any, keys: string[]) => {
  const groupedData: any = {};
  data.forEach((entry: any) => {
    const week = getWeekLabel(entry.date, format);
    if (!groupedData[week]) {
      groupedData[week] = keys.reduce((acc: any, key: string) => {
        acc[key] = 0;
        return acc;
      }, {});
    }
    keys.forEach((key: string) => {
        console.log(entry[key])
      groupedData[week][key] += entry[key]? entry[key]: 0;
    });
  });
  console.log(groupedData)
  return groupedData;
};

export const getWeekLabel = (date: any, format: any) => {
  if (format) {
    const weekStart = moment(date).startOf('week');
    const weekEnd = moment(date).endOf('week');
    return weekStart.format(format) + ' to ' + weekEnd.format(format);
  } else {
    return moment(date).year() + '-W' + moment(date).week();
  }
}; 