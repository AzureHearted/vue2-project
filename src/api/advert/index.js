import axios from "@/utils/request";

// w 环境变量获取api
const apiUrl = process.env.VUE_APP_BASE_URL;

const base = {
  selectContentCategoryByType:
    apiUrl + "/advert/content/selectContentCategoryByType", // 广告分类管理--内容分类管理 导航
  insertContentCategory: apiUrl + "/advert/content/insertContentCategory", // 广告分类管理 增加子导航
  getContentCategoryByParentId:
    apiUrl + "/advert/content/getContentCategoryByParentId", // 广告分类获取
  deleteAdvertCategoryById: apiUrl + "/advert/content/deleteAdvertCategoryById", // 删除广告分类
  updateContentCategory: apiUrl + "/advert/content/updateContentCategory", // 修改广告分类名称
  insertTbContent: apiUrl + "/advert/content/insertTbContent", // 添加广告
  deleteContentByIds: apiUrl + "/advert/content/deleteContentByIds", // 删除广告
  batchDeleteContentByIds: apiUrl + "/advert/content/batchDeleteContentByIds", // 批量删除广告
  selectTbContentAllByCategoryId:
    apiUrl + "/advert/content/selectTbContentAllByCategoryId", // 查询广告数据
};

export default {
  /** 获取广告分类信息
   * @param {object} params
   * @param {number=} params.type
   */
  selectContentCategoryByType(params) {
    return axios.get(base.selectContentCategoryByType, {params});
  },
  /** 增加广告分类信息
   * @param {object} params
   * @param {number} params.cid 父类id
   * @param {string} params.name 分类名称
   */
  insertContentCategory(params) {
    return axios.get(base.insertContentCategory, {params});
  },
  /** 获取广告分类信息
   * @param {object} params
   * @param {number=} params.cid
   */
  getContentCategoryByParentId(params) {
    return axios.get(base.getContentCategoryByParentId, {params});
  },
  /** 删除广告分类
   * @param {object} params
   * @param {number} params.id
   * @param {number} params.cid
   */
  deleteAdvertCategoryById(params) {
    return axios.get(base.deleteAdvertCategoryById, {params});
  },
  /** 修改广告分类的名称
   * @param {object} params
   * @param {number} params.id
   * @param {string} params.name
   */
  updateContentCategory(params) {
    return axios.get(base.updateContentCategory, {params});
  },
  /** 添加广告
   * @param {object} params
   * @param {number} params.pid
   * @param {string} params.name
   * @param {string} params.url
   * @param {string} params.image
   */
  insertTbContent(params) {
    return axios.get(base.insertTbContent, {params});
  },
  /** 删除广告
   * @param {object} params
   * @param {number} params.id
   */
  deleteContentByIds(params) {
    return axios.get(base.deleteContentByIds, {params});
  },
  /** 批量删除广告
   * @param {object} params
   * @param {number[]} params.ids
   */
  batchDeleteContentByIds(params) {
    return axios.get(base.batchDeleteContentByIds, {params});
  },
  /** 查询广告信息
   * @param {object} params
   * @param {number} params.pid
   */
  selectTbContentAllByCategoryId(params) {
    return axios.get(base.selectTbContentAllByCategoryId, {params});
  },
};
