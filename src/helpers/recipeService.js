import axios from 'axios';

async function storeToUserInfo (userRequest, updatedRecipes, token) {

    try {
        await axios.put(userRequest,
            {
                'info': JSON.stringify(updatedRecipes),
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });
        // updateBookRecipes(updatedRecipes);
    } catch (error) {
        console.error("saveRecipes failed", error);
        return "Sorry, saving recipe failed.";
    }
}

export default storeToUserInfo;