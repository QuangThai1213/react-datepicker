import React from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'bootstrap/dist/css/bootstrap.css';
import CryptoJS from 'crypto-js';
import OAuth from "oauth-1.0a";

// import 'bootstrap/dist/css/bootstrap.css';


class BootstrapDatePicker extends React.Component {
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
            startDate: moment().format("DD/MM/YYYY"),
            endDate: moment().format("DD/MM/YYYY")
        };

        this.handleCallback = this.handleCallback.bind(this)
    }

    componentDidMount() {
        const oauth = OAuth({
            consumer: {
                key: 'ck_69c231675554b23f9c86727df23e5355fc5a66c5',
                secret: 'cs_ac03336dbf8714b5892a49a48cebfbb170472a73',
            },
            signature_method: 'HMAC-SHA256',
            hash_function(base_string, key) {
                return CryptoJS.HmacSHA256(base_string, key).toString(CryptoJS.enc.Base64)
            },
        })
        const request_data = {
            url: 'http://172.16.50.5/wp-json/wc-analytics/reports/products/stats?after=2020-08-01T00:00:00&before=2020-08-13T23:59:59&interval=day&order=asc&per_page=100&_locale=user',
            method: 'GET',

        }

        fetch(request_data.url, {
            headers: {
                ...oauth.authorize(request_data)
            },
        }).then(response => {
            console.log(response.json())
        })
    }

    handleEvent(event, picker) {
        // console.log(picker.startDate);
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

    }
    render() {
        return (
            <DateRangePicker

                onEvent={this.handleEvent}
                onCallback={this.handleCallback}
                initialSettings={{
                    locale: { format: "DD/MM/YYYY" },
                    alwaysShowCalendars: true,
                    startDate: this.state.startDate,
                    endDate: this.state.endDate,
                    ranges: this.ranges,
                }}
            >
                <button>{this.state.btnLabel}</button>
            </DateRangePicker>
        );
    }
}
export default BootstrapDatePicker;