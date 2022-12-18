const validateReactionName = require("../util/ValidateReactionName.js")

module.exports = client => async (reaction, user) => {
	
	const reactionName = validateReactionName(reaction._emoji.name);
	if(!reactionName) return;


	const guild = client.guilds.cache.get(reaction.message.guildId)
	const member = await guild.members.fetch(user.id)
	
	const role = await guild.roles.cache.find(r => r.name == reactionName)
	if(role)
		member.roles.remove(role)
}