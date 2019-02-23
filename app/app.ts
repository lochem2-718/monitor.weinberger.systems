import express, { Request, Response, Application } from 'express';
import nunjucks from 'nunjucks';

const app : Application = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
})

// same syntax as jinja
app.set('view engine', 'nunjucks');



app.get('/', indexHandler);



function indexHandler( req : Request, res : Response ) : void {
    res.send('This is the very bare bones');
}

app.listen(3000);