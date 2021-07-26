<template>
    <div class="bg-white rounded w-600 h-fit-content z-50 p-5 absolute m-auto top-0 bottom-0 left-0 right-0">
        <div>
            <h3 class="text-barlow font-light text-4xl text-center color-red">Completed Quiz!</h3>
        </div>  
        <div>
            <div>
                <p class="text-barlow font-lighter text-lg text-center text-gray-500">Congratulations, you have completed the quiz.</p>
            </div>
            <div class="my-1">
                <p class="text-barlow text-md font-normal text-gray-700">Right questions: <span class="color-green">{{right}} ({{correctPercentage}})</span></p>
            </div>
            <div class="my-1">
                <p class="text-barlow text-md font-normal text-gray-700">Wrong questions: <span class="color-red">{{wrong}} ({{incorrectPercentage}})</span></p>
            </div>
            <div class="my-1">
                <p class="text-barlow text-md font-normal text-gray-700">Total time: <span class="color-red">{{timer}}</span></p>
            </div>
        </div>
        <slot/>
    </div>
</template>

<script>
export default {
    name: 'Modal',
    props: {
		total: {
			type: Number,
		},
		right: {
			type: Number,
		},
		wrong: {
			type: Number,
		},
		timer: {
			type: String,
		},
	},
    computed: {
        correctPercentage() {
            return ((this.right / this.total) * 100) + '%';
        },
        incorrectPercentage() {
            return ((this.wrong / this.total) * 100) + '%';
        },
    },
    watch: {
        total(value) {
            console.log('total atualizado: ' + value);
        },
        right(value) {
            console.log('Right atualizado: ' + value);
        },
        wrong(value) {
            console.log('Wrong atualizado: ' + value);
        },
        timer(value) {
            console.log('Timer atualizado: ' + value);
        },
    },
}
</script>