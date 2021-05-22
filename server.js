const http=require('http');
const url =require('url');
const fs=require('fs');
const express =require('express');


const app =express();

app.use(express.static('public'));

const server = http.createServer((req,res)=>{
	console.log(req.url);
	res.setHeader('Content-Type','text/html');

	let path ='./views1/';


	switch (req.url){
		case '/':
			path=path+'index.html';
			res.statusCode=200;
			break;
		case '/about':
			path+='about.html';
			res.statusCode=301;
			break;
		default:
			path+='error.html';
			res.statusCode=404;
			break;

	}


	fs.readFile(path,(err,data)=>{
		if(err){
			console.log(err);
			res.end();
		}
		res.write(data);
		res.end();
	});

});


server.listen(80,'localhost',()=>{
	console.log("Listening for requests on port 80");
});
