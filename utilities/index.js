const md5 = require("md5");
exports.extractObject = ( obj, keys ) => {
    const returnObj = { };
    keys.forEach( key => { returnObj[ key ] = obj[ key ]; } );

    return returnObj;
};

exports.checkPass = (pass1, pass2) => {
    return pass1 === md5(pass2);
}