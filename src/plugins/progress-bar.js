import VueProgressBar from '@aacassandra/vue3-progressbar';

export function useProgressBar(app) {
  const options = {
    color: '#0284c7',
    failedColor: '#dc2626',
    thickness: '3px',
    transition: {
      speed: '0.2s',
      opacity: '0.6s',
      termination: 300,
    },
    autoRevert: true,
    location: 'top',
    inverse: false,
  };

  app.use(VueProgressBar, options);
}
