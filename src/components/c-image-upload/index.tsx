import { AtImagePicker } from 'taro-ui'

export interface ImageUploadProps {
  multiple?: boolean
}

interface Props extends ImageUploadProps {
  value: any
  onChange: (val: any) => void
  maxLength?: number // 最大上传数量
}

const CImageUpload = ({ value, multiple = false, maxLength, onChange }: Props) => {
  const props: any = {}
  if (maxLength) {
    const num = value ? value.length : 0
    props.showAddBtn = num < maxLength
    props.count = maxLength - num
  }

  const handleImageChange = (files: any) => {
    if (props.count > 0) {
      files = files.splice(0, props.count)
    }
    onChange(files)
  }

  return <AtImagePicker length={3} multiple={multiple} files={value} onChange={handleImageChange} {...props} />
}

export default CImageUpload
