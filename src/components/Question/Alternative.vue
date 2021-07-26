<template>
    <div class="w-full bg-white rounded px-7 py-4 my-3 cursor-pointer hover:bg-gray-200 transition ease-in-out duration-200">
        <p class="text-barlow font-light text-lg color-dark"><slot/></p>
    </div>
</template>

<script>
export default {
    name: 'Alternative',
}
</script>