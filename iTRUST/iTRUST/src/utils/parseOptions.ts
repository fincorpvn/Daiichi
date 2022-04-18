interface ICallBackPadding {
  paddingTop: number | string;
  paddingRight: number | string;
  paddingBottom: number | string;
  paddingLeft: number | string;
}

interface IPropsPadding {
  padding?: number | string;
  paddingVertical?: number | string;
  paddingHorizontal?: number | string;
  paddingTop?: number | string;
  paddingRight?: number | string;
  paddingBottom?: number | string;
  paddingLeft?: number | string;
}
interface ICallbackMargin {
  marginTop: number | string;
  marginRight: number | string;
  marginBottom: number | string;
  marginLeft: number | string;
}

interface IPropsMargin {
  margin?: number | string;
  marginVertical?: number | string;
  marginHorizontal?: number | string;
  marginTop?: number | string;
  marginRight?: number | string;
  marginBottom?: number | string;
  marginLeft?: number | string;
}

export function parsePadding(props: IPropsPadding): ICallBackPadding {
  const paddingTop =
    props.padding || props.paddingVertical || props.paddingTop || 0;
  const paddingLeft =
    props.padding || props.paddingHorizontal || props.paddingLeft || 0;
  const paddingBottom =
    props.padding || props.paddingVertical || props.paddingBottom || 0;
  const paddingRight =
    props.padding || props.paddingHorizontal || props.paddingRight || 0;
  return {
    paddingTop,
    paddingLeft,
    paddingBottom,
    paddingRight,
  };
}

export function parseMargin(props: IPropsMargin): ICallbackMargin {
  const marginTop =
    props.margin || props.marginVertical || props.marginTop || 0;
  const marginLeft =
    props.margin || props.marginHorizontal || props.marginLeft || 0;
  const marginBottom =
    props.margin || props.marginVertical || props.marginBottom || 0;
  const marginRight =
    props.margin || props.marginHorizontal || props.marginRight || 0;
  return {
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
  };
}
