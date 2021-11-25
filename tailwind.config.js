const primaryColors = require('@left4code/tw-starter/dist/js/colors')

module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{php,html,js,jsx,ts,tsx,vue}',
    './resources/**/*.{php,html,js,jsx,ts,tsx,vue}',
    './node_modules/@left4code/tw-starter/**/*.js'
  ],
  darkMode: 'class',
  theme: {
    borderColor: theme => ({
      ...theme('colors'),
      DEFAULT: primaryColors.gray['300']
    }),
    colors: {
      ...primaryColors,
      white: 'white',
      black: 'black',
      t1c: '#E05512',
      current: 'current',
      transparent: 'transparent',
      theme: {
        1: '#CD5D2C',
        2: '#F1F5F8',
        3: '#c15121',
        4: '#b65327',
        5: '#DEE7EF',
        6: '#D32929',
        7: '#365A74',
        8: '#D2DFEA',
        9: '#91C714',
        10: '#CD5D2C',
        11: '#F78B00',
        12: '#FBC500',
        13: '#7F9EB9',
        14: '#E6F3FF',
        15: '#8DA9BE',
        16: '#607F96',
        17: '#FFEFD9',
        18: '#D8F8BC',
        19: '#a84417',
        20: '#a84417',
        21: '#debba4',
        22: '#ffe8e0',
        23: '#84320f',
        24: '#7b3415',
        25: '#eac3b6',
        26: '#8b3a17',
        27: '#9a4017',
        28: '#ffcebd',
        29: '#af4a1c',
        30: '#ffcebd'
      }
    },
    extend: {
      fontFamily: {
        roboto: ['Roboto']
      },
      container: {
        center: true
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%'
      },
      strokeWidth: {
        0.5: 0.5,
        1.5: 1.5,
        2.5: 2.5
      }
    }
  },
  variants: {
    extend: {
      boxShadow: ['dark']
    }
  }
}
