// The review link is a convenience; Cloudflare Access still protects the destination.
(() => {
  const menu = document.querySelector('#navbarCollapse .navbar-nav');
  if (!menu) return;
  const reviewOrigin = 'https://review.zaccogley.com';
  let checking = false;
  let refreshTimer;

  async function refresh() {
    if (checking || document.hidden) return;
    checking = true;
    let authenticated = false;
    try {
      const response = await fetch(`${reviewOrigin}/api/session`, {
        credentials: 'include',
        redirect: 'error',
        cache: 'no-store',
        signal: AbortSignal.timeout(5000)
      });
      authenticated = response.ok && (await response.json()).authenticated === true;
    } catch {
      // Signed out, expired, or unavailable: keep the private link out of the menu.
    }

    let item = document.getElementById('role-review-nav');
    if (authenticated && !item) {
      item = document.createElement('li');
      item.id = 'role-review-nav';
      item.className = 'nav-item';
      const link = document.createElement('a');
      link.href = `${reviewOrigin}/`;
      link.className = 'nav-link';
      link.rel = 'nofollow';
      const label = document.createElement('span');
      label.className = 'menu-text';
      label.textContent = 'Role review';
      link.append(label);
      item.append(link);
      menu.append(item);
    } else if (!authenticated) {
      item?.remove();
    }
    checking = false;
    clearTimeout(refreshTimer);
    if (authenticated) refreshTimer = setTimeout(refresh, 60000);
  }

  window.addEventListener('pageshow', refresh);
  window.addEventListener('focus', refresh);
  document.addEventListener('visibilitychange', refresh);
  refresh();
})();
