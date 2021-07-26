<template>
    <div class="flex items-center justify-center relative text-left">
        <button
            type="button"
            class="
                w-full
                flex items-center justify-between 
                leading-5 
                transition ease-in-out duration-150 
                z-40 
                text-sm font-medium text-gray-500
                px-4 py-2 
                bg-white 
                rounded-md
                border
                hover:text-red-700
                active:text-red-700"
            @click.stop.prevent="toggle()"
        >
            {{ text }}
            <svg
                class="h-4 w-4 -mr-1 ml-2"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                />
            </svg>
        </button>

        <Transition
            enter-active-class="select-enter-class"
            leave-active-class="select-leave-class"
            appear
        >
            <div v-show="isOpen" class="w-full origin-top-right absolute top-9 mt-2 w-56 z-50">
                <div class="w-full h-1 rounded-t-lg bg-white"></div>
                <div 
                    class="container-option bg-white"
                    data-simplebar
                    >
                        <div>
                            <slot/>
                        </div>
                </div>
                <div class="w-full h-1 rounded-b-lg bg-white"></div>
            </div>
        </Transition>
    </div>
</template>

<script>
export default {
    name: 'Select',
    components: {},
    provide() {
        return {select: this}
    },  
    props: {
        text: {
            type: String,
            default: 'Select',
        },
    },
    data: function () {
        return {
            isOpen: false,
        };
    },
    mounted: function () {
        document.addEventListener('click', this.clickOutListener);
    },
    beforeUnmount: function () {
        document.removeEventListener('click', this.clickOutListener);
    },
    created: function () {
        this.emitter.on('select::open', this.rootCloseListener);
    },
    methods: {
        toggle: function () {
            this.isOpen = !this.isOpen;
        },
        close: function () {
            this.isOpen = false;
        },
        clickOutListener: function (event) {
            if(!this.$el.contains(event.target)) {
                this.isOpen = false;
            }
        },
        rootCloseListener: function (component) {
            if(component !== this) {
                this.close();
            }
        },
    },
    watch: {
        isOpen(value) {
            if(value) {
                this.emitter.emit('select::open', this);
            }
        },
    },
}
</script>

<style>
    .container-option {
        max-height: 250px;
    }

    .select-enter-class {
        animation: selectIn 75ms ease-out;
    }
    .select-leave-class {
        animation: selectOut 75ms ease-in;
    }

    @keyframes selectIn {
        from {
            opacity: 0;
            --tw-scale-x: .95;
            --tw-scale-y: .95;
        }
        to {
            opacity: 1;
            --tw-scale-x: 1;
            --tw-scale-y: 1;
        }
    }

    @keyframes selectOut {
        from {
            opacity: 1;
            --tw-scale-x: 1;
            --tw-scale-y: 1;
        } 
        to {
            opacity: 0;
            --tw-scale-x: .95;
            --tw-scale-y: .95;
        }
    }
</style>