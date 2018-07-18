
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      {
        path: '',
        component: () => import('pages/List')
      },
      {
        path: 'trees/:id',
        name: 'Details',
        component: () => import('pages/Details')
      },
      {
        path: 'trees/:id/navigate',
        name: 'Navigate',
        component: () => import('pages/Navigate')
      }
    ]
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
