const data = Array.from({ length: 9 }, () => Math.round(Math.random() * 10));
const maxn = Math.max(...data);

Highcharts.chart("container", {
  chart: {
    polar: true,
  },
  title: {
    text: "",
  },
  xAxis: {
    categories: ["Jan", "Feb", "Mar"],
  },
  yAxis: {
    max: maxn * 2,
    plotLines: [
      {
        dashStyle: "dash",
        width: 3,
        color: "#2a0",
        value: maxn * 1.5,
      },
      {
        width: 3,
        color: "blue",
        value: Math.random() * maxn * 2,
      },
      {
        width: 3,
        color: "red",
        value: Math.random() * maxn * 2,
      },
      {
        width: 3,
        color: "yellow",
        value: Math.random() * maxn * 2,
      },
    ],
  },
  series: [
    {
      type: "column",
      name: "Tokyo",
      data: data.slice(0, 3),
    },
    {
      type: "column",
      name: "New York",
      data: data.slice(3, 6),
    },
    {
      type: "column",
      name: "London",
      data: data.slice(6, 9),
    },
  ],
  plotOptions: {
    series: {
      dataLabels: {
        enabled: true,
        formatter: function () {
          return this.y == maxn ? "max" : "";
        },
      },
    },
  },
});
