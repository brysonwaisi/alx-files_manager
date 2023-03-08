import express from 'express';
import routingControl from './routes/index';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

routingControl(app);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;
