import Article from './src/Article';

Article.install = function(Vue) {
  Vue.component(Article.name, Article);
};

export default Article;
