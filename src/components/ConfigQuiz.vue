<template>
    <div class="background-quiz-app w-screen h-screen flex justify-center items-center">
        <!-- Loading Componente -->
        <Loading v-if="loading"/>
        <div class="w-726">
            <div class="w-full flex flex-col justify-center items-center">
                <h1 class="text-baloo text-5xl font-black color-red">Quiz App</h1>
                <p class="text-barlow text-lg font-light color-white">Configure as questões e inicie o teste...</p>
            </div>
            <div class="w-full">
                <div class="my-4">
                    <div class="block text-barlow text-2xl font-light color-red">Categoria</div>
                    <!-- Select Componente -->
                    <Select :text="textCategory">
                        <!-- Options -->
                        <SelectItem 
                            @click="selectCategory(category.id)" 
                            :class="{'color-red font-bold': category.id == selectedCategory}" 
                            v-for="category in categories" 
                            :key="category.id"
                        >
                            {{ category.name }}
                        </SelectItem>
                    </Select>
                </div>
                <div class="my-4">
                    <div class="block text-barlow text-2xl font-light color-red">Dificuldade</div>
                    <!-- Select Componente -->
                    <Select :text="textDifficulty">
                        <!-- Options -->
                        <SelectItem
                            @click="selectDifficulty(difficulty.id)"
                            :class="{'color-red font-bold': difficulty.id == selectedDifficulty}"
                            v-for="difficulty in difficulties"
                            :key="difficulty.id"
                        >
                            {{ difficulty.name }}
                        </SelectItem>
                    </Select>
                </div>
                <div class="my-4">
                    <div class="block text-barlow text-2xl font-light color-red">Tipo da Questão</div>
                    <!-- Select Componente -->
                    <Select :text="textType">
                        <!-- Options -->
                        <SelectItem
                            @click="selectType(type.id)"
                            :class="{'color-red font-bold': type.id == selectedType}"
                            v-for="type in types"
                            :key="type.id"
                        >
                            {{ type.name }}
                        </SelectItem>
                    </Select>
                </div>
                <div class="my-4">
                    <div class="block text-barlow text-2xl font-light color-red">Número de Questões</div>
                    <input 
                        @keydown.prevent="insertKey($event)"
                        class="w-full h-36 bg-white rounded-md px-4 py-2 text-sm font-medium text-gray-500" 
                        type="number"
                        min="0"
                        max="50"
                        placeholder="Digite o número de questões">
                </div>
            </div>
            <div class="flex justify-center mt-8">
                <button
                    :disabled="disabled"
                    @click="startQuiz()"
                    class="
                        w-200 background-red rounded-md leading-5 
                        flex items-center justify-center 
                        transition ease-in-out duration-200 
                        text-2xl font-black text-white text-baloo
                        px-4 py-2
                        hover:background-dark-red-700
                        disabled:background-dark-red"
                >
                    Jogar
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import OpenTriviaAPI from '../services/OpenTrivia.js';

import Select from './Select/Select.vue';
import SelectItem from './Select/SelectItem.vue';
import Loading from './Loading/LoadingSpinner.vue';

export default {
    name: 'ConfigQuiz',
    components: { Select, SelectItem, Loading },
    data() {
        return {
            categories: [], // Lista de Categorias carregada através da API.
            difficulties: [
                {"id": -1, name: "Any Difficulty"},
                {"id": 1, name: "Easy"},
                {"id": 2, name: "Medium"},
                {"id": 3, name: "Hard"},
            ],
            types: [
                {"id": -1, name: "Any Type"},
                {"id": 1, name: "Multiple Choice"},
                {"id": 2, name: "True / False"},
            ],
            numQuestion: 0,
            selectedCategory: 0,
            selectedDifficulty: 0,
            selectedType: 0,

            loading: false, // Estado do Loading.
            disabled: true, // Estado do botão.
        };
    },
    created () {
        this.loading = true;

        this.getCategories().then(() => this.loading = false);
    },
    methods: {
        getCategories() {
            return new Promise((resolve, reject) => {
                OpenTriviaAPI.categories(data => {
                    if(!data) {
                        reject();
                    }

                    this.categories = data.trivia_categories;
                    this.categories.unshift({"id": -1, "name": "Any Category"});
                    resolve();
                })
            });
        },
        // Verifica os valores inseridos no "input number".
        insertKey(event) {
            let value = parseInt(event.key); // Valor digitado.
            let inputValue = Math.abs(event.target.value); // Valor armazenado no input.
            let min = parseInt(event.target.min);
            let max = parseInt(event.target.max);

            // Backspace
            if(event.which == 8) {
                let arrayValue = inputValue.toString().split('');
                arrayValue.pop();
                event.target.value = arrayValue.join('');
                this.numQuestion = arrayValue.join('');
            } else {
                // Número Inteiro:
                if(Number.isInteger(value)) {
                    let totalValue = parseInt(`${inputValue}${value}`);

                    // Verifica se está no intervalo ideal:
                    if(totalValue > min && totalValue <= max) {
                        event.target.value = totalValue;
                        this.numQuestion = totalValue;
                    }
                }
            }
        },
        startQuiz() {
            if(this.numQuestion > 0) {
                // Emite um evento para carregar as questões.
                this.emitter.emit('getQuestions', {amount: this.numQuestion, category: this.selectedCategory, difficulty: this.selectedDifficulty, type: this.selectedType});
            } 
        },
        selectCategory(id) {
            this.selectedCategory = id;
        },
        selectDifficulty(id) {
            this.selectedDifficulty = id;
        },
        selectType(id) {
            this.selectedType = id;
        },
    },
    watch: {
        numQuestion(value) {
            if(value > 0) {
                this.disabled = false;
            } else if(Math.abs(value) == 0) {
                this.disabled = true;
            }
        },
    },
    computed: {
        textCategory() {
            if(this.selectedCategory) {
                let found = this.categories.find(element => element.id == this.selectedCategory);
                return found.name;
            } else {
                return "Selecione uma categoria...";
            }
        },
        textDifficulty() {
            if(this.selectedDifficulty) {
                let found = this.difficulties.find(element => element.id == this.selectedDifficulty);
                return found.name;
            } else {
                return "Selecione uma dificuldade...";
            }
        },
        textType() {
            if(this.selectedType) {
                let found = this.types.find(element => element.id == this.selectedType);
                return found.name;
            } else {
                return "Selecione um tipo...";
            }
        }
    },
}
</script>