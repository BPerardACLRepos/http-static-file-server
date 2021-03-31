const request = require('supertest');
const app = require('../lib/app');
const fs = require('fs').promises;

describe('app routes', () => {
    it('response.text should be the path the user entered', async () => {
        const path = '/yo';

        const response = await request(app).get(path);

        expect(response.text).toEqual(path);
    });

    it('response.text should be the contents of index.html when user path is /index.html', async () => {
        const file = await fs.readFile(`public/index.html`, 'utf-8');

        const response = await request(app).get('/index.html');

        expect(response.text).toEqual(file);
    });
});
