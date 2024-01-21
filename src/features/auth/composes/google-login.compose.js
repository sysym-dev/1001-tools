import { createGoogleLoginButton } from 'src/core/oauth/google/google-login-button';
import { useRequest } from 'src/core/request/request.compose';

export function useGoogleLogin() {
  const { request, isLoading, isError, error } = useRequest('/login/google', {
    method: 'post',
  });
  const { login } = createGoogleLoginButton(handleAuth);

  async function handleAuth(result) {
    try {
      await request({
        data: {
          token: result.credential,
        },
      });
    } catch (err) {}
  }

  return { login, isLoading, error, isError };
}
