import express from "express";
import { nanoid } from "nanoid";

import * as urlModel from "../models/urlModel.js";

const router = express.Router();

/**
 * POST /shorten
 * Create short URL
 */
router.post("/shorten", async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: "URL is required" });
    }

    // basic validation
    try {
      new URL(originalUrl);
    } catch {
      return res.status(400).json({ error: "Invalid URL" });
    }

    const shortId = nanoid(7);

    await urlModel.createUrl(originalUrl, shortId);

    res.json({
      shortId,
      shortUrl: `${process.env.BASE_URL}/${shortId}`,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});


/**
 * GET /:shortId
 * Redirect to original URL
 */
router.get("/:shortId", async (req, res) => {
  try {
    const { shortId } = req.params;

    const [rows] = await urlModel.getUrlByShortId(shortId);

    if (rows.length === 0) {
      return res.status(404).json({ error: "URL not found" });
    }

    const url = rows[0];

    await urlModel.incrementClicks(shortId);

    return res.redirect(url.originalUrl);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

export default router;