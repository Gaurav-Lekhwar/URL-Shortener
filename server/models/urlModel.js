import pool from "../config/db.js";

// Create URL
export const createUrl = async (originalUrl, shortId) => {
  return await pool.query(
    "INSERT INTO urls (originalUrl, shortId) VALUES (?, ?)",
    [originalUrl, shortId]
  );
};

// Get URL
export const getUrlByShortId = async (shortId) => {
  return await pool.query(
    "SELECT * FROM urls WHERE shortId = ?",
    [shortId]
  );
};

// Increment clicks
export const incrementClicks = async (shortId) => {
  return await pool.query(
    "UPDATE urls SET clicks = clicks + 1 WHERE shortId = ?",
    [shortId]
  );
};