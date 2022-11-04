import axios from 'axios';

export async function getRestDataAPIRequest(configURL): Promise<any> {

    console.log("getRestDataAPIRequest:");
    let response;
    try {
        response = await axios.post<any>(configURL);
        console.log(response.data.elements);
        return response.data.elements;
    } catch (error) {
        throw new Error(error);
    }
}

export default getRestDataAPIRequest;