const express = require("express");
const router = express.Router();
//导入数据库 sqlFn('sql',[],res=>{})
const sqlFn = require("./mysql");
//导入mockjs
const Mock = require("mockjs");

//--------------------------

/**
 * 广告分类管理--内容分类管理 导航
 */
router.get("/content/selectContentCategoryByType", (req, res) => {
  console.log("req.query.type", req.query.type);
  const type = req.query.type || 1;
  const sql = `select * from content where type='${type}'`;
  sqlFn(sql, [type], (result) => {
    console.log(result, type);
    if (result.length > 0) {
      res.send({
        status: 200,
        result,
      });
    } else {
      res.send({
        status: 500,
        msg: "暂无数据",
      });
    }
  });
});

/**
 * 广告分类获取
 */
router.get("/content/getContentCategoryByParentId", (req, res) => {
  console.log("req.query.pid", req.query.pid);
  const pid = req.query.pid || 1;
  const sql = `select * from content where pid='${pid}'`;
  sqlFn(sql, [pid], (result) => {
    console.log(result, pid);
    if (result.length > 0) {
      res.send({
        status: 200,
        result: result[0],
      });
    } else {
      res.send({
        status: 500,
        msg: "暂无数据",
      });
    }
  });
});

/**
 * 广告分类管理 增加子导航
 */
router.get("/content/insertContentCategory", (req, res) => {
  const type = req.query.cid;
  const name = req.query.name;
  //模拟不重复的数据
  // const currentId = Math.ceil(new Date().getTime() / 10000);
  const cid = Math.ceil(new Date().getTime() / 1000);
  console.log(name, cid, type);
  const sql = "insert into content (name, cid, type) values (?,?,?)";
  sqlFn(sql, [name, cid, type], (result) => {
    console.log(result);
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "添加成功",
        id: result.insertId, // w 返回id
        cid, // w 返回cid
      });
    } else {
      res.send({
        status: 500,
        msg: "添加失败",
      });
    }
  });
});

/**
 *  广告分类管理 修改类目名称
 */
router.get("/content/updateContentCategory", (req, res) => {
  const id = req.query.id;
  const name = req.query.name;
  const sql = "update content set name=? where id=?";
  sqlFn(sql, [name, id], (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "修改成功",
      });
    } else {
      res.send({
        status: 500,
        msg: "修改失败",
      });
    }
  });
});

/**
 *广告分类管理 删除子导航 id cid
 */
router.get("/content/deleteAdvertCategoryById", (req, res) => {
  const id = req.query.id;
  const cid = req.query.cid;

  getCidByType(cid).then((cids) => {
    // 获取到所有cid后进行删除操作
    cids.unshift(cid);
    // 删除操作
    let sqlDelete = `delete from content where cid in (${cids.toString()})`;
    sqlFn(sqlDelete, null, (result) => {
      if (result.affectedRows > 0) {
        res.send({
          status: 200,
          msg: "删除成功",
          cids,
        });
      } else {
        res.send({
          status: 500,
          msg: "删除失败",
        });
      }
    });
  });

  /**
   * 获取所有cid,包括子项目
   * @param {number} type
   * @returns
   */
  async function getCidByType(type) {
    let cids = [];
    cids.push(
      ...(await new Promise((resolve, reject) => {
        sqlFn(
          "SELECT cid FROM content WHERE type=?",
          [type],
          async (result) => {
            if (result.length > 0) {
              /** @type{number[]} */
              let tempCids = result.map((x) => x.cid);
              // console.log("tempCids", tempCids);
              for (const icid of tempCids) {
                tempCids.push(...(await getCidByType(icid)));
                console.log("cid", icid, "cid=>son", await getCidByType(icid));
              }
              resolve(tempCids);
            } else {
              resolve([]);
            }
          }
        );
      }))
    );
    // console.log("cids", cids);
    return cids;
  }
});

/**
 * 广告分类管理 内容增加
 */
router.get("/content/insertTbContent", (req, res) => {
  const pid = req.query.pid;
  const name = req.query.name;
  const contentUrl = req.query.url;
  const image = req.query.image;
  const sql = "insert into contentinfo (pid,name,url,image) values (?,?,?,?)";
  // console.log("sql语句:", sql);
  sqlFn(sql, [pid, name, contentUrl, image], (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "添加成功",
      });
    } else {
      res.send({
        status: 500,
        msg: "添加失败",
      });
    }
  });
});

/**
 * 广告分类管理 广告删除
 */

router.get("/content/deleteContentByIds", (req, res) => {
  const id = req.query.id;
  const sql = "delete from contentinfo where id=?";
  sqlFn(sql, [id], (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "删除成功",
      });
    } else {
      res.send({
        status: 500,
        msg: "删除失败",
      });
    }
  });
});

/**
 * 广告分类管理 批量广告删除
 */
router.get("/content/batchDeleteContentByIds", (req, res) => {
  /** @type {number[]} */
  const ids = req.query.ids;
  const sql = `delete from contentinfo where id in (${ids})`;
  console.log("sql语句:", sql);
  sqlFn(sql, null, (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "删除成功",
      });
    } else {
      res.send({
        status: 500,
        msg: "删除失败",
      });
    }
  });
});

/**
 * 内容分类管理 内容查询
 */
router.get("/content/selectTbContentAllByCategoryId", (req, res) => {
  const pid = req.query.pid;
  const sql = "select * from contentinfo where pid=?";
  sqlFn(sql, [pid], (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        result,
      });
    } else {
      res.send({
        status: 500,
        msg: "暂无数据",
      });
    }
  });
});

module.exports = router;
