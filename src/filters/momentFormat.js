import dayjs from 'dayjs';

export default (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!value) {
    return '-';
  }
  return dayjs(value).format(format);
};