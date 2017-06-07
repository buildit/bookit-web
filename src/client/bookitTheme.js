import * as colors from 'material-ui/styles/colors'
import * as colorManipulator from 'material-ui/utils/colorManipulator'
import * as spacing from 'material-ui/styles/spacing'

// Bookit brand colors
const yellow = '#faff29'

const theme = {
  spacing: spacing.default,
  fontFamily: 'Roboto, sans-serif',
  borderRadius: 2,
  palette: {
    primary1Color: yellow,
    primary2Color: yellow,
    primary3Color: colors.grey600,
    accent1Color: colors.pinkA200,
    accent2Color: colors.pinkA400,
    accent3Color: colors.pinkA100,
    textColor: colors.fullWhite,
    secondaryTextColor: (0, colorManipulator.fade)(colors.fullWhite, 0.7),
    alternateTextColor: '#303030',
    canvasColor: '#2b3947',
    borderColor: yellow,
    disabledColor: (0, colorManipulator.fade)(colors.fullWhite, 0.3),
    pickerHeaderColor: (0, colorManipulator.fade)(colors.fullWhite, 0.12),
    clockCircleColor: (0, colorManipulator.fade)(colors.fullWhite, 0.12),
  },
}

export default theme
