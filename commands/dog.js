/* eslint-disable no-empty-function */
/* eslint-disable no-trailing-spaces */
const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dog')
        .setDescription('Shows a random dog image!'),
    async execute(interaction) {
        const dogResult = await axios.get('https://api.thedogapi.com/v1/images/search');
        const reply = `${dogResult.data[0].url}`;
        interaction.editReply({ files: [reply] });
        // const message = await interaction.editReply({ files: [reply], fetchReply: true });
        // message.react('👍');
        // message.react('👎');
    },
};