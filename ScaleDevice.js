import { Dimensions } from 'react-native';

const { deviceWidth, deviceHeight } = Dimensions.get('window');

const guidelineWidth = 350;
const guidelineHeight = 680;

const scale = size => deviceWidth / guidelineWidth * size;
const verticalScale = size => deviceHeight / guidelineHeight * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

export {
    scale,
    verticalScale,
    moderateScale,
}