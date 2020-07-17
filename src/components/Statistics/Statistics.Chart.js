import CanvasJS from './canvasjs.min';

function initChart(chartData) {
  const chart = new CanvasJS.Chart('statistics-chart', {
    animationEnabled: true,
    theme: 'light1',
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
      verticalAlign: 'top',
      horizontalAlign: 'right',
      dockInsidePlotArea: true,
    },
    data: chartData,
  });
  chart.render();
}

export default initChart;
