/* eslint-disable no-empty-function */
/* eslint-disable no-trailing-spaces */
const { SlashCommandBuilder } = require('discord.js');
const snoowrap = require('snoowrap');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('A meme a day keeps sadness away! 😃'),
    async execute(interaction) {
        const memer = new snoowrap({
            userAgent: 'FRAILBOT',
            clientId: process.env.REDDIT_CLIENT_ID,
            clientSecret: process.env.REDDIT_CLIENT_SECRET,
            username: process.env.REDDIT_USER_NAME,
            password: process.env.REDDIT_PASSWORD,
        });
        const post = await memer.getSubreddit('memes').getRandomSubmission().url_overridden_by_dest;
        const message = await interaction.editReply({ files: [post], fetchReply: true });
        message.react('👍');
        message.react('👎');
    },
};