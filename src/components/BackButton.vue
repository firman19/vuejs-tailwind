<template>
    <button @click="$router.go(-1)" class="btn-blue mr-1 btn py-2 px-4 rounded inline-flex items-center text-xs">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        <span>Back</span>
    </button>
</template>

<script>
export default {
    name: "BackButton",
};
</script>