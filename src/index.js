import crypto from 'crypto';
const tg = window.Telegram.WebApp;

const public_key = 'sandbox_i51927490767';
const private_key = 'sandbox_GjwO1XaW9pggVlo7p52CJq16yzDD9bfe8dEYWjU2';

function calculateSignature(data) {
  const concatenatedData = private_key + data + private_key;
  const sha1Hash = crypto.createHash('sha1').update(concatenatedData).digest();
  const signature = Buffer.from(sha1Hash).toString('base64');
  return signature;
}

const data = {
  version: 3,
  public_key: public_key,
  action: 'pay',
  amount: 200,
  currency: 'UAH',
  description: 'DESCRIPTION',
  order_id: 'ORDER_ID',
  language: 'uk',
};

window.LiqPayCheckoutCallback = function () {
  LiqPayCheckout.init({
    data: btoa(JSON.stringify(data)),
    signature: calculateSignature(btoa(JSON.stringify(data))),
    embedTo: '#liqpay_checkout',
    mode: 'embed',
  })
    .on('liqpay.callback', function (data) {
      console.log(data.status);
      console.log(data);
    })
    .on('liqpay.ready', function (data) {
      // ready
    })
    .on('liqpay.close', function (data) {
      // close
    });
};

document.body.innerHTML = JSON.stringify(tg.initData);
