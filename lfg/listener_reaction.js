
const { ThreadAutoArchiveDuration } = require("discord.js")
const {NAME_TO_KEY} = require("./constants.js")
const wait = require('node:timers/promises').setTimeout;


let dpsTag = `<:Damage:800195574632022117>`
let healerTag = `<:Healer:800195575630004244>`
let tankTag = `<:Tank:800195574569631754>`

module.exports = async (reaction, user, add) =>{
    const message = reaction.message;
    const embed = reaction.message.embeds[0].data;
    const emoji_name = reaction._emoji.name;
    const emoji_id = reaction._emoji.id;
    const user_id = user.id;
    
    let rolesField = embed.fields.find(e=>e.name=="Looking for:")
    let partyField = embed.fields.find(e=>e.name=="Current party:")

    if(add){

        if(!rolesField.value.includes(emoji_name)){
            message.reactions.cache.get(reaction._emoji.id).remove()
            return;
        }
        if(partyField.value.split('\n')[0].includes(user_id)){
            message.reactions.cache.get(reaction._emoji.id).users.remove(user_id)
            return;
        }
        if(partyField.value.includes(`<@${user_id}>`)){
            const userReactions = message.reactions.cache.filter(reaction => reaction.users.cache.has(user_id));

            try {
                for (const reaction of userReactions.values()) {
                    if(reaction._emoji.name != emoji_name){
                        await reaction.users.remove(user_id);
                    }
                }
                
                await wait(2500)
            } catch (error) {
                console.error('Failed to remove reactions.');
            }
        }

        let found = false
        let newRolesField = rolesField.value.split(' ').filter(e=>{
            if(found) return true;
            else if(e.includes(emoji_name)) {
                found = true;
                return false;
            } else return true
        })
        rolesField.value = newRolesField.join(' ')

        let tmp = partyField.value.split('\n')
        if(!tmp.find(e=>e.includes(`<@${user_id}>`))){
            switch(emoji_name){
                case "Damage":
                    tmp.push(`${dpsTag}<@${user_id}>`)
                    break;
                case "Healer":
                    tmp.push(`${healerTag}<@${user_id}>`)
                    break;
                case "Tank":
                    tmp.push(`${tankTag}<@${user_id}>`)
                    break;
            }
        }
        partyField.value = tmp.join('\n')
        
        if(rolesField.value.length == 0){
            rolesField.value = "** **"
            const dungeonField = embed.fields.find(e=>e.name=='Dungeon:')
            const levelField = embed.fields.find(e=>e.name=='Level:')
            let new_embed = {
                type: 'rich',
                title: 'Group formed!',
                fields: [],
                color: 39423
              }
            message.startThread({
                name: `${NAME_TO_KEY[dungeonField.value]} ${levelField.value}`,
                autoArchiveDuration: ThreadAutoArchiveDuration.OneHour,
                reason: 'LFG posting',
            }).then(async threadChannel => {
                let listOfMembers = partyField.value.split("\n")
                for(const user of listOfMembers){
                    threadChannel.members.add(user.split("@")[1].replace(">",""))
                }
                threadChannel.send({
                    content: "Hey <@here>! The group has filled. You can use any available channel under `BS DUNGEONS` group of channels to communicate during your dungeon. \n\n **Good luck and have fun!**"
                })
            }).catch(console.error);
            message.edit({embeds: [new_embed], content: ``})
        }else {
            message.edit({embeds: [embed]})
        }
    }else {
        if(partyField.value.split('\n')[0].includes(user_id) || !partyField.value.includes(user_id)){
            return
        }
        let temp = rolesField.value.split(' ')
        temp.push(`<:${emoji_name}:${emoji_id}>`)
        rolesField.value = temp.join(' ')

        let tmp = partyField.value.split('\n')
        tmp = tmp.filter(e=>!e.includes(`<@${user_id}>`))
        if(tmp.length == 0) partyField.value = "** **"
        else partyField.value = tmp.join('\n') 
                
        message.edit({embeds: [embed]})
    }



}