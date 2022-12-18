const { SlashCommandBuilder, } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lfg')
		.setDescription('Creates a lfg posting'),
    execute: require('../lfg/command.js'),
};