import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://hu61tkqkea.execute-api.us-east-2.amazonaws.com/dev',
});

export class Store {
  static async setRecord(key, value) {
    const response = await instance.post('/record', { key, value });
    return response;
  }

  static async getRecord(key) {
    return instance.get('/record', {
      params: {
        key,
      },
    });
  }
}
