import {Div} from 'components';
import {Ecolors} from 'constant';
import React from 'react';
import RenderHtml from 'react-native-render-html';
import {fontScale, heightScale, widthScale, widthScreen} from 'utils';

const tagsStyles = {
  body: {
    whiteSpace: 'normal',
    color: Ecolors.textColor,
    fontSize: fontScale(15),
  },
  h3: {
    paddingHorizontal: widthScale(10),
    lineHeight: heightScale(20),
  },
  p: {
    paddingHorizontal: widthScale(10),
    lineHeight: heightScale(20),
  },
};
function HTMLView(Props: {
  source: {
    html: string;
  };
}) {
  return (
    <RenderHtml
      contentWidth={widthScreen - 50}
      source={Props.source}
      // tagsStyles={tagsStyles}
      tagsStyles={tagsStyles}
    />
  );
}

export default React.memo(HTMLView);
