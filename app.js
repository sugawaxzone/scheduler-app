const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

// Zenoti config from Railway environment variables
const ZENOTI_KEY = process.env.ZENOTI_KEY;
const CENTER_ID = process.env.CENTER_ID;

// API endpoint
app.get("/getSchedules", async (req, res) => {
  try {
    const { start_date, end_date, employee_id } = req.query;
    if (!start_date || !end_date || !employee_id) {
      return res.status(400).json({ error: "Missing query parameters" });
    }

    const response = await axios.get(
      `https://api.zenoti.com/v1/centers/${CENTER_ID}/employee_schedules`,
      {
        params: { start_date, end_date },
        headers: { Authorization: `Bearer ${ZENOTI_KEY}` },
      }
    );

    const employeeSchedules = response.data.filter(
      (shift) => shift.employee_id === employee_id
    );

    res.json({ schedules: employeeSchedules });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
