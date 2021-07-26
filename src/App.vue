<template>
	<div>
		<Loading v-if="loading"/>
		<Modal/>
		<ConfigQuiz v-if="!playing"/>
		<Quiz :listQuestions="questions" v-if="playing"/>
	</div>
</template>

<script>
import OpenTriviaAPI from './services/OpenTrivia.js';

import ConfigQuiz from "./components/ConfigQuiz.vue";
import Quiz from './components/Quiz.vue';
import Modal from './components/Modal/Modal.vue';
import Loading from './components/Loading/LoadingSpinner.vue';

import("./styles/styles.css");

const numQuestions = {
    'multiple': 4,
    'boolean': 2,
}

export default {
	name: "App",
	components: { Quiz, Modal, ConfigQuiz, Loading },
	data() {
		return {
			playing: false,
			loading: false,
			questions: {},
		};
	},
	mounted () {
        // Recebe o evento para carregar as questões.
		this.emitter.on('getQuestions', config => {
			this.loading = true;

			this.getQuestions(config.amount, config.category, config.difficulty, config.type).then(() => {
				this.loading = false;
				this.playing = true; // Inicia o quiz.
			});
		});
	},
	methods: {
		getQuestions(amount, category, difficulty, type) {
            return new Promise((resolve, reject) => {
                OpenTriviaAPI.questions(amount, category, difficulty, type, data => {
                    if(!data) {
                        reject();
                    }

                    let questions = new Array();
                    
                    data.results.forEach((element) => {
                        let question = new Object();

                        question.category = element.category;
                        question.type = element.type;
                        question.difficulty = element.difficulty;
                        question.question = element.question;
                        question.correctAlternative = 0;
                        question.alternatives = new Array();

                        let random = this.getRandomIndexes(numQuestions[element.type]);

                        let alternatives = new Array();
                        alternatives[0] = new Object();
                        alternatives[0].answer = element.correct_answer;
                        alternatives[0].id = 0;

                        for(let i = 1; i < numQuestions[element.type]; i++) {
                            alternatives[i] = new Object();
                            alternatives[i].answer = element.incorrect_answers[i - 1];
                            alternatives[i].id = i;
                        }

                        for(let i = 0; i < numQuestions[element.type]; i++) {
                            question.alternatives.push(alternatives[random[i]]);
                        }

                        questions.push(question);
                    });

					this.questions = questions;

                    resolve();
                });
            });
        },
		getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        },
        getRandomIndexes(length) {
            let randomIndexes = new Array();
            randomIndexes.push(this.getRandomInt(0, length));

            for(let i = 1; i < length; i++) {
                let indicator = false;
                let index;

                do {
                    index = this.getRandomInt(0, length);

                    for(let j = 0; j < randomIndexes.length; j++) {
                        if(index == randomIndexes[j]) {
                            indicator = true;
                            break;
                        } else {
                            indicator = false;
                        }
                    }
                } while(indicator);

                randomIndexes.push(index);
            }

            return randomIndexes;
        },
	},
};
</script>