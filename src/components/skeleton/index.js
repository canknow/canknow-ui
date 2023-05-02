import Skeleton from './src/Skeleton';
import SkeletonAvatar from './src/SkeletonAvatar';
import SkeletonButton from './src/SkeletonButton';
import SkeletonInput from './src/SkeletonInput';
import SkeletonParagraph from './src/SkeletonParagraph';
import SkeletonTitle from './src/SkeletonTitle';

Skeleton.install = function(Vue) {
  Vue.component(Skeleton.name, Skeleton);
  Vue.component(SkeletonAvatar.name, SkeletonAvatar);
  Vue.component(SkeletonButton.name, SkeletonButton);
  Vue.component(SkeletonInput.name, SkeletonInput);
  Vue.component(SkeletonParagraph.name, SkeletonParagraph);
  Vue.component(SkeletonTitle.name, SkeletonTitle);
};

export default Skeleton;
