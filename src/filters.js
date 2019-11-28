import Vue from "vue"
import moment from 'moment';

Vue.filter('toCurrency', function (value) {
    if (typeof value !== "number") {
        return value;
    }
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    });
    return formatter.format(value);
});

Vue.filter("toDate", str => moment(str).format("MM/DD/YY"));

Vue.filter("toDateString", str => moment(str).format("MMM DD, YYYY"));