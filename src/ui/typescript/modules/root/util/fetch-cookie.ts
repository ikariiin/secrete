export function fetchCookie(cookie: string): string|undefined {
  const match = document.cookie.match(new RegExp('(^| )' + cookie + '=([^;]+)'));
  if (match) return match[2];
}