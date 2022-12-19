const { ComputeResponse } = require("./lfg_responses.js")
const { performance } = require('perf_hooks');
const {NAME_TO_KEY} = require("./constants.js")
const { DESCRITPION_COMPONENT, USER_SELECT_COMPONENT, ROLE_SELECT_COMPONENT, SET_DESCRIPTION_BTN, ACCEPT_CANCEL_BTN } = require("./component_builder.js")
const { ThreadAutoArchiveDuration } = require("discord.js")

const dpsTag = `<:Damage:800195574632022117>`
const healerTag = `<:Healer:800195575630004244>`
const tankTag = `<:Tank:800195574569631754>`

module.exports = async (interaction) => {
    if(interaction.isSelectMenu()){
        const selected = interaction.values
        const embed = interaction.message.embeds[0].data
        let currentParty
        try{
            currentParty = embed.fields.find(e=>e.name=="Current party:")
        }catch( err){}
         
        switch(interaction.customId){
            case "lfg_1_keys":
            case "lfg_2_roles":
            case "lfg_3_roles":        
            case "lfg_4_roles":        
                const step = (parseInt(interaction.customId.split("_")[1])+1)

                await interaction.update(ComputeResponse(step, embed, interaction.member.toString(), selected))
                break;
            case "lfg_select_users":
                const tag = `<@${selected}>`;
        
        
                const tmp = currentParty.value.split("\n")
                tmp.push()
                currentParty.value = tmp.join('\n')

                await interaction.update({
                    embeds: [embed]
                })
                break;
            case "lfg_select_user_role":
                for(const role of selected){
                    switch(role){
                        case "dps":
                            currentParty.value = dpsTag+currentParty.value
                            break;
                        case "tank":
                            currentParty.value = tankTag+currentParty.value
                            break;
                        case "healer":
                            currentParty.value = healerTag+currentParty.value
                            break;
                    }
                }
                await interaction.update({
                    embeds: [embed],
                    components: [SET_DESCRIPTION_BTN]
                })
                break;
        }
    } else if(interaction.isButton()){
        const embed = interaction.message.embeds[0].data
        let response
        switch(interaction.customId){
            case "lfg_return":
                const step = (parseInt(interaction.message.embeds[0].data.footer.text.charAt(6))-1)
                await interaction.update(ComputeResponse(step, embed, interaction.member.toString(), undefined))
                break;
            case "lfg_modify_description":
                await interaction.showModal(DESCRITPION_COMPONENT)
                break;
            case "lfg_add_user_party":
                response = ComputeResponse(4, embed, interaction.member.toString(), undefined)
                response.components = [USER_SELECT_COMPONENT, ACCEPT_CANCEL_BTN]
                await interaction.update(response)
                break;
            case "lfg_specify_user_role":
                response = ComputeResponse(4, embed, interaction.member.toString(), undefined)
                response.components = [ROLE_SELECT_COMPONENT, ACCEPT_CANCEL_BTN]
                await interaction.update(response)
                break;
            case "lfg_cancel_add_user":
                await interaction.update(ComputeResponse(4, embed, interaction.member.toString(), undefined))
                break
            case "lfg_done":
                const channel = interaction.guild.channels.cache.get(interaction.message.channelId)
                const whoIAmRole = await interaction.guild.roles.cache.find(r => r.name == 'Key Master')
                const dungeonField = embed.fields.find(e=>e.name=='Dungeon:')
                const levelField = embed.fields.find(e=>e.name=='Level:')
                const rolesField = embed.fields.find(e=>e.name=="Looking for:")
                
                embed.footer = {}
                
                channel.send({content: `${dungeonField.value} ${levelField.value} <@&${whoIAmRole.id}>`,embeds:[embed]})
                .then(msg =>{
                            
                    let dps = `<:Damage:800195574632022117>`
                    let healer = `<:Healer:800195575630004244>`
                    let tank = `<:Tank:800195574569631754>`
                    if(rolesField.value.includes("Healer"))
                        msg.react(healer)
                    if(rolesField.value.includes("Tank"))
                        msg.react(tank)
                    if(rolesField.value.includes("Damage"))
                        msg.react(dps)

                })

                await interaction.update({content: `LFG has been posted! You can now remove this message!`, embeds:[], components:[]})
                break;
        }
    } else if(interaction.isModalSubmit()){
        const title = interaction.fields.getTextInputValue('lfg_post_title')
        const desc = interaction.fields.getTextInputValue('lfg_post_desc')

        const embed = interaction.message.embeds[0].data
        embed.title = title
        embed.description = desc
        await interaction.update({embeds: [embed]})
    }
    // const selected = interaction.values[0];
    // console.log(interaction)
    
}
