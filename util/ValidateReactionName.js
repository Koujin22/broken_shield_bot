
module.exports = (name) => {
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
        case "evokeruwu":
          	return "Key Master";
        case "CrossFaction":
            return "PvP Master";
		default:
			return undefined
	}
}