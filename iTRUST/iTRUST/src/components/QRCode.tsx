import Div from 'components/Div';
import React, {useEffect} from 'react';
// import crc from 'crc-react-native';
interface IPayment {
  amount: number;
  accountName: string;
  accountNo: string;
  transferContent: string;
  bankId: string;
}
function QRCode(p: {data: IPayment}) {
  // const generateQr = (payment: IPayment) => {
  //   const FIELD1 = '00020101021238';
  //   const FIELD2 = '0010A00000072701';
  //   const FIELD3 = '0208QRIBFTTA';
  //   const FIELD4 = '530370454';
  //   const FIELD5 = '5802VN62';
  //   let dataString = FIELD1;
  //   const s1_1 = FIELD2;
  //   const s1_2 =
  //     '00' +
  //     formatLengthCode(payment.bankId) +
  //     payment.bankId +
  //     '01' +
  //     formatLengthCode(payment.accountNo) +
  //     payment.accountNo;
  //   const s1_3 = FIELD3;
  //   const s1 = `${s1_1}${formatLengthCode(s1_2)}${s1_2}${s1_3}`;
  //   dataString = `${dataString}${formatLengthCode(
  //     s1,
  //   )}${s1}${FIELD4}${formatLengthCode(payment.amount.toString())}${
  //     payment.amount
  //   }${FIELD5}`;
  //   const s2 =
  //     '08' +
  //     formatLengthCode(payment.transferContent) +
  //     payment.transferContent;
  //   dataString = `${dataString}${formatLengthCode(s2)}${s2}6304`;
  //   // const crcString = crc.crc8(dataString);
  //   // return `${dataString}${crcString}`;
  // };
  // const formatLengthCode = (content: string) => {
  //   if (!content) {
  //     return '00';
  //   } else {
  //     if (content.length < 10) {
  //       return `0${content.length}`;
  //     } else {
  //       return `${content.length}`;
  //     }
  //   }
  // };

  // useEffect(() => {
  //   generateQr(p.data);
  // }, []);
  return <Div></Div>;
}

export default React.memo(QRCode);
