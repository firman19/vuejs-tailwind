<template>
    <BackButton />
    <div class="sm:mx-auto sm:w-full md:max-w-2xl">
        <h2 class="text-2xl font-bold leading-9 tracking-tight text-gray-900">Write a blog
        </h2>
        <div v-if="error" class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert">
            <span class="block sm:inline">{{ error }}</span>
        </div>
        <form class="space-y-6" @submit.prevent="createBlog()">
            <div>
                <div class="mt-2">
                    <input id="title" v-model="title" type="text" placeholder="Write your title here..."
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
                <p v-if="invalid?.title" class="text-red-500 text-xs">{{ invalid.title[0] }}</p>
            </div>

            <div class="mb-2">
                <textarea id="message" rows="4" v-model="body"
                    class=" block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Write your thoughts here..."></textarea>
                <p v-if="invalid?.body" class="text-red-500 text-xs">{{ invalid.body[0] }}</p>
            </div>
            <div>

                <button type="submit" class="btn btn-blue py-2 px-4 rounded items-center ml-auto block">
                    Publish now
                </button>
            </div>
        </form>
    </div>
</template>


<script>
import { HTTP } from '../components/http-common';
import router from "../router";
import BackButton from '@/components/BackButton.vue';

export default {
    name: 'BlogAdd',
    components: {
        BackButton
    },
    data: () => ({
        title: '',
        body: '',
        error: null,
        success: false,
        invalid: null
    }),
    methods: {
        createBlog: async function () {
            const payload = { title: this.title, body: this.body };
            this.success = false;
            this.error = null;
            this.invalid = null;
            try {
                const res = await HTTP.post('blogs', payload)
                this.success = true;
                this.title = '';
                this.body = '';
                router.push({ path: '/blogs' })
            } catch (err) {
                const code = err.response?.status;
                if (code === 400) {
                    this.invalid = err.response.data.data;
                } else {
                    this.error = err.message;
                }
            }
        }
    }
}
</script>