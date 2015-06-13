'use strict';

var fs = require('fs');
var status = require('./httpResponseStatusCodes');

// Post
// Rule: POST must be used to create a new resource in a collection
// Rule: Location must be used to specify the URI of a newly created resource

function postPost(req, res) {

  var responseCode = status.CREATED;

  // do something ...

  res.type('application/json');

  switch (responseCode) {

    case status.CREATED:
      res.location('/posts/123456');
      res.status(status.CREATED).send('{ "id": "123456" }');
      break;

    case status.BAD_REQUEST:
    default:
      res.status(status.BAD_REQUEST).send('{ "code": "400", "message": "Something went wrong :(" }');
      break;
  }
}

function putPost(req, res) {

  var responseCode = status.OK;

  // do something ...

  res.type('application/json');

  switch (responseCode) {

    case status.OK:
      res.status(status.OK).send('{ "id": "123456" }');
      break;

    case status.BAD_REQUEST:
    // case status.NOT_FOUND:
    default:
      res.status(status.BAD_REQUEST).end('{ "code": "400", "message": "Something went wrong :(" }');
      break;
  }
}

function getPosts(req, res) {
  serveStaticFile(res, '/posts.json');
}

function serveStaticFile(res, path) {

  res.type('application/json');

  fs.readFile(__dirname + path, function (error, data) {
    if (error) {
      console.log(error);
      res.status(status.INTERNAL_SERVER_ERROR).end('{ "code": "500", "message": "Something went wrong :(" }');
    } else {
      res.status(status.OK).send(data);
    }
  });
}

module.exports = {
  post: postPost,
  put: putPost,
  get: getPosts
}