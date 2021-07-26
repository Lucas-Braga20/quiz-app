<template>
    <div class="background-quiz w-screen h-screen flex justify-center items-center">
        <div class="flex flex-col h-600 justify-start items-center">
            <div class="w-726">
                <!-- header -->
                <div class="bg-white rounded flex flex-row items-center justify-between px-5 py-3 my-3">
                    <!-- Icon Left Arrow -->
                    <div @mousedown.prevent="leftQuestion" class="cursor-pointer fill-red hover:fill-dark-red-700 transition ease-in-out duration-200">
                        <svg aria-hidden="true" width="15" focusable="false" data-prefix="fas" data-icon="chevron-left" class="svg-inline--fa fa-chevron-left fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                            <path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z">
                            </path>
                        </svg>
                    </div>
                    <!-- Answered Questions -->
                    <div>
                        <p class="text-baloo color-red font-bold text-lg">
                            Answered Questions 
                            <span class="color-dark text-barlow font-light text-2xl text-right inline-block w-4">{{this.answeredQuestions}}</span>
                            <span class="color-dark text-barlow font-light">/{{this.totalQuestions}}</span>
                        </p>
                    </div>
                    <!-- Timer  -->
                    <div>
                        <p class="text-baloo color-red font-bold text-lg">
                            Timer 
                            <Timer :init="timerState"/>
                        </p>
                    </div>
                    <!-- Icon Right Arrow -->
                    <div @mousedown.prevent="rightQuestion" class="cursor-pointer fill-red hover:fill-dark-red-700 transition ease-in-out duration-200">
                        <svg aria-hidden="true" width="15" focusable="false" data-prefix="fas" data-icon="chevron-right" class="svg-inline--fa fa-chevron-right fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                            <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z">
                            </path>
                        </svg>
                    </div>
                </div>
                <!-- Body - Question Selected -->
                <Question 
                    :num="questionSelected"
                    :category="questions[questionSelected].category"
                    :difficulty="questions[questionSelected].difficulty"
                    :type="questions[questionSelected].type"
                    :question="questions[questionSelected].question"
                >
                    <div v-for="alternative in questions[questionSelected].alternatives" :key="alternative.id">
                        <Alternative 
                            @mousedown.prevent="selectedAlternative(alternative.id)" 
                            :class="{
                                'alternative-selected': questions[questionSelected].alternativeSelected == alternative.id,
                                'alternative-correct': finish && alternative.id == 0
                            }"
                        >
                            {{alternative.answer}}
                        </Alternative>
                    </div>
                </Question>
                <div class="flex justify-center">
                    <button 
                        :disabled="questions[questionSelected].answered || questions[questionSelected].alternativeSelected < 0" 
                        @click="answerQuestion()" 
                        class="color-white background-red rounded w-200 h-40 text-baloo font-bold text-2xl hover:background-dark-red-700 transition ease-in-out duration-200 disabled:background-dark-red"
                    >
                        {{completionState}}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Question from './Question/Question.vue';
import Alternative from './Question/Alternative.vue';
import Timer from './Timer/Timer.vue';

const teste = [
	{
		category: "General Knowledge",
		type: "multiple",
		difficulty: "medium",
		question: "Scotch whisky and Drambuie make up which cocktail?",
		correctAlternative: 0,
		alternatives: [
			{ answer: "Rusty Nail", id: 0 },
			{ answer: "Manhattan", id: 3 },
			{ answer: "Sex on the Beach", id: 2 },
			{ answer: "Screwdriver", id: 1 },
		],
        alternativeSelected: -1,
        answered: false,
	},
	{
		category: "General Knowledge",
		type: "boolean",
		difficulty: "hard",
		question: "This is the correct spelling of &quot;Supercalifragilisticexpialidocious&quot;.",
		correctAlternative: 0,
		alternatives: [
			{ answer: "True", id: 0 },
			{ answer: "False", id: 1 },
		],
        alternativeSelected: -1,
        answered: false,
	},
	{
		category: "General Knowledge",
		type: "multiple",
		difficulty: "hard",
		question: "What is the romanized Arabic word for &quot;moon&quot;?",
		correctAlternative: 0,
		alternatives: [
			{ answer: "Shams", id: 3 },
			{ answer: "Kawkab", id: 2 },
			{ answer: "Najma", id: 1 },
			{ answer: "Qamar", id: 0 },
		],
        alternativeSelected: -1,
        answered: false,
	},
	{
		category: "General Knowledge",
		type: "boolean",
		difficulty: "medium",
		question: "Sitting for more than three hours a day can cut two years off a person&#039;s life expectancy.",
		correctAlternative: 0,
		alternatives: [
			{ answer: "False", id: 1 },
			{ answer: "True", id: 0 },
		],
        alternativeSelected: -1,
        answered: false,
	},
	{
		category: "General Knowledge",
		type: "boolean",
		difficulty: "easy",
		question: "Dihydrogen Monoxide was banned due to health risks after being discovered in 1983 inside swimming pools and drinking water.",
		correctAlternative: 0,
		alternatives: [
			{ answer: "True", id: 1 },
			{ answer: "False", id: 0 },
		],
        alternativeSelected: -1,
        answered: false,
	},
];

