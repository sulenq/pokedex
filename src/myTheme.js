import { extendTheme } from '@chakra-ui/react';

export const myTheme = extendTheme({
  colors: {
    p: {
      50: '#ffdbdb',
      100: '#fcaaa9',
      200: '#fe9392',
      300: '#f77975',
      400: '#e74e40',
      500: '#cc0000',
      600: '#AF000F',
      700: '#920019',
      800: '#76001E',
      900: '#610021',
    },
    black: {
      50: '#F3F3F3',
      100: '#E8E8E8',
      200: '#E8E8E8',
      300: '#BCBCBC',
      400: '#7A7A7A',
      500: '#222222',
      600: '#1D1819',
      700: '#181112',
      800: '#130A0D',
      900: '#100609',
    },
  },
  styles: {
    global: props => ({
      body: {
        bg: props.colorMode === 'dark' ? '#18191b' : 'white',
      },
    }),
  },
  components: {
    Modal: {
      baseStyle: props => ({
        dialog: {
          bg: props.colorMode === 'dark' ? '#18191b' : 'white',
          border: props.colorMode === 'dark' ? '1px solid var(--divider)' : '',
        },
      }),
    },
    Tooltip: {
      baseStyle: props => ({
        bg: 'primary',
        color: 'white',
      }),
    },
    Menu: {
      baseStyle: props => ({
        list: {
          bg: props.colorMode === 'dark' ? '#18191b' : 'white',
        },
        item: {
          bg: props.colorMode === 'dark' ? '#18191b' : 'white',
        },
      }),
    },
  },
});
