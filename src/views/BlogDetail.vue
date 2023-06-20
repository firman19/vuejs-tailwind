<template>
    <BackButton />
    <div class="sm:mx-auto sm:w-full md:max-w-2xl">
        <div v-if="error" class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert">
            <span class="block sm:inline">{{ error }}</span>
        </div>
        <div v-if="success.read">
            <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl mb-2">{{ blog.title }}</h1>
            <!-- article -->
            <div class="mb-4">
                <p class="text-base text-gray-900" v-html="blog.body">
                </p>
                <div class="text-right">
                    <button @click="likeBlog(1)"
                        :class="[blog.has_liked === 1 ? '' : 'btn-blue ', 'mr-1 btn py-2 px-4 rounded inline-flex items-center text-xs']"
                        :disabled="blog.has_liked === 1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                            <path
                                d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                        </svg>
                        <span>Like ({{ blog.total_like }})</span>
                    </button>
                    <button @click="likeBlog(-1)"
                        :class="[blog.has_liked === -1 ? '' : 'btn-blue ', 'btn py-2 px-4 rounded inline-flex items-center text-xs']"
                        :disabled="blog.has_liked === -1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                            <path
                                d="M15.73 5.25h1.035A7.465 7.465 0 0118 9.375a7.465 7.465 0 01-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 01-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 00-.322 1.672V21a.75.75 0 01-.75.75 2.25 2.25 0 01-2.25-2.25c0-1.152.26-2.243.723-3.218C7.74 15.724 7.366 15 6.748 15H3.622c-1.026 0-1.945-.694-2.054-1.715A12.134 12.134 0 011.5 12c0-2.848.992-5.464 2.649-7.521.388-.482.987-.729 1.605-.729H9.77a4.5 4.5 0 011.423.23l3.114 1.04a4.5 4.5 0 001.423.23zM21.669 13.773c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.959 8.959 0 01-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227z" />
                        </svg>
                        <span>Dislike ({{ blog.total_dislike }})</span>
                    </button>
                </div>
            </div>

            <!-- add comment -->
            <div class="mb-1">
                <form @submit.prevent="addComment()">
                    <div class="mb-2">
                        <textarea id="message" rows="4" v-model="commentPayload"
                            class="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Write your thoughts here..."></textarea>
                        <p v-if="invalid?.comment" class="text-red-500 text-xs">{{ invalid.comment[0] }}</p>
                    </div>
                    <button type="submit" class="btn btn-blue py-2 px-4 rounded items-center ml-auto block">
                        Add comment
                    </button>
                </form>
            </div>

            <!-- comments -->
            <div class="mb-1">
                <ul v-if="comments && comments.length" role="list" class="divide-y divide-gray-100">
                    <li v-for="comment of comments" v-bind:key="comment.id" class="flex justify-between gap-x-6 py-5">
                        <div class="flex gap-x-4">
                            <div class="min-w-0 flex-auto">
                                <p class="mt-1 truncate text-sm leading-5 text-gray-500">{{ comment.name }}</p>
                                <div class="leading-6 text-gray-900">
                                    {{ comment.comment }}
                                </div>
                                <!-- NEED TO VALIDATE WITH CURRENT USER -->
                                <div v-if="comment.user_id === user_id">
                                    <router-link :to="`/comments/edit/${comment.id}`" class="btn btn-blue text-xs">
                                        Edit comment
                                    </router-link>
                                    <!-- <div>
                                        <button @click="deleteComment(comment.id)" class="btn btn-red text-xs">
                                            Delete comment
                                        </button>
                                    </div> -->
                                </div>
                            </div>
                        </div>
                        <div class="sm:flex sm:flex-col sm:items-end">
                            <button @click="likeComment(1, comment.id)"
                                class="flex text-xs leading-5 text-blue-500 mb-2 hover:text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class="w-4 h-4">
                                    <path
                                        d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                                </svg>
                                {{ comment.total_like }}
                            </button>
                            <button @click="likeComment(-1, comment.id)"
                                class="flex text-xs leading-5 text-blue-500 hover:text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class="w-4 h-4">
                                    <path
                                        d="M15.73 5.25h1.035A7.465 7.465 0 0118 9.375a7.465 7.465 0 01-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 01-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 00-.322 1.672V21a.75.75 0 01-.75.75 2.25 2.25 0 01-2.25-2.25c0-1.152.26-2.243.723-3.218C7.74 15.724 7.366 15 6.748 15H3.622c-1.026 0-1.945-.694-2.054-1.715A12.134 12.134 0 011.5 12c0-2.848.992-5.464 2.649-7.521.388-.482.987-.729 1.605-.729H9.77a4.5 4.5 0 011.423.23l3.114 1.04a4.5 4.5 0 001.423.23zM21.669 13.773c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.959 8.959 0 01-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227z" />
                                </svg>
                                {{ comment.total_dislike }}
                            </button>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
    </div>
</template>


<script>
import { HTTP } from '../components/http-common';
import { mapGetters } from 'vuex'
import BackButton from '@/components/BackButton.vue';

export default {
    name: 'BlogDetail',
    components: {
        BackButton
    },
    data() {
        return {
            error: null,
            blog: null,
            comments: [],
            success: {
                read: false,
            },
            commentPayload: null,
            invalid: null
        }
    },
    computed: {
        ...mapGetters(['user_id', 'name'])
    },
    created() {
        this.fetchBlogData()
        this.fetchCommentData()
    },
    methods: {
        async fetchBlogData() {
            HTTP.get(`blogs/${this.$route.params.id}`)
                .then(response => {
                    const data = response.data.data
                    this.blog = data
                    this.success.read = true

                })
                .catch(e => {
                    this.error = e.message;
                    const code = e.response?.status;
                    if (code === 404) {
                        this.error = e.response.data.message;
                    }
                })
        },
        async fetchCommentData() {
            HTTP.get(`blogs/comments/${this.$route.params.id}`)
                .then(response => {
                    const data = response.data.data
                    this.comments = data.data
                })
                .catch(e => {
                    console.log(e);
                })
        },
        addComment: async function () {
            const payload = {
                comment: this.commentPayload,
                blog_id: this.$route.params.id
            };
            this.invalid = null;
            try {
                const res = await HTTP.post('comments', payload)
                this.commentPayload = null
                this.fetchCommentData()
            } catch (err) {
                const code = err.response?.status;
                if (code === 400) {
                    this.invalid = err.response.data.data;
                } else {
                    this.error = err.message;
                }
            }
        },
        likeBlog: async function (status) {
            const payload = { status };
            try {
                const res = await HTTP.post('blogs/likes/' + this.$route.params.id, payload)
                this.fetchBlogData()
            } catch (err) {
                console.log(err);
            }
        },
        likeComment: async function (status, id) {
            const payload = { status };
            try {
                const res = await HTTP.post('comments/likes/' + id, payload)
                this.fetchCommentData()
            } catch (err) {
                console.log(err);
            }
        },
        deleteComment: async function (id) {
            try {
                const res = await HTTP.delete('comments/' + id)
                this.fetchCommentData()
            } catch (err) {
                console.log(err);
            }
        }
    }
}


</script>