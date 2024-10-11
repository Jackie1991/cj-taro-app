import { memo } from 'react'
import { Picker, Text, View } from '@tarojs/components'
import cn from 'classnames'
import { formatDate } from '@utils'

import './index.scss'

// 选择器类型
type PickerModeType = 'selector' | 'date' | 'time' | 'region' | 'multiSelector' | 'datetime'
type OptionsType = {
  label: string
  value: string | number
  desc?: string
  disabled?: boolean
}

export interface PickerProps {
  mode?: PickerModeType // 选择器类型
  options?: OptionsType[] | string[]
  placeholder?: string
  clear?: boolean
}

interface Props extends PickerProps {
  value?: string | number
  onChange?: (event: string | number) => void
}

const CPicker = ({ mode = 'selector', value, options = [], placeholder, onChange, clear }: Props) => {
  const pickerProp: any = {
    value,
    mode: mode === 'datetime' ? 'date' : mode,
  }

  if (mode === 'selector' || mode === 'multiSelector') {
    if (Array.isArray(options)) {
      pickerProp.range = options
      if (typeof options[0] !== 'string') {
        pickerProp.rangeKey = 'label'
      }
      pickerProp.value = options.findIndex((item: OptionsType | string) => {
        if (typeof item === 'string') {
          return item === value
        }
        return item.value === value
      })
    } else {
      console.error('options is required')
    }
  }

  const showValue = () => {
    if (!value) return null
    if ((mode === 'selector' || mode === 'multiSelector') && options.length > 0) {
      const option: any = options.find((item: OptionsType | string) => (typeof item === 'string' ? item === value : item.value === value))
      return typeof option === 'string' ? option : option.label
    } else if (mode === 'datetime') {
      return formatDate(String(value), 'datetime')
    } else {
      return value
    }
  }

  return (
    <View className='c-picker'>
      <Picker
        className='c-picker-container'
        {...pickerProp}
        onChange={(e: any) => {
          const val = e.detail.value
          if (onChange) {
            if (mode === 'selector' || (mode === 'multiSelector' && options.length > 0)) {
              onChange(typeof options[val] === 'string' ? options[val] : options[val].value)
            } else if (mode === 'region') {
              onChange(val.join('-'))
            } else {
              onChange(val)
            }
          }
        }}
      >
        <Text className={cn(!value && 'placeholder')}>{showValue() || placeholder}</Text>
      </Picker>
      <View
        className={cn('c-picker-action', clear && value ? 'clear' : '')}
        onClick={() => {
          onChange && onChange('')
        }}
      />
    </View>
  )
}

export default memo(CPicker)
