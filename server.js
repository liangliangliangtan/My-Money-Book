const jsonServer = require('json-server');
const express = require('express');
const path = require('path')

const router = jsonServer.router('db.json')

const middlewares = jsonServer.defaults();

//create server
const server = jsonServer.create();

//root directory
const root = __dirname +'/build';

// 1. configure serving static resources
server.use(express.static(root,{maxAge: 86400000}));



// should be resolved by React Router 
const reactRouterWhiteList =['/create','/edit/:itemId']
server.get(reactRouterWhiteList, (request,response)=>{
    response.sendFile(path.resolve(root,'index.html'))
})

// 2. configure serving REST APIs
server.use(router);
server.use(middlewares);
server.listen(3000, ()=>{
    console.log('server is running');
})