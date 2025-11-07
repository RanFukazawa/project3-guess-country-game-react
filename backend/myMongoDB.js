// MongoDB connection configuration and country CRUD logic
import { MongoClient, ObjectId } from "mongodb";

function MyMongoDB() {
  const me = {};

  const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:57017";

  const connect = async () => {
    const client = await MongoClient.connect(MONGODB_URI);
    const countries = client.db("guessCountryGame").collection("countries");

    return { client, countries };
  };

  me.getCountriesTotalPages = async ({ query, limit }) => {
    const { client, countries } = await connect();
    console.log("Connected to MongoDB for total pages calculation");
    try {
      const totalPages = Math.ceil(
        (await countries.countDocuments(query)) / limit,
      );
      console.log("Total pages:", totalPages);
      return totalPages;
    } finally {
      await client.close();
    }
  };

  me.getAllCountries = async ({ query }, { page = 1 } = {}) => {
    const projection = {};
    const sort = {};
    const limit = 100;

    const { client, countries } = await connect();
    try {
      const totalPages = await me.getCountriesTotalPages({ query, limit });

      if (page < 1) page = 1;
      if (page > totalPages && totalPages) page = totalPages;
      const params = {
        projection,
        sort,
        limit,
        skip: (page - 1) * limit,
      };
      console.log("Querying countries with params:", totalPages, params);
      const cursor = countries.find(query, params);
      const data = await cursor.toArray();
      return { data, totalPages, page };
    } finally {
      await client.close();
    }
  };

  me.getCountryById = async (id) => {
    const { client, countries } = await connect();
    try {
      const mongoID = ObjectId.createFromHexString(id);
      const result = await countries.findOne({ _id: mongoID });
      return result;
    } finally {
      await client.close();
    }
  };

  me.createCountry = async (data) => {
    const { client, countries } = await connect();
    try {
      const result = await countries.insertOne(data);
      return result;
    } finally {
      await client.close();
    }
  };

  me.updateCountry = async (id, data) => {
    const { client, countries } = await connect();
    try {
      const result = await countries.updateOne({ _id: id }, { $set: data });
      return result;
    } finally {
      await client.close();
    }
  };

  me.deleteCountry = async (id) => {
    const { client, countries } = await connect();
    try {
      const result = await countries.deleteOne({ _id: id });
      return result;
    } finally {
      await client.close();
    }
  };

  return me;
}

export default MyMongoDB();
