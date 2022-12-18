const {  EmbedBuilder } = require('discord.js');
const {KEY_TO_NAME, KEY_TO_URL} = require("./constants.js")

function BuildDefualtEmbedPosting(user) {
    return new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`LFG!`)
        .setDescription(`Hey! ${user} is looking for guildies to join their group!`)
        .setFooter({text: 'Step: 1/4'})
}

function ModifyEmbed(step, embed, opts){
    switch(step){
        case 2:
            embed.image = {url: KEY_TO_URL[opts["key"]]}
            embed.fields = [{name: `Dungeon:`, value: KEY_TO_NAME[opts["key"]], inline: true}]
            embed.footer.text = "Step: 2/4"
            break;
        case 3:
            embed.fields = [...embed.fields.slice(0,1), {name: `Level:`, value: "+"+opts["level"], inline: true}]
            embed.footer.text = "Step: 3/4"
            break;
        case 4:
            embed.fields = [
                ...embed.fields.slice(0,2), 
                {name: '** **', value: '** **', inline: false},
                {name: `Looking for:`, value: ParseMissingRoles(opts["missing"]), inline:true},
                {name: `Current party: `, value: opts["user"], inline:true},
            ]
            embed.footer.text = "Step: 4/4"
            break;
    }
    return embed
}

function ParseMissingRoles(roles){
    
    let dps = `<:Damage:800195574632022117>`
    let healer = `<:Healer:800195575630004244>`
    let tank = `<:Tank:800195574569631754>`

    parsedRoles = roles.map(e=>{
        if(e.includes("dps")) return dps
        else if(e.includes("heal")) return healer
        else if(e.includes("tank")) return tank
        else return e
    })

    return parsedRoles.join(' ')

}   

module.exports = {
    BuildDefualtEmbedPosting,
    ModifyEmbed
}