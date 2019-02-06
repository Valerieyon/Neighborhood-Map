//connecting Foursquare API to the app
class Helper {
    static baseURL() {
        return "https://api.foursquare.com/v2";
    }
    static auth() {
        const keys = {
            client_id: "LFNSSANNNFBBRFQO0MOQYD5PCY23WARBFYM53HXQESRWNUVJ",
            client_secret: "NIZBI3VGHJWZXKUW4CYI2XOWQRSYEZCJL1WGODLN3DJK5UHU",
            v: '20190206'
        }
        return Object.keys(keys)
            .map(key => `${key}=${keys[key]}`)
            .join("&");
    }
    static urlBuilder(urlParams) {
        if (!urlParams) {
            return '';
        }
        return Object.keys(urlParams)
            .map(key => `${key}=${urlParams[key]}`)
            .join("&");
    }
    static headers() {
        return {
            Accept: "application/json"
        };
    }
    static simpleFetch(endPoint, method, urlParams) {
        let requestData = {
            method,
            headers: Helper.headers()
        };
        return fetch(
            `${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(urlParams)}`,
            requestData)
            .then(result => result.json());

    }

}
export default class FoursquareAPI {
    static search(urlParams) {
        return Helper.simpleFetch("/venues/search", "GET", urlParams);
    }
    static getVenueDetails(VENUE_ID) {
        return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET");
    }
    static getVenuePhotos(VENUE_ID) {
        return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET");
    }
}