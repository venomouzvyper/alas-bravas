import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Alas Bravas',
    short_name: 'Alas Bravas',
    description: 'Alitas crujientes, salsas explosivas y sabores que no olvidarás. La Cabaña, San Lorenzo.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0D0602',
    theme_color: '#C1121F',
    icons: [
      { src: '/logo.jpg', sizes: '192x192', type: 'image/jpeg' },
      { src: '/logo.jpg', sizes: '512x512', type: 'image/jpeg' },
    ],
  };
}
