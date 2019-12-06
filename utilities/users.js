exports.loginUserDetails = (user) => {
    return {
        username: user.username,
        id: user._id,
        email: user.email,
        token: user.token
    };
}