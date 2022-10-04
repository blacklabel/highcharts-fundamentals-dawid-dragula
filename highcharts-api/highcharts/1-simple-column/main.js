const data = Array.from({ length: 9 }, () => Math.round(Math.random() * 10));

Highcharts.chart("container", {
  chart: {
    type: "column",
    events: {
      load: function () {
        const maxn = this.yAxis[0].dataMax;

        this.update({
          yAxis: {
            max: maxn * 2,
            tickInterval: (maxn * 2) / 5,
            plotLines: [
              {
                dashStyle: "dash",
                width: 3,
                color: "#2a0",
                value: maxn * 1.5,
              },
            ],
          },
        });
      },
    },
  },
  title: {
    text: "",
  },
  xAxis: {
    categories: ["Jan", "Feb", "Mar"],
  },
  yAxis: {
    title: "",
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
  plotOptions: {
    series: {
      dataLabels: {
        enabled: true,
        formatter: function () {
          return this.series.yAxis.dataMax == this.y ? "max" : "";
        },
      },
    },
  },
});
