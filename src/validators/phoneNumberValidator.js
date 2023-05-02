export default (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please enter your phoneNumber'));
  }
  else {
    const pattern = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$/;
    if (pattern.test(value)) {
      callback();
    }
    else {
      callback(new Error('Wrong phoneNumber format'));
    }
  }
};
