import { setClient } from '../actions';

function checkAuthorization(dispatch) {
  const storedUser = localStorage.getItem('user');

  if (storedUser) {
    const user = JSON.parse(storedUser);
    // const created = Math.round(createdDate.getTime() / 1000);
    // const ttl = 1209600;
    // const expiry = created + ttl;

    // if the user has expired return false
    // if (created > expiry) return false;

    dispatch(setClient(user));
    return true;
  }

  return false;
}

export function checkIndexAuthorization({ dispatch }) {
  return (nextState, replace, next) => {
    if (checkAuthorization(dispatch)) {
      replace('dashboard');
      return next();
    }

    replace('login');
    return next();
  };
}

export function checkDashboardAuthorization({ dispatch, getState }) {
  return (nextState, replace, next) => {
    const user = getState().user;

    if (user) return next();

    if (checkAuthorization(dispatch)) return next();

    replace('login');
    return next();
  };
}
