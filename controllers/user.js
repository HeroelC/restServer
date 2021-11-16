const { response, request } = require('express');

const userGet = (req = request, res = response) => {

    const query = req.query;

    res.json({
        msg: 'get API - Controller',
        query
    });
}

const userPost = (req, res) => {

    const body = req.body;

    res.json({
        msg: 'post API - Controller',
        body
    });
}

const userPut = (req, res) => {

    const id = req.params.id;

    res.json({
        msg: 'put API',
        id
    });
}

const userDelete = (req, res) => {
    res.json({
        msg: 'delete API'
    });
}


module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}