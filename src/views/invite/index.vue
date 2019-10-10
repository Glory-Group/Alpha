<template>
  <div class="app-container">
   <div class="top">
      <el-form ref="form" :model="form" label-width="80px">
         <el-form-item label="活动名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
      </el-form>
        <div class="top-list" v-for="(item,index) in iptData" :key="index" >
            <label class="label" >{{item.label}}</label>
            <!-- // <top-item :items="item" ></top-item> -->
            <div class="top-item">
                <!-- input -->
                 <Input v-if="item.type==='input'" :placeholder="'请填写'+item.label" ></Input>
               
                <!-- number -->
                <div v-else-if="item.key==='courseNumber'" >
                   <Input class="input-number" :min="0" :type="item.type" :placeholder="'最少'"></Input>
                     -
                   <Input class="input-number" :min="0" :type="item.type" :placeholder="'最多'"></Input>
                </div>
                <!-- select 三级联动 -->
                <Select
                 v-else-if="item.key==='province'"
                 
                 :placeholder="'请选择'+item.label"
                 style="width:140px"
                >
                  <Option v-for="(key,val) in item.list" :key="val" >{{val}}</Option>
                </Select>
                <Select
                v-else-if="item.key==='city'"
             
                :placeholder="'请选择'+item.label"
                 style="width:140px"
                >
                  <Option v-for="(key,val) in item.list" :key="val" >{{val}}</Option>
                </Select>
                <Select
                v-else-if="item.key==='area'"
               
                :placeholder="'请选择'+item.label"
                 style="width:140px"
                >
                 <Option v-for="(key,val) in item.list" :key="val" >{{val}}</Option>
                </Select>
                <!-- select -->
                <Select
                v-else-if="item.type==='multiple'||item.type==='radio'"
               
                :placeholder="'请选择'+item.label"
                 style="width:140px"
                >
                    <Option v-for="(key,val) in item.list" :key="val" >{{val}}</Option>
                </Select>
                
                <el-date-picker
                v-else="item.type ==='date'||item.type ==='upData'||item.type==='birthDay'||item.key='workTime'" 
                v-model="value1"
                type="date"
                placeholder="选择日期">
               </el-date-picker>
 
            </div>
        </div>
   </div>
   <div class="bottom"></div>
  </div>
</template>

<script>
// Vue.component('top-item',{
//     props:['items'],
//     render:function(createElement){
//        if(this.items.type==='input'){
//            return createElement('Input',{style:{width:"120px"},placeholder:'请选择'+item.label})
//        }
//     }
// })
const boolOption = {'是': true, '否': false}
const intentLevel = {'A': 'A', 'B': 'B', 'C': 'C', 'D': 'D'}
const inviteStatus = {'已添加': '已添加', '已邀请': '已邀请', '已同意': '已同意', '已拒绝': '已拒绝', '已确认': '已确认', '已参加': '已参加', '未参加': '未参加'}
import { getTableData } from './api/index'
import { data } from './mock/table.js'
//import Util from '@/utils'
export default {
  name: 'Invite',
  data() {
    return {
       value1:'',
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
       iptData:[
          {label: '姓名', key: 'name', type: 'input',val:"el-input"},
          {label: '所在机构', key: 'institution', type: 'input',val:"el-input"},
          {label: '手机号', key: 'phone', type: 'input',val:"el-input"},
          {label: '职务', key: 'position', type: 'multiple'},
          {label: '课程次数', key: 'courseNumber', type: 'number'},
          {label: '是否Alpha用户', key: 'isAlphaUser', type: 'radio'},
          {label: '是否iCourt学员', key: 'isIcourtStudent', type: 'radio'},
          {label: '所在省份', key: 'province', type: 'multiple', list: {}},
          {label: '所在城市', key: 'city', type: 'multiple', list: {}},
          {label: '所在区县', key: 'area', type: 'multiple', list: {}},
          {label: '标签', key: 'tags', type: 'multiple'},
          {label: '邀请状态', key: 'inviteStatus', type: 'radio', list: inviteStatus},
          {label: '邀请人', key: 'inviter', type: 'input'},
          {label: '跟进记录', key: 'content', type: 'input'},
          {label: '最后联系时间', key: 'lastContactTime', type: 'date'},
          {label: '决策点', key: 'decisionPoint', type: 'input'},
          {label: '意向程度', key: 'intentLevel', type: 'radio', list: intentLevel},
          {label: '橙子手机', key: 'orangePhone', type: 'input'},
          {label: '参加人数', key: 'joinActivityPersonNum', type: 'input'},
          {label: '所在群', key: 'chatGroup', type: 'input'},
          {label: '备注', key: 'remark', type: 'input'},
          {label: '执业年限', key: 'workTime'},
          {label: '出生日期', key: 'birthDay', type: 'birthDay'},
          {label: '新增邀请日期', key:'upDataTime',type: 'upData'},
          {label: '是否未来律所', key: 'futureLawFlag', type: 'radio', list: boolOption},
          {label: '是否签到', key: 'sign', type: 'radio', list: boolOption},
          {label: '未来律所活动', key: 'futureLaw', type: 'input'},
          {label: '是否已购买该产品', key: 'isOrNot', type: 'radio', list: boolOption}
        ]
    }
  },
  mounted() {
  },
  methods: {
    async initData() {
      const result = await getTableData()
      console.log(result, 'result')
    }
  }
}
</script>
<style >
    @import url("./scss/top/index.css");
</style>
