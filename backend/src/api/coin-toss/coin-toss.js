import express from "express";
import createCoinToss from "./create-coin-toss.js";
import auth from "../utils/auth.js";
import validate from "../../utils/validate.js";
import CreateCoinTossRequest from "../../dto/request/create-coin-toss.dto.js";

const router = express.Router();

router.post("/", auth, validate(CreateCoinTossRequest), createCoinToss);

export default router;
