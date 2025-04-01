import { createRouter, createWebHistory } from 'vue-router'
import Pokedex from '../views/PokedexList.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Pokedex,
        },
        {
            path: '/:id',
            name: 'pokemon',
            component: Pokedex,
        },
        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: NotFound,
        }
    ],
})

export default router