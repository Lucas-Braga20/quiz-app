import axios from 'axios';

const baseUrl = 'https://opentdb.com/';

const listDifficulty = ['easy', 'medium', 'hard'];
const listType = ['multiple', 'boolean'];

export default {
    categories: function (callback) {
        const url = baseUrl + 'api_category.php';

        axios.get(url)
            .then(response => callback(response.data));
    },
    questions: function (amount, category, difficulty, type, callback) {
        const url = baseUrl + 'api.php?' + 'amount=' + amount + (category > 0 ? '&category=' + category : '') + (difficulty > 0 ? '&difficulty=' + listDifficulty[difficulty-1] : '') + (type > 0 ? '&type=' + listType[type-1] : '');

        axios.get(url)
            .then(response => callback(response.data));
    },
}