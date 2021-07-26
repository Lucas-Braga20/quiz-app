<template>
    <!-- Question -->
    <div class="bg-white rounded px-5 py-3">
        <!-- Question Header -->
        <div class="flex flex-row items-center justify-between">
            <!-- Question Number  -->
            <h1 class="text-baloo font-bold text-xl color-red mr-2">Question <span class="font-light color-dark text-base">{{ questionNumber }}</span></h1>
            <!-- Question Config  -->
            <div class="flex flex-row items-center">
                <!-- Category -->
                <div class="mx-2">
                    <p class="text-barlow color-red font-bold text-md">Category <span class="color-dark font-light">{{ category }}</span></p>
                </div>
                <!-- Difficulty  -->
                <div class="mx-2">
                    <p class="text-barlow color-red font-bold text-md">Difficulty <span class="color-dark font-light">{{ difficulty }}</span></p>
                </div>
                <!-- Type  -->
                <div class="mx-2">
                    <p class="text-barlow color-red font-bold text-md">Type <span class="color-dark font-light">{{ type }}</span></p>
                </div>
            </div>
        </div>
        <!-- Question Body  -->
        <div class="">
            <p class="text-barlow font-light color-dark text-lg">{{ questionBody }}</p>
        </div>
    </div>
    <slot/>
</template>

<script>
import {decode} from 'html-entities';

export default {
    name: 'Question',
    inheritAttrs: false,
    components: {},
    props: {
        num: {
            type: Number,
        },
        category: {
            type: String,
        },
        difficulty: {
            type: String,
        },
        type: {
            type: String,
        },
        question: {
            type: String,
        },
    },
    data() {
        return {}
    },
    methods: {},
    computed: {
        questionNumber() {
            if(this.num < 10) {
                return '0' + (this.num + 1);
            }
            return (this.num + 1);
        },
        questionBody() {
            return decode(this.question, {level: 'html5'});
        },
    },
}
</script>