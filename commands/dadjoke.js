/* eslint-disable no-empty-function */
/* eslint-disable no-trailing-spaces */
const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dadjoke')
        .setDescription('An excellent dad joke to make your day!'),
    async execute(interaction) {
        const joke = await axios.get('https://icanhazdadjoke.com/', { headers: { 'Accept': 'application/json', 'User-Agent': 'axios 0.27.2' } });
        const reply = `${joke.data.joke}`;
        const message = await interaction.editReply({ content: reply, fetchReply: true });
        message.react('😂');
        message.react('🙂');   
    },
};