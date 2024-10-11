import { AtCheckbox } from 'taro-ui'

type OptionsType = {
  label: string
  value: any
  desc?: string
  disabled?: boolean
}

interface Props {
  value: any
  onChange: (val: any) => void
  options?: OptionsType[] | string[]
}

const CCheckbox = ({ value, options = [], onChange }: Props) => (
  <AtCheckbox
    className='c-checkbox'
    selectedList={value}
    options={options as OptionsType[]}
    onChange={(val: any) => {
      onChange(val)
    }}
  />
)

export default CCheckbox
