export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      {
        path: '',
        component: () => import('pages/List'),
        meta: { title: 'List of trees' }
      },
      {
        path: 'trees/:id',
        name: 'Details',
        component: () => import('pages/Details'),
        meta: { title: 'Tree' }
      },
      {
        path: 'trees/:id/navigate',
        name: 'Navigate',
        component: () => import('pages/Navigate'),
        meta: { title: 'Navigate to tree' }
      },
      {
        path: 'info/app',
        name: 'AboutApp',
        component: () => import('pages/Info/AboutApp'),
        meta: { title: 'About the app' }
      },
      {
        path: 'info/trees',
        name: 'AboutTrees',
        component: () => import('pages/Info/AboutTrees'),
        meta: { title: 'About the trees' }
      }
    ]
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
