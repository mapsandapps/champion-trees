
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      {
        path: '',
        component: () => import('pages/List')
      },
    ]
  },
  {
    path: '/trees/:id',
    component: () => import('pages/Details')
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
