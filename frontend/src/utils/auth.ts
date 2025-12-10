export function isAdminLoggedIn() {
  const isAdmin = localStorage.getItem("admin") === "true";
  const expires = localStorage.getItem("admin_expires_at");

  if (!isAdmin || !expires) return false;

  const now = Date.now();

  if (now > Number(expires)) {
    // Sessão expirada → remover
    localStorage.removeItem("admin");
    localStorage.removeItem("admin_expires_at");
    return false;
  }

  return true;
}
