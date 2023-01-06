export class HttpHelper {
    static fetchAsJson(input, init) {
        return fetch(input, init)
            .then((response) => {
            return response.text();
        })
            .then((responseText) => {
            return JSON.parse(responseText);
        });
    }
}
