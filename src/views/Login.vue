<template>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account
        </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div v-if="error" class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert">
            <span class="block sm:inline">{{ error }}</span>
        </div>
        <form class="space-y-6" @submit.prevent="login()">
            <div>
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div class="mt-2">
                    <input id="email" v-model="email" type="text"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
                <p v-if="invalid?.email" class="text-red-500 text-xs">{{ invalid.email[0] }}</p>
            </div>

            <div>
                <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div class="mt-2">
                    <input id="password" v-model="password" type="password"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
                <p v-if="invalid?.password" class="text-red-500 text-xs">{{ invalid.password[0] }}</p>
            </div>

            <div>
                <button type="submit"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                    in</button>
            </div>
        </form>

        <p class="mt-10 text-center text-sm text-gray-500">
            Don't have an account?
            <router-link to="/register" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Register now
            </router-link>
        </p>
    </div>
</template>

<script>
import { HTTP } from '../components/http-common';
import router from "../router";

export default {
    data: () => ({
        email: '',
        password: '',
        error: null,
        success: false,
        invalid: null
    }),
    created() {
        if (JSON.parse(localStorage.getItem("accessToken"))) {
            router.push({ path: '/blogs' })
        }
    },
    methods: {
        login: async function () {
            const payload = { email: this.email, password: this.password };
            this.success = false;
            this.error = null;
            this.invalid = null;
            try {
                const res = await HTTP.post('login', payload)
                this.success = true;
                this.email = '';
                this.password = '';

                const token = res.data.data.token;
                const name = res.data.data.name;
                const id = res.data.data.id;

                this.$store.dispatch('user_id', id)
                this.$store.dispatch('name', name)
                localStorage.setItem('accessToken', JSON.stringify(token));

                router.push({ path: '/blogs' })
            } catch (err) {
                const code = err.response?.status;
                if (code === 400) {
                    this.invalid = err.response.data.data;
                } else if (code === 401) {
                    // this.error = err.message;
                    this.error = err.response.data.message;
                }
            }
        }
    }
}
</script>