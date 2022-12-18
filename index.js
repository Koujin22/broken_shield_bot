const fs = require('node:fs');
const path = require('node:path');
const updateCommands = require('./deploy-commands.js')
const assign_roles = require("./assign_roles/AssignRoles.js")
const remove_roles = require("./assign_roles/RemoveRoles.js")
const react_lfg_handler = require("./lfg/listener_reaction.js")
const LFG_HANDLER = require('./lfg/listener.js')
const { Client, Events, Collection, GatewayIntentBits, Partials } = require('discord.js');
require('dotenv').config()

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.GuildMember, Partials.User]
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

	const channel = client.guilds.cache.get("799471750412369980").channels.cache.find(ch => ch.name == 'Queen\'s Court')

	console.log(channel.members)
    
});



// Log in to Discord with your client's token
client.login(process.env.TOKEN);

//Solicitamos al usuario nuevo nombre y servidor


client.on("raw", packet=>{
	if(packet.t=="INTERACTION_CREATE" && packet.d.data.component_type == 5){
		packet.d.component_type = 3
		packet.d.data.component_type = 3
		//client.actions.InteractionCreate.handle(packet.d)
        

	}
})

//Comando para poner roles
client.on(Events.InteractionCreate, async (interaction) =>{
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
	}else if(interaction.isButton() && interaction.customId == 'add roles in-game' ){
		await interaction.message.delete()
	}else if(interaction.customId == "do_nothing"){
		
		await interaction.update({content:`Please make a selection.`})
	}else if(interaction.customId.includes("lfg")){
		LFG_HANDLER(interaction)
	}
    return;
});


client.on(Events.MessageReactionAdd, async (reaction, user)=>{
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
    if(reaction.message.id == "1050973948290007080" || reaction.message.id == "1050975223484252240")
		await assign_roles(client)(reaction, user)
	else if(reaction.message.author.tag == "Broken Shield bot#1671" && user.tag != "Broken Shield bot#1671")
		await react_lfg_handler(reaction, user, true)
});


client.on(Events.MessageReactionRemove, async(reaction, user)=>{
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
	if(reaction.message.id == "1050973948290007080" || reaction.message.id == "1050975223484252240")
		await remove_roles(client)(reaction, user)
	else if(reaction.message.author.tag == "Broken Shield bot#1671" && user.tag != "Broken Shield bot#1671")
		await react_lfg_handler(reaction, user, false)
	
});

client.on(Events.GuildMemberUpdate, require("./general_listeners/GuildMemberUpdate.js"))

//process reactions
/*
async (oldMember, newMember)=> {
	if( newMember.communicationDisabledUntilTimestamp != null && 
		newMember.communicationDisabledUntilTimestamp != oldMember.communicationDisabledUntilTimestamp &&
		newMember.user.username == "emilianohg22" &&
		newMember.user.discriminator == "3442"
		){
        	try{
            	newMember.timeout(null);
            }catch(err){
                console.log("failed to remove timeout", err);
            }
			
		}
}
const addRoleBasedReaction = async (reaction, user) => {
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
	const member = await guild.members.fetch(user.id)
	
	const role = await guild.roles.cache.find(r => r.name == reactionName)
	if(role && member && !member.roles.cache.some(role=> role.name == reactionName)){
		member.roles.add(role)
        console.log("Adding role ("+reactionName+") to "+member.user.username)
    }
}

*/