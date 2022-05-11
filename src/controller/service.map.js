const serviceMap = {
  user: {
    serviceName: "user.service",
    create: {
      method: "create",
      successMsg: "创建用户成功~",
      errorMsg: "创建用户失败~"
    }
  },
  moment: {
    serviceName: "moment.service",
    create: {
      method: "create",
      successMsg: "发表动态成功~",
      errorMsg: "发表动态失败~"
    },
    detail: {
      method: "getMomentById",
      errorMsg: "查询失败~"
    },
    list: {
      method: "getMomentList",
      errorMsg: "查询失败~"
    },
    update: {
      method: "update",
      successMsg: "修改动态成功~",
      errorMsg: "修改动态失败~"
    },
    remove: {
      method: "remove",
      successMsg: "删除动态成功~",
      errorMsg: "删除动态失败~"
    }
  },
  comment: {
    serviceName: "comment.service",
    create: {
      method: "create",
      successMsg: "发表评论成功~",
      errorMsg: "发表评论失败~"
    },
    reply: {
      method: "reply",
      successMsg: "回复评论成功~",
      errorMsg: "回复评论失败~"
    },
    update: {
      method: "update",
      successMsg: "修改评论成功~",
      errorMsg: "修改评论失败~"
    },
    remove: {
      method: "remove",
      successMsg: "删除评论成功~",
      errorMsg: "删除评论失败~"
    },
    list: {
      method: "getCommentsByMomentId",
      errorMsg: "查询出错,请检查momentId是否传递~"
    },
    addLabels: {
      method: "",
      successMsg: "创建标签成功~",
      errorMsg: "创建标签失败~"
    }
  },
  label: {
    serviceName: "label.service",
    create: {
      method: "create",
      successMsg: "创建标签成功~",
      errorMsg: "创建标签失败~"
    }
  }
}

module.exports = serviceMap
