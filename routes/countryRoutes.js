// All country-related endpoints
import express from "express";

import myDB from "../backend/myMongoDB.js";

const router = express.Router();

router.get("/countries", async function (req, res) {
  console.log("Get /countries route called");
  const page = req.query.page ? +req.query.page : 1;
  const result = await myDB.getAllCountries({}, { page });
  res.json(result);
});

export default router;
