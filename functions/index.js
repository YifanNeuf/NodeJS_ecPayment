const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors")({origin: true});
const app2 = express();
// eslint-disable-next-line max-len
const EcpayPayment = require("./node_modules/ecpay_aio_nodejs/lib/ecpay_payment");
// const crypto = require("crypto");

app2.use(cors());
app2.use(express.json());

app2.post("/api", (req, res) => {
  const {orderData} = req.body;

  const baseParam = {
    ClientBackURL: orderData.ClientBackURL,
    ItemName: orderData.ItemName,
    MerchantTradeDate: orderData.MerchantTradeDate,
    MerchantTradeNo: orderData.MerchantTradeNo,
    ReturnURL: orderData.ReturnURL,
    TotalAmount: orderData.TotalAmount,
    TradeDesc: "測試交易描述",
    PaymentType: "aio",
    MerchantID: "2000132",
    EncryptType: 1,
    ChoosePayment: orderData.ChoosePayment,
    // OrderResultURL: 'http://192.168.0.1/payment_result',
  };

  try {
    // const thing = new Thing(); // eslint-disable-line no-use-before-define
    // eslint-disable-next-line max-len
    const options = require("./node_modules/ecpay_aio_nodejs/conf/config-example");
    const create = new EcpayPayment(options);
    const htm = create.payment_client.aio_check_out_all(baseParam);
    res.send(htm);
    console.log(htm);
  } catch (err) {
    const error = {status: "500", stack: ""};
    res.render("error", {message: err, error: error});
  }
});

app2.listen(8000, () => {
  console.log("Server started on port 8000");
});

exports.app = functions.http.onRequest(app2);

