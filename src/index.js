import crypto from 'crypto';
// import { Store } from './mongo/store';
const tg = window.Telegram.WebApp;
const userId = tg.initDataUnsafe.user.id;
// const userId = 433982686;

const public_key = 'sandbox_i51927490767';
const private_key = 'sandbox_GjwO1XaW9pggVlo7p52CJq16yzDD9bfe8dEYWjU2';

function calculateSignature(data) {
  const concatenatedData = private_key + data + private_key;
  const sha1Hash = crypto.createHash('sha1').update(concatenatedData).digest();
  const signature = Buffer.from(sha1Hash).toString('base64');
  return signature;
}

async function onLoad() {
  const index = location.search.lastIndexOf('=');

  const data = {
    version: 3,
    public_key: public_key,
    action: 'pay',
    amount: Number(location.search.slice(index + 1)) / 100,
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
        // console.log(data.status);
        // console.log(data);
        tg.sendData('Hello');
        tg.close();
      })
      .on('liqpay.ready', function (data) {})
      .on('liqpay.close', function (data) {
        tg.close();
      });
  };
}

onLoad();
