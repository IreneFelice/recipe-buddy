function isTokenValid(decodedToken) {
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (!decodedToken || !decodedToken.exp) {
        return false
    } else {
        // if (decodedToken.exp > currentTimestamp){
    //     const validMinutes = 0;
    //     const validHours = 5;
    //     const validTime = validMinutes * 60 + validHours * 3600;
    //
    //     return (decodedToken.iat + validTime) > currentTimestamp;
    //
    // } else {
        return decodedToken.exp > currentTimestamp;
    }
}

export default isTokenValid;

