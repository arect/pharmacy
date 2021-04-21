const routes = [
    {
        path: '/',
        component: () => import('layouts/FrameWithDrawer'),
        children: [
            { path: 'all', component: () => import('pages/Warehouse') },
            { path: 'settings', component: () => import('pages/Index') }
        ]
    }, {
        path: '/login',
        component: () => import('layouts/Frame'),
        children: [
            { path: '', component: () => import('pages/Login') }
        ]
    }, {
        path: '/:catchAll(.*)*',
        component: () => import('layouts/Frame'),
        children: [
            { path: '', component: () => import('pages/Error404.vue') }
        ]
    }
]

export default routes
