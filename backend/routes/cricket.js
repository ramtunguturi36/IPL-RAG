const express = require('express');
const router = express.Router();
const openRouterService = require('../services/openRouterService');
const auth = require('../middleware/auth');

// Chat bot endpoint
router.post('/chat', auth, async (req, res) => {
    try {
        const { message } = req.body;
        const response = await openRouterService.getChatResponse(message);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Match summary endpoint
router.post('/match-summary', auth, async (req, res) => {
    try {
        const matchDetails = req.body;
        const response = await openRouterService.getMatchSummary(matchDetails);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Player report endpoint
router.post('/player-report', auth, async (req, res) => {
    try {
        const playerDetails = req.body;
        const response = await openRouterService.getPlayerReport(playerDetails);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Team report endpoint
router.post('/team-report', auth, async (req, res) => {
    try {
        const teamDetails = req.body;
        const response = await openRouterService.getTeamReport(teamDetails);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Commentary endpoint
router.post('/commentary', auth, async (req, res) => {
    try {
        const matchDetails = req.body;
        const response = await openRouterService.getCommentary(matchDetails);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 