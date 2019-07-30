import Avatar from '@material-ui/core/Avatar';
import React from 'react';

export const avatarProducer = (politicalAffiliation) => {
  switch (politicalAffiliation) {
    case '民建聯':
      return <Avatar alt="民建聯" src="/images/dab.png" />;
    case '新民黨':
      return <Avatar alt="新民黨" src="/images/npp.png" />;
    case '工聯會':
      return <Avatar alt="工聯會" src="/images/ftu.png" />;
    case '自由黨':
      return <Avatar alt="自由黨" src="/images/liberalparty.png" />;
    case '屯門社區網絡':
      return <Avatar alt="屯門社區網絡" src="/images/tmcn.png" />;
    case '民主黨':
      return <Avatar alt="民主黨" src="/images/dp.png" />;
    case '工黨':
      return <Avatar alt="工黨" src="/images/npp.png" />;
    case '民協':
      return <Avatar alt="新民黨" src="/images/adpl.png" />;
    case '獨立':
      return <Avatar alt="獨立">獨</Avatar>;
    default:
      return <Avatar alt="未知">{politicalAffiliation ? politicalAffiliation.substring(0, 1) : '?'}</Avatar>;
  }
};
