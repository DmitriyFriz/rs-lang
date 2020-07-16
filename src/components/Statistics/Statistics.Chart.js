import CanvasJS from './canvasjs.min';

function initChart(chartData) {
  const chart = new CanvasJS.Chart('statistics-chart', {
    animationEnabled: true,
    theme: 'light2',
    axisX: {
      valueFormatString: 'DD MMM',
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
      },
    },
    axisY: {
      title: 'Words',
      crosshair: {
        enabled: true,
      },
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: 'pointer',
      verticalAlign: 'bottom',
      horizontalAlign: 'left',
      dockInsidePlotArea: true,
    },
    data: chartData,
  });
  chart.render();
}

export default initChart;
