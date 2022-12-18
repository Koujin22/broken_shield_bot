const { BuildDefualtEmbedPosting, ModifyEmbed} = require("./embed_builder.js")
const {NAME_TO_KEY} = require("./constants.js")
const {KEYS_COMPONENT, LEVEL_COMPONENT, RETURN_BTN, ROLES_COMPONENT, SET_DESCRIPTION_BTN} = require("./component_builder.js")


function ComputeResponse(step, embed, user, selected=undefined){
    if(!selected)
        selected = GetSelected(step, embed);
    switch(step){
        case 1:
            return {
                content: ``, 
                embeds: [BuildDefualtEmbedPosting(selected)],
                components: [KEYS_COMPONENT],
                ephemeral: true
            }
        case 2:
            return {
                content: ``, 
                embeds: [ModifyEmbed(2, embed, {key: selected[0]})],
                components: [LEVEL_COMPONENT, RETURN_BTN]
            }
        case 3:
            return {
                content: ``, 
                embeds: [ModifyEmbed(3, embed, {level: selected[0]})],
                components: [ROLES_COMPONENT, RETURN_BTN]
            }
        case 4:
            return {
                content: ``, 
                embeds: [ModifyEmbed(4, embed, {missing: selected, user})],
                components: [SET_DESCRIPTION_BTN]
            }
    }
}

function GetSelected(step, embed){
    switch(step){
        case 1:
            return "<"+embed.description.split("<")[1].split(">")[0]+">"
        case 2:
            return [NAME_TO_KEY[embed.fields[0].value]]
        case 3:
            return [parseInt(embed.fields[1].value.replace("+",""))]
        case 4:
            return embed.fields[3].value.split(' ')
    }
}


module.exports = {
    ComputeResponse,
}