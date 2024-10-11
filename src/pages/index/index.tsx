import { View, Button, Text } from '@tarojs/components'
import { observer } from 'mobx-react'
import { useStores } from '@/store'
import { CForm } from '@/components'

import './index.scss'

export default observer(() => {
  const { counterStore } = useStores()
  const { counter } = counterStore

  return (
    <View className='index'>
      <Button onClick={() => counterStore.increment()}>+</Button>
      <Button onClick={() => counterStore.decrement()}>-</Button>
      <Text>{counter}</Text>
      <CForm
        fields={[
          { label: '姓名', prop: 'name', type: 'text', required: true },
          { label: '照片', prop: 'img', type: 'image', maxLength: 3 },
          { label: '选项1', prop: 'sel', type: 'select', options: ['a', 'b'] },
          {
            label: '选项2',
            prop: 'selct',
            type: 'select',
            options: [
              { label: 'av', value: 1 },
              { label: 'tv', value: 2 },
            ],
          },
          {
            label: '单选',
            prop: 'radio',
            type: 'radio',
            options: [
              {
                label: 'a',
                value: 'a',
              },
              {
                label: 'b',
                value: 'b',
              },
            ],
          },
          {
            label: '多选',
            prop: 'checkbox',
            type: 'checkbox',
            options: [
              {
                label: 'a',
                value: 'a',
              },
              {
                label: 'b',
                value: 'b',
              },
            ],
          },
        ]}
        onSubmit={(values) => {
          console.log(values)
        }}
      />
    </View>
  )
})
