const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Pings you and says HI! 👋'),
	async execute(interaction) {
        const user = interaction.member.id;
		interaction.editReply(`Hi <@${user}>!`);
	},
};