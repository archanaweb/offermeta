import React from "react";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const options = {
  chart: {
    backgroundColor: '#f6faff',
    type: 'column',
    marginBottom: 100,
    border: '1px solid #E8EAEE',
    borderRadius: '20px'
},
    title: {
      text: 'PERFORMANCE REPORT'
    },
    xAxis: [{
      categories: ['2023-09-06', '2023-09-07', '2023-09-09', '2023-09-11', '2023-09-12'],
      crosshair: true
  }],
  yAxis: [{ // Primary yAxis
      labels: {
          format: '{value}',
          style: {
              color: Highcharts.getOptions().colors[1]
          }
      },
      title: {
          text: 'Conversions and Payouts',
          style: {
              color: Highcharts.getOptions().colors[1]
          }
      }
  }, { // Secondary yAxis
      title: {
          text: 'Clicks and Impression',
          style: {
              color: Highcharts.getOptions().colors[0]
          }
      },
      labels: {
          format: '{value}',
          style: {
              color: Highcharts.getOptions().colors[0]
          }
      },
      opposite: true
  }],
  tooltip: {
      shared: true
  },
  legend: {
      align: 'center',
      x: 10,
      itemWidth: 150,
      verticalAlign: 'bottom',
      y: 0,
      floating: true,
      backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || // theme
          '#fff'
  },
  series: [{
      name: 'Clicks',
      type: 'column',
      yAxis: 1,
      data: [7,8,9,0,0],
      tooltip: {
          valueSuffix: ' '
      }

  }, {
      name: 'Revenue',
      type: 'spline',
      data: [12, 10, 6, 0,0],
      tooltip: {
          valueSuffix: ''
      }
  },
  {
    name: 'Conversions',
    type: 'spline',
    data: [8, 3, 0, 0,0],
    tooltip: {
        valueSuffix: ''
    }
},
{
  name: 'Impression',
  type: 'spline',
  data: [3, 1, 0, 0,0],
  tooltip: {
      valueSuffix: ''
  }
},
{
  name: 'Payout',
  type: 'spline',
  data: [6, 4, 2, 0,0],
  tooltip: {
      valueSuffix: ''
  }
},
{
  name: 'Profit',
  type: 'spline',
  data: [2, 0, 0, 0,0],
  tooltip: {
      valueSuffix: ''
  }
}]
  }

const TotalChart =()=> {
    return (
        <>
         <div style={{ border: '1.4px solid #E8EAEE', borderRadius: '20px' }}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
            </div>
        </>
    )
}

export default TotalChart