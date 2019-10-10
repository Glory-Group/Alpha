<template>
  <div class="app-container">
    <div class="top">
      <!-- <el-form ref="form" :model="form" label-width="80px">
      <el-row type="flex" v-for="(item, index) in forms" :key="index">
        <el-col :span="6" v-for="(value, key) in item" :key="key" class="form-item">
          <el-form-item :label="value.label" class="form-label">
            <component :is="value.is"  v-model="form[value.name]" :placeholder="value.placeholder" :range.sync="form[value.name]">
              <el-option v-for="(v, k) in value.options" :key="k" :label="v.label" :value="v.value"></el-option>
            </component>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="submit">搜索</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
      </el-form>-->

      <div class="top-list" v-for="(item,index) in iptData" :key="index">
        <label class="label">{{item.label}}</label>

        <div class="top-item">
          <el-input v-if="item.type==='input'" :placeholder="'请填写'+item.label"></el-input>

          <div v-else-if="item.key==='courseNumber'">
            <el-input
              class="input-number"
              style="width:47%"
              :min="0"
              :type="item.type"
              :placeholder="'最少'"
            ></el-input>-
            <el-input
              class="input-number"
              style="width:47%"
              :min="0"
              :type="item.type"
              :placeholder="'最多'"
            ></el-input>
          </div>

          <el-select
            v-else-if="item.key==='province'"
            :placeholder="'请选择'+item.label"
            style="width:140px"
          >
            <Option v-for="(key,val) in item.list" :key="val">{{val}}</Option>
          </el-select>
          <el-select
            v-else-if="item.key==='city'"
            :placeholder="'请选择'+item.label"
            style="width:140px"
          >
            <Option v-for="(key,val) in item.list" :key="val">{{val}}</Option>
          </el-select>
          <el-select
            v-else-if="item.key==='area'"
            :placeholder="'请选择'+item.label"
            style="width:140px"
          >
            <Option v-for="(key,val) in item.list" :key="val">{{val}}</Option>
          </el-select>

          <el-select
            v-else-if="item.type==='multiple'||item.type==='radio'"
            :placeholder="'请选择'+item.label"
            style="width:140px"
          >
            <Option v-for="(key,val) in item.list" :key="val">{{val}}</Option>
          </el-select>

          <el-date-picker
            v-else-if="item.type ==='date'||item.type ==='upData'||item.type==='birthDay'||item.key==='workTime'"
            v-model="value1"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </div>
      </div>
    </div>
    <div class="bottom">
     
    </div>
  </div>
</template>

<script>
const boolOption = { 是: "是", 否: "否" };
const intentLevel = { A: "A", B: "B", C: "C", D: "D" };
const inviteStatus = {
  已添加: "已添加",
  已邀请: "已邀请",
  已同意: "已同意",
  已拒绝: "已拒绝",
  已确认: "已确认",
  已参加: "已参加",
  未参加: "未参加"
};
// import RangeInput from "@/components/common/RangeInput";
import { getTableData } from "./api/index";
import { data } from "./mock/table.js";
import Util from "@/utils";

