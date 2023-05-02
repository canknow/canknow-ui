import TimeLine from './src/Timeline';
import TimelineItem from './src/TimelineItem';

/* istanbul ignore next */
TimeLine.install = function(Vue) {
  Vue.component(TimeLine.name, TimeLine);
  Vue.component(TimelineItem.name, TimelineItem);
};

export default TimeLine;
