import nunjucks from 'nunjucks';
import { ResolveOptions } from 'dns';
import express, { Request, Response, Application } from 'express';
import * as CPUInfoParser from "./performance_reader/cpu_info_parser";
import * as RAMInfoParser from "./performance_reader/memory_info_parser";
import { Server } from 'http';


const server : Application = express();
server.use(express.static("static"));

nunjucks.configure('views', {
    autoescape: true,
    express: server
})


// same syntax as jinja
server.set('view engine', 'nunjucks');

server.get('/', handleIndex);

server.get("/login", login);

server.post("/login", handleLoginAttempt);

function login (req: Request, res: Response) : void {
    res.render("login.html");
}

function handleIndex( req : Request, res : Response ) : void {
    //res.send('This is the very bare bones');
    let oof = "oof";
    res.render("index.html", { oof: oof} );
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

console.log('The server is running.\nPress Ctrl+C to stop...');

server.listen(3000);
