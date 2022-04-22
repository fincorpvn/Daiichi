import React from 'react';
import {useAppSelector} from 'store/hooks';
import {ComponentLable, ILabelProps} from './ConstantComponent/LabelComp';
import I18n from 'languages/i18n';
import {parseMargin, parsePadding} from 'utils';

function Label(props: ILabelProps): JSX.Element {
  const I18nState = useAppSelector(state => state.languages.I18nState);
  return (
    <ComponentLable
      numberOfLines={props.numberOfLines}
      allowFontScaling={false}
      {...parsePadding(props)}
      {...parseMargin(props)}
      {...props}>
      {props.multilanguage
        ? I18n.t(`${props.children}`)
        : props.children && props.children}
    </ComponentLable>
  );
}

Label.defaultProps = {
  multilanguage: true,
};

export default React.memo(Label);
