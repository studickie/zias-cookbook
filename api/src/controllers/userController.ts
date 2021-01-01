import express from 'express';
import { ObjectId } from 'mongodb';
import { User, UserRequest } from '../types/User';
import catchAsync from '../utils/catchAsync';

const router = express.Router();

router.get('/', catchAsync(async (req, res) => {
    const collection = req.dbContext.collection('users');

    const response = await collection.find().toArray();

    res.status(200).json({ response });
}));

router.get('/:id', catchAsync(async (req, res) => {
    const collection = req.dbContext.collection('users');

    const response = await collection.findOne({ _id: new ObjectId(req.params.id) });

    res.status(200).json({ response });
}));

router.post('/', catchAsync(async (req, res) => {
    
    const { firstname, lastname, username, email, password } = (req.body as UserRequest);

    const dateNow = new Date();

    const newUser: User = {
        firstname,
        lastname,
        username,
        email,
        hash: password,
        dateCreated: dateNow,
        lastUpdated: dateNow
    };

    const collection = req.dbContext.collection('users');

    const response = await collection.insertOne(newUser);

    res.status(200).json({
        message: 'User created successfully!',
        user: response.ops
    });
}));

router.put('/:id', catchAsync(async (req, res) => {

    const { id } = req.params;
    const { field, value } = req.body;

    const updateDocument = {
        $set: {
            [field]: value,
            lastUpdated: new Date().toISOString()
        }
    };

    const collection = req.dbContext.collection('users');
    const response = await collection.updateOne({ _id: new ObjectId(id) }, updateDocument);

    res.status(200).json({
        message: 'User updated successfully!',
        user: response
    });
}));

export default router;