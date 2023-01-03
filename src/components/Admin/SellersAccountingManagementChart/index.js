import React, { useEffect, useRef, useState } from 'react';
import AutoCompleteInput from 'components/Common/AutoCompleteInput';
import { AdminResellersService, AdminStatisticsService } from 'services';
import { cui } from 'utils';
import ChartWrapper from 'components/Common/ChartWrapper';
import { Col, Row } from 'antd';

import './style.scss';

export default function SellersAccountingManagementChart(props) {
  const [summaryData, setSummaryData] = useState({});
  const [chartData, setChartData] = useState({
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    revenueData: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4,
      194.1, 95.6, 54.4],
    costData: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5,
      106.6, 92.3],
    ordersData: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3,
      51.2],
    profitData: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8,
      51.1],
  });
  const [resellersInput, setResellersInput] = useState({
    value: '',
    options: [],
  });
  let ref = useRef({});
  const [filters, setFilters] = useState({});

  const handleFilterChange = (value, name) => {
    const newFilters = {
      ...filters,
      ...(typeof value === 'object' ? value : { [name]: value })
    }
    setFilters(newFilters);
    getSellersAccountingData( newFilters);
  }


  const getResellersOptions = (params = {}) => {
    AdminResellersService.getResellers( cui.removeEmpty({ pageNum: 1, pageSize: 100, ...params }), response => {
      const newOptions = AdminResellersService.getResellersOptions(response.items, false);
      setResellersInput((prevState) => {
        return {
          ...prevState,
          options: newOptions,
        }
      });
    }, () => {})
  }

  const handleAutoCompleteInputChange = (value, name) => {
    setResellersInput({
      ...resellersInput,
      value: value,
    });

    if (ref.current.timeoutStoreChange) {
      clearTimeout(ref.current.timeoutStoreChange);
    }
    ref.current.timeoutStoreChange = setTimeout(() => {
      getResellersOptions({ keyword: value });
    }, 200);
  }

  const handleAutoCompleteInputSelect = (value, options, name) => {
    handleFilterChange(value, name);
  }

  const getSellersAccountingData = (params) => {
    AdminStatisticsService.getSellersAccounting( cui.removeEmpty(params), response => {
      const { revenueData, costData, ordersData, profitData } = response;
      setChartData({
        revenueData, costData, ordersData, profitData
      });
      setSummaryData({})
    }, error => {

    })
  }

  useEffect(() => {
    getResellersOptions( {});
    getSellersAccountingData( {});
  }, []);

  const options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Orders overview',
      align: 'left',
      margin: 30,
      style: {
        fontSize: 20,
        fontFamily: 'helvetica',
        fontWeight: 600,
        color: '#2C3E5D',
      }
    },
    xAxis: {
      categories: chartData.categories,
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        enabled: false,
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: 'Revenue',
      color: '#0065FF',
      data: chartData.revenueData,
    }, {
      name: 'Cost',
      color: '#8270DB',
      data: chartData.costData,
    }, {
      name: 'Order',
      color: '#D97008',
      data: chartData.ordersData,
    }, {
      name: 'Profit',
      color: '#22A06B',
      data: chartData.profitData,
    }]
  }

  return (
    <Row gutter={[0, 24]}>
      <Col span={24}>
        <div className='sellers-accounting__summary-box'>
          <div className='sellers-accounting__summary-item'>
            <AutoCompleteInput name="resellerId"
                               value={resellersInput.value}
                               onChange={handleAutoCompleteInputChange}
                               onSelect={handleAutoCompleteInputSelect}
                               placeholder={"All Resellers"}
                               options={resellersInput.options}
                               autoFilterOptions={false}
            />
          </div>
          <div className='sellers-accounting__summary-item'>
            Revenue:
            <span className='sellers-accounting__summary-value sellers-accounting__summary-value--first'>{summaryData.revenue || 0}</span>
          </div>
          <div className='sellers-accounting__summary-item'>
            Cost:
            <span className='sellers-accounting__summary-value sellers-accounting__summary-value--second'>{summaryData.cost || 0}</span>
          </div>
          <div className='sellers-accounting__summary-item'>
            Order:
            <span className='sellers-accounting__summary-value sellers-accounting__summary-value--third'>{summaryData.order || 0}</span>
          </div>
          <div className='sellers-accounting__summary-item'>
            Profit:
            <span className='sellers-accounting__summary-value sellers-accounting__summary-value--fourth'>{summaryData.profit || 0}</span>
          </div>
        </div>
      </Col>
      <Col span={24} className="sellers-accounting__chart">
        <ChartWrapper options={options} />
      </Col>
    </Row>
  );
}
