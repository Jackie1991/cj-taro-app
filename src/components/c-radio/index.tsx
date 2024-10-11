import { AtRadio } from 'taro-ui'

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

const CRadio = ({ value, options = [], onChange }: Props) => (
  <AtRadio
    className='c-radio'
    value={value}
    options={options as OptionsType[]}
    onClick={(val: any) => {
      onChange(val)
    }}
  />
)

export default CRadio
