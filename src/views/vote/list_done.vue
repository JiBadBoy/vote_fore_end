<template>
    <el-row :gutter="20" type="flex" justify="center">
        <el-col :xs="24" :xl="16" :sm="16">
           <el-row>
                <el-col :xs="15" :xl="21" :sm="21">
                    <h3 class="product_tit">已投票列表</h3>
                </el-col>
                <el-col :xs="9" :xl="3" :sm="3">
                    <router-link  to="/vote/list">
                        <el-button type="primary" plain class="vote_list_btn">
                            开始投票
                        </el-button>
                    </router-link>
                </el-col>
           </el-row>
            <el-row>
                <el-collapse v-model="activeName" accordion>

                    <el-collapse-item
                            v-for="(item, index) in list"
                            v-bind:name="index"
                            v-bind:key="index"
                    >

                        <template slot="title" type="flex" justify="space-around">
                            <el-col>
                                <el-row type="flex" :xs="24" class="vote_item_tit">
                                <el-col >[维修项目]: {{item.Tuse_content}}</el-col>
                                <el-col class="vote_item_time">[结束时间]: {{item.djs}}</el-col>
                                </el-row>
                            </el-col>
                        </template>
                        <el-card shadow="always">
                            <el-col>
                                <el-tag >房屋坐落：{{item.address}}</el-tag>
                            </el-col>
                            <el-col>
                                <el-tag type="success">分摊范围：{{item.Tuse_fentanHouse}}</el-tag>
                            </el-col>
                            <el-col>
                                <el-tag type="success">维修金额：{{item.Tuse_hezhunAmount}}</el-tag>
                                <el-tag type="success">分摊金额：{{item.TuseHouse_sumAmount}}</el-tag>
                                <el-tag type="success">现金分摊：{{item.TuseHouse_XJfentan}}</el-tag>
                                <el-tag type="success">资金分摊：{{item.TuseHouse_ZJfentan}}</el-tag>
                            </el-col>
                        <el-row :gutter="20">
                            <el-col :xs="9" :xl="3" :sm="3" class="vote_result_tip">
                                投票意见为：
                            </el-col>
                            <el-col :xs="15" :xl="4" :sm="3">
                                <el-alert
                                        title="同意"
                                        type="success"
                                        center
                                        show-icon
                                        :closable="false"
                                        v-if="item.TuseVote_value === 1"
                                >
                                </el-alert>
                                <el-alert
                                        title="不同意"
                                        type="error"
                                        center
                                        show-icon
                                        :closable="false"
                                        v-if="item.TuseVote_value === 0"
                                >
                                </el-alert>
                            </el-col>
                        </el-row>
                        </el-card>
                    </el-collapse-item>

                </el-collapse>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
import {fetchDoneList} from '@/api/vote'
import {getUser} from '@/utils/auth'

export default {
  name: 'VoteList',
  data () {
    return {
      activeName: [0],
      list: null,
      id: ''
    }
  },
  created () {
    this.getList()
  },
  mounted () {
    setInterval(() => {
      for (var key in this.list) {
        this.list[key]['djs'] = this.InitTime(this.list[key]['Tuse_voteEnd'])
      }
    }, 1000)
  },
  methods: {
    InitTime (endtime) {
      let endDate = new Date(endtime)
      let end = endDate.getTime()
      let time = end - new Date().getTime()
      if (time <= 0) {
        return '结束'
      } else {
        var dd = Math.floor(time / 1000 / 60 / 60 / 24)
        var hh = Math.floor((time / 1000 / 60 / 60) % 24)
        var mm = Math.floor((time / 1000 / 60) % 60)
        var ss = Math.floor((time / 1000) % 60)
        let str = dd + '天' + hh + '小时' + mm + '分' + ss + '秒'
        return str
      }
    },
    getList () {
      const userInfo = getUser()
      this.id = userInfo.uid
      fetchDoneList(userInfo.uid, userInfo.loginType).then(response => {
        response.list.map((item, index) => {
          this.$set(
            item, 'djs', this.InitTime(item.Tuse_voteEnd)
          )
        })
        this.list = response.list
      })
    }
  }
}
</script>

<style scoped>
    .vote_list_btn{
        float: right;
        margin-top: 5px;
    }
    .vote_result_tip{
        padding-top: 8px;
        padding-bottom: 8px;
        color: #f56c6c;
        text-align: center;
    }
    .el-collapse-item__header{
        font-size: 16px;
    }
    .el-collapse-item__content span{
        margin-bottom: 8px;
    }
    .vote_item_time {
      color: #F56C6C;
    }
    @media only screen and (max-width: 767px){
    .vote_item_tit{
      flex-wrap: wrap;
    }
    .vote_item_tit .el-col{
      line-height: 20px;
    }
  }
</style>
