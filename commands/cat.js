/* eslint-disable no-empty-function */
/* eslint-disable no-trailing-spaces */
const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Shows a random cat image!'),
    async execute(interaction) {
        const catResult = await axios.get('https://api.thecatapi.com/v1/images/search');
        const reply = `${catResult.data[0].url}`;
        interaction.editReply({ files: [reply] });
        // const message = await interaction.editReply({ files: [reply], fetchReply: true });
        // message.react('👍');
        // message.react('👎');
    },
};