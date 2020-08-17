import React from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'bootstrap/dist/css/bootstrap.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import WooCommerceApi from '../common/woo-config'
// import 'bootstrap/dist/css/bootstrap.css';


class RevenueChart extends React.Component {
    constructor(props) {
        super(props);
        this.ranges = {
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
        this.state = {
            btnLabel: moment().format("DD/MM/YYYY").toString(),
            startDate: moment().format("YYYY-MM-DD"),
            endDate: moment().format("YYYY-MM-DD"),
            chartData: []
        };

        this.handleCallback = this.handleCallback.bind(this)
    }
    componentDidMount() {
        WooCommerceApi.get(`reports/products/stats?after=${this.state.startDate}T00:00:00&before=${this.state.endDate}T23:59:59&interval=day&order=asc&per_page=100&_locale=user`).then(response => {
            let data = [];
            response.data.intervals.forEach(element => {
                data.push([element.interval, element.subtotals.net_revenue])
            });
            this.setState({ chartData: data })
        })
    }
    handleCallback(start, end, label) {
        if (start.format("DD/MM/YYYY").toString() === end.format("DD/MM/YYYY").toString()) {
            this.setState({
                btnLabel: start.format("DD/MM/YYYY").toString()
            });
        } else {
            this.setState({
                btnLabel: start.format("DD/MM/YYYY").toString() + " - " + end.format("DD/MM/YYYY").toString()
            });
        }
        this.setState({
            startDate: start.format("YYYY-MM-DD"),
            endDate: end.format("YYYY-MM-DD"),
        })
        this.api.get(`reports/revenue/stats?after=${this.state.startDate}T00:00:00&before=${this.state.endDate}T23:59:59&interval=day&order=asc&per_page=100&_locale=user`).then(response => {
            let data = [];
            response.data.intervals.forEach(element => {
                data.push([element.interval, element.subtotals.net_revenue])
            });
            this.setState({ chartData: data })
        })

    }
    render() {
        return (
            <div>
                <DateRangePicker
                    onEvent={this.handleEvent}
                    onCallback={this.handleCallback}
                    initialSettings={{
                        locale: { format: "YYYY-MM-DD" },
                        alwaysShowCalendars: true,
                        startDate: this.state.startDate,
                        endDate: this.state.endDate,
                        ranges: this.ranges,
                    }}
                >
                    <button>{this.state.btnLabel}</button>
                </DateRangePicker>
                {this.state.chartData.length > 0 && <HighchartsReact highcharts={Highcharts} options={options} key={this.state.chartData} />}
                {this.state.chartData.length === 0 && <h1>No Data</h1>}

            </div>
        );
    }
}
export default RevenueChart; 