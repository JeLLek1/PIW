import LatoRegularTTF from 'assets/fonts/Lato-Regular.ttf';

export const LatoRegular = {
  fontFamily: 'Lato',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
      local('Lato'),
      local('Lato-Regular'),
      url(${LatoRegularTTF}) format('woff2')
    `,
};
