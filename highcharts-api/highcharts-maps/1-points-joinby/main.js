Highcharts.mapChart('container', {
    chart: {
        map: Highcharts.maps["custom/world"],
    },
    series: [{
        data: [
            ['POL', 100],
            ['USA', 90],
            ['PER', 50],
            ['TZA', 40],
            ['AUS', 1]
        ],
        joinBy: ['iso-a3'],
        keys: ['iso-a3']
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