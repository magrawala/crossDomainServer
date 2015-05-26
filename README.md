# Cross Domain Server

A server for web APIs that don't support cross domain access. Provides
two different versions of the server code (python and server side
javascript via node.js).

## Python Version
The python version of the server is based on the server in
https://github.com/plamere/SetListener and uses cherrypy.

### Usage
`python server.py`


##Node version
The node version requires http, url and httpdispatcher.

### Usage
`node server.js`
