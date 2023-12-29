import mongodb, { MongoClient } from 'mongodb';
import type { Db } from 'mongodb';

let database: Db;

const connect = async () => {
    const client = await MongoClient.connect(process.env.MONGODB_CONNECTION_STRING as string, {});
    const db = client.db('faceade');

    database = db;
    return db;
};

export const getDatabase = () => database;

export default connect;