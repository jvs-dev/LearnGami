/**
 * Helper function to get cookie value by name
 * @param name - The name of the cookie to retrieve
 * @returns The cookie value or undefined if not found
 */
export function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift();
  }
  return undefined;
}

/**
 * Helper function to set a cookie
 * @param name - The name of the cookie
 * @param value - The value of the cookie
 * @param days - Number of days until the cookie expires (default: 7)
 */
export function setCookie(name: string, value: string, days: number = 7) {
  if (typeof document === 'undefined') return;

  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

/**
 * Helper function to delete a cookie
 * @param name - The name of the cookie to delete
 */
export function deleteCookie(name: string) {
  if (typeof document === 'undefined') return;

  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}