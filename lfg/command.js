const {ComputeResponse} = require("./lfg_responses.js")

module.exports = async (interaction) => {
    const user = interaction.member.toString()
    await interaction.reply(ComputeResponse(1, {}, user, user));
    
}