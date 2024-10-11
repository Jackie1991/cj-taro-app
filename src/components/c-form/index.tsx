import { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtForm, AtButton } from 'taro-ui'
import CFormItem, { FormItemType } from '../c-form-item'

import './index.scss'

interface FormProps {
  fields: FormItemType[] // 表单项
  value?: any // 表单值
  onSubmit: (e: any) => void // 表单提交
  onReset?: () => void // 表单重置
  onChange?: (e: any) => void // 表单值变化
  submitText?: string // 提交按钮文字
  hideReset?: boolean // 是否隐藏重置按钮
  border?: boolean // 是否显示边框
}

// 表单组件
const CForm = ({ fields, value, onSubmit, onReset, onChange, submitText = '提交', hideReset = false, border = true }: FormProps) => {
  const [formData, setFormData] = useState<any>({})

  useEffect(() => {
    value && setFormData(value)
  }, [value])

  // 提交
  const submitForm = () => {
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i]
      if (field.required && !formData[field.prop]) {
        return Taro.showToast({
          title: `${field.label}不能为空`,
          icon: 'none',
          duration: 2000,
        })
      }
    }
    onSubmit(formData)
  }

  return (
    <AtForm
      className='c-form'
      onSubmit={submitForm}
      onReset={() => {
        setFormData({})
        onReset && onReset()
      }}
    >
      <View className='c-form-body'>
        {fields.map((field: FormItemType) => (
          <CFormItem
            key={field.prop}
            value={formData[field.prop]}
            onChange={(val: any) => {
              const newValues = { ...formData, [field.prop]: val }
              onChange && onChange(newValues)
              setFormData(newValues)
            }}
            border={border}
            {...field}
          />
        ))}
      </View>
      <View className='c-form-footer'>
        <AtButton type='primary' formType='submit'>
          {submitText}
        </AtButton>
        {!hideReset && <AtButton formType='reset'>重置</AtButton>}
      </View>
    </AtForm>
  )
}

export default CForm
