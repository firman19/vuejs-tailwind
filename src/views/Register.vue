<template>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register your account
        </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div v-if="error" class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert">
            <span class="block sm:inline">{{ error }}</span>
        </div>
        <div v-if="success" class="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert">
            <span class="block sm:inline">User is registered successfully. Please
                <router-link to="/login" class="font-bold">
                    login
                </router-link>
                to continue.</span>
        </div>
        <form class="space-y-6" @submit.prevent="register()">
            <div>
                <label for="Name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                <div class="mt-2">
                    <input id="name" v-model="name" type="text"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
                <p v-if="invalid?.name" class="text-red-500 text-xs">{{ invalid.name[0] }}</p>

            </div>

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
                <label for="confirm_password" class="block text-sm font-medium leading-6 text-gray-900">Password
                    Confirmation</label>
                <div class="mt-2">
                    <input id="confirm_password" v-model="confirm_password" type="password"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
                <p v-if="invalid?.confirm_password" class="text-red-500 text-xs">{{ invalid.confirm_password[0] }}</p>

            </div>

            <div>
                <button type="submit"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                    up</button>
            </div>
        </form>

        <p class="mt-10 text-center text-sm text-gray-500">
            Already have an account?
            <router-link to="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Login
            </router-link>
        </p>
    </div>
</template>

<script>
import { HTTP } from '../components/http-common';
import router from "../router";

export default {
    data: () => ({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
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
        register: async function () {
            const payload = {
                name: this.name,
                email: this.email,
                password: this.password,
                confirm_password: this.confirm_password,
            };
            this.success = false;
            this.error = null;
            this.invalid = null;

            try {
                const res = await HTTP.post('register', payload)
                this.success = true;
                this.name = '';
                this.email = '';
                this.password = '';
                this.confirm_password = '';
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