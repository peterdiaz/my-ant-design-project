import React from 'react';
import PromiseRender from './PromiseRender';
import { CURRENT } from './index';

function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  );
}

/**
 * Common check permissions method
 * @param { Permission judgment type string |array | Promise | Function } authority
 * @param { Your permission description  type:string} currentAuthority
 * @param { Passing components } target
 * @param { no pass components } Exception
 */
const checkPermissions = (authority, currentAuthority, target, Exception) => {
  // Without privileges. Default view all
  // Retirement authority, return target;
  if (!authority) {
    return target;
  }
  // Matriz de procesamiento
  if (Array.isArray(authority)) {
    if (authority.indexOf(currentAuthority) >= 0) {
      return target;
    }
    return Exception;
  }

  // string
  if (typeof authority === 'string') {
    if (authority === currentAuthority) {
      return target;
    }
    return Exception;
  }

  // Promise
  if (isPromise(authority)) {
    return <PromiseRender ok={target} error={Exception} promise={authority} />;
  }

  // Function
  if (typeof authority === 'function') {
    try {
      const bool = authority(currentAuthority);
      if (bool) {
        return target;
      }
      return Exception;
    } catch (error) {
      throw error;
    }
  }
  throw new Error('unsupported parameters');
};

export { checkPermissions };

const check = (authority, target, Exception) => {
  console.log(`CURRENT: ${CURRENT}`);
  return checkPermissions(authority, CURRENT, target, Exception);
};

export default check;
