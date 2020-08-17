import React from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'bootstrap/dist/css/bootstrap.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import WooCommerceApi from '../common/woo-config'
import { chart_options, range } from '../common/app-config'
class ProductChart extends React.Component {
    constructor(props) {
        super(props);
        this.ranges = range
        this.state = {
            btnLabel: moment().format("DD/MM/YYYY").toString(),
            startDate: moment().format("YYYY-MM-DD"),
            endDate: moment().format("YYYY-MM-DD"),
            chartData: []
        };

        this.handleCallback = this.handleCallback.bind(this)
        this.getData = this.getData.bind(this)
    }
    getData() {
        WooCommerceApi.get(`reports/products?_locale=user&after=${this.state.startDate}T00:00:00&before=${this.state.endDate}T23:59:59&extended_info=true&order=desc&orderby=items_sold&page=1&per_page=25`).then(response => {
            let data = [];
            console.log(response)
            response.data.forEach(element => {
                data.push([element.extended_info.name, element.net_revenue])
            });
            this.setState({ chartData: data })
        })
    }
    componentDidMount() {
        this.getData()
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
        this.getData()
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
                {this.state.chartData.length > 0 && <HighchartsReact highcharts={Highcharts} options={chart_options(this.state.chartData)} key={this.state.chartData} />}
                {this.state.chartData.length === 0 && <h1>No Data</h1>}

            </div>
        );
    }
}
export default ProductChart; 