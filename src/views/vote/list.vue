<template>
    <el-row :gutter="20" type="flex" justify="center">
        <el-col :xs="24" :xl="16" :sm="16">
           <el-row>
                <el-col :xs="15" :xl="21" :sm="21">
                    <h3 class="product_tit">投票列表</h3>
                </el-col>
                <el-col :xs="9" :xl="3" :sm="3">
                    <el-button type="info" plain class="vote_list_btn">
                        <a href="">
                            查看已投选项
                        </a>
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
                    <el-tag type="success">维修金额：{{item.Tuse_hezhunAmount}}</el-tag>
                    <el-tag type="success">维修范围：{{item.Tuse_fentanHouse}}</el-tag>
                    <el-tag type="success">分摊金额：{{item.TuseHouse_sumAmount}}</el-tag>
                    <el-tag type="success">现金分摊：{{item.TuseHouse_XJfentan}}</el-tag>
                    <el-button type="danger" plain @click="dialogFormVisible = true" class="vote_list_btn">点击投票</el-button>
                </el-collapse-item>
            </el-collapse>
        </el-col>
        <el-dialog title="请选择投票" :visible.sync="dialogFormVisible" custom-class="vote_list_dialog" center>
            <el-form :model="form">
                <el-form-item label="是否同意该条款" prop="resource">
                    <el-radio-group v-model="form.resource">
                    <el-radio label="同意"></el-radio>
                    <el-radio label="不同意"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </el-row>
</template>

<script>
import {fetchList} from '@/api/vote'
export default {
  name: 'VoteList',
  data () {
    return {
      activeName: ['0'],
      list: null,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  created () {
    this.getList()
  },
  rules: {
      resource: [
            { required: true, message: '是否同意该条款', trigger: 'change' }
          ]
  },
  methods: {
    getList () {
      fetchList(this.$store.getters.uid).then(response => {
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
    .el-collapse-item__header{
        font-size: 16px;
    }
    .el-collapse-item__content span{
        margin-bottom: 8px;
    }
    @media only screen and (max-width: 767px){
        .vote_list_dialog {
            width: 75% !important;
        }
    }
</style>
