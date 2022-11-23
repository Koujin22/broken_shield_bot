const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder,ButtonStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Register your WoW character so we can give you role in-game')
        .addStringOption(option =>
            option.setName('character_name')
                .setDescription('The name of your character that joined the guild.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('realm_name')
                .setDescription('The name of the server that your character is in.')
                .setRequired(true)
                .addChoices(
                    { name: 'Stormrage', value: 'Stormrage' },
                    { name: 'Illidan', value: 'Illidan' },
                    { name: "Zul'jin", value: "Zul'jin" },
                    { name: "Proudmoore", value: 'Proudmoore' }
                )),
	async execute(interaction) {
        const name = interaction.options.getString('character_name');
        const realm = interaction.options.getString('realm_name')

        const channel = interaction.guild.channels.cache.find(channel => channel.name == 'In-game members')
        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('add roles in-game')
					.setLabel('Done!')
					.setStyle(ButtonStyle.Primary),
			);
        channel.send({content: `${name}-${realm}`, components: [row]})

        const roleMember = await interaction.guild.roles.cache.find(r => r.name == 'BS Member')
        const roleServer = await interaction.guild.roles.cache.find(r => r.name == realm)
        const user = interaction.member

        user.roles.add(roleMember)
        user.roles.add(roleServer)
        
        //member.roles.add(role);
		await interaction.reply({
            content: `Welcome to Broken Shield ${name}! You can additionally react to the class icons to get access to the class chat.`, 
            ephemeral: true
        });
        
	},
};