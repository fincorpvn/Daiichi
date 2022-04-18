import {Div} from 'components';
import {Ecolors} from 'constant';
import React from 'react';

function SplashContainer() {
  return <Div screen={true} backgroundColor={Ecolors.whiteColor} />;
}

export default React.memo(SplashContainer);
