module.exports = function(eleventyConfig) {
  
  // 合并后的 blog 集合逻辑
  eleventyConfig.addCollection("blog", function(collectionApi) {
    // 1. 首先获取 posts 文件夹下的所有 md 文件，并按日期排序
    const posts = collectionApi.getFilteredByGlob("./posts/*.md").sort((a, b) => {
      return a.date - b.date;
    });

    // 2. 核心：通过循环，为每一篇文章手动绑定上一篇 (prevPost) 和下一篇 (nextPost)
    for (let i = 0; i < posts.length; i++) {
      const prevPost = posts[i - 1];
      const nextPost = posts[i + 1];

      // 将找到的关联文章存储到该文章的 data 属性中，供 layout.njk 调用
      posts[i].data.prevPost = prevPost;
      posts[i].data.nextPost = nextPost;
    }

    return posts;
  });

  // 保留你原有的静态资源拷贝配置
  eleventyConfig.addPassthroughCopy("ai1");
  eleventyConfig.addPassthroughCopy("assets");

  // 返回目录配置
  return {
    dir: {
      input: ".",
      output: "_site"
    }
  };
};