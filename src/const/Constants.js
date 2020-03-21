import { Dimensions, Platform } from 'react-native';
import colors from '../utils/colors'
let headerHeight = Platform.OS === 'ios' ? 66 : 46;
let footerHeight = 55;
const constants = {
  headerHeight: headerHeight,
  footerHeight: footerHeight,
  viewHeight: Dimensions.get('window').height - headerHeight,
  viewPadding: 15,
  defaultSpacer: 10,
  screenHeight: Dimensions.get('window').height,
  screenWidth: Dimensions.get('window').width,
  divider: {backgroundColor: colors.smoke},
};
export default constants;