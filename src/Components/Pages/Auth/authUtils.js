

export const storeTokenInLocalStorage = (token) =>{
    localStorage.setItem('userToken',token);

};
export const getTokenFromLocalStorage = () => {
    return localStorage.getItem('userToken');
  };
  
  export const clearTokenFromLocalStorage = () => {
    localStorage.removeItem('userToken');
  };
  export function getUserRoleFromLocalStorage() {
    const userRole = localStorage.getItem('userRole');
    return userRole || null;
  }