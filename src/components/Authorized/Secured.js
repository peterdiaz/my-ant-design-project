import React from 'react';
import Exception from '../Exception/index';
import CheckPermissions from './CheckPermissions';
/**
 * Cannot access any page by default
 * default is "NULL"
 */
const Exception403 = () => <Exception type="403" style={{ minHeight: 500, height: '80%' }} />;

// Determine whether the incoming component has been instantiated
// AuthorizedRoute is already instantiated
// Authorized  render is already instantiated, children is no instantiated
// Secured is not instantiated
const checkIsInstantiation = target => {
  if (!React.isValidElement(target)) {
    return target;
  }
  return () => target;
};

/**
 * Used to determine if you have permission to access this view
 * authority Support incoming  string ,funtion:()=>boolean|Promise
 * e.g. authority support incoming string, funtion: () => boolean | Promise
 * e.g. 'user' only user user can access
 * e.g. 'user, admin' user and admin can access
 * e.g. () => boolean true to be able to visit, return false can not be accessed
 * e.g. Promise then can not access the visit to catch
 * @param {string | function | Promise} authority
 * @param {ReactNode} error 非必需参数
 */
const authorize = (authority, error) => {
  /**
   * conversion into a class
   * String parameters can cause staticContext not found error
   */
  let classError = false;
  if (error) {
    classError = () => error;
  }
  if (!authority) {
    throw new Error('authority is required');
  }
  return function decideAuthority(targer) {
    const component = CheckPermissions(authority, targer, classError || Exception403);
    return checkIsInstantiation(component);
  };
};

export default authorize;
