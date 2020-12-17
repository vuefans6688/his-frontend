import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/auth/login',
    },
    {
      path: '/auth/login',
      name: 'Login',
      component: resolve => require(['@/pages/auth/Login'], resolve),
      meta: {
        authFree: true, // 不需要鉴权
      },
    },
    {
      path: '/auth/regist',
      name: 'regist',
      component: resolve => require(['@/pages/auth/Regist'], resolve),
    },
    // 管理员模块
    {
      path: '/administrator',
      component: resolve => require(['@/pages/admin/Administrator'], resolve),
      children: [
        {
          path: '/',
          redirect: 'index',
        },
        {
          path: 'index',
          component: resolve => require(['@/pages/admin/components/ClinicList'], resolve),
        },
        {
          path: 'accountInfo',
          component: resolve => require(['@/pages/userinfo/components/AccountInfo'], resolve),
        },
      ],
    },
    // 主导航页面
    {
      path: '/navigator',
      component: resolve => require(['@/pages/navigator/Navigator'], resolve),
      children: [
        {
          path: '/',
          redirect: 'registration',
        },
        // 帮助
        {
          path: 'help',
          component: resolve => require(['@/pages/help/HelpMenu'], resolve),
          children: [
            {
              path: '/',
              redirect: 'ManagementHelp',
            },
            {
              path: 'regHelp',
              component: resolve => require(['@/pages/help/components/RegHelp'], resolve),
            },
            {
              path: 'Stationhelp',
              component: resolve => require(['@/pages/help/components/Stationhelp'], resolve),
            },
            {
              path: 'tempHelp',
              component: resolve => require(['@/pages/help/components/tempHelp'], resolve),
            },
            {
              path: 'medHelp',
              component: resolve => require(['@/pages/help/components/medHelp'], resolve),
            },
            {
              path: 'feeHelp',
              component: resolve => require(['@/pages/help/components/FeeHelp'], resolve),
            },
            {
              path: 'pharhelp',
              component: resolve => require(['@/pages/help/components/pharhelp'], resolve),
            },
            {
              path: 'ManagementHelp',
              component: resolve => require(['@/pages/help/components/ManagementHelp'], resolve),
            },
            {
              path: 'printHelp',
              component: resolve => require(['@/pages/help/components/printHelp'], resolve),
            },
          ],
        },
        // 消息管理
        {
          path: 'message',
          component: resolve => require(['@/pages/message/MessageSort'], resolve),
          children: [
            {
              path: '',
              redirect: 'unreadMessage',
            },
            {
              path: 'allMessage',
              component: resolve => require(['@/pages/message/sort/all'], resolve),
            },
            {
              path: 'importMessage',
              component: resolve => require(['@/pages/message/sort/important'], resolve),
            },
            {
              path: 'unreadMessage',
              component: resolve => require(['@/pages/message/sort/unread'], resolve),
            },
          ],
        },
        // 机构管理
        {
          path: 'settings',
          component: resolve => require(['@/pages/clinic/Clinic'], resolve),
          index: 8,
          needAuth: true,
          children: [
            {
              path: '/',
              redirect: 'registInfo',
            },
            {
              path: 'registInfo',
              component: resolve => require(['@/pages/clinic/components/RegistInfo'], resolve),
            },
            {
              path: 'staffManage',
              component: resolve => require(['@/pages/clinic/components/StaffManage'], resolve),
            },
            {
              path: 'sectionManage',
              component: resolve => require(['@/pages/clinic/components/SectionManage'], resolve),
            },
            {
              path: 'treatment',
              component: resolve => require(['@/pages/clinic/components/Treatment'], resolve),
            },
            {
              path: 'material',
              component: resolve => require(['@/pages/clinic/components/Material'], resolve),
            },
            {
              path: 'others',
              component: resolve => require(['@/pages/clinic/components/Others'], resolve),
            },
            {
              path: 'printSetting',
              component: resolve => require(['@/pages/clinic/components/PrintSetting'], resolve),
            },
            {
              path: 'medicalInsurance/bind',
              component: resolve => require(['@/pages/clinic/medical-insurance/bind/Bind'], resolve),
            },
            {
              path: 'medicalInsurance/drugCheckin',
              component: resolve => require(['@/pages/clinic/medical-insurance/drugCheckin/DrugCheckin'], resolve),
            },
            {
              path: 'medicalInsurance/projectCheckin',
              component: resolve => require(['@/pages/clinic/medical-insurance/projectCheckin/ProjectCheckin'], resolve),
            },
            {
              path: 'medicalInsurance/materialCheckin',
              component: resolve => require(['@/pages/clinic/medical-insurance/materialCheckin/MaterialCheckin'], resolve),
            },
            {
              path: 'diagnosisFee',
              component: resolve => require(['@/pages/clinic/components/DiagnosisFee'], resolve),
            },
            {
              path: 'medicalInsurance/accounts/all',
              component: resolve => require(['@/pages/clinic/medical-insurance/accounts/AllAccounts'], resolve),
            },
            {
              path: 'medicalInsurance/accounts/day/:date',
              component: resolve => require(['@/pages/clinic/medical-insurance/accounts/DayAccounts'], resolve),
            },
            {
              path: 'medicalInsurance/accounts/detail',
              component: resolve => require(['@/pages/clinic/medical-insurance/accounts/AccountsDetail'], resolve),
            },
          ],
        },
        // 客户档案(and 随访)
        {
          path: 'customers',
          component: resolve => require(['@/pages/customers/Customers'], resolve),
          index: 6,
          needAuth: true,
          children: [
            {
              path: '/',
              redirect: 'customersList',
            },
            {
              path: 'customersList',
              component: resolve => require(['@/pages/customers/components/customerList'], resolve),
            },
            {
              path: 'customerDetail',
              component: resolve => require(['@/pages/customers/components/CustomerDetail'], resolve),
              children: [
                {
                  path: '/',
                  redirect: 'customerInfo',
                },
                {
                  path: 'customerInfo',
                  component: resolve => require(['@/pages/customers/components/details/CustomerInfo'], resolve),
                },
                {
                  path: 'visitRecord',
                  component: resolve => require(['@/pages/customers/components/details/VisitRecord'], resolve),
                },
                {
                  path: 'followUpRecord',
                  component: resolve => require(['@/pages/customers/components/details/FollowUpRecord'], resolve),
                },
                {
                  path: 'chargeRecord',
                  component: resolve => require(['@/pages/customers/components/details/ChargeRecord'], resolve),
                },
              ],
            },
            // 随访
            {
              path: 'newfollow',
              name: 'newfollow',
              component: resolve => require(['@/pages/customers/followup/newfollow'], resolve),
            },
            {
              path: 'newfollowproject',
              name: 'newfollowproject',
              component: resolve => require(['@/pages/customers/followup/newfollowproject'], resolve),
            },
            {
              path: 'waitingfollow',
              name: 'waitingfollow',
              component: resolve => require(['@/pages/customers/followup/waitingfollow'], resolve),
            },
            {
              path: 'follow',
              name: 'follow',
              component: resolve => require(['@/pages/customers/followup/follow'], resolve),
            },
            {
              path: 'modificationfollow',
              name: 'modificationfollow',
              component: resolve => require(['@/pages/customers/followup/modificationfollow'], resolve),
            },
            {
              path: 'alreadyfollow',
              name: 'alreadyfollow',
              component: resolve => require(['@/pages/customers/followup/alreadyfollow'], resolve),
            },
            {
              path: 'cancelfollow',
              name: 'cancelfollow',
              component: resolve => require(['@/pages/customers/followup/cancelfollow'], resolve),
            },
            {
              path: 'checkcancel',
              name: 'checkcancel',
              component: resolve => require(['@/pages/customers/followup/checkcancel'], resolve),
            },
            {
              path: 'checkfollow',
              name: 'checkfollow',
              component: resolve => require(['@/pages/customers/followup/checkfollow'], resolve),
            },
          ],
        },
        // 用户信息
        {
          path: 'userinfo',
          component: resolve => require(['@/pages/userinfo/UserInfo'], resolve),
          children: [
            {
              path: '/',
              redirect: 'accountInfo',
            },
            {
              path: 'accountInfo',
              component: resolve => require(['@/pages/userinfo/components/AccountInfo'], resolve),
            },
          ],
        },
        // 挂号
        {
          path: 'registration',
          component: resolve => require(['@/pages/registration/registration'], resolve),
          index: 1,
          needAuth: true,   // 需要验证权限
          children: [
            {
              path: '/',
              redirect: 'addregistration',
            },
            {
              path: 'addregistration',
              component: resolve => require(['@/pages/registration/addregistration'], resolve),
            },
            {
              path: 'registrationInfo',
              component: resolve => require(['@/pages/registration/registrationInfo'], resolve),
            },
            {
              path: 'appointment',
              component: resolve => require(['@/pages/registration/appointment'], resolve),
            },
            {
              path: 'newfollowproject',
              component: resolve => require(['@/pages/customers/followup/newfollowproject'], resolve),
            },
          ],
        },
        // 医生工作站
        {
          path: 'doctorStation',
          component: resolve => require(['@/pages/doctorStation/DoctorStation'], resolve),
          index: 2,
          needAuth: true,
          children: [
            {
              path: '/',
              redirect: 'patientMessage',
            },
            {
              path: 'patientMessage',
              component: resolve => require(['@/pages/doctorStation/PatientMessage'], resolve),
            },
            {
              path: 'treatmentHistory',
              name: 'treatmentHistory',
              component: resolve => require(['@/pages/doctorStation/TreatmentHistory'], resolve),
            },
            {
              path: 'checkClientMes',
              name: 'checkClientMes',
              component: resolve => require(['@/pages/doctorStation/components/CheckClientMes'], resolve),
            },
            {
              path: 'patientVistor/:patientid',
              component: resolve => require(['@/pages/customers/components/CustomerDetail'], resolve),
              children: [
                {
                  path: '/',
                  redirect: 'customerInfo',
                },
                {
                  path: 'customerInfo',
                  component: resolve => require(['@/pages/customers/components/details/CustomerInfo'], resolve),
                },
                {
                  path: 'visitRecord',
                  component: resolve => require(['@/pages/customers/components/details/VisitRecord'], resolve),
                },
                {
                  path: 'followUpRecord',
                  component: resolve => require(['@/pages/customers/components/details/FollowUpRecord'], resolve),
                },
                {
                  path: 'chargeRecord',
                  component: resolve => require(['@/pages/customers/components/details/ChargeRecord'], resolve),
                },
              ],
            },
          ],
        },
        // 收费发药
        {
          path: 'payCharges',
          component: resolve => require(['@/pages/payCharges/PayCharges'], resolve),
          index: 3,
          needAuth: true,
          children: [
            {
              path: '/',
              redirect: 'payChargesList',
            },
            {
              path: 'payChargesList',
              component: resolve => require(['@/pages/payCharges/child/PayChargesList'], resolve),
            },
            {
              path: 'payChargesHistory',
              component: resolve => require(['@/pages/payCharges/child/PayChargesHistory'], resolve),
            },
            {
              path: 'payDetail/:registid',
              component: resolve => require(['@/pages/payCharges/child/PayDetail'], resolve),
            },
            {
              path: 'returnsFee/:registid/:chargestatus',
              component: resolve => require(['@/pages/payCharges/child/ReturnsFee'], resolve),
            },
            {
              path: 'directSell',
              component: resolve => require(['@/pages/payCharges/child/DirectSell'], resolve),
            },
            // 发药
            {
              path: 'sell',
              name: 'sell',
              component: resolve => require(['@/pages/payCharges/dispensing/Sell'], resolve),
            },
            {
              path: 'records',
              name: 'records',
              component: resolve => require(['@/pages/payCharges/dispensing/records'], resolve),
            },
            {
              path: 'Pills',
              name: 'Pills',
              component: resolve => require(['@/pages/payCharges/dispensing/Pills'], resolve),
            },
            {
              path: 'retMed',
              name: 'retMed',
              component: resolve => require(['@/pages/payCharges/dispensing/retMed'], resolve),
            },
          ],
        },
        // 药品管理
        {
          path: 'medicine',    // 药品信息管理
          component: resolve => require(['@/pages/medicine/med_control/medicine'], resolve),
          index: 4,
          needAuth: true,
          children: [
            {
              path: '/',
              redirect: 'medicineInfo',
            },
            {
              path: 'medicineInfo',       // 药品信息
              name: 'medicineInfo',
              component: resolve => require(['@/pages/medicine/med_control/medicineInfo'], resolve),
            },
            {
              path: 'editmedicine',  // 新增药品
              name: 'editmedicine',
              component: resolve => require(['@/pages/medicine/med_control/editmedicine'], resolve),
            },
            {
              path: 'medsuppliers',  // 供应商维护
              name: 'medsuppliers',
              component: resolve => require(['@/pages/medicine/Medsuppliers/Medsuppliers'], resolve),
            },
            {
              path: 'addstore',     // 采购入库2
              name: 'addstore',
              component: resolve => require(['@/pages/medicine/med_addstore/addstore'], resolve),
            },
            {
              path: 'medenquiries',     // 库存查询
              name: 'medenquiries',
              component: resolve => require(['@/pages/medicine/med_enquiries/medenquiries'], resolve),
            },
            {
              path: 'medaudit',     // 入库审核1
              name: 'medaudit',
              component: resolve => require(['@/pages/medicine/med_addstore/medaudit'], resolve),
            },
            {
              path: 'medaudit2',     // 入库审核2
              name: 'medaudit2',
              component: resolve => require(['@/pages/medicine/med_addstore/medaudit2'], resolve),
            },
            {
              path: 'storereviewed',     // 查看审核明细
              name: 'storereviewed',
              component: resolve => require(['@/pages/medicine/med_addstore/storereviewed'], resolve),
            },
            {
              path: 'medinventory',     // 库存盘点
              name: 'medinventory',
              component: resolve => require(['@/pages/medicine/med_inventory/medinventory'], resolve),
            },
            {
              path: 'editstore',     // 编辑入库
              name: 'editstore',
              component: resolve => require(['@/pages/medicine/med_addstore/editstore'], resolve),
            },
            {
              path: 'newinventory',     // 新增盘点
              name: 'newinventory',
              component: resolve => require(['@/pages/medicine/med_inventory/newinventory'], resolve),
            },
            {
              path: 'seeninventory',     // 查看盘点
              name: 'seeninventory',
              component: resolve => require(['@/pages/medicine/med_inventory/seeninventory'], resolve),
            },
            {
              path: 'medeffective',     // 效期提醒
              name: 'medeffective',
              component: resolve => require(['@/pages/medicine/med_effective/medeffective'], resolve),
            },
            {
              path: 'medwarning',     // 库存提醒
              name: 'medwarning',
              component: resolve => require(['@/pages/medicine/med_warning/medwarning'], resolve),
            },
            {
              path: 'medprocurement',     // 采购入库1
              name: 'medprocurement',
              component: resolve => require(['@/pages/medicine/med_addstore/medprocurement'], resolve),
            },
            {
              path: 'medpricing',     // 药品调价
              name: 'medpricing',
              component: resolve => require(['@/pages/medicine/med_pricing/medpricing'], resolve),
            },
          ],
        },
        //  模块
        {
          path: 'modulemenu',    // 模块
          component: resolve => require(['@/pages/module/modulemenu'], resolve),
          index: 5,
          needAuth: true,
          children: [
            {
              path: '/',
              redirect: 'medicalrecords',
            },
            {
              path: 'medicalrecords',       // 病历模板
              name: 'medicalrecords',
              component: resolve => require(['@/pages/module/medicalrecords/medicalrecords'], resolve),
            },
            {
              path: 'switchmedical',       // 新建病历模板
              name: 'switchmedical',
              component: resolve => require(['@/pages/module/medicalrecords/switch'], resolve),
            },
            {
              path: 'formulation/:formulationId',       // 处方模板
              name: 'Publicmodule',
              component: resolve => require(['@/pages/module/publicmodule'], resolve),
            },
            {
              path: 'newwesternformulation/:tplId',       // 新建西/成药处方模板
              name: 'newwesternformulation',
              component: resolve => require(['@/pages/module/westernformulation/newwesternformulation'], resolve),
            },
            {
              path: 'newChineseformulation/:tplId',       // 新建中药处方模板
              name: 'newChineseformulation',
              component: resolve => require(['@/pages/module/Chineseformulation/newChineseformulation'], resolve),
            },
            {
              path: 'newinfusionformulation/:tplId',       // 新建输液处方模板
              name: 'newInfusionformulation',
              component: resolve => require(['@/pages/module/infusionformulation/newinfusionformulation'], resolve),
            },
            {
              path: 'newInspectioncheck/:tplId',       // 新建诊疗项目模板
              name: 'newInspectioncheck',
              component: resolve => require(['@/pages/module/Inspectioncheck/newInspectioncheck'], resolve),
            },
            {
              path: 'newmaterialcombination/:tplId',       // 新建耗材组合模板
              name: 'newmaterialcombination',
              component: resolve => require(['@/pages/module/materialcombination/newmaterialcombination'], resolve),
            },
            {
              path: 'newotherobjects/:tplId',       // 新建其他模板
              name: 'newotherobjects',
              component: resolve => require(['@/pages/module/otherobjects/newotherobjects'], resolve),
            },
            {
              path: 'newusedadvice/:tplId',       // 新建常用医嘱模板
              name: 'newusedadvice',
              component: resolve => require(['@/pages/module/usedadvice/newusedadvice'], resolve),
            },
          ],
        },
        // 统计
        {
          path: 'statistics',
          component: resolve => require(['@/pages/statistics/Statistics'], resolve),
          index: 7,
          needAuth: true,
          children: [
            {
              path: '/',
              redirect: 'logbook',
            },
            {
              path: 'logbook',
              component: resolve => require(['@/pages/statistics/child/LogbookStatistics'], resolve),
            },
            {
              path: 'chargestatistics',
              component: resolve => require(['@/pages/statistics/child/ChargeStatistics'], resolve),
            },
            {
              path: 'checkstatistics',
              component: resolve => require(['@/pages/statistics/child/CheckStatistics'], resolve),
            },
            {
              path: 'drugstatistics',
              component: resolve => require(['@/pages/statistics/child/DrugStatistics'], resolve),
            },
            {
              path: 'doctorstatistics',
              component: resolve => require(['@/pages/statistics/child/DoctorStatistics'], resolve),
            },
            {
              path: 'doctordetail',
              name: 'doctordetail',
              component: resolve => require(['@/pages/statistics/child/DoctorDetail'], resolve),
            },
          ],
        },
        // 送检
        {
          path: 'exam',
          needAuth: false,
          component: resolve => require(['@/pages/exam/Exam'], resolve),
          children: [
            {
              path: '/',
              redirect: 'report_list',
            },
            {
              path: 'report_list',
              component: resolve => require(['@/pages/exam/components/ReportList'], resolve),
            },
            {
              path: 'CBC_equipment',
              component: resolve => require(['@/pages/exam/components/CBC/Equipment'], resolve),
            },
            {
              path: 'CBC_report_list',
              component: resolve => require(['@/pages/exam/components/CBC/ReportList'], resolve),
            },
            {
              path: 'CBC_statistics',
              component: resolve => require(['@/pages/exam/components/CBC/Statistics'], resolve),
            },
          ],
        },
        // 商城
        {
          path: 'mall',
          needAuth: false,
          component: resolve => require(['@/pages/mall/Mall'], resolve),
          children: [
            {
              path: '/',
              redirect: 'product_list',
            },
            {
              path: 'product_list',
              component: resolve => require(['@/pages/mall/child/ProductList'], resolve),
            },
            {
              path: 'shop_cart',
              component: resolve => require(['@/pages/mall/child/ShopCart'], resolve),
            },
            {
              path: 'submit_order',
              component: resolve => require(['@/pages/mall/child/SubmitOrder'], resolve),
            },
            {
              path: 'pay',
              component: resolve => require(['@/pages/mall/child/Pay'], resolve),
            },
            {
              path: 'orders',
              component: resolve => require(['@/pages/mall/child/Orders'], resolve),
            },
            {
              path: 'detail',
              component: resolve => require(['@/pages/mall/child/OrderDetail'], resolve),
            },
            {
              path: 'address_list',
              component: resolve => require(['@/pages/mall/child/AddressList'], resolve),
            },
          ],
        },
      ],
    },
    // 病历打印
    {
      path: '/print/illnessPrint',
      component: resolve => require(['@/pages/print/IllnessPrint'], resolve),
    },
    {
      path: '/print/illnessPrintDentistry',
      component: resolve => require(['@/pages/print/IllnessPrintDentistry'], resolve),
    },
    // 费用打印
    {
      path: '/print/feePrint',
      component: resolve => require(['@/pages/print/FeePrint'], resolve),
    },
    {
      path: '/print/feePrint2',
      component: resolve => require(['@/pages/print/FeePrint2'], resolve),
    },
    // 发票打印
    {
      path: '/print/billPrint',
      component: resolve => require(['@/pages/print/BillPrint'], resolve),
    },
    // 西药处方打印
    {
      path: '/print/WestPrescription',
      component: resolve => require(['@/pages/print/WestPrescription'], resolve),
    },
    // 中药处方打印
    {
      path: '/print/ChinesePrescription',
      component: resolve => require(['@/pages/print/ChinesePrescription'], resolve),
    },
    // 输液处方打印
    {
      path: '/print/WaterPrescription',
      component: resolve => require(['@/pages/print/WaterPrescription'], resolve),
    },
    // 检查治疗项打印
    {
      path: '/print/treatmentPrint',
      component: resolve => require(['@/pages/print/TreatmentPrint'], resolve),
    },
    // 治疗单打印
    {
      path: '/print/cureListPrint',
      component: resolve => require(['@/pages/print/CureListPrint'], resolve),
    },
    // 工具
    {
      path: '/utils',
      component: resolve => require(['@/pages/utils/Index'], resolve),
      children: [
        {
          path: '/',
          redirect: 'index',
        },
        {
          path: 'index',
          component: resolve => require(['@/pages/utils/page/Welcome'], resolve),
        },
        {
          path: 'sb-drop',
          component: resolve => require(['@/pages/utils/page/JYDrop'], resolve),
        },
      ],
    },
    // error
    {
      path: '/error/safe_guard',
      component: resolve => require(['@/pages/error/SafeGuard'], resolve),
    },
  ],
  mode: 'history',
  base: '/views',
});

export default router;
