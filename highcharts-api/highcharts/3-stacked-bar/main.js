const data = Array.from(
  { length: 16 },
  () => Math.round(Math.random() * 15) * 5
);

Highcharts.chart("container", {
  chart: {
    type: "bar",
  },
  title: {
    text: "",
  },
  xAxis: {
    categories: ["Data", "Emails", "Duplicates", "Support"],
    gridLineWidth: 1,
    lineWidth: 0,
  },
  yAxis: {
    title: {
      text: "Amount",
    },
    stackLabels: {
      enabled: true,
      formatter: function () {
        return `${this.total} K`;
      },
    },
    gridLineWidth: 0,
  },
  legend: {
    enabled: false,
  },
  plotOptions: {
    series: {
      stacking: "normal",
    },
  },
  series: [
    {
      data: data.slice(0, 4),
    },
    {
      data: data.slice(4, 8),
    },
    {
      data: data.slice(8, 12),
    },
    {
      data: data.slice(12, 16),
    },
  ],
});
