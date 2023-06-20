<!-- <template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

    <router-view />
  </div>
</template> -->

<template>
  <div class="flex min-h-full flex-col justify-center">
    <Disclosure as="nav" class="bg-gray-800">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center ">

          <div class="block ml-auto">
            <div class="ml-4 flex items-center md:ml-6">
              <Menu as="div" v-if="user_id" class="relative ml-3">
                <div>
                  <MenuButton
                    class="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span class="sr-only">Open user menu</span>
                    <img class="h-8 w-8 rounded-full" :src="imageUrl" alt="" />
                  </MenuButton>
                </div>
              <transition enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95">
                  <MenuItems
                    class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <!-- <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                                                                          <a :href="item.href"
                                                                            :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">{{
                                                                              item.name }}</a>
                                                                          </MenuItem> -->
                    <MenuItem as="div" class="block px-4 py-2 text-sm text-gray-700">
                    Welcome {{ name }}!
                    </MenuItem>
                    <MenuItem as="div">
                    <a @click="logout()" href="#" class="block px-4 py-2 text-sm text-gray-700">
                      Sign out
                    </a>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </Disclosure>

    <main>
      <div class="mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541';
</script>

<script>
import { mapGetters } from 'vuex'
import { HTTP } from './components/http-common';
import router from "./router";

export default {
  name: 'App',
  data: () => ({
  }),
  computed: {
    ...mapGetters(['user_id', 'name'])
  },
  created() {
    if (!this.$store.state.user_id && JSON.parse(localStorage.getItem('accessToken'))) {
      this.getUserInfo()
    }
  },
  mounted: function () {
  },
  methods: {
    getUserInfo: async function () {
      try {
        const res = await HTTP.get('userinfo')
        const name = res.data.data.name
        const id = res.data.data.id
        this.$store.dispatch('user_id', id)
        this.$store.dispatch('name', name)
      } catch (err) {
        console.log(err);
        localStorage.removeItem('accessToken');
        this.$store.dispatch('user_id', '')
        this.$store.dispatch('name', '')
        router.push({ path: '/login' })
      }
    },
    logout: async function () {
      try {
        const res = await HTTP.post('logout', {})
        localStorage.removeItem('accessToken');
        this.$store.dispatch('user_id', '')
        this.$store.dispatch('name', '')
        router.push({ path: '/login' })
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>