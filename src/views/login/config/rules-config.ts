import { reactive } from 'vue'
import type { FormRules } from 'element-plus'

export const accountRules = reactive<FormRules>({
  name: [
    {
      required: true,
      message: '必须输入用户名',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户名必须是5~10个字母或者数字~',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '必须输入密码',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '密码必须是5~10个字母或者数字~',
      trigger: 'blur'
    }
  ]
})

export const phoneRules = reactive<FormRules>({
  phone: [
    {
      required: true,
      message: '必须输入用户名',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户名必须是5~10个字母或者数字~',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '必须输入验证码',
      trigger: 'blur'
    }
  ]
})
