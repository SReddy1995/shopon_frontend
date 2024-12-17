

export const SidebarData = [
  {
    title: 'Account',
    id: 'templates',
    path: '/landing-page/account',
    scopes: ['Admin','Operator'],
    icon: <span className="fa-stack fa-md "><i className="fa fa-user-circle-o fa-stack-1x "></i></span>
  },
  {
    title: 'Dashboard',
    id: 'dashboard',
    path: '/landing-page/dashboard',
    scopes: ['Admin'],
    icon: <span className="fa-stack fa-md "><i className="fa fa-bar-chart fa-stack-1x "></i></span>
  },
  {
    title: 'Products',
    id: 'product',
    path: '/landing-page/products',
    scopes: ['Admin', 'Inventory'],
    icon: <span className="fa-stack fa-md"><i className="	fa fa-cogs fa-stack-1x "></i></span>,
    iconClosed: <span className="fa-stack fa-md"><i className="	fa fa-sort-desc fa-stack-1x "></i></span>,
    iconOpened: <span className="fa-stack fa-md"><i className="	fa fa-sort-asc fa-stack-1x "></i></span>,

    subNav: [
      {
        title: 'ONDC Products',
        id: 'products-list',
        path: '/landing-page/products/products-list',
        icon: <></>
      },
      {
        title: 'Shopify Collections',
        id: 'collections',
        path: '/landing-page/products/collections',
        icon: <></>
      },
    ]
  },
  // {
  //   title: 'Orders',
  //   id: 'orders',
  //   path: '/landing-page/orders/orders-list',
  //   scopes: ['Admin','Operator'],
  //   icon: <span className="fa-stack fa-md"><i className="fa fa fa-exchange fa-stack-1x "></i></span>
  // },
  // {
  //   title: 'Order details',
  //   id: 'order-details',
  //   path: '/landing-page/orders/order-details',
  //   scopes: ['Admin','Operator'],
  //   icon: <span className="fa-stack fa-md"><i className="fa fa fa-exchange fa-stack-1x "></i></span>
  // },
  {
    title: 'Finance',
    id: 'finance',
    path: '/landing-page/finance',
    scopes: ['Admin','Finance'],
    icon: <span className="fa-stack fa-md"><i className="fa fa fa-money fa-stack-1x "></i></span>
  },
  {
    title: 'User Management',
    id: 'user-management',
    path: '/landing-page/manage-users',
    scopes: ['Admin'],
    icon: <span className="fa-stack fa-md"><i className="fa fa fa-users fa-stack-1x "></i></span>
  },
];

