export function useGithubLogin() {
  function login() {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${
      import.meta.env.VITE_GITHUB_CLOUD_CLIENT_ID
    }`;
  }

  return {
    login,
  };
}
