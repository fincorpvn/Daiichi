import {Div, Label} from 'components';
import {Ecolors} from 'constant';
import React from 'react';

function RowLBLContent(p: {content: string}) {
  return (
    <Div margin={10}>
      <Label multilanguage={false}>
        <Label>{p.content}</Label>
        {` (`}
        <Label color={Ecolors.red} multilanguage={false}>
          *
        </Label>
        {`)`}
      </Label>
    </Div>
  );
}

export default React.memo(RowLBLContent);
