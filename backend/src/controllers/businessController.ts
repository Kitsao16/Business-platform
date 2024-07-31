// src/controllers/businessController.ts
import { Request, Response } from 'express';
import { connectDB } from '../db';
import { ObjectId } from 'mongodb';

export const createBusiness = async (req: Request, res: Response) => {
    const { name, description, owner } = req.body;

    try {
        const db = await connectDB();
        const businessCollection = db.collection('businesses');

        const newBusiness = { name, description, owner };
        await businessCollection.insertOne(newBusiness);

        res.status(201).json({ message: 'Business created successfully', business: newBusiness });
    } catch (error) {
        console.error('Error creating business:', error);
        res.status(500).json({ message: 'Error creating business' });
    }
};

// src/controllers/businessController.ts
export const getBusiness = async (req: Request, res: Response) => {
    try {
        const db = await connectDB();
        const businessCollection = db.collection('businesses');
        const business = await businessCollection.findOne({ _id: new ObjectId(req.params.id) });

        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }

        res.status(200).json(business);
    } catch (error) {
        console.error('Error fetching business data:', error);
        res.status(500).json({ message: 'Error fetching business data' });
    }
};

export const updateBusiness = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, owner } = req.body;

    try {
        const db = await connectDB();
        const businessCollection = db.collection('businesses');

        const updatedBusiness = await businessCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { name, description, owner } }
        );

        if (updatedBusiness.matchedCount === 0) {
            return res.status(404).json({ message: 'Business not found' });
        }

        const business = await businessCollection.findOne({ _id: new ObjectId(id) });
        res.status(200).json(business);
    } catch (error) {
        console.error('Error updating business data:', error);
        res.status(500).json({ message: 'Error updating business data' });
    }
};

export const deleteBusiness = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const db = await connectDB();
        const businessCollection = db.collection('businesses');

        const result = await businessCollection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Business not found' });
        }

        res.status(200).json({ message: 'Business deleted successfully' });
    } catch (error) {
        console.error('Error deleting business:', error);
        res.status(500).json({ message: 'Error deleting business' });
    }
};
