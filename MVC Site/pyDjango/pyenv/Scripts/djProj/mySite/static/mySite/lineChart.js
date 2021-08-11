Chart.defaults.color = '#ffffff';

const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];
  const data = {
    labels: labels,
    datasets: [{
      label: 'Endpoint Count',
      backgroundColor: '#2a9fd6',
      borderColor: '#2a9fd6',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  };

  const config = {
    type: 'line',
    data,
    options: {}
  };

  var myChart = new Chart(
    document.getElementById('lineChart'),
    config
  );