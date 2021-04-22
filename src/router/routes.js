const routes = [
    {
        path: '/',
        component: () => import('layouts/FrameWithDrawer'),
        children: [
            { path: 'all', component: () => import('pages/Warehouse') },
            { path: 'user-home', component: () => import('pages/UserHome') },
            { path: 'settings', component: () => import('pages/Index') },
            { path: 'edit-medical/:id', component: () => import('pages/EditMedical') }
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
