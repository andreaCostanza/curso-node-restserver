const { response, request }= require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const usersGet = async (req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query; // optional query params
    const query = { status: true }; // limit results to existing users

    const [ total, users ] = await Promise.all([
        User.countDocuments( query ), //returns total number of registries
        User.find( query ) // returns found users according to query params
        .skip( Number(from) )
        .limit( Number(limit) )
    ])

    res.json({
        msg: 'get API - controller',
        total,
        users
    });
}
const usersPost = async(req, res) => {
    
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    // Hash contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt);

    //Guardar en DB
    await user.save();

    res.json({
        msg: 'post API - controller',
        user
    });
}

const usersPut = async (req, res) => {

    const { id } = req.params;
    const { _id, password, google, email, ... rest} = req.body;

    if ( password ) {
        // Hash contraseña
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync( password, salt);
    }

    const user = await User.findByIdAndUpdate( id, rest );


    res.json( user );
}

const usersPatch = (req, res) => {
    res.json({
        msg: 'patch API - controller'
    });
}

const usersDelete = async (req, res) => {
    
    const { id } = req.params;

    // Borrar fisicamente
    //const user = await User.findByIdAndDelete( id );

    const user = await User.findByIdAndUpdate( id, {status: false});


    res.json({
        msg: 'delete API - controller',
        user
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}