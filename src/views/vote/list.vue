<template>
    <el-row :gutter="20" type="flex" justify="center">
        <el-col :xs="24" :xl="16" :sm="16">
            <el-row>
                <el-alert
                        title = "如果房屋座落与您实际房屋信息不一致，请与物业公司或维修资金监管机构联系！"
                        type  = "warning"
                        center
                        show-icon>
                </el-alert>
            </el-row>
           <el-row>
                <el-col :xs="15" :xl="21" :sm="21">
                    <h3 class="product_tit">投票列表</h3>
                </el-col>
                <el-col :xs="9" :xl="3" :sm="3">
                    <router-link  to="/vote/list_done">
                        <el-button type="info" plain class="vote_list_btn">
                            查看已投选项
                        </el-button>
                    </router-link>
                </el-col>
           </el-row>
            <el-row>
                    <el-collapse v-model="activeName" accordion>
                        <el-collapse-item
                                                                                        v-for = "(item, index) in list"
                                                                                 v-bind:name  = "index"
                                                                                 v-bind:key   = "index"
                        >
                            <template slot="title" type="flex" justify="space-around">
                               <el-col>
                                 <el-row type="flex" :xs="24" class="vote_item_tit">
                                    <el-col >[维修项目]                      : {{item.Tuse_content}}</el-col>
                                    <el-col class="vote_item_time"
                                     v-if="item.djs !== ''"
                                    >[结束时间]: {{item.djs}}</el-col>
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
                            <el-col>
                                <el-button type="danger" plain @click="openDialog(item)" :disabled="item.end" class="vote_list_btn">点击投票</el-button>
                            </el-col>
                            </el-card>
                        </el-collapse-item>
                    </el-collapse>
            </el-row>
        </el-col>
        <el-dialog v-bind:title="dialogTitle" :visible.sync="dialogFormVisible" custom-class="vote_list_dialog" center>
            <el-alert
                    :title = "address"
                    center
                                    type    = "success"
                                  :closable = "false">
            </el-alert>
            <el-form :model="voteForm" :rules="voteFormRules" ref="voteForm" class="vote_list_dialogcon">
                <el-form-item label="选项" prop="agree">
                    <el-radio-group v-model="voteForm.agree">
                    <el-radio label="1" border>同意</el-radio>
                    <el-radio label="2" border>不同意</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('voteForm')">确 定</el-button>
            </div>
        </el-dialog>
    </el-row>
</template>

<script>
import {fetchList, doVote} from '@/api/vote'
import {getUser} from '@/utils/auth'

export default {
  name: 'VoteList',
  inject: ['reload'],
  data () {
    return {
      activeName: [0],
      list: null,
      id: '',
      loginType: '',
      item: null,
      dialogFormVisible: false,
      dialogTitle: '',
      address: '',
      voteForm: {
        agree: ''
      },
      voteFormRules: {
        agree: [
          { required: true, message: '请选择是否同意', trigger: 'change' }
        ]
      }
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
      if (endtime < '2001-1-1') {
        return ''
      }
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
      this.loginType = userInfo.loginType
      fetchList(userInfo.uid, userInfo.loginType).then(response => {
        response.list.map((item, index) => {
          this.$set(
            item, 'djs', this.InitTime(item.Tuse_voteEnd)
          )
        })
        this.list = response.list
      })
    },
    openDialog (item) {
      this.voteForm.agree = ''
      this.dialogFormVisible = true
      this.item = item
      this.dialogTitle = item.Tuse_content
      this.address = item.address
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
          const data = {
            TuseHouse_id: this.item.TuseHouse_id,
            TuseHouseVote_value: this.voteForm.agree,
            TuseHouseVote_way: this.loginType,
            TuseHouseVote_wayCode: this.id,
            TuseHouseVote_man: this.item.Taccount_name
          }
          doVote(data).then(response => {
            const data = response
            if (data.code === 200) {
              this.$message({
                message: '投票成功',
                type: 'success',
                center: true
              })
              this.reload()
            } else {
              this.$message({
                message: '投票失败，请重试',
                type: 'error',
                center: true
              })
            }
          })
        } else {
          this.$message({
            message: '请选择是否同意！',
            type: 'error',
            center: true
          })
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
    .el-radio{
      margin-right: 0px;
    }
    .el-radio.is-bordered {
        padding: 12px 18px 0 10px;
    }
    .vote_list_btn{
        float        : right;
        margin-top   : 5px;
        margin-bottom: 10px;
    }
    .vote_list_dialogcon{
      display        : flex;
      justify-content: center;
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
