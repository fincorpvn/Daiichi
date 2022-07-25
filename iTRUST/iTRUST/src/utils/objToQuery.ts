import moment from 'moment';

export const objToQuery = (obj: any): string => {
  if (!obj) {
    return '';
  }

  let query = [];

  if (!obj.currentdate) {
    obj.currentdate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  }
  if (obj.currentpage === undefined) {
    obj.currentpage = 0;
  }
  if (!obj.limit) {
    obj.limit = 10;
  }

  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      query.push(
        encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]),
      );
    }
  }

  return '?' + query.join('&');
};
