import express, { Request, Response, Application } from 'express';
import nunjucks from 'nunjucks';
import { ResolveOptions } from 'dns';

const server : Application = express();

nunjucks.configure('views', {
    autoescape: true,
    express: server
})

// same syntax as jinja
server.set('view engine', 'nunjucks');



server.get('/', handleIndex);



function handleIndex( req : Request, res : Response ) : void {
    res.send('This is the very bare bones');
}

// will check user login
async function handleLoginAttempt( req : Request, res : Response ) {
    
}


// handles loading the system info page
function handleSystemInfoPage( req : Request, res : Response ) {

}

// handles the api calls to system info
async function handleSystemInfoApi( req : Request, res : Response ) {

}

server.listen(3000);
