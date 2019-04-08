<template>
    <el-row :gutter="20" type="flex" justify="center">
        <el-col :xs="24" :xl="16" :sm="16">
           <el-row>
                <el-col :xs="15" :xl="21" :sm="21">
                    <h3 class="product_tit">投票列表</h3>
                </el-col>
                <el-col :xs="9" :xl="3" :sm="3">
                    <el-button type="info" plain class="vote_list_btn">
                        <router-link  to="/vote/list_done">
                            查看已投选项
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
                   <el-col>
                      <el-button type="danger" plain @click="openDialog(item)" class="vote_list_btn">点击投票</el-button>
                   </el-col>
                </el-collapse-item>
            </el-collapse>
        </el-col>
        <el-dialog v-bind:title="dialogTitle" :visible.sync="dialogFormVisible" custom-class="vote_list_dialog" center>
            <el-form :model="voteForm" :rules="voteFormRules" ref="voteForm" class="vote_list_dialogcon">
                <el-form-item label="选项" prop="agree">
                    <el-radio-group v-model="voteForm.agree">
                    <el-radio label="1" border>同意</el-radio>
                    <el-radio label="0" border>不同意</el-radio>
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
  methods: {
    getList () {
      const userInfo = getUser()
      this.id = userInfo.uid
      this.loginType = userInfo.loginType
      fetchList(userInfo.uid, userInfo.loginType).then(response => {
        this.list = response.list
      })
    },
    openDialog (item) {
      this.voteForm.agree = ''
      this.dialogFormVisible = true
      this.item = item
      this.dialogTitle = item.Tuse_content
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
          const data = {
            TuseHouse_id: this.item.TuseHouse_id,
            TuseVote_value: this.voteForm.agree,
            TuseVote_way: this.loginType,
            TuseVote_wayCode: this.id,
            TuseVote_man: this.item.Taccount_name
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
    .vote_list_btn{
        float: right;
        margin-top: 5px;
        margin-bottom: 10px;
    }
    .vote_list_dialogcon{
      display: flex;
      justify-content: center;
    }
    .el-collapse-item__header{
        font-size: 16px;
    }
    .el-collapse-item__content span{
        margin-bottom: 8px;
    }
</style>
