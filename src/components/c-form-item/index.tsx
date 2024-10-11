import { ReactNode } from 'react'
import { View, Text } from '@tarojs/components'
import { AtInput, AtInputNumber, AtTextarea } from 'taro-ui'
import cn from 'classnames'
import { CPicker, CRadio, CCheckbox, CImageUpload } from '@components'
import { PickerProps } from '../c-picker'
import { ImageUploadProps } from '../c-image-upload'

export interface FormItemType extends PickerProps, ImageUploadProps {
  className?: string
  label?: string
  prop: string
  type?: string
  placeholder?: string
  required?: boolean
  hidden?: boolean
  children?: ReactNode
  maxLength?: number
}

interface FormItemProps extends FormItemType {
  value: any
  onChange: (val: any) => void
  border?: boolean
}

export const renderPlaceholder = (type: string, label: string) => {
  if (type === 'select') return '请选择' + label
  return '请输入' + label
}

const CFormItem = (props: FormItemProps) => {
  const { className, children, label, required = false, hidden = false, prop, type, border, ...attr } = props
  if (hidden) return null

  // 渲染组件元素
  const renderChildren = () => {
    if (children) return children
    if (!type) return <Text></Text>
    attr.placeholder = attr.placeholder || renderPlaceholder(type, label || '')
    if (['text', 'number', 'password', 'phone', 'idcard', 'digit'].includes(type)) {
      return <AtInput name={prop} type={type as any} {...attr} />
    } else if (type === 'count') {
      return <AtInputNumber type='number' {...attr} />
    } else if (type === 'textarea') {
      return <AtTextarea {...attr} />
    } else if (type === 'select') {
      return <CPicker {...attr} />
    } else if (type === 'image') {
      return <CImageUpload {...attr} />
    } else if (type === 'radio') {
      return <CRadio {...attr} />
    } else if (type === 'checkbox') {
      return <CCheckbox {...attr} />
    }
  }

  return (
    <View className={cn('c-form-item', border && 'c-form-item--border', className)}>
      {label && <View className={cn('c-form-item__label', required && 'c-form-item__label--required')}>{label}</View>}
      <View className='c-form-item__content'>{renderChildren()}</View>
    </View>
  )
}

export default CFormItem
