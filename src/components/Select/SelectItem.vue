<template>
    <div
        class="
            block 
            flex items-center 
            w-full px-4 py-2 
            text-sm leading-5 text-gray-500 
            hover:bg-gray-100 hover:text-gray-500 
            focus:outline-none focus:bg-gray-100 focus:text-gray-500
            cursor-pointer"
        @click="onClick()"
    >
        <slot/>
    </div>
</template>

<script>
export default {
    name: 'SelectItem',
    props: {},
    inject: ['select'],
    data: function () {
        return {};
    },
    computed: {},
    methods: {
        onClick(evt) {
            this.$emit('clickOption', evt);
            this.closeDropdown();
        },
        closeDropdown() {
            this.select.close();
        },
    },
}
</script>