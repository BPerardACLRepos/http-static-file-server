const request = require('supertest');
const app = require('../lib/app');
const fs = require('fs').promises;

describe('app routes', () => {
    it('response.text should be the contents of index.html when user path is /index.html', async () => {
        const file = await fs.readFile(`public/index.html`, 'utf-8');

        const response = await request(app).get('/index.html');

        expect(response.text).toEqual(file);
    });

    it('response.text should be err.message text', async () => {
        const path = '/noFile';

        const expected = `ENOENT: no such file or directory, open 'public${path}'`;

        const response = await request(app).get(path);

        expect(response.text).toEqual(expected);
    });
});
