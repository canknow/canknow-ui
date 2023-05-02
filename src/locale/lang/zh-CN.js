import setLang from '../lang';

const lang = {
  core: {
    locale: 'zh-CN',
    colorPicker: {
      confirm: '确定',
      clear: '清空'
    },
    blank: {
      common: '暂无数据'
    },
    empty: {
      description: '暂无数据'
    },
    wordLimit: {
      warn: '字符数超过{0}'
    },
    overview: {
      viewMore: '查看更多'
    },
    copy: {
      success: '复制成功',
      fail: '复制失败'
    },
    crud: {
      list: '{0}列表',
      create: '创建{0}',
      edit: '编辑{0}',
      createOrEdit: '创建或编辑{0}',
      view: '查看{0}',
      delete: '删除',
    },
    cascader: {
      noMatch: '无匹配数据',
      loading: '加载中',
      placeholder: '请选择',
      noData: '暂无数据'
    },
    messageBox: {
      title: '提示',
      confirm: '确定',
      cancel: '取消',
      error: '输入的数据不合法!'
    },
    example: {
      viewSource: '查看源码',
    },
    richEditor: {
      toolbar: {
        fontName: {
          select: {
            placeHolder: '请选择字体'
          }
        },
        fontSize: {
          select: {
            placeHolder: '请选择字号'
          }
        },
        lineHeight: {
          select: {
            placeHolder: '请选择行距'
          }
        },
        video: {
          modal: {
            title: '插入视频'
          },
          help: '格式如'
        },
        picture: {
          modal: {
            title: '插入图片'
          },
          pictureUploader: '图片上传',
          netPicture: '网络图片'
        },
        link: {
          modal: {
            title: '插入链接'
          },
          urlPlaceholder: '请输入链接',
          textPlaceholder: '请输入标题'
        },
        head: {
          select: {
            placeHolder: '请选择标题'
          },
          h1: '标题一',
          h2: '标题二',
          h3: '标题三',
          h4: '标题四',
          h5: '标题五',
          h6: '标题六',
          p: '段落',
        }
      }
    },
    is: {
      placeholder: '请选择是否{0}',
    },
    select: {
      placeholder: '请选择{0}',
      noMatch: '无匹配数据',
      noData: '暂无数据',
      loading: '加载中'
    },
    validate: {
      common: {
        overCount: '字符数超出',
        requiredFiled: '{0}不能为空',
        minLength: '{0}最少{1}位',
        maxLength: '{0}长度不能大于{1}位.',
        repeatCheck: '请确认{0}',
        checkError: '两次输入{0}不匹配',
        lengthRange: '{0}长度限制在{1}到{2}位'
      }
    },
    placeholder: '请输入{0}...',
    error: {
      auth: 'Token令牌失效或不正确，请重新登录.',
      grant: '身份验证不通过，无权限访问，请重新登录.',
      args: '[{0}]方法输入参数错误.',
      login_non_exist: '用户名不存在或密码错误.'
    },
    table: {
      noDataText: '暂无数据',
      noFilteredDataText: '暂无筛选结果',
      confirmFilter: '筛选',
      resetFilter: '重置',
      clearFilter: '全部',
      emptyText: '暂无数据'
    },
    datepicker: {
      now: '此刻',
      today: '今天',
      cancel: '取消',
      clear: '清空',
      confirm: '确定',
      selectDate: '选择日期',
      selectTime: '选择时间',
      startDate: '开始日期',
      startTime: '开始时间',
      endDate: '结束日期',
      endTime: '结束时间',
      prevYear: '前一年',
      nextYear: '后一年',
      prevMonth: '上个月',
      nextMonth: '下个月',
      year: '年',
      month1: '1 月',
      month2: '2 月',
      month3: '3 月',
      month4: '4 月',
      month5: '5 月',
      month6: '6 月',
      month7: '7 月',
      month8: '8 月',
      month9: '9 月',
      month10: '10 月',
      month11: '11 月',
      month12: '12 月',
      // week: '周次',
      weeks: {
        sun: '日',
        mon: '一',
        tue: '二',
        wed: '三',
        thu: '四',
        fri: '五',
        sat: '六'
      },
      months: {
        jan: '一月',
        feb: '二月',
        mar: '三月',
        apr: '四月',
        may: '五月',
        jun: '六月',
        jul: '七月',
        aug: '八月',
        sep: '九月',
        oct: '十月',
        nov: '十一月',
        dec: '十二月'
      }
    },
    transfer: {
      titles: {
        source: '源列表',
        target: '目的列表'
      },
      filterPlaceholder: '请输入搜索内容',
      notFoundText: '列表为空'
    },
    modal: {
      okText: '确定',
      cancelText: '取消'
    },
    page: {
      prev: '上一页',
      next: '下一页',
      total: '共',
      item: '条',
      items: '条',
      prev5: '向前 5 页',
      next5: '向后 5 页',
      page: '条/页',
      goto: '跳至',
      pageName: '页'
    },
    rate: {
      star: '星',
      stars: '星'
    },
    tree: {
      emptyText: '暂无数据'
    },
    popConfirm: {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    },
  }
};

setLang(lang);

export default lang;
