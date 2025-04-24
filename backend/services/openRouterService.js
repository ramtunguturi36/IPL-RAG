const axios = require('axios');
require('dotenv').config();

class OpenRouterService {
    constructor() {
        this.apiKey = process.env.OPENROUTER_API_KEY;
        this.baseUrl = 'https://openrouter.ai/api/v1/chat/completions';
    }

    async getResponse(messages) {
        try {
            const response = await axios.post(
                this.baseUrl,
                {
                    model: "google/gemma-3-4b-it:free",
                    messages: messages
                },
                {
                    headers: {
                        "Authorization": `Bearer ${this.apiKey}`,
                        "Content-Type": "application/json",
                        "HTTP-Referer": process.env.SITE_URL || "http://localhost:3000",
                        "X-Title": process.env.SITE_NAME || "Cricket Analytics"
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('OpenRouter API Error:', error.response?.data || error.message);
            throw error;
        }
    }

    // Chat bot response
    async getChatResponse(userMessage) {
        const messages = [
            {
                role: "system",
                content: "You are an IPL cricket expert chatbot. You should only respond to questions related to IPL (Indian Premier League) cricket. If the user asks about any other topic, respond with 'I'm sorry, I can only provide information about IPL cricket. Please ask questions related to IPL matches, players, teams, or statistics.'"
            },
            {
                role: "user",
                content: userMessage
            }
        ];
        return this.getResponse(messages);
    }

    // Match summary
    async getMatchSummary(matchDetails) {
        const messages = [
            {
                role: "system",
                content: "You are a cricket analyst providing match summaries. Provide only the factual summary without any follow-up questions or suggestions for additional information."
            },
            {
                role: "user",
                content: `Generate a detailed summary for the cricket match with the following details: ${JSON.stringify(matchDetails)}. Focus only on the match events and outcomes. Do not ask follow-up questions or suggest additional information.`
            }
        ];
        return this.getResponse(messages);
    }

    // Player report
    async getPlayerReport(playerDetails) {
        const messages = [
            {
                role: "system",
                content: "You are a cricket analyst providing player reports. Provide only the factual analysis without any follow-up questions or suggestions for additional information."
            },
            {
                role: "user",
                content: `Generate a detailed analysis report for the cricket player with the following details: ${JSON.stringify(playerDetails)}. Focus only on the player's performance and statistics. Do not ask follow-up questions or suggest additional information.`
            }
        ];
        return this.getResponse(messages);
    }

    // Team report
    async getTeamReport(teamDetails) {
        const messages = [
            {
                role: "system",
                content: "You are a cricket analyst providing team reports. Provide only the factual analysis without any follow-up questions or suggestions for additional information."
            },
            {
                role: "user",
                content: `Generate a detailed analysis report for the cricket team with the following details: ${JSON.stringify(teamDetails)}. Focus only on the team's performance and statistics. Do not ask follow-up questions or suggest additional information.`
            }
        ];
        return this.getResponse(messages);
    }

    // Commentary
    async getCommentary(matchDetails) {
        const messages = [
            {
                role: "system",
                content: "You are a cricket commentator providing ball-by-ball commentary. Provide only the commentary without any follow-up questions or suggestions for additional information."
            },
            {
                role: "user",
                content: `Generate a ball-by-ball commentary for the cricket match with the following details: ${JSON.stringify(matchDetails)}. Focus only on describing the match events. Do not ask follow-up questions or suggest additional information.`
            }
        ];
        return this.getResponse(messages);
    }
}

module.exports = new OpenRouterService(); 