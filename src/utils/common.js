//w 公共方法

//f 处理数据html标签显示界面
export function removeHTMLTag(htmlStr) {
  let html = htmlStr
    .replace(/<img.*?>/g, "图片")
    .replaceAll(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, "");
  return html;
}
