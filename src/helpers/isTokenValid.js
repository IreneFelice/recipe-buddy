function isTokenValid(decodedToken) {
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (!decodedToken || !decodedToken.exp) {
        return false
    } else if (decodedToken.exp > currentTimestamp){
        const validMinutes = 5;
        const validHours = 0;
        const validTime = validMinutes * 60 + validHours * 3600;

        return (decodedToken.iat + validTime) > currentTimestamp;

    } else {
        return false
    }
}

export default isTokenValid;

