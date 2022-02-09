import { createRouter, createWebHistory } from 'vue-router';
import mainPage from '@/pages/mainPage';
import allAnimePage from '@/pages/allAnimePage';
import animePage from '@/pages/animePage';
import AnimeLayout from '@/pages/animeLayout';
import searchPage from '@/pages/searchPage';

const routes = [
    {
        name: 'main',
        path: "/",
        component: mainPage,
    },
    {
        name: 'animeLayout',
        path: "/anime",
        component: AnimeLayout,
        children: [
            {
                path: '/series',
                name: 'allAnime',
                component: allAnimePage,
            },
            {
                path: ":id",
                name: 'animePage',
                component: animePage,
            },
        ]
    },
    {
        name: 'searchPage',
        path: "/search",
        component: searchPage,
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)

})

export default router;