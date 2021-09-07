var User = require("../models/userModel");

exports.createUser = async function(user){
    try{
    await user.save()
}

}