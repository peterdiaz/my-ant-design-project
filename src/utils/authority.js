// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  console.log('gettingAuth');
  return localStorage.getItem('antd-pro-authority') || 'admin';
}

export function setAuthority(authority) {
  console.log('settingAuth ');
  return localStorage.setItem('antd-pro-authority', authority);
}
