import Color from './Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default {
  main_content_text: {
    color: Color.main_text_color,
    fontSize: wp(4),
  },

  main_bold_text : {
    color: Color.main_text_color,
    fontSize: wp(4),
    fontWeight:'bold',
  },

  main_title_text: {
    fontWeight: 'bold',
    color: Color.main_text_color,
    fontSize: wp(5),
  },

  overlayFull: {
    zIndex : 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },

  container: {flex: 1},

  allCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.mainThemeColor,
  },
};
