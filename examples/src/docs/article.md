## Article

:::demo

```html
<template>
    <c-article-page>
        <h1 class="c-article-title">MySQL学习笔记-索引提高查询速度</h1>

        <div class="c-article-post-info">
            <div class="c-article-post-info-author">
                <img class="c-article-post-info-author-avatar circle" src="//upload.jianshu.io/users/upload_avatars/6943526/78e12266-f7a2-4ce4-8110-f74d71694add.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96">
                <span class="c-article-post-info-author-name">canknow</span>
            </div>
        </div>

            <div class="c-article-meta">
                <span class="c-article-meta-post-datetime">2019.01.22 18:39*</span>
                <span class="c-article-meta-wordage">字数 927</span>
                <span class="c-article-meta-views-count">阅读 1210</span>
                <span class="c-article-meta-comments-count">评论 0</span>
                <span class="c-article-meta-likes-count">喜欢 73</span>
            </div>

        <summary class="c-article-summary"></summary>

        <article class="c-article-content">
            <div class="show-content-free">
                <h2>为什么索引能提高查询速度</h2>
                <h3>MySQL 的基本存储结构</h3>
                <p>MySQL的基本存储结构是页(记录都存在页里边)：</p>
                <ul>
                    <li><strong>各个数据页可以组成一个双向链表</strong></li>
                    <li>每个数据页中的记录又可以组成一个单向链表
                        <ul>
                            <li>每个数据页都会为存储在它里边儿的记录生成一个页目录，在通过主键查找某条记录的时候可以在页目录中使用二分法快速定位到对应的槽，然后再遍历该槽对应分组中的记录即可快速找到指定的记录</li>
                            <li>以其他列(非主键)作为搜索条件：只能从最小记录开始依次遍历单链表中的每条记录。</li>
                        </ul>
                    </li>
                </ul>
                <p>所以说，如果我们写select * from user where indexname = 'xxx'这样没有进行任何优化的sql语句，默认会这样做：</p>
                <ol>
                    <li><strong>定位到记录所在的页:需要遍历双向链表，找到所在的页</strong></li>
                    <li><strong>从所在的页内中查找相应的记录:由于不是根据主键查询，只能遍历所在页的单链表了</strong></li>
                </ol>
                <p>很明显，在数据量很大的情况下这样查找会很慢！这样的时间复杂度为O（n）。</p>
                <h3>使用索引之后</h3>
                <p>索引做了些什么可以让我们查询加快速度呢？其实就是将无序的数据变成有序(相对)：</p>
                <p>要找到id为8的记录简要步骤：</p>
                <p>很明显的是：没有用索引我们是需要遍历双向链表来定位对应的页，现在通过 <strong>“目录”</strong> 就可以很快地定位到对应的页上了！（二分查找，时间复杂度近似为O(logn)）</p>
                <p>其实底层结构就是B+树，B+树作为树的一种实现，能够让我们很快地查找出对应的记录。</p>
                <h3>最左前缀原则</h3>
                <p>MySQL中的索引可以以一定顺序引用多列，这种索引叫作联合索引。如User表的name和city加联合索引就是(name,city)o而最左前缀原则指的是，如果查询的时候查询条件精确匹配索引的左边连续一列或几列，则此列就可以被用到。如下：</p>
                <p>这里需要注意的是，查询的时候如果两个条件都用上了，但是顺序不同，如 <code>city= xx and name ＝xx</code>，那么现在的查询引擎会自动优化为匹配联合索引的顺序，这样是能够命中索引的.</p>
                <p>由于最左前缀原则，在创建联合索引时，索引字段的顺序需要考虑字段值去重之后的个数，较多的放前面。ORDERBY子句也遵循此规则。</p>
                <h3>注意避免冗余索引</h3>
                <p>冗余索引指的是索引的功能相同，能够命中 就肯定能命中 ，那么 就是冗余索引如（name,city ）和（name ）这两个索引就是冗余索引，能够命中后者的查询肯定是能够命中前者的 在大多数情况下，都应该尽量扩展已有的索引而不是创建新索引。</p>
                <p>MySQL.7 版本后，可以通过查询 sys 库的 <code>schemal_r dundant_indexes</code> 表来查看冗余索引</p>
                <h3>添加索引</h3>
                <p>1.添加PRIMARY KEY（主键索引）</p>
                <p>2.添加UNIQUE(唯一索引)</p>
                <p>3.添加INDEX(普通索引)</p>
                <p>4.添加FULLTEXT(全文索引)</p>
                <p>5.添加多列索引</p>
                <h3>数据库索引总结：（点击查看高清大图）</h3>
            </div>
        </article>
    </c-article-page>
</template>

```
:::
