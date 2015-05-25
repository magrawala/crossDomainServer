// Relay server to handle cross domain data flow. 
// Uses node.js
// To run: node server.js 

var http = require('http');
var url = require('url');
var dispatcher = require('httpdispatcher');

function getDataFromURL(queryURL,callback) {
    var data = "";
    http.get(queryURL,function(res) {
//	console.log("Got response: " + res.statusCode);
	var numchunks = 0;

	res.setEncoding('utf8');

	res.on('data', function(chunk) { 
	    data += chunk; 
	    numchunks++; 
//	    console.log("numchunks:", numchunks);
	});

	res.on('end',function() { 
	    callback(data);
	});

	return data;
    }).on('error', function(e) {
	console.log("Got error: " + e.message);
    });

}


var server = http.createServer(function(server_req, server_res) {
//    server_res.writeHead(200);
//    server_res.end('Hello There');

    dispatcher.dispatch(server_req,server_res);
});
server.listen(8414);

dispatcher.onGet('/CrossDomainServer/query', function(server_req, server_res) {
    var q = url.parse(server_req.url,true).query.q;
//    console.log(q);

    getDataFromURL(q,function(data) { 
//	console.log(data);
	server_res.writeHead(200, { // 'Content-Type': 'application/json', 
			            'Access-Control-Allow-Origin': '*'} );
	server_res.end(data);
    });

});

dispatcher.onError(function(server_req,server_res) {
    server_res.writeHead(404);
});





