const routes = [
    {
        path: '/',
        component: () => import('layouts/FrameWithDrawer'),
        children: [
            { path: 'add-medical', component: () => import('pages/AddMedical') },
            { path: 'add-order', component: () => import('pages/AddOrder') },
            { path: 'all', component: () => import('pages/Warehouse') },
            { path: 'all-orders', component: () => import('pages/AllOrders') },
            { path: 'customer-home', component: () => import('pages/CustomerHome') },
            { path: 'edit-medical/:id', component: () => import('pages/EditMedical') },
            { path: 'settings', component: () => import('pages/Index') },
            { path: 'user-home', component: () => import('pages/UserHome') }
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
