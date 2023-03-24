const express = require("express");
const cors = require("cors");
const app = express();
const ecpay_payment = require('./node_modules/ecpay_aio_nodejs/lib/ecpay_payment')
const crypto = require('crypto');


// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
//   });

app.use(cors());
app.use(express.json());

app.post("/api", (req, res) => {
    const {orderData} = req.body;
    
    let base_param = {
        ClientBackURL: orderData.ClientBackURL,
        ItemName: orderData.ItemName, //'測試商品1#測試商品2'
        MerchantTradeDate: orderData.MerchantTradeDate, //ex: 2017/02/13 15:45:30
        MerchantTradeNo: orderData.MerchantTradeNo, //請帶20碼uid, ex: f0a0d7e9fae1bb72bc93
        ReturnURL: orderData.ReturnURL,
        TotalAmount: orderData.TotalAmount,
        TradeDesc: '測試交易描述',
        PaymentType: 'aio',
        MerchantID: '2000132',
        EncryptType: 1,
        ChoosePayment: orderData.ChoosePayment
        // OrderResultURL: 'http://192.168.0.1/payment_result',
    }

    try {
        const options = require('./node_modules/ecpay_aio_nodejs/conf/config-example'),
        create = new ecpay_payment(options),
        htm = create.payment_client.aio_check_out_all(parameters = base_param) // , invoice = inv_params
        res.send(htm);
        console.log(htm)

    } catch (err) {
        // console.log(err);
        let error = {
            status: '500',
            stack: ""
        }
        res.render('error', {
            message: err,
            error: error
        })
    }
})

app.listen(8000, () => {
    console.log("Server started on port 8000")
})
