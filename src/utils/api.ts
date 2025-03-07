
import axios from 'axios';
import { Team, TeamScore, JudgeFeedback } from './teamData';

const API_URL = 'http://localhost:5000/api';

export const fetchTeams = async (): Promise<Team[]> => {
  try {
    const response = await axios.get(`${API_URL}/teams`);
    return response.data;
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
};

export const fetchTeamById = async (id: string): Promise<Team> => {
  try {
    const response = await axios.get(`${API_URL}/teams/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching team ${id}:`, error);
    throw error;
  }
};

export const addScore = async (teamId: string, score: TeamScore): Promise<Team> => {
  try {
    const response = await axios.post(`${API_URL}/teams/${teamId}/scores`, score);
    return response.data;
  } catch (error) {
    console.error('Error adding score:', error);
    throw error;
  }
};

export const addFeedback = async (teamId: string, feedback: JudgeFeedback): Promise<Team> => {
  try {
    const response = await axios.post(`${API_URL}/teams/${teamId}/feedback`, feedback);
    return response.data;
  } catch (error) {
    console.error('Error adding feedback:', error);
    throw error;
  }
};

export const seedDatabase = async (): Promise<void> => {
  try {
    await axios.post(`${API_URL}/seed`);
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};
