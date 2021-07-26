<template>
    <div id="aqui">
        <Transition  
			enter-active-class="fade-enter-class"
			leave-active-class="fade-leave-class"
			appear
		>
			<div 
				class="w-screen h-screen bg-black bg-opacity-80 absolute z-50 flex justify-center items-center"
				v-if="showModal"
				@click="showModal = false"
			>
			</div>
		</Transition>
		<Transition 
			enter-active-class="pop-enter-class"
			leave-active-class="pop-leave-class"
			appear
		>
			<ModalContent 
				v-on:closeModal="showModal = false" 
				v-if="showModal" 
				role="dialog"

				:total="total"
				:right="right"
				:wrong="wrong"
				:timer="timer"
			>
                <div class="flex justify-center">
                    <button 
                        class="
                            background-red rounded-md 
                            transition ease-in-out duration-200 
                            text-barlow text-md font-normal text-white 
                            hover:background-dark-red-700
                            py-2 px-5
                        "
                        @click.prevent="closeModal()"
                    >
                        View details
                    </button>
                </div>
            </ModalContent>	
		</Transition>
    </div>
</template>

<script>
import ModalContent from './ModalContent.vue';

export default {
    name: 'Modal',
    components: { ModalContent },
    data() {
		return {
			showModal: false,
			total: 0,
			right: 0,
			wrong: 0,
			timer: '',
		};
	},
    mounted() {
        this.emitter.on('openModal', values => {
			this.total = values.total;
			this.right = values.right;
			this.wrong = values.wrong;
			this.timer = values.timer;

			this.showModal = true;
		});
    },
    created() {
        document.addEventListener('keydown', e => this.pressEsc(e));
    },
    beforeUnmount() {
        document.removeEventListener('keydown', this.pressEsc);
    },
    methods: {
        closeModal() {
            this.showModal = false;      
        },
        pressEsc(event) {
            if(event.key == 'Escape') {
                this.closeModal();
            }
        },
    },
}
</script>

<style>
	.fade-enter-class {
		animation: fadeIn 0.2s linear;
	}
	.fade-leave-class {
		animation: fadeOut 0.3s linear;
	}
	.pop-enter-class {
		animation: popIn 0.4s cubic-bezier(0.5, 0, 0.5, 1);
	}
	.pop-leave-class {
		animation: popOut 0.2s ease-in-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	@keyframes fadeOut {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	@keyframes popIn {
		from {
            opacity: 0;
			transform: scale(0.70);
		}
		to {
            opacity: 1;
			transform: scale(1);
		}
	}
	@keyframes popOut {
		from {
            opacity: 1;
			transform: scale(1);
		}
		to {
            opacity: 0;
			transform: scale(0.70);
		}
	}
</style>