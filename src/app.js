import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/', (req, res) => res.status(200).send({ status: 200, message: 'Welcome to Soma!' }));
// app.use((req, res) => res.status(404).send({
//   status: 404,
//   error: 'route Not Found!',
// }));
export default app;
