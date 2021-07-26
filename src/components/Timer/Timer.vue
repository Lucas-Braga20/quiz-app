<template>
    <span class="color-dark text-barlow font-light text-right inline-block w-12">
        {{time}}
    </span>
</template>

<script>
export default {
    name: 'Timer',
    props: {
        init: {
            type: Number,
        },
    },
    data() {
        return {
            timer: '',
            time: '00:00:00',
            initialTime: '',
        };
    },
    created () {
        if(this.init) {
            this.timerStart();
        }
    },
    methods: {
        timerStart() {
            this.initialTime = window.moment();

            this.timer = setInterval(() => {
                this.time = this.getTime();
            }, 1000);
        },
        timerStop() {
            this.emitter.emit('timerStop', this.time);
            clearInterval(this.timer);
        },
        getTime() {
            return window.moment.utc(window.moment().diff(this.initialTime)).format("HH:mm:ss");
        },
    },
    watch: {
        init(value) {
            if(value) {
                this.timerStart();
            } else {
                this.timerStop();
            }
        }
    },
}
</script>