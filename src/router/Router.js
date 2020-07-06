/**
 * Implements basic routing inside component.
 * Currently it just removes previous node and append a new one.
 */
class Router {
  /**
   * @param {string} name - used in RouteHandler for identificator
   * @param {Node} root - component in which router operates
   * @param {Array<function>} routes - routes class list
   * @param {string} currentRoute - default view which should be shown
   * @param {string} [routeTag=div] - all the routes use as an main element
   * @param {Object} [transitionClasses] - style classes for a transition between routes
   */
  constructor(
    name,
    root,
    routes,
    currentRoute,
    routeTag = 'div',
    transitionClasses = { show: 'show', hide: 'hide' },
  ) {
    this.name = name;
    this.root = root;
    this.routes = routes;
    this.routeTag = routeTag;
    this.transitionClasses = transitionClasses;

    this.showRoute(currentRoute);
  }

  init(root) {
    this.root = root;
  }

  /**
   * Hides previous route and show a new one
   * @param {string} routeName
   */
  changeRoute(routeName) {
    if (
      this.routes[routeName]
      && routeName !== this.currentRoute.routeName
    ) {
      this.createChangeRouteEvent(routeName);

      this.currentRoute.component.classList.remove(this.transitionClasses.show);
      this.currentRoute.component.addEventListener('animationend', () => {
        this.currentRoute.hide();
        this.showRoute(routeName);
      }, { once: true });
    }
  }

  createChangeRouteEvent(routeName) {
    const event = new CustomEvent('changeRoute', {
      bubbles: true,
      detail: {
        current: this.currentRoute.routeName,
        next: routeName,
      },
    });
    this.currentRoute.component.dispatchEvent(event);
  }

  /**
   * @private
   * Calls show() lifecycle method of route (if available)
   * @param {string} routeName
   */
  async showRoute(routeName) {
    if (routeName && this.routes[routeName]) {
      this.currentRoute = new this.routes[routeName](this.root, this.routeTag);
      this.currentRoute.routeName = routeName;
      await this.currentRoute.show();
      this.currentRoute.component.classList.add(
        this.transitionClasses.hide,
        this.transitionClasses.show,
      );
    }
  }
}

export default Router;
