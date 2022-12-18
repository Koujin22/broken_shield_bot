module.exports = async (oldMember, newMember)=> {
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