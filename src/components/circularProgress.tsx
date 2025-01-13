import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

// Define prop types
type CircularProgressProps = {
  size: number;
  percentage: number;
  donutColor: string;
  fillColor: string;
  blankColor: string;
  progressWidth: number;
  fontSize:number,
  fontColor:string
};

const CircularProgress: React.FC<CircularProgressProps> = ({
  size,
  percentage,
  donutColor,
  fillColor,
  blankColor,
  progressWidth,
  fontSize,
  fontColor
}) => {
  const half = size / 2;

  const generateArc = (percentage: number, radius: number): string => {
    const angle = (percentage / 100) * 360;
    const radians = (angle * Math.PI) / 180;
    const x = half + half * Math.sin(radians);
    const y = half - half * Math.cos(radians);
    return `A${radius},${radius} 0 ${angle > 180 ? 1 : 0},1 ${x},${y}`;
  };

  return (
    <View style={{width: size, height: size}}>
    <Svg width={size} height={size}>
      <Circle cx={half} cy={half} r={half} fill={blankColor} />
      <Path
        d={`M${half} ${half} L${half} 0 ${generateArc(
          percentage,
          half,
        )} Z`}
        fill={donutColor}
      />
      {
        <Circle
          cx={half}
          cy={half}
          r={progressWidth}
          fill={fillColor}
        />
      }
    </Svg>
    <View style={styles.textView}>
      <Text
        style={{
          color: fontColor,
          fontSize: fontSize,
          fontFamily: 'LexendDeca-Regular',
        }}>
        {percentage}%
      </Text>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  textView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CircularProgress;
