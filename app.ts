import app from './src/api/app';

const port = process.env.SERVER_PORT;

const server = app.listen(port, () => {
  console.log(`🚀 Template NodeJS app listening at http://localhost:${port}`);
});

export default server;
