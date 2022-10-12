Highcharts.mapChart('container', {
    chart: {
        map: Highcharts.maps["custom/world"],
    },
    series: [{
        data: [
            ['pl', 100],
            ['us', 90],
            ['pe', 50],
            ['tz', 40],
            ['au', 1]
        ]
    }, {
        type: 'mapbubble',
        data: [
            ['nz', 3],
            ['tz', 2],
            ['no', 1],
            ['ca', 4]
        ]
    }]
});