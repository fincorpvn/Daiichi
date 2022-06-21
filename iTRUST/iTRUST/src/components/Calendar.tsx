import {Div, Dropdown, Input, InputItem} from 'components';
import {Ecolors} from 'constant';
import React, {useEffect, useRef, useState} from 'react';
import {getNumdateCalenda, parseArrayNum} from 'utils';
const size = 105;

function Calendar(Props: {onChange: (e: any) => void; initValue?: any}) {
  const [date, setDate] = useState<any>(null);
  const [month, setMonth] = useState<any>(null);
  const [year, setYear] = useState<any>(null);

  const [numDate, setNumDate] = useState<number>(31);
  const [numMonth, setNumMonth] = useState<number>(12);
  const [numYear, setNumYear] = useState<number>(70);

  useEffect(() => {
    if (Props.initValue) {
      Promise.all([
        setDate({
          id: `${Props.initValue.date || ''}`,
          name: `${Props.initValue.date || ''}`,
          nameen: `${Props.initValue.date || ''}`,
        }),
        setMonth({
          id: `${Props.initValue.month || ''}`,
          name: `${Props.initValue.month || ''}`,
          nameen: `${Props.initValue.month || ''}`,
        }),
        setYear({
          id: `${Props.initValue.year || ''}`,
          name: `${Props.initValue.year || ''}`,
          nameen: `${Props.initValue.year || ''}`,
        }),
      ]);
    }
  }, []);

  useEffect(() => {
    const nDate = getNumdateCalenda({
      month: month?.id,
      year: year?.id,
    });
    if (nDate != numDate) {
      setNumDate(nDate);
    }
    if (date?.id > nDate) {
      setDate({
        id: `${nDate}`,
        name: `${nDate}`,
        nameen: `${nDate}`,
      });
    }
    return () => {};
  }, [date, month, year]);

  useEffect(() => {
    if (date?.id && month?.id && year?.id) {
      Props.onChange &&
        Props.onChange({
          date: date?.id || '00',
          month: month?.id || '00',
          year: year?.id || '0000',
        });
    }
    return () => {};
  }, [date, month, year]);

  return (
    <>
      <Div
        flexDirection={'row'}
        alignItems={'center'}
        marginTop={6}
        paddingHorizontal={16}
        justifyContent={'space-between'}>
        <Dropdown
          width={size}
          paddingHorizontal={0}
          initData={parseArrayNum(numDate)}
          isActive={true}
          content={'component.ngay'}
          multilanguage={true}
          value={date}
          onChange={e => setDate(e)}
        />
        <Dropdown
          paddingHorizontal={0}
          width={size}
          initData={parseArrayNum(numMonth)}
          content={'component.thang'}
          multilanguage={true}
          isActive={true}
          onChange={e => setMonth(e)}
          value={month}
        />
        <Dropdown
          paddingHorizontal={0}
          width={size}
          initData={parseArrayNum(numYear, true)}
          content={'component.nam'}
          multilanguage={true}
          isActive={true}
          onChange={e => setYear(e)}
          value={year}
        />
      </Div>
    </>
  );
}

export default React.memo(Calendar);
