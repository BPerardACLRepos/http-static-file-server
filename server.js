const app = require('./lib/app');

const port = 7890;

app.listen(port, () => {
  console.log(`Application started on port ${port}`);
});
