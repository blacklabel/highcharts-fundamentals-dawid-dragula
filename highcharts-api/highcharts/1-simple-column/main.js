const data = Array.from({ length: 9 }, () => Math.round(Math.random() * 10));
const maxn = Math.max(...data);

Highcharts.chart("container", {
  chart: {
    type: "column",
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
    ],
  },
  series: [
    {
      name: "Tokyo",
      data: data.slice(0, 3),
    },
    {
      name: "New York",
      data: data.slice(3, 6),
    },
    {
      name: "London",
      data: data.slice(6, 9),
    },
  ],
});
