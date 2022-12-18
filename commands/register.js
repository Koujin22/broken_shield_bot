const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder,ButtonStyle } = require('discord.js');
const mysql = require('mysql2');
const table = "Discord_Caracters";

const sqlConnection = mysql.createConnection({
    host: "45.86.66.80",
    port: "3306",
    user: "u78928_bQyo2or6JG",
    password: "C6m^Dgug!f0C3e.E99D6YiK=",
    database: "s78928_DiscordPlayers"
});

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
        let  tmp_name = interaction.options.getString('character_name');
        const name = tmp_name.charAt(0).toUpperCase() + tmp_name.slice(1)
        const realm = interaction.options.getString('realm_name')
        const user = interaction.member

        const channel = interaction.guild.channels.cache.find(channel => channel.name == 'in-game-members')
        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('add roles in-game')
					.setLabel('Done!')
					.setStyle(ButtonStyle.Primary),
			);
        channel.send({content: `${name}-${realm} | User: ${user.user.tag}`, components: [row]})

        const whoIAmRole = await interaction.guild.roles.cache.find(r => r.name == 'whoami')
        
        const roleMember = await interaction.guild.roles.cache.find(r => r.name == 'BS Member')
        const roleServer = await interaction.guild.roles.cache.find(r => r.name == realm)

        user.roles.add(roleMember)
        user.roles.add(roleServer)
        user.roles.remove(whoIAmRole)
        try{
        	user.setNickname(name+"-"+realm).catch(err=>console.log(""))
        }catch (err){}
        console.log(name+"-"+realm+" "+user.user.tag)
        
        var sql = `INSERT INTO  Discord_Caracters (DiscordTag, CharacterName) VALUES (?, ?)`;
        sqlConnection.query(sql, [user.user.tag, name+"-"+realm], function (err, result) {
            if (!err) 
            	console.log("1 record inserted");
        });
        //member.roles.add(role);
		await interaction.reply({
            content: `Welcome to Broken Shield ${name}! You can additionally react to the class icons to get access to the class chat.`, 
            ephemeral: true
        });
        
	},
};