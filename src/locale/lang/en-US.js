import setLang from '../lang';

const lang = {
  core: {
    locale: 'en-US',
    colorPicker: {
      confirm: 'confirm',
      clear: 'clear'
    },
    blank: {
      common: 'no data'
    },
    empty: {
      description: 'no data'
    },
    wordLimit: {
      warn: '字符数超过{0}'
    },
    overview: {
      viewMore: 'view more'
    },
    copy: {
      success: 'copy success',
      fail: 'copy fail'
    },
    crud: {
      list: '{0}list',
      create: 'create{0}',
      edit: 'edit {0}',
      createOrEdit: 'create or edit {0}',
      view: 'view {0}',
      delete: 'delete',
    },
    cascader: {
      noMatch: 'No matching data',
      loading: 'Loading',
      placeholder: 'Select',
      noData: 'No data'
    },
    messageBox: {
      title: 'title',
      confirm: 'confirm',
      cancel: 'cancel',
      error: 'error!'
    },
    example: {
      viewSource: 'view source',
    },
    select: {
      placeholder: 'Please select {0}',
      noMatch: 'No matching data',
      noData: 'No data',
      loading: 'Loading'
    },
    validate: {
      common: {
        requiredFiled: '{0}can not be empty',
        minLength: '{0}min length is {1}',
        maxLength: '{0}max length is {1}',
        repeatCheck: 'please check {0}',
        checkError: 'check {0}error',
        lengthRange: '{0}length should between {1}to {2}'
      }
    },
    placeholder: 'please input {0}...',
    error: {
      auth: 'Token令牌失效或不正确，请重新登录.',
      grant: '身份验证不通过，无权限访问，请重新登录.',
      args: '[{0}]方法输入参数错误.',
      login_non_exist: '用户名不存在或密码错误.'
    },
    table: {
      noDataText: 'No Data',
      noFilteredDataText: 'No filter data',
      confirmFilter: 'Confirm',
      resetFilter: 'Reset',
      clearFilter: 'All',
      emptyText: 'no data'
    },
    datepicker: {
      now: 'Now',
      today: 'Today',
      cancel: 'Cancel',
      clear: 'Clear',
      confirm: 'OK',
      selectDate: 'Select date',
      selectTime: 'Select time',
      startDate: 'Start Date',
      startTime: 'Start Time',
      endDate: 'End Date',
      endTime: 'End Time',
      prevYear: 'Previous Year',
      nextYear: 'Next Year',
      prevMonth: 'Previous Month',
      nextMonth: 'Next Month',
      year: '',
      month1: 'January',
      month2: 'February',
      month3: 'March',
      month4: 'April',
      month5: 'May',
      month6: 'June',
      month7: 'July',
      month8: 'August',
      month9: 'September',
      month10: 'October',
      month11: 'November',
      month12: 'December',
      week: 'week',
      weeks: {
        sun: 'Sun',
        mon: 'Mon',
        tue: 'Tue',
        wed: 'Wed',
        thu: 'Thu',
        fri: 'Fri',
        sat: 'Sat'
      },
      months: {
        jan: 'Jan',
        feb: 'Feb',
        mar: 'Mar',
        apr: 'Apr',
        may: 'May',
        jun: 'Jun',
        jul: 'Jul',
        aug: 'Aug',
        sep: 'Sep',
        oct: 'Oct',
        nov: 'Nov',
        dec: 'Dec'
      }
    },
    transfer: {
      titles: {
        source: 'Source',
        target: 'Target'
      },
      filterPlaceholder: 'Search here',
      notFoundText: 'Not Found'
    },
    modal: {
      okText: 'OK',
      cancelText: 'Cancel'
    },
    page: {
      prev: 'Previous Page',
      next: 'Next Page',
      total: 'Total',
      item: 'item',
      items: 'items',
      prev5: 'Previous 5 Pages',
      next5: 'Next 5 Pages',
      page: '/pages',
      goto: 'Goto',
      pageName: 'page'
    },
    rate: {
      star: 'Star',
      stars: 'Stars'
    },
    tree: {
      emptyText: 'No Data'
    },
    popConfirm: {
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    },
  }
};

setLang(lang);

export default lang;
