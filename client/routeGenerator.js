import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

const resolvePath = (basePath, path) => `${ basePath.replace(/\/$/, '') }/${ path.replace(/^\/|\/$/g, '') }`;

const generator = (routes, { path: parentPath = '' } = {}) => {
  if (!Array.isArray(routes)) {
    const { path, indexRoute, childRoutes = [] } = routes;
    return generator(indexRoute ? [ { ...indexRoute, path, exact: true, }, ...childRoutes ] : childRoutes, routes);
  }

  if (routes.length === 0) {
    return null;
  }

  return (
    <Switch>
      {
        routes.map((route, index) => {
          const { key, path, exact = false, strict = false } = route;
          const resolvedPath = resolvePath(parentPath, path);

          return (
            <Route
              key={key || index}
              path={resolvedPath}
              exact={exact}
              strict={strict}
              component={compileComponent({ ...route, path: resolvedPath })}
            />
          )
        })
      }
    </Switch>
  );
};

const compileComponent = (route) => {
  const { component, getComponent } = route;
  const child = generator(route);

  if (component) {
    return componentWrapper(component, child);
  }

  if (getComponent) {
    return componentWrapper(Loadable({ loader: getComponent, loading: () => null }), child);
  }

  return () => child;
};

const componentWrapper = (Component, children) => (props) => <Component {...props}>{ children }</Component>;

export default generator;