export default {
    name: 'Quiz',
    components: { Question, Alternative, Timer },
    props: {
        listQuestions: {
            type: Object,
            default: teste
        },
    },
    data() {
        return {
            questions: this.listQuestions.map(x => ({...x})),
            questionSelected: 0,
            totalQuestions: 0,
            answeredQuestions: 0,
            finish: false,
            rightQuestions: 0,
            wrongQuestions: 0,
            timer: '00:00:00',
        };
    },
    mounted () {
        this.emitter.on('timerStop', time => {
            this.timer = time;
            this.emitter.emit('openModal', {total: this.totalQuestions, right: this.rightQuestions, wrong: this.wrongQuestions, timer: this.timer});
        });
    },
    created () {
        this.totalQuestions = this.questions.length;

        document.addEventListener('keydown', e => this.keypressQuiz(e));

        this.timerState = 1;
    },
    beforeUnmount: function () {
        document.removeEventListener('keydown', this.keypressQuiz);
    },
    methods: {
        leftQuestion() {
            this.questionSelected--;

            if(this.questionSelected < 0) {
                this.questionSelected = this.totalQuestions - 1;
            }
        },
        rightQuestion() {
            this.questionSelected++;

            if(this.questionSelected >= this.totalQuestions) {
                this.questionSelected = 0;
            }
        },
        selectedAlternative(id) {
            if(!this.questions[this.questionSelected].answered) {
                this.questions[this.questionSelected].alternativeSelected = id;
            }  
        },
        answerQuestion() {
            this.questions[this.questionSelected].answered = true;
            this.answeredQuestions++;
            this.rightQuestion();
        },
        concludeQuiz() {
            this.timerState = 0;

            for(let i = 0; i < this.questions.length; i++) {
                if(this.questions[i].alternativeSelected == this.questions[i].correctAlternative) {
                    this.rightQuestions++;
                } else {
                    this.wrongQuestions++;
                }
            }

            this.finish = true;
        },
        // Botão Enter - Responde.
        // Botão ArrowLeft - Visualiza a questão anterior.
        // Botão ArrowRight - Visualiza a próxima questão.
        // Botões 1, 2, 3, 4 - Seleciona as alternativas.
        keypressQuiz(event) {
            if(event.key == 'Enter' && this.questions[this.questionSelected].alternativeSelected >= 0 && !this.questions[this.questionSelected].answered) {
                this.answerQuestion();
            }

            if(event.key == "ArrowLeft") {
                this.leftQuestion();
            }
            if(event.key == "ArrowRight") {
                this.rightQuestion();
            }

            if(event.key == "1") {
                this.selectedAlternative(this.questions[this.questionSelected].alternatives[0].id);
            }
            if(event.key == "2") {
                this.selectedAlternative(this.questions[this.questionSelected].alternatives[1].id);
            }
            if(event.key == "3" && this.questions[this.questionSelected].type == "multiple") {
                this.selectedAlternative(this.questions[this.questionSelected].alternatives[2].id);
            }
            if(event.key == "4" && this.questions[this.questionSelected].type == "multiple") {
                this.selectedAlternative(this.questions[this.questionSelected].alternatives[3].id);
            }
        },
    },
    computed: {
        completionState() {
            if(this.questions[this.questionSelected].answered) {
                return 'Respondido';
            } else {
                return 'Responder';
            }
        },
    },
    watch: {
        answeredQuestions(value) {
            if(value == this.totalQuestions) {
                this.concludeQuiz();
            }
        },
    },
}
</script>