

const { response, request }= require('express');


const usersGet = (req = request, res = response) => {

    const { q, name = 'No name', apikey } = req.query;
    res.json({
        msg: 'get API - controller',
        q,
        name,
        apikey
    });
}
const usersPost = (req, res) => {

    const { name, age } = req.body;

    res.json({
        msg: 'post API - controller',
        name,
        age
    });
}

const usersPut = (req, res) => {

    const { id } = req.params;
    res.json({
        msg: 'put API - controller',
        id
    });
}

const usersPatch = (req, res) => {
    res.json({
        msg: 'patch API - controller'
    });
}

const usersDelete = (req, res) => {
    res.json({
        msg: 'delete API - controller'
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}