export default {
  name: "Invite",
  components: {
    // RangeInput
  },
  data() {
    return {
      value1: "",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      iptData: [
        { label: "姓名", key: "name", type: "input", val: "el-input" },
        {
          label: "所在机构",
          key: "institution",
          type: "input",
          val: "el-input"
        },
        { label: "手机号", key: "phone", type: "input", val: "el-input" },
        { label: "职务", key: "position", type: "multiple", val: "el-select" },
        {
          label: "课程次数",
          key: "courseNumber",
          type: "number",
          val: "RangeInput"
        },
        {
          label: "是否Alpha用户",
          key: "isAlphaUser",
          type: "radio",
          list: boolOption,
          val: "el-select"
        },
        {
          label: "是否iCourt学员",
          key: "isIcourtStudent",
          type: "radio",
          list: boolOption,
          val: "el-select"
        },
        { label: "所在省份", key: "province", type: "multiple", list: {} },
        { label: "所在城市", key: "city", type: "multiple", list: {} },
        { label: "所在区县", key: "area", type: "multiple", list: {} },
        { label: "标签", key: "tags", type: "multiple", val: "el-select" },
        {
          label: "邀请状态",
          key: "inviteStatus",
          type: "radio",
          list: inviteStatus,
          val: "el-select"
        },
        { label: "邀请人", key: "inviter", type: "input", val: "el-input" },
        { label: "跟进记录", key: "content", type: "input", val: "el-input" },
        {
          label: "最后联系时间",
          key: "lastContactTime",
          type: "date",
          val: "el-date-picker"
        },
        {
          label: "决策点",
          key: "decisionPoint",
          type: "input",
          val: "el-input"
        },
        {
          label: "意向程度",
          key: "intentLevel",
          type: "radio",
          list: intentLevel,
          val: "el-select"
        },
        {
          label: "橙子手机",
          key: "orangePhone",
          type: "input",
          val: "el-input"
        },
        {
          label: "参加人数",
          key: "joinActivityPersonNum",
          type: "input",
          val: "el-input"
        },
        { label: "所在群", key: "chatGroup", type: "input", val: "el-input" },
        { label: "备注", key: "remark", type: "input", val: "el-input" },
        { label: "执业年限", key: "workTime", val: "el-date-picker" },
        {
          label: "出生日期",
          key: "birthDay",
          type: "birthDay",
          val: "el-date-picker"
        },
        {
          label: "新增邀请日期",
          key: "upDataTime",
          type: "upData",
          val: "el-date-picker"
        },
        {
          label: "是否未来律所",
          key: "futureLawFlag",
          type: "radio",
          list: boolOption,
          val: "el-select"
        },
        {
          label: "是否签到",
          key: "sign",
          type: "radio",
          list: boolOption,
          val: "el-select"
        },
        {
          label: "未来律所活动",
          key: "futureLaw",
          type: "input",
          val: "el-input"
        },
        {
          label: "是否已购买该产品",
          key: "isOrNot",
          type: "radio",
          list: boolOption,
          val: "el-select"
        }
      ],
      data: data,
      column: [
        {
          title: "姓名",
          key: "name",
          fixed: "left",
          width: 100,
          render: (h, params) => {
            return h(
              "span",
              {
                on: {
                  click: () => {
                    window.open(
                      `#/client-overview?id=${params.row.baseId}`,
                      "_blank"
                    );
                  }
                },
                style: {
                  cursor: "pointer"
                }
              },
              params.row.name
            );
          }
        },
        { title: "所在机构", key: "institution", width: 200 },
        {
          title: "是否Alpha律所",
          key: "isAlphaIns",
          width: 100
          // render: (h, params) => h("span", params.row.isAlphaIns ? "是" : "否")
        },
        { title: "职务", key: "position", width: 100 },
        { title: "手机号", key: "mobilePhone", width: 120 },
        {
          title: "区域",
          width: 120
          // render: (h, params) => {
          //   return h(
          //     "span",
          //     `${params.row.province || ""} ${params.row.city || ""} ${params
          //       .row.area || ""}`
          //   );
          // }
        },
        {
          title: "执业年限",
          key: "lengthOfPractice",
          width: 101,
          sortable: "custom"
        },
        {
          title: "出生日期",
          key: "birthday",
          width: 121,
          sortable: "custom"
          // render: (h, params) =>
          // h("span", Util.fmtDate(params.row.birthday, "yyyy-MM-dd"))
        },
        {
          title: "邀请状态",
          key: "inviteStatus",
          align: "center",
          minWidth: 74
        },
        { title: "邀请人", key: "inviter", align: "center", minWidth: 73 },
        {
          title: "邀请记录",
          key: "inviteRecord",
          align: "center",
          minWidth: 101,
          render: (h, params) => {
            return h("p", params.row.inviteRecord);
          }
        },
        {
          title: "Alpha用户",
          key: "isAlphaUser",
          width: 120,
          render: (h, params) => {
            return h("span", params.row.isAlphaUser ? "是" : "否");
          }
        },
        {
          title: "Alpha用户最近登录时间",
          key: "lastLoginTime",
          sortable: "custom",
          width: 170
          // render: (h, params) => {
          //   return h(
          //     "span",
          //     params.row.lastLoginTime
          //       ? Util.fmtDate(params.row.lastLoginTime, "yyyy-MM-dd hh:mm:ss")
          //       : ""
          //   );
          // }
          //aaaaaa
        },
        {
          title: "近一个月的使用次数",
          key: "monthReqTimes",
          sortable: "custom",
          width: 150
          ////
        },
        {
          title: "iCourt学员",
          key: "isIcourtStudent",
          width: 120,
          render: (h, params) => {
            return h("span", params.row.isIcourtStudent ? "是" : "否");
          }
          ////
        },
        {
          title: "参加课程次数",
          key: "courseCount",
          minWidth: 120
        },
        {
          title: "是否线上法学院",
          width: 120,
          sortable: "custom",
          render: (h, params) => {
            return h("span", params.row.isLawCourseOnline ? "是" : "否");
          }
        },
        {
          title: "美国行学员",
          key: "isUsaStudent",
          width: 80,
          render: (h, params) => {
            return h("span", params.row.isUsaStudent ? "是" : "否");
          }
          /////
        },
        { title: "标签", key: "tags", width: 100 },
        {
          title: "意向程度",
          key: "intentLevel",
          align: "center",
          minWidth: 73
        },
        {
          title: "决策点",
          key: "decisionPoint",
          align: "center",
          minWidth: 73
          ////
        },
        {
          title: "橙子手机",
          key: "orangePhone",
          align: "center",
          minWidth: 73
        },
        {
          title: "最后更新时间",
          key: "gmtModify",
          sortable: "custom",
          minWidth: 150
          // render: (h, params) => {
          //   return h(
          //     "span",
          //     params.row.gmtModify
          //       ? Util.fmtDate(params.row.gmtModify, "yyyy-MM-dd hh:mm:ss")
          //       : ""
          //   );
          // }
        },
        { title: "Alpha用户数", key: "row", align: "center", minWidth: 73 },
        {
          title: "最后联系时间",
          key: "lastContactTime",
          minWidth: 160,
          align: "center",
          render: (h, params) => {
            return h("span", params.row.lastContactTime);
          }
        },
        {
          title: "参加时间",
          key: "joinActivityId",
          minWidth: 160,
          align: "center"
          /////
        },
        {
          title: "参加人数",
          key: "joinActivityPersonNum",
          align: "center",
          minWidth: 70
        },
        { title: "所在群", key: "chatGroup", align: "center", minWidth: 70 },
        { title: "备注", key: "remark", align: "center", minWidth: 70 },
        {
          title: "操作",
          width: 260,
          fixed: "right",
          align: "center"
          // render: (h, params) => {
          //   return h(inviteButtonGroup, {
          //     props: {
          //       index: params.index,
          //       disable:
          //         !!params.row.inviter &&
          //         params.row.inviter !== "" &&
          //         params.row.inviter !== this.$store.state.user.name,
          //       needInvite: !params.row.inviter,
          //       show: !params.row.isMyCustomer
          //     },
          //     on: {
          //       edit: this.edit,
          //       detail: this.clientDetail,
          //       inviteRecord: this.inviteRecord,
          //       myInvite: this.myInvite
          //     }
          //   });
          // }
          //////
        }
      ]
    };
  },
  watch: {
    //////
    list(val) {
      if (this.selectionIds.length) {
        val.forEach(item => {
          if (this.selectionIds.indexOf(item.baseId) > -1) {
            item._checked = true;
          }
        });
      }
    }
  },
  mounted() {},
  methods: {
    async initData() {
      const result = await getTableData();
      console.log(result, "result");
    }
  }
};
</script>
<style lange="scss" scoped >
@import url("./scss/top/index.css");
@import url("./scss/bottom/style.css");
.el-form {
  width: 100%;
  height: 600px;
  display: flex;
  flex-wrap: wrap;
}
.el-form-item {
  width: 25%;
  display: flex;
  flex-direction: column;
}
.el-form-item__label {
  text-align: left;
  font-size: 12px;
  width: 100% !important;
}
.el-form-item__content {
  margin-left: 0 !important;
}
</style>
