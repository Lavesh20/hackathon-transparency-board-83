
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Team = require('./models/Team');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://laveshvyas20:HYfPIVV7timUKqPN@cluster0.frfboac.mongodb.net/HackathonDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
// Get all teams
app.get('/api/teams', async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get team by ID
app.get('/api/teams/:id', async (req, res) => {
  try {
    const team = await Team.findOne({ id: req.params.id });
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new team
app.post('/api/teams', async (req, res) => {
  const team = new Team(req.body);
  try {
    const newTeam = await team.save();
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add score to a team
app.post('/api/teams/:id/scores', async (req, res) => {
  try {
    const team = await Team.findOne({ id: req.params.id });
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    
    team.scores.push(req.body);
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add feedback to a team
app.post('/api/teams/:id/feedback', async (req, res) => {
  try {
    const team = await Team.findOne({ id: req.params.id });
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    
    team.feedback.push(req.body);
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Seed initial data
app.post('/api/seed', async (req, res) => {
  try {
    // Clear existing data
    await Team.deleteMany({});
    
    // Import data from src/utils/teamData.js
    const { TEAMS } = require('../src/utils/teamData');
    
    // Insert teams
    await Team.insertMany(TEAMS);
    
    res.status(200).json({ message: 'Database seeded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
