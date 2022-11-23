const fs = require('node:fs');
const path = require('node:path');
const updateCommands = require('./deploy-commands.js')
const { Client, Events, Collection, GatewayIntentBits, Partials } = require('discord.js');
require('dotenv').config()

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.GuildMember]
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		console.log("Command: %s", command.data.name)
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.once(Events.ClientReady, c => {
	updateCommands()
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(process.env.TOKEN);

//Solicitamos al usuario nuevo nombre y servidor

//Comando para poner roles
client.on(Events.InteractionCreate, async interaction => {
	if (interaction.isChatInputCommand()){
	
		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}else if(interaction.isButton()){
		if(interaction.message.components[0].components[0].data.custom_id == 'add roles in-game'){
			await interaction.message.delete()
		}
	}else {
		return;
	}
});

const validateReactionName = (name) => {
	switch(name){
		case "Deathknight":
			return "Death Knight"
		case "demonhunter":
			return "Demon Hunter"
		case "evoker":
			return "Evoker"
		case "Druid":
		case "Hunter":
		case "Mage":
		case "Monk":
		case "Paladin":
		case "Priest":
		case "Rogue":
		case "Shaman":
		case "Warlock":
		case "Warrior":
			return name;
		default:
			return undefined
	}
}

client.on(Events.MessageReactionAdd, async (reaction, user) => {
	// When a reaction is received, check if the structure is partial
	if (reaction.partial) {
		// If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}

	const reactionName = validateReactionName(reaction._emoji.name);
	if(!reactionName) return;

	const guild = client.guilds.cache.get(reaction.message.guildId)
	const member = guild.members.cache.get(user.id)
	
	const role = await guild.roles.cache.find(r => r.name == reactionName)
	if(role)
		member.roles.add(role)
	
});


client.on(Events.MessageReactionRemove, async (reaction, user) => {
	// When a reaction is received, check if the structure is partial
	if (reaction.partial) {
		// If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}
	
	const reactionName = validateReactionName(reaction._emoji.name);
	if(!reactionName) return;


	const guild = client.guilds.cache.get(reaction.message.guildId)
	const member = guild.members.cache.get(user.id)
	
	const role = await guild.roles.cache.find(r => r.name == reactionName)
	if(role)
		member.roles.remove(role)

});

client.on(Events.GuildMemberUpdate, async (oldMember, newMember)=> {
	if( newMember.communicationDisabledUntilTimestamp != null && 
		newMember.communicationDisabledUntilTimestamp != oldMember.communicationDisabledUntilTimestamp &&
		newMember.user.username == "emilianohg22" &&
		newMember.user.discriminator == "3442"
		){
			newMember.timeout(null)
		}
})

