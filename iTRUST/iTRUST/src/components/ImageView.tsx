import React from 'react';
import {parseMargin, parsePadding} from 'utils/parseOptions';
import {ComponentImage, IImageProps} from './ConstantComponent/ImageComp';

function ImageView(props: IImageProps) {
  return (
    <ComponentImage
      {...parsePadding(props)}
      {...parseMargin(props)}
      {...props}
      ref={props.imageRef && props.imageRef}>
      {props.children && props.children}
    </ComponentImage>
  );
}

export default React.memo(ImageView);
