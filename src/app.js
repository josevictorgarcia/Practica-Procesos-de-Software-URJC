import bodyParser from 'body-parser';
import express from 'express'; //DONE
import mustacheExpress from 'mustache-express';
import { __dirname } from './dirname.js';
import myRouter from './myRouter.js';

const app = express();
const port = 3000;

app.set('views', __dirname + '/../views');
app.set('view engine', 'html');
app.engine('html', mustacheExpress(), '.html');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../public'));

app.use('/', myRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
    console.log('App has restarted due to changes.');
});