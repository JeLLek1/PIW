import RalewayRegularTTF from 'assets/fonts/RalewayRegular.ttf';

export const RalewayRegular = {
  fontFamily: 'Raleway',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
      local('Lato'),
      local('Lato-Regular'),
      url(${RalewayRegularTTF}) format('woff2')
    `,
} as const;
