<template>
    <BackButton/>
    <div class="sm:mx-auto sm:w-full md:max-w-2xl">
        <div v-if="error" class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert">
            <span class="block sm:inline">{{ error }}</span>
        </div>
        <div v-if="success.read">

            <h2 class="text-2xl font-bold leading-9 tracking-tight text-gray-900">Edit your blog
            </h2>
            <form class="space-y-6" @submit.prevent="updateBlog()">
                <div>
                    <div class="mt-2">
                        <input v-model="title" id="title" name="title" type="text" placeholder="Write your title here..."
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                    <p v-if="invalid?.title" class="text-red-500 text-xs">{{ invalid.title[0] }}</p>
                </div>

                <div class="mb-2">
                    <textarea id="message" rows="4" v-model="body"
                        class="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Write your thoughts here..."></textarea>
                    <p v-if="invalid?.body" class="text-red-500 text-xs">{{ invalid.body[0] }}</p>

                </div>
                <div class="flex justify-between">
                    <button v-if="author_id === user_id" @click.prevent.self="showAlertConfirm"
                        class="btn btn-red py-2 px-4 rounded items-center block">
                        Delete blog
                    </button>

                    <button class="btn btn-blue py-2 px-4 rounded items-center ml-auto block">
                        Save
                    </button>
                </div>
            </form>
            <div>
            </div>
        </div>
    </div>
</template>


<script>
import { HTTP } from '../components/http-common';
import router from "../router";
import { mapGetters } from 'vuex'
import BackButton from '@/components/BackButton.vue';

export default {
    name: 'BlogEdit',
    components: {
        BackButton
    },
    data: () => ({
        title: '',
        body: '',
        author_id: '',
        error: null,
        success: {
            read: false,
            edit: false
        },
        invalid: null
    }),
    computed: {
        ...mapGetters(['user_id', 'name'])
    },
    created() {
        HTTP.get(`blogs/${this.$route.params.id}`)
            .then(response => {
                const data = response.data.data
                this.title = data.title
                this.body = data.body
                this.author_id = data.user_id
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
    methods: {
        updateBlog: async function () {
            const payload = { title: this.title, body: this.body };
            this.success.edit = false;
            this.error = null;
            this.invalid = null;
            try {
                const res = await HTTP.put(`blogs/${this.$route.params.id}`, payload)
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
        },
        showAlertConfirm() {
            this.$swal({
                title: 'Are you sure?',
                text: "Are you sure want to delete this blog?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.value) {
                    try {
                        const res = await HTTP.delete(`blogs/${this.$route.params.id}`, {})
                        router.push({ path: '/blogs' })
                    } catch (err) {
                        console.log(err);
                        this.$swal(
                            'Error',
                            err.message,
                            'error'
                        )
                    }
                }
            });
        }
    }
}
</script>
