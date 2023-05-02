import Uploader from './src/Uploader';
import UploadList from './src/UploadList';
import PictureUploadList from './src/PictureUploadList';

Uploader.install = function(Vue) {
  Vue.component(Uploader.name, Uploader);
  Vue.component(UploadList.name, UploadList);
  Vue.component(PictureUploadList.name, PictureUploadList);
};
export default [Uploader, UploadList, PictureUploadList];