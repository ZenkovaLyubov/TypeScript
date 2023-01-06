export class HttpHelper {
    /**
     * Метод выполняет запрос и преобразует ответ в JSON
     * Тип ответа будет взять из дженерик параметра Response
     */
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
