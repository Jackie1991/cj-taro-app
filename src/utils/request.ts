import Taro from '@tarojs/taro'

type HeaderType = {
  'content-type'?: string
  token?: string
  Authorization?: string
}

interface RequestProps {
  url: string
  method: 'POST' | 'GET' | 'UPLOAD'
  header?: HeaderType
  data?: any
  token?: boolean
}

const server = ({ url, method, header, data, token = true }: RequestProps) => {
  // 请求地址
  url = `${TARO_APP_BASE_URL}${url}`

  if (token) {
    // 请求头
    header = {
      ...header,
      Authorization: Taro.getStorageSync('token'),
    }
  }

  let requestTask: any = null
  return new Promise((resolve, reject) => {
    // 上传文件请求
    if (method === 'UPLOAD') {
      const { filePath, fileName, ...formData } = data
      requestTask = Taro.uploadFile({
        url, //仅为示例，非真实的接口地址
        filePath,
        name: fileName || 'file',
        formData,
        success(res) {
          Taro.hideLoading()
          resolve(res.data)
        },
        fail: (err) => {
          Taro.hideLoading()
          reject(err)
        },
      })
    } else {
      // 普通请求
      // 请求数据增加随机数，防止缓存
      data = { ...(data || {}), _: new Date().getTime() }
      requestTask = Taro.request({
        url,
        header,
        method,
        success: (res: any) => {
          Taro.hideLoading()
          if (res.statusCode === 200) {
            resolve(res.data)
          } else {
            reject(res)
          }
        },
        fail: (err: any) => {
          Taro.hideLoading()
          reject(err)
        },
      })
    }
    requestTask.then((res: any) => {
      console.log(res)
      Taro.showLoading({
        title: '加载中...' + res.progress,
      })
    })
  })
}

interface ParamsProps {
  data?: any
}

export default {
  post: (url: string, params?: ParamsProps) => {
    return server({
      url,
      method: 'POST',
      header: {
        'content-type': 'application/json',
      },
      ...params,
    })
  },
  get: (url: string, params?: ParamsProps) => {
    return server({
      url,
      method: 'GET',
      ...params,
    })
  },
  upload: (url: string, params?: ParamsProps) => {
    return server({
      url,
      method: 'UPLOAD',
      ...params,
    })
  },
}
