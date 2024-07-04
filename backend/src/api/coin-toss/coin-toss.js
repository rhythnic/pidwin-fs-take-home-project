import express from "express";

import auth from "../../utils/auth.js";
import validate from "../../utils/validate.js";
import CreateCoinTossRequest from "../../dto/request/create-coin-toss.dto.js";
import createCoinToss from "./create-coin-toss.js";

const router = express.Router();

router.post("/", auth, validate(CreateCoinTossRequest), createCoinToss);

export default router;
