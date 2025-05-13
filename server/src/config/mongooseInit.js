import { connect } from 'mongoose';

const dbUrl = process.env.MONGO_URI;

export default async function mongooseInit() {
    try {
        await connect(dbUrl);
        console.log('Successfully connected to DB!');
    } catch (err) {
        console.log('Cannot connect to DB!' + err.message);
    }
}