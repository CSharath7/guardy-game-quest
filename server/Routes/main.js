require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const authenticateUser = require("../Auth/verify");
const User = require("../Model/user");
const bcrypt = require("bcryptjs");
const router = express.Router();

// Middleware
router.use(express.json());
router.use(cookieParser());

router.get("/protected", authenticateUser, (req, res) => {
  res.json({ message: "User Verified" });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User Not Found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
     await user.updateLoginActivity();
    const tk = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: rememberMe ? "30d" : "7h",
      }
    );
    token = `Bearer ${tk}`
    console.log(token)

    res.json({
      success: true,
      user: { id: user._id, email: user.email },
      token,
      user: {
        username: user.username,
        email: user.email,
        currentLevel: user.currentLevel,
        shieldCoins: user.shieldCoins,
        currentStreak: user.currentStreak,
        lastLogin: user.lastLogin,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
 
router.post("/game/complete", authenticateUser, async (req, res) => {
  try {
    // Correctly accessing userId attached by the middleware
    const userId = req.user.userId;
    const { gameId, score } = req.body;

    if (!gameId || typeof score !== "number" || score < 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid gameId or score provided." });
    }

    // 1. Fetch User
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // 2. Calculate Reward
    // Award 1 Shield Coin for every 2 points scored.
    const coinReward = Math.floor(score / 2);
    // We can also treat the total score as XP earned
    const xpReward = score;

    // 3. Update user stats
    user.shieldCoins += coinReward;
    // NOTE: For a proper implementation, you would also update a separate XP field.
    // Since only shieldCoins are requested for update, we update that.
    await user.save();

    // 4. Return new stats
    res.status(200).json({
      success: true,
      message: `Game completed! You earned ${coinReward} Shield Coins and ${xpReward} XP.`,
      newShieldCoins: user.shieldCoins,
      reward: coinReward,
      xpEarned: xpReward,
    });
  } catch (err) {
    console.error("Game completion error:", err);
    res
      .status(500)
      .json({ success: false, error: "Failed to process game completion." });
  }
});
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    console.log("Signup request received:", { username, email });
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists with this email." });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    
    res.status(201).json({
      success: true,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },token
    });
  } catch (err) {
    console.error("Signup error:", err);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
});



router.get("/leaderboard",authenticateUser, async (req, res) => {
  try {
    const leaderboard = await User.find({})
      .select("username shieldCoins currentLevel") 
      .sort({ shieldCoins: -1 }) 
      .limit(10) 
      .lean();
    res.status(200).json({
      success: true,
      message: "Top 10 users retrieved successfully.",
      leaderboard: leaderboard,
    });
  } catch (err) {
    console.error("Leaderboard error:", err);
    res
      .status(500)
      .json({ message: "Could not retrieve leaderboard. Please try again." });
  }
});

router.get("/profile", authenticateUser, async (req, res) => {
  try {
    
    const userId = req.user.userId;
    console.log("Fetching profile for user ID:", userId);
    const user = await User.findById(userId).select('-password'); 
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        currentLevel: user.currentLevel,
        shieldCoins: user.shieldCoins,
        currentStreak: user.currentStreak,
        registered: user.registered,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });

  } catch (err) {
    console.error("Profile retrieval error:", err);
    res.status(500).json({ message: "Something went wrong while retrieving profile data." });
  }
});
router.post("/logout", (req, res) => {
  res.json({ success: true, message: "Logged out successfully" });
});

module.exports = router;