import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// WooCommerceAPI = new WooCommerceRestApi({
//     url: "http://172.16.50.5",
//     consumerKey: "ck_69c231675554b23f9c86727df23e5355fc5a66c5",
//     consumerSecret: "cs_ac03336dbf8714b5892a49a48cebfbb170472a73",
//     version: "wc-analytics"
// });

export default new WooCommerceRestApi({
    url: "http://172.16.50.5",
    consumerKey: process.env.REACT_APP_CONSUMER_KEY,
    consumerSecret: process.env.REACT_APP_CONSUMER_SECRET,
    version: "wc-analytics"
}) 