import crypto from 'crypto';
// import { Store } from './mongo/store';
const tg = window.Telegram.WebApp;
// const userId = tg.initDataUnsafe.user.id;
// const userId = 433982686;

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

async function onLoad() {
  // const record = await Store.getRecord(userId);
  // document.body.innerHTML = JSON.stringify(record);
  const index = location.search.lastIndexOf('=');
  document.body.innerHTML =
    Number(JSON.stringify(location.search.slice(index + 1))) / 100;

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
}

onLoad();
