import { Div } from 'components';
import { Ecolors, Efonts } from 'constant';
import React from 'react';
import RenderHtml from 'react-native-render-html';
import { fontScale, heightScale, widthScale, widthScreen } from 'utils';
function HTMLView(Props: {
  source: {
    html: string;
  };
}) {
  return (
    <RenderHtml
      contentWidth={widthScreen}
      source={Props.source}
      tagsStyles={{
        body: {
          color: Ecolors.textColor,
          fontSize: fontScale(16),
          fontFamily: Efonts.medium,
          paddingHorizontal: widthScale(15),
          fontWeight: '400'
        },
        h3: {
          lineHeight: heightScale(18),
          fontSize: fontScale(15),
          fontFamily: Efonts.medium,
          fontWeight: '400'

        },
        p: {
          lineHeight: heightScale(18),
          fontSize: fontScale(15),
          fontFamily: Efonts.medium,
          fontWeight: '400'

        },
        strong: {
          lineHeight: heightScale(18),
          fontFamily: Efonts.bold,
          fontSize: fontScale(15),
          fontWeight: '700'
        },
      }}
    />
  );
}

export default React.memo(HTMLView);
