const {  ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle, TextInputBuilder, TextInputStyle, ModalBuilder } = require('discord.js');
const {KEYS, ROLES, ROLE_SELECT} = require("./constants.js")

function CreateSelect(values, customId, placeHolder, minValue=1, maxValue=1){
    return new ActionRowBuilder()
        .addComponents(
            new SelectMenuBuilder()
                .setCustomId(customId)
                .setPlaceholder(placeHolder)
                .setMinValues(minValue)
                .setMaxValues(maxValue)
                .addOptions(values),
    );
}

function CreateUserSelect(customId, placeHolder, minValue=1, maxValue=1){
    return new ActionRowBuilder()
        .addComponents(
            new SelectMenuBuilder({type: 5})
                .setCustomId(customId)
                .setPlaceholder(placeHolder)
                .setMinValues(minValue)
                .setMaxValues(maxValue)
    );
}

function CreateButon(label, customId, style=ButtonStyle.Primary) {
    return new ButtonBuilder()
                .setCustomId(customId)
                .setLabel(label)
                .setStyle(style);
}

function CreateTextInput(label, customId, style=TextInputStyle.Short) {
    return new ActionRowBuilder()
        .addComponents(
            new TextInputBuilder()
                .setCustomId(customId)
                .setLabel(label)
                .setStyle(style)
        )
}

function CreateModal(title, customId){
    return new ModalBuilder()
        .setCustomId(customId)
        .setTitle(title)
}

const KEYS_COMPONENT = CreateSelect(KEYS, "lfg_1_keys", "Select dungeon to do.")
const LEVEL_COMPONENT = CreateSelect([...Array(25).keys()].map(e=>{return{label: "+"+e,value:e.toString()}}), "lfg_2_roles", "Select Mythic level")
const ROLES_COMPONENT = CreateSelect(ROLES, "lfg_3_roles", "Select missing roles.", 1, 4)
const DESCRITPION_COMPONENT = CreateModal("Modify post description", "lfg_post_modal").addComponents(
    CreateTextInput("Title", "lfg_post_title"),
    CreateTextInput("Description", "lfg_post_desc", TextInputStyle.Paragraph)
    )

const RETURN_BTN = new ActionRowBuilder().addComponents(
    CreateButon("Return", "lfg_return", ButtonStyle.Secondary),
    CreateButon("Next", "do_nothing"))
const SET_DESCRIPTION_BTN = new ActionRowBuilder().addComponents(
    CreateButon("Return", "lfg_return", ButtonStyle.Secondary), 
    CreateButon("Done", "lfg_done", ButtonStyle.Success), 
    CreateButon("Modify Descritpion", "lfg_modify_description"), 
    CreateButon("Specify your role", "lfg_specify_user_role"))

const ACCEPT_CANCEL_BTN = new ActionRowBuilder().addComponents(
    CreateButon("Cancel", "lfg_cancel_add_user", ButtonStyle.Danger),
    CreateButon("Accept", "do_nothing", ButtonStyle.Success));

const USER_SELECT_COMPONENT = CreateUserSelect("lfg_select_users", "Select user")

const ROLE_SELECT_COMPONENT = CreateSelect(ROLE_SELECT, "lfg_select_user_role", "Select the role")


module.exports = {
    KEYS_COMPONENT,
    LEVEL_COMPONENT,
    ROLES_COMPONENT,
    USER_SELECT_COMPONENT,
    ROLE_SELECT_COMPONENT,

    ACCEPT_CANCEL_BTN,
    SET_DESCRIPTION_BTN,
    RETURN_BTN,

    DESCRITPION_COMPONENT,
}