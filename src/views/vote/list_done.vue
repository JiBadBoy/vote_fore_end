<template>
    <el-row :gutter="20" type="flex" justify="center">
        <el-col :xs="24" :xl="16" :sm="16">
           <el-row>
                <el-col :xs="15" :xl="21" :sm="21">
                    <h3 class="product_tit">已投票列表</h3>
                </el-col>
                <el-col :xs="9" :xl="3" :sm="3">
                    <el-button type="primary" plain class="vote_list_btn">
                        <router-link  to="/vote/list">
                            开始投票
                        </router-link>
                    </el-button>
                </el-col>
           </el-row>
             <el-collapse v-model="activeName" accordion>
                <el-collapse-item
                        v-for="(item, index) in list"
                        v-bind:title="item.Tuse_content"
                        v-bind:name="index"
                        v-bind:key="index"
                        >
                        <el-col>
                             <el-tag type="success">维修范围：{{item.Tuse_fentanHouse}}</el-tag>
                        </el-col>
                        <el-col>
                            <el-tag type="success">维修金额：{{item.Tuse_hezhunAmount}}</el-tag>
                            <el-tag type="success">分摊金额：{{item.TuseHouse_sumAmount}}</el-tag>
                            <el-tag type="success">现金分摊：{{item.TuseHouse_XJfentan}}</el-tag>
                        </el-col>
                   <el-row :gutter="20">
                        <el-col :xs="9" :xl="3" :sm="3" class="vote_result_tip">
                            你的投票结果为：
                        </el-col>
                        <el-col :xs="15" :xl="4" :sm="3">
                            <el-alert
                                title="同意"
                                type="success"
                                center
                                show-icon
                                :closable="false"
                                v-if="item.TuseVote_value === '1'"
                            >
                            </el-alert>
                            <el-alert
                                title="不同意"
                                type="error"
                                center
                                show-icon
                                :closable="false"
                                v-if="item.TuseVote_value === '0'"
                            >
                            </el-alert>
                        </el-col>
                   </el-row>
                </el-collapse-item>
            </el-collapse>
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
  methods: {
    getList () {
      const userInfo = getUser()
      this.id = userInfo.uid
      fetchDoneList(userInfo.uid).then(response => {
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
    }
    .el-collapse-item__header{
        font-size: 16px;
    }
    .el-collapse-item__content span{
        margin-bottom: 8px;
    }
</style>
