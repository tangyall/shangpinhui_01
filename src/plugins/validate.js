// vee-calidate插件表单验证
import Vue from 'vue'
import Veevalidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'

Vue.use(Veevalidate)

// 表单验证
Veevalidate.Validator.localize('zh_CN', {
  messages: {
    ...zh_CN.messages,
    is:(field) => `${field}必须与密码相同`
  },
  attributes: {
    phone: '手机号',
    code: '验证码',
    password: '密码',
    password1: '确认密码',
    agree: '协议'
  }
})

// 自定义校验规则
Veevalidate.Validator.extend('同意', {
  validate: (value) => {
    return value
  },
  getMessage: (field) => field + '必须同意'
})