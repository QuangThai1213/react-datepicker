import moment from 'moment';
function chart_options(title, data) {
    return {
        title: {
            text: title
        },
        chart: {
            type: 'column'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            opposite: true,
            title: {
                text: 'VNĐ'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Net Revenue: <b>{point.y} đ</b>'
        },
        series: [{
            name: 'Net Revenue',
            data: data,
            dataLabels: {
                enabled: true,
                color: '#FFFFFF',
                align: 'center',
                y: 8, // 10 pixels down from the top
                style: {
                    fontSize: '8px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    }
}

const range = {
    "Today": [moment().toDate(), moment().toDate()],
    "Yesterday": [
        moment().subtract(1, 'days').toDate(),
        moment().subtract(1, 'days').toDate(),
    ],
    'Last 7 Days': [
        moment().subtract(6, 'days').toDate(),
        moment().toDate(),
    ],
    'Last 30 Days': [
        moment().subtract(29, 'days').toDate(),
        moment().toDate(),
    ],
    'This Month': [
        moment().startOf('month').toDate(),
        moment().endOf('month').toDate(),
    ],
    'Last Month': [
        moment().subtract(1, 'month').startOf('month').toDate(),
        moment().subtract(1, 'month').endOf('month').toDate(),
    ],
}

export { chart_options, range };