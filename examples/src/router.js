import navConfig from './nav.config.json';

const load = function(name) {
  return r => require.ensure([], () => r(require(`./views/pages/${name}.vue`)));
};

const loadDocs = function(name) {
  return r => require.ensure([], () => r(require(`./docs/${name}.md`)));
};

const registerDocumentRoute = (navConfig) => {
  let routes = [];
  let menus = navConfig.menus;
  routes.push({
    path: 'document',
    name: 'document',
    show: true,
    redirect: '/layout/document/installation',
    component: load('Document'),
    children: []
  });
  menus.forEach(menItem => {
    if (menItem.href) {
      return;
    }
    if (menItem.groups) {
      menItem.groups.forEach(group => {
        group.list.forEach(nav => {
          addRoute(nav);
        });
      });
    }
    else if (menItem.children) {
      menItem.children.sort((first, second) => {
        return first.name < second.name;
      });
      menItem.children.forEach(nav => {
        addRoute(nav);
      });
    }
    else {
      addRoute(menItem);
    }
  });

  function addRoute(menuItem) {
    const component = menuItem.path === '/changelog' ? load('Changelog') : loadDocs(menuItem.name);
    const child = {
      path: menuItem.path.slice(1),
      meta: {
        title: menuItem.title || menuItem.name,
        description: menuItem.description
      },
      name: 'component-' + (menuItem.title || menuItem.name),
      component: component.default || component
    };
    routes[0].children.push(child);
  }
  return routes;
};

const generatePageRoutes = function() {
  const homeRoute = {
    path: 'home',
    show: true,
    name: 'home',
    component: load('Index'),
  };
  const guideRoute = {
    path: 'guide',
    show: true,
    name: 'guide',
    redirect: '/layout/guide/design',
    component: load('Guide'),
    children: [{
      path: 'design',
      name: 'guide-design',
      component: load('Design')
    }]
  };
  return [homeRoute, guideRoute];
};

const documentRouter = registerDocumentRoute(navConfig);
const layoutRouter = generatePageRoutes().concat(documentRouter);

const defaultPath = '/layout/home';
const router = [
  {
    path: '/',
    redirect: defaultPath,
  },
  {
    path: '/layout',
    component: r => require.ensure([], () => r(require('./views/Layout.vue'))),
    children: [
      ...layoutRouter
    ],
  },
  {
    path: '/pages',
    show: true,
    name: 'pages',
    redirect: '/pages/error',
    component: load('CommonContainer'),
    children: [
      {
        path: 'error',
        name: 'error',
        component: load('ErrorPage')
      },
      {
        path: 'result',
        name: 'result',
        component: load('ResultPage')
      }]
  },
  {
    path: '/test',
    show: true,
    name: 'test',
    component: () => import('./Test'),
  },
  {
    path: '*',
    redirect: defaultPath
  }];

export default router;
