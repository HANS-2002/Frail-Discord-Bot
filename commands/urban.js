/* eslint-disable no-empty-function */
/* eslint-disable no-trailing-spaces */
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('urban')
        .setDescription('Searches the urban dictionary for a word!')
        .addStringOption(option => option.setName('term').setDescription('Enter a term to search for')),
    async execute(interaction) {
        const term = interaction.options.getString('term');
        const query = new URLSearchParams({ term });

        const dictResult = await axios.get(`https://api.urbandictionary.com/v0/define?${query}`);
        const list = dictResult.data.list;

        if (!list.length) {
            return interaction.editReply(`No results found for **${term}**.`);
        }

        const [answer] = list;

        const embed = new EmbedBuilder()
            .setColor(0x3DED97)
            .setTitle(answer.word)
            .setURL(answer.permalink)
            .addFields(
                { name: 'Definition', value: trim(answer.definition, 1024) },
                { name: 'Example', value: trim(answer.example, 1024) },
            );
        const message = await interaction.editReply({ embeds: [embed], fetchReply: true });
        message.react('👍');
        message.react('👎');
    },
};