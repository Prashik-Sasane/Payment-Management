const db = require("../config/db");

const getHRProfile = async(req , res) => {
   
    try{
    const userId = req.user.id;
    const [rows] = await db.query(
         "SELECT id, name, email, role FROM users WHERE id = ?",
      [userId]
    )
    if (rows.length === 0) {
      return res.status(404).json({ error: "HR not found" });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch HR profile" });
  }
}

module.exports = getHRProfile