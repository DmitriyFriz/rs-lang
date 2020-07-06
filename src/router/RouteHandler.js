import get from 'lodash.get';

/**
 * The main idea is to get a simple mechanism of switching between views.
 * With such approach views on the same layer are independent.
 *
 * Can be used not only for switching between pages of the app,
 * but also for games switching, for example (one layer -> one router).
 */

/**
  * Contains all app routers
  */
const routers = {};

/**
 * Turns router 'ON'.
 * Needed for all routers
 * @param {object} router
 */
function registerRouter(router) {
  routers[router.name] = router;
}

/**
 * Turns router 'OFF'.
 * Needed for local routers (inside page) when leaving the entire page
 * @param {object} router
 */
function unregisterRouter(router) {
  router.currentRoute.hide();
  delete routers[router.name];
}

function getRouter(routerName) {
  return routers[routerName];
}

/**
 * Asks router to change route
 * @param {string} route
 * @param {string} routerName
 */
function changeRoute(route, ...routerNames) {
  routerNames.forEach((routerName) => {
    const router = getRouter(routerName);

    if (route && router) {
      router.changeRoute(route);
    }
  });
}

/**
 * Generic function, can be attached as an event listener callback
 * @param {object} event - DOM event
 * @param {string} routerName - indicates needed router
 */
function onRouteChangeEvent(event, ...routerNames) {
  const destination = get(event, 'target.dataset.destination');
  changeRoute(destination, ...routerNames);
}

export {
  registerRouter,
  unregisterRouter,
  onRouteChangeEvent,
};
