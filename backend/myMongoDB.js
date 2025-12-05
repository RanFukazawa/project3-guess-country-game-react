import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = "guessCountryGame";

// Working on userTest_2

let client;
let db;

async function connect() {
  if (client && db) {
    return { client, db };
  }

  const options = {
    serverSelectionTimeoutMS: 10000,
  };

  client = new MongoClient(uri, options);
  await client.connect();
  await client.db("admin").command({ ping: 1 });
  db = client.db(dbName);

  return { client, db };
}

export default function MyMongoDB() {
  const me = {};

  me.getAllCountries = async ({
    query = {},
    collection = "adminCountries_userTest_2", // Default to admin-created data
  }) => {
    const { db } = await connect();
    const countriesCollection = db.collection(collection);

    const data = await countriesCollection.find(query).toArray();

    return { data };
  };

  me.getAdminCountryById = async (countryId) => {
    const { db } = await connect();
    const countries = db.collection("adminCountries_userTest_2");
    const mongoID = ObjectId.createFromHexString(countryId);
    return await countries.findOne({ _id: mongoID });
  };

  me.addCountry = async (formData) => {
    const { db } = await connect();
    const countries = db.collection("adminCountries_userTest_2");

    // Required fields
    const document = {
      // countryId: formData.countryId,
      name: formData.name,
      region: formData.region,
      countryCode: formData.countryCode?.toLowerCase(),
      flagUrl:
        formData.flagUrl ||
        `https://flagcdn.com/w320/${formData.countryCode?.toLowerCase()}.png`,
      createdAt: new Date(),
    };

    // Only add optional fields if they have values
    if (formData.capitals && formData.capitals.length > 0) {
      document.capitals = formData.capitals;
    }

    if (formData.population && !isNaN(parseInt(formData.population))) {
      document.population = parseInt(formData.population);
    }

    if (formData.languages && formData.languages.length > 0) {
      document.languages = formData.languages;
    }

    return await countries.insertOne(document);
  };

  me.updateCountry = async (countryId, updateData) => {
    const { db } = await connect();
    const countries = db.collection("adminCountries_userTest_2");

    const allowedUpdates = {};

    // Required fields - always update if provided
    if (updateData.name !== undefined) allowedUpdates.name = updateData.name;
    if (updateData.region !== undefined)
      allowedUpdates.region = updateData.region;
    if (updateData.countryCode !== undefined) {
      allowedUpdates.countryCode = updateData.countryCode;
    }
    if (updateData.flagUrl !== undefined)
      allowedUpdates.flagUrl = updateData.flagUrl;

    // Optional fields - only include if they have values
    if (updateData.capitals && updateData.capitals.length > 0) {
      allowedUpdates.capitals = updateData.capitals;
    }

    if (updateData.population) {
      const parsed = parseInt(updateData.population);
      if (!isNaN(parsed)) {
        allowedUpdates.population = parsed;
      }
    }

    if (updateData.languages && updateData.languages.length > 0) {
      allowedUpdates.languages = updateData.languages;
    }

    allowedUpdates.updatedAt = new Date();

    const mongoID = ObjectId.createFromHexString(countryId);
    return await countries.updateOne(
      { _id: mongoID },
      { $set: allowedUpdates },
    );
  };

  me.deleteCountry = async (countryId) => {
    const { db } = await connect();
    const countries = db.collection("adminCountries_userTest_2");

    const mongoID = ObjectId.createFromHexString(countryId);
    return await countries.deleteOne({ _id: mongoID });
  };

  // Functions for guessing country name game
  me.getRandomCountry = async () => {
    const { db } = await connect();
    const collection = db.collection("adminCountries_userTest_2");

    // Get 4 random countries
    const countries = await collection
      .aggregate([{ $sample: { size: 4 } }])
      .toArray();

    if (countries < 4) {
      throw new Error(
        "Not enough countries in database. Need at least 4 coutries.",
      );
    }

    // Set the first one as the correct country
    const correctCountry = countries[0];

    // Extract all 4 countries for options
    const options = countries.map((country) => country.name);

    // Shuffle the options so correct answer is not always the first one
    const shuffledOptions = shuffleArray(options);

    return {
      _id: correctCountry._id,
      name: correctCountry.name,
      flagUrl: correctCountry.flagUrl,
      capitals: correctCountry.capitals,
      population: correctCountry.population,
      region: correctCountry.region,
      languages: correctCountry.languages,
      options: shuffledOptions,
    };
  };

  // Helper function to shuffle array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Check the answer
  me.checkAnswer = async (countryId, userAnswer) => {
    const { db } = await connect();
    const countries = db.collection("adminCountries_userTest_2");
    const mongoID = ObjectId.createFromHexString(countryId);

    const country = await countries.findOne({ _id: mongoID });

    if (!country) {
      throw new Error("Country not found");
    }

    if (!userAnswer || typeof userAnswer !== "string") {
      console.error("Invalid userAnswer:", userAnswer);
      throw new Error("Invalid answer format");
    }

    const correctAnswer = country.name.trim();
    const userAnswerNormalized = userAnswer.trim();

    const isCorrect = correctAnswer === userAnswerNormalized;

    return {
      correct: isCorrect,
      correctAnswer: country.name,
    };
  };

  return me;
}
