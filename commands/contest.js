/* eslint-disable no-empty-function */
/* eslint-disable no-trailing-spaces */
const { SlashCommandBuilder } = require('discord.js');
const discord = require('discord.js');
const axios = require('axios');
const daysToAdd = 7;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('contest')
        .setDescription('Shows all cp contests within a week! 💻'),
    async execute(interaction) {
        const contests = await axios.get('https://www.kontests.net/api/v1/all');
        const editedContests = new Array();
        contests.data.forEach(contest => {
            if ((contest.url.match('codechef') ||
                contest.url.match('codeforces') ||
                contest.url.match('leetcode') ||
                contest.url.match('google')) &&
                (new Date(new Date().getTime() + (daysToAdd * 24 * 60 * 60 * 1000))) >= new Date(contest.start_time)) {
                editedContests.push(contest);
            }
        });
        const embedData = new Array();
        editedContests.forEach(contest => {
            embedData.push({
                name: contest.name,
                value: `Start Time -> ${new Date(contest.start_time)}\n${contest.url}\n\n\n`,
            });
        });
        const embed = new discord.EmbedBuilder()
            .setColor(0x3DED97)
            .setTitle('Contests');
        embedData.forEach(contest => {
            embed.addFields(contest);
        });
        const message = await interaction.editReply({ embeds: [embed], fetchReply: true });
        message.react('👍');
        message.react('👎');
    },
};