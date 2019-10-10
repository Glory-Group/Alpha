<template>
  <div class="app-container">
    <div class="top">aaaaas</div>
    <div class="bottom">
      <!-- sss -->
      <Table
        :columns="column"
        :data="data"
      />
    </div>
  </div>
</template>

<script>
import { getTableData } from './api/index'
import { data } from './mock/table.js'
import Util from '@/utils'
//
export default {
  name: 'Guide',
  data() {
    return {
      data: data,
      column: [
        {
          title: '姓名',
          key: 'name',
          fixed: 'left',
          width: 100,
          render: (h, params) => {
            return h(
              'span',
              {
                on: {
                  click: () => {
                    window.open(
                      `#/client-overview?id=${params.row.baseId}`,
                      '_blank'
                    )
                  }
                },
                style: {
                  cursor: 'pointer'
                }
              },
              params.row.name
            )
          }
        },
        { title: '所在机构', key: 'institution', width: 200 },
        {
          title: '是否Alpha律所',
          key: 'isAlphaIns',
          width: 100
          // render: (h, params) => h("span", params.row.isAlphaIns ? "是" : "否")
        },
        { title: '职务', key: 'position', width: 100 },
        { title: '手机号', key: 'mobilePhone', width: 120 },
        {
          title: '区域',
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
          title: '执业年限',
          key: 'lengthOfPractice',
          width: 101,
          sortable: 'custom'
        },
        {
          title: '出生日期',
          key: 'birthday',
          width: 121,
          sortable: 'custom'
          // render: (h, params) =>
          // h("span", Util.fmtDate(params.row.birthday, "yyyy-MM-dd"))
        },
        {
          title: '邀请状态',
          key: 'inviteStatus',
          align: 'center',
          minWidth: 74
        },
        { title: '邀请人', key: 'inviter', align: 'center', minWidth: 73 },
        {
          title: '邀请记录',
          key: 'inviteRecord',
          align: 'center',
          minWidth: 101,
          render: (h, params) => {
            return h('p', params.row.inviteRecord)
          }
        },
        {
          title: 'Alpha用户',
          key: 'isAlphaUser',
          width: 120,
          render: (h, params) => {
            return h('span', params.row.isAlphaUser ? '是' : '否')
          }
        },
        {
          title: 'Alpha用户最近登录时间',
          key: 'lastLoginTime',
          sortable: 'custom',
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
          title: '近一个月的使用次数',
          key: 'monthReqTimes',
          sortable: 'custom',
          width: 150
          ////
        },
        {
          title: 'iCourt学员',
          key: 'isIcourtStudent',
          width: 120,
          render: (h, params) => {
            return h('span', params.row.isIcourtStudent ? '是' : '否')
          }
          ////
        },
        {
          title: '参加课程次数',
          key: 'courseCount',
          minWidth: 120
        },
        {
          title: '是否线上法学院',
          width: 120,
          sortable: 'custom',
          render: (h, params) => {
            return h('span', params.row.isLawCourseOnline ? '是' : '否')
          }
        },
        {
          title: '美国行学员',
          key: 'isUsaStudent',
          width: 80,
          render: (h, params) => {
            return h('span', params.row.isUsaStudent ? '是' : '否')
          }
          /////
        },
        { title: '标签', key: 'tags', width: 100 },
        {
          title: '意向程度',
          key: 'intentLevel',
          align: 'center',
          minWidth: 73
        },
        {
          title: '决策点',
          key: 'decisionPoint',
          align: 'center',
          minWidth: 73
          ////
        },
        {
          title: '橙子手机',
          key: 'orangePhone',
          align: 'center',
          minWidth: 73
        },
        {
          title: '最后更新时间',
          key: 'gmtModify',
          sortable: 'custom',
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
        { title: 'Alpha用户数', key: 'row', align: 'center', minWidth: 73 },
        {
          title: '最后联系时间',
          key: 'lastContactTime',
          minWidth: 160,
          align: 'center',
          render: (h, params) => {
            return h('span', params.row.lastContactTime)
          }
        },
        {
          title: '参加时间',
          key: 'joinActivityId',
          minWidth: 160,
          align: 'center'
          /////
        },
        {
          title: '参加人数',
          key: 'joinActivityPersonNum',
          align: 'center',
          minWidth: 70
        },
        { title: '所在群', key: 'chatGroup', align: 'center', minWidth: 70 },
        { title: '备注', key: 'remark', align: 'center', minWidth: 70 },
        {
          title: '操作',
          width: 260,
          fixed: 'right',
          align: 'center'
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
    }
  },
  watch: {
    //////
    list(val) {
      if (this.selectionIds.length) {
        val.forEach(item => {
          if (this.selectionIds.indexOf(item.baseId) > -1) {
            item._checked = true
          }
        })
      }
    }
  },
  mounted() {
  },
  methods: {
    async initData() {
      const result = await getTableData()
      console.log(result, 'result')
      ////
    }
  }
}
</script>
