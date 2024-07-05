import express from "express";

import auth from "../../utils/auth.js";
import validate from "../../utils/validate.js";
import CreateCoinTossRequest from "../../dto/request/create-coin-toss.dto.js";
import createCoinToss from "./create-coin-toss.js";
import findCoinTosses from "./find-coin-tosses.js";

const router = express.Router();

router.post("/", auth, validate(CreateCoinTossRequest), createCoinToss);
router.get("/", auth, findCoinTosses);

export default router;
