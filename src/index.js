import crypto from 'crypto';
import { nanoid } from 'nanoid';
const tg = window.Telegram.WebApp;

const public_key = 'sandbox_i51927490767';
const private_key = 'sandbox_GjwO1XaW9pggVlo7p52CJq16yzDD9bfe8dEYWjU2';

function calculateSignature(data) {
  const concatenatedData = private_key + data + private_key;
  const sha1Hash = crypto.createHash('sha1').update(concatenatedData).digest();
  const signature = Buffer.from(sha1Hash).toString('base64');
  return signature;
}

async function onLoad() {
  const data = {
    version: 3,
    public_key: public_key,
    action: 'pay',
    amount: getAmount(),
    currency: 'UAH',
    description: 'DESCRIPTION',
    order_id: `${nanoid()}-${Date.now()}`,
    language: 'uk',
  };

  window.LiqPayCheckoutCallback = function () {
    LiqPayCheckout.init({
      data: btoa(JSON.stringify(data)),
      signature: calculateSignature(btoa(JSON.stringify(data))),
      embedTo: '#liqpay_checkout',
      mode: 'embed',
    })
      .on('liqpay.callback', async function (data) {
        console.log(data.status);
        console.log(data);
        try {
          await tg.showAlert('callback');
          await tg.sendData('Hello');
          await tg.answerWebAppQuery({
            web_app_query_id: '',
            result: {
              type: 'article',
              id: nanoid(),
              title: 'this is title',
              input_message_content: { message_text: 'Hello world' },
            },
          });

          await tg.close();
        } catch (err) {
          tg.showAlert(err);
        }
      })
      .on('liqpay.ready', function (data) {
        tg.showAlert('ready');
      })
      .on('liqpay.close', function (data) {
        tg.showAlert('close');
        tg.close();
      });
  };
}

function getAmount() {
  const index = location.search.lastIndexOf('=');
  return Number(location?.search?.slice(index + 1) || 100) / 100;
}
onLoad();
