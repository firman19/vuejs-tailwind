<template>
    <div class="sm:mx-auto xl:w-full md:max-w-2xl">
        <div class="text-right">
            <router-link :to="`/blogs/add`" class="btn btn-blue text-md">
                Create new blog
            </router-link>
        </div>

        <h2 class="text-2xl font-bold leading-9 tracking-tight text-gray-900">Search blog</h2>

        <form @submit.prevent="filterBlog()" class="mb-6">
            <div>
                <div class="mt-2">
                    <input id="uid" v-model="uid" type="text" placeholder="Enter a user ID"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
                <p v-if="invalid?.uid" class="text-red-500 text-xs">{{ invalid.uid[0] }}</p>
            </div>

            <div>
                <div class="mt-2">
                    <input id="status" v-model="status" type="text" placeholder="Enter a status (0/1)"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
                <p v-if="invalid?.status" class="text-red-500 text-xs">{{ invalid.status[0] }}</p>
            </div>

            <div class="mb-2">
                <div class="mt-2">
                    <input id="date" v-model="date" type="text" placeholder="Enter a date (YYYY-MM-DD)"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
                <p v-if="invalid?.date" class="text-red-500 text-xs">{{ invalid.date[0] }}</p>
            </div>

            <button class="btn btn-blue text-md">
                Filter
            </button>


        </form>
        <h2 class="text-2xl font-bold leading-9 tracking-tight text-gray-900">Search result</h2>
        <ul v-if="posts && posts.length" role="list" class="divide-y divide-gray-100">
            <li v-for="post of posts" v-bind:key="post.id" class="flex justify-between gap-x-6 py-5">
                <div class="flex gap-x-1">
                    <div class="min-w-0 flex-auto">
                        <router-link :to="`/blogs/${post.id}`"
                            class="font-semibold leading-6 text-gray-900 hover:text-gray-500">
                            {{ post.title }}
                        </router-link>
                        <p class="mt-1 truncate text-sm leading-5 text-gray-500">{{ post.author }}</p>
                        <div>
                            <router-link :to="`/blogs/${post.id}`" class="btn btn-blue text-xs">
                                Read blog
                            </router-link>
                        </div>
                        <!--  WITH CURRENT USER -->
                        <div v-if="post.user_id === user_id">
                            <router-link :to="`/blogs/edit/${post.id}`" class="btn btn-blue text-xs">
                                Edit blog
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="text-right">
                    <p class="flex mt-1 text-xs leading-5 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                        </svg>
                        {{ post.total_comment }}
                    </p>
                    <p class="flex mt-1 text-xs leading-5 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4">
                            <path
                                d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                        </svg>
                        {{ post.total_like }}
                    </p>
                    <p class="flex mt-1 text-xs leading-5 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4">
                            <path
                                d="M15.73 5.25h1.035A7.465 7.465 0 0118 9.375a7.465 7.465 0 01-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 01-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 00-.322 1.672V21a.75.75 0 01-.75.75 2.25 2.25 0 01-2.25-2.25c0-1.152.26-2.243.723-3.218C7.74 15.724 7.366 15 6.748 15H3.622c-1.026 0-1.945-.694-2.054-1.715A12.134 12.134 0 011.5 12c0-2.848.992-5.464 2.649-7.521.388-.482.987-.729 1.605-.729H9.77a4.5 4.5 0 011.423.23l3.114 1.04a4.5 4.5 0 001.423.23zM21.669 13.773c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.959 8.959 0 01-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227z" />
                        </svg>
                        {{ post.total_dislike }}
                    </p>
                </div>

            </li>
        </ul>
        <p v-if="posts && posts.length === 0">
            No result
        </p>
    </div>
</template>

<script>
import { HTTP } from '../components/http-common';
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            posts: [],
            errors: [],
            uid: '',
            status: '',
            date: '',
            invalid: null
        }
    },
    computed: {
        ...mapGetters(['user_id', 'name'])
    },
    created() {
        HTTP.get(`blogs`)
            .then(response => {
                const data = response.data.data
                this.posts = data.data
            })
            .catch(e => {
                this.errors.push(e)
            })
    },
    methods: {
        filterBlog: async function () {
            const queryString = `user_id=${this.uid}&status=${this.status}&date=${this.date}&`
            this.invalid = null;
            try {
                const res = await HTTP.get('blogs?' + queryString)
                const data = res.data.data
                this.posts = data.data
            } catch (err) {
                const code = err.response?.status;
                if (code === 400) {
                    this.invalid = err.response.data.data;
                } else {
                    this.error = err.message;
                }
            }
        }
    },

}
</script>