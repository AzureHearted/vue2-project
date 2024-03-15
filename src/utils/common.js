// w 公共方法

// f 处理数据html标签显示界面
export function removeHTMLTag(htmlStr) {
  let html = htmlStr
    .replace(/<img.*?>/g, "图片")
    .replaceAll(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, "");
  return html;
}

// f 获取路径对应的名称
export function getPathName(path = "") {
  let matches = path.match(/([^/]+)$/);
  if (matches) {
    return matches[0]; // 获取数组中的第一个元素，即首个匹配项
  } else {
    return path;
  }
}
