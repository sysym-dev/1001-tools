import { createGoogleLoginButton } from 'src/core/oauth/google/google-login-button';
import { useRequest } from 'src/core/request/request.compose';
import { useAuthStore } from 'src/features/auth/auth.store';

export function useGoogleLogin(cb) {
  const authStore = useAuthStore();
  const {
    request,
    isLoading,
    isError,
    error,
    data: result,
  } = useRequest('/login/google', {
    method: 'post',
  });
  const { login } = createGoogleLoginButton(handleAuth);

  async function handleAuth(token) {
    try {
      await request({
        data: {
          token: token.credential,
        },
      });

      authStore.login(result.value.data);

      cb();
    } catch (err) {}
  }

  return { login, isLoading, error, isError };
}
