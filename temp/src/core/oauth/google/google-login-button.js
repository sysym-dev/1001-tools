export function createGoogleLoginButton(callback) {
  const wrapper = document.createElement('div');
  wrapper.style.display = 'none';

  document.body.appendChild(wrapper);

  window.google.accounts.id.initialize({
    client_id: import.meta.env.VITE_GOOGLE_CLOUD_CLIENT_ID,
    callback,
  });
  window.google.accounts.id.renderButton(wrapper, {
    type: 'icon',
    width: 200,
  });

  const button = wrapper.querySelector('div[role=button]');

  return {
    login: () => button.click(),
  };
}
