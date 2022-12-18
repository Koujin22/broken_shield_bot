
const KEYS = [
    {
        label: 'Ruby Life Pools',
        value: 'RLP'
    },
    {
        label: 'The Nokhud Offensive',
        value: 'NO'
    },
    {
        label: 'The Azure Vault',
        value: 'AV'
    },
    {
        label: 'Algeth\'ar Academy',
        value: 'AA'
    },
    {
        label: 'Halls of Valor',
        value: 'HoV'
    },
    {
        label: 'Court of Stars',
        value: 'CoS'
    },
    {
        label: 'Shadowmoon Burial Grounds',
        value: 'SBG'
    },
    {
        label: 'Temple of the Jade Serpent',
        value: 'TotJS'
    },
]

const ROLE_SELECT = [
    {
        label: 'Tank',
        value: 'tank'
    },
    {
        label: 'Healer',
        value: 'healer'
    },
    {
        label: 'DPS',
        value: 'dps'
    }
]

const ROLES = [
    {
        label: 'Tank',
        value: 'tank'
    },
    {
        label: 'Healer',
        value: 'healer'
    },
    {
        label: 'DPS',
        value: 'dps1'
    },
    {
        label: 'DPS',
        value: 'dps2'
    },
    {
        label: 'DPS',
        value: 'dps3'
    },
]

const KEY_TO_NAME = {
    RLP: "Ruby Life Pools",
    NO: "The Nokhud Offensive",
    AV: "The Azure Vault",
    AA: "Algeth'ar Academy",
    HoV: "Halls of Valor",
    CoS: "Court of Stars",
    SBG: "Shadowmoon Burial Grounds",
    TotJS: "Temple of the Jade Serpent"
}

const NAME_TO_KEY = {
    "Ruby Life Pools": "RLB",
    "The Nokhud Offensive": "NO",
    "The Azure Vault": "AV",
    "Algeth'ar Academy": "AA",
    "Halls of Valor": "HoV",
    "Court of Stars": "CoS",
    "Shadowmoon Burial Grounds": "SBG",
    "Temple of the Jade Serpent": "TotJS",
}

const KEY_TO_URL = {
    RLP: "https://wow.zamimg.com/uploads/guide/header/17811.jpg?1669415775&maxWidth=630",
    NO: "https://wow.zamimg.com/uploads/guide/header/17746.jpg?1669416119&maxWidth=630",
    AV: "https://wow.zamimg.com/uploads/guide/header/17808.jpg?1669416036&maxWidth=630",
    AA: "https://wow.zamimg.com/uploads/guide/header/17750.jpg?1669413747&maxWidth=630",
    HoV: "https://wow.zamimg.com/uploads/guide/header/18657.jpg?1670809010&maxWidth=630",
    CoS: "https://wow.zamimg.com/uploads/guide/header/18759.jpg?1670797583&maxWidth=630",
    SBG: "https://wow.zamimg.com/uploads/guide/header/18680.jpg?1670808598&maxWidth=630",
    TotJS: "https://wow.zamimg.com/uploads/guide/header/18760.jpg?1670808293&maxWidth=630"
}

module.exports = {
    KEYS,
    ROLES,
    KEY_TO_NAME,
    NAME_TO_KEY,
    ROLE_SELECT,
    KEY_TO_URL
}