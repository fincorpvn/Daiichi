import {Div, Label, LoadingIndicator} from 'components';
import {Ecolors, Efonts} from 'constant';
import React from 'react';
import {useSelector} from 'react-redux';
import {getDataChart, getLoadingNav} from 'reducer/investment';
import {Defs, LinearGradient, Stop} from 'react-native-svg';
import {convertNav, convertNumber, widthScale, widthScreen} from 'utils';
import {AnimatePropTypeInterface} from 'victory-core';
import {
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryArea,
  VictoryLabel,
  VictoryAxis,
  VictoryGroup,
} from 'victory-native';
import {StyleSheet} from 'react-native';

const animate: AnimatePropTypeInterface = {
  duration: 500,
};

function Chart(props: {controlScrollview: (e: boolean) => void}) {
  const data = useSelector((state: any) => getDataChart(state));
  const loadingNav = useSelector((state: any) => getLoadingNav(state));
  return (
    <Div minHeight={270}>
      {loadingNav && (
        <Div
          style={StyleSheet.absoluteFillObject}
          paddingVertical={20}
          width={'100%'}
          alignItems={'center'}
          justifyContent={'center'}>
          <LoadingIndicator color={Ecolors.mainColor} size={10} numdot={5} />
        </Div>
      )}
      {!!data.length ? (
        <VictoryChart
          width={widthScreen}
          padding={{
            right: widthScale(10),
            top: widthScale(40),
            left: widthScale(50),
            bottom: widthScale(10),
          }}
          domainPadding={{y: widthScale(10)}}>
          {/* custom number chart */}
          <VictoryChart>
            <VictoryAxis
              dependentAxis
              offsetX={widthScale(50)}
              standalone={true}
              style={{
                axis: {stroke: Ecolors.transparent},
                grid: {
                  stroke: ({tick}) => {
                    return Ecolors.grayColor;
                  },
                },
                tickLabels: {
                  fontSize: widthScale(10),
                  color: Ecolors.textColor,
                  fontWeight: '400',
                  fontFamily: Efonts.medium,
                },
              }}
            />

            <VictoryScatter
              style={{data: {fill: Ecolors.mainColor}}}
              size={widthScale(2)}
              labels={({datum}) => datum.y}
              labelComponent={
                <VictoryLabel
                  dx={-widthScale(10)}
                  dy={widthScale(5)}
                  style={{
                    fontSize: widthScale(10),
                    color: Ecolors.textColor,
                    fontWeight: '400',
                    fontFamily: Efonts.medium,
                  }}
                />
              }
              data={[
                {
                  y: 0,
                  x: 1,
                },
              ]}
            />
            <VictoryAxis
              style={{
                axis: {stroke: Ecolors.grayColor},
                tickLabels: {
                  fontSize: widthScale(0.1),
                  color: Ecolors.transparent,
                  fontWeight: '400',
                  fontFamily: Efonts.medium,
                },
              }}
              offsetY={widthScale(10)}
            />
            {/* <VictoryAxis
              crossAxis
              labelComponent={
                <VictoryLabel
                  dx={-widthScale(15)}
                  dy={-widthScale(10)}
                  style={[
                    {
                      fill: Ecolors.redColor,
                      fontSize: widthScale(10),
                      fontWeight: '400',
                      fontFamily: Efonts.medium,
                    },
                  ]}
                />
              }
              offsetY={widthScale(10)}
              standalone={true}
              style={{
                axis: { stroke: Ecolors.grayColor },
                tickLabels: {
                  fontSize: widthScale(0),
                  color: Ecolors.textColor,
                  fontWeight: '400',
                  fontFamily: Efonts.medium,
                },
              }}
            /> */}
          </VictoryChart>
          {/* build line */}
          <VictoryGroup>
            <VictoryLine
              animate={animate}
              interpolation={'natural'}
              style={{
                data: {stroke: Ecolors.mainColor},
                parent: {border: '1px solid #ccc'},
              }}
              data={data}
            />
            <VictoryArea
              animate={animate}
              interpolation={'natural'}
              style={{
                data: {
                  stroke: Ecolors.mainColor,
                  fill: 'url(#gradientStroke)',
                },
              }}
              data={data}
            />
            <Defs>
              <LinearGradient
                id="gradientStroke"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%">
                <Stop offset="0%" stopColor={'#FBDADC'} stopOpacity="1" />
                <Stop offset="80%" stopColor={'#ffffff'} stopOpacity="0.5" />
              </LinearGradient>
            </Defs>
          </VictoryGroup>
          {/* scatter */}
          {/* <VictoryScatter
            style={{data: {fill: Ecolors.mainColor}}}
            size={3}
            data={data || []}
          /> */}
          <VictoryScatter
            style={{data: {fill: Ecolors.redColor}}}
            size={3}
            data={[
              {
                y: data[data.length - 1].y,
                x: data[data.length - 1].x,
              },
            ]}
            labels={({datum}) => convertNav(datum.y)}
            labelComponent={
              <VictoryLabel
                dx={-widthScale(15)}
                dy={-widthScale(10)}
                style={[
                  {
                    fill: Ecolors.redColor,
                    fontSize: widthScale(10),
                    fontWeight: '400',
                    fontFamily: Efonts.medium,
                  },
                ]}
              />
            }
          />
        </VictoryChart>
      ) : (
        <>
          {!loadingNav && (
            <Div flex={1} alignItems={'center'} justifyContent={'center'}>
              <Label>{`investmentscreen.khongconoidunghienthi`}</Label>
            </Div>
          )}
        </>
      )}
    </Div>
  );
}

export default React.memo(Chart);
