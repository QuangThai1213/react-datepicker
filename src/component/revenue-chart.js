import React from 'react';
import { Button, Container, Row, Col, Table } from 'react-bootstrap';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'bootstrap/dist/css/bootstrap.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import WooCommerceApi from '../common/woo-config'
import { chart_options, range } from '../common/app-config'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();
const optionStatistic = [
    { value: 5, label: 'Order Count', bind: 'subtotals', bind2: 'orders_count' },
    { value: 6, label: 'Net Revenue', bind: 'subtotals', bind2: 'net_revenue' },
    { value: 7, label: 'Average Item Per Order', bind: 'subtotals', bind2: 'avg_items_per_order' },
    { value: 8, label: 'Average Order Value', bind: 'subtotals', bind2: 'avg_order_value' },
    { value: 9, label: 'Coupon Count', bind: 'subtotals', bind2: 'coupons_count' },
]
const optionDisplay = [
    { value: 1, label: 'Interval', bind: 'interval' },
    { value: 2, label: 'Total Customer', bind: 'subtotals', bind2: 'total_customers' },
    { value: 3, label: 'Tax', bind: 'subtotals', bind2: 'taxes' },
    { value: 4, label: 'Refund', bind: 'subtotals', bind2: 'refunds' },
]
class RevenueChart extends React.Component {
    constructor(props) {
        super(props);
        this.ranges = range
        this.state = {
            btnLabel: moment().format("DD/MM/YYYY").toString(),
            startDate: moment().startOf('day').format('YYYY-MM-DDTHH:mm:ss'),
            endDate: moment().endOf('day').format('YYYY-MM-DDTHH:mm:ss'),
            chartData: [],
            tableData: [],
            selectedStatistic: [optionStatistic[0]],
            selectedDisplay: [optionDisplay[0]],
            columnData: []
        };

        this.handleCallback = this.handleCallback.bind(this)
        this.getData = this.getData.bind(this)
    }
    getData() {
        const params = {
            '_locale': 'user',
            'after': this.state.startDate,
            'before': this.state.endDate,
            'order': 'asc',
            'interval': 'day',
            'page': 1,
            'per_page': 100
        }
        WooCommerceApi.get(`reports/revenue/stats`, params).then(response => {
            let chartData = [];
            let tableData = [];
            response.data.intervals.forEach((element, index) => {
                chartData.push([element.interval, element.subtotals.net_revenue])
                tableData.push(element)
            });
            this.setState({ chartData: chartData, tableData: tableData })
        })
    }
    componentDidMount() {
        this.getData();
        this.getColumnData();
    }

    getColumnData = () => {
        let arrayColumn = this.state.selectedStatistic.concat(this.state.selectedDisplay);
        arrayColumn.sort(function (a, b) {
            // Compare the 2 dates
            if (a.value < b.value) return -1;
            if (a.value > b.value) return 1;
            return 0;
        });
        this.setState({ columnData: arrayColumn })
    }

    handleStatisticChange = async selectedStatistic => {
        if (selectedStatistic === null) {
            selectedStatistic = [];
        }
        await this.setState(
            { selectedStatistic }
        );
        this.getColumnData();
    };
    handleDisplayChange = async selectedDisplay => {
        if (selectedDisplay === null) {
            selectedDisplay = [];
        }
        await this.setState(
            { selectedDisplay }
        );
        this.getColumnData();
    };
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
            startDate: start.startOf('day').format('YYYY-MM-DDTHH:mm:ss'),
            endDate: end.endOf('day').format('YYYY-MM-DDTHH:mm:ss'),
        })
        this.getData();
    }
    render() {
        const tableColumn = this.state.columnData;
        return (
            <div style={{ padding: "10px", paddingLeft: "10px" }} >
                {this.state.chartData.length > 0 && <HighchartsReact highcharts={Highcharts} options={chart_options('Revenue Chart', this.state.chartData)} key={this.state.chartData} />}
                {this.state.chartData.length === 0 && <h1>No Data</h1>}
                <Container style={{ width: '100%' }}>
                    <Row>
                        <div>Thống kê: </div>
                        <Col>
                            <Select
                                value={this.state.selectedStatistic}
                                onChange={this.handleStatisticChange}
                                closeMenuOnSelect={true}
                                components={animatedComponents}
                                defaultValue={this.state.selectedStatistic}
                                isMulti
                                options={optionStatistic} />
                        </Col>
                        <div>Hiển thị: </div>
                        <Col>
                            <Select
                                value={this.state.selectedDisplay}
                                onChange={this.handleDisplayChange}
                                closeMenuOnSelect={true}
                                components={animatedComponents}
                                defaultValue={this.state.selectedDisplay}
                                isMulti
                                options={optionDisplay} />
                        </Col>
                    </Row>
                </Container >
                <Row style={{ paddingTop: "20px" }}>
                    <div style={{ padding: "10px", paddingLeft: "30px" }}>
                        <b>Thời gian thống kê :</b>
                    </div>
                    <DateRangePicker
                        onCallback={this.handleCallback}
                        initialSettings={{
                            locale: { format: "YYYY-MM-DD" },
                            alwaysShowCalendars: true,
                            startDate: this.state.startDate,
                            endDate: this.state.endDate,
                            ranges: this.ranges,
                        }} >
                        <Button
                            variant="outline-secondary"
                            style={{ height: 40, minWidth: 200 }}>
                            <div
                                style={{ color: 'black', fontWeight: 'bold' }}>
                                {this.state.btnLabel}
                            </div>
                        </Button>
                    </DateRangePicker>
                </Row>

                <Table responsive>
                    <thead>
                        <tr>
                            <th></th>
                            {tableColumn.map((_, index) => (
                                <th key={index}>{tableColumn[index].label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tableData.map((value, index) => (
                            <tr key={index}>
                                {(this.state.selectedStatistic.length !== 0 || this.state.selectedDisplay.length !== 0) &&
                                    <td>{index}</td>}
                                {tableColumn.map((v, i) => {
                                    if (v.bind2) {
                                        if (v.bind2 === "net_revenue" || v.bind2 === "avg_order_value") {
                                            return <td key={i}><div>{value[v.bind][v.bind2]}{"đ"}</div></td>
                                        }
                                        return <td key={i}>{value[v.bind][v.bind2]}</td>
                                    } else {

                                        return <td key={i}>{value[v.bind]}</td>
                                    }
                                })}
                            </tr>

                        ))}
                    </tbody>
                </Table>
            </div >
        )
    }
}
export default RevenueChart; 