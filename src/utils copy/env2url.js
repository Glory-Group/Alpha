import { LOCAL, DEV, TEST, PRE, PROD } from '@/config/envType'
// 根据当前host返回未登入跳转的域名
export const getRootDomain = () => {
  /* eslint-disable no-undef */
  const env = process.env.VUE_APP_ENV
  /* eslint-enable no-undef */
  if (env === PROD) {
    return 'alphalawyer.cn'
  } else if (env === DEV) {
    return 'dev.alphalawyer.cn'
  } else if (env === TEST) {
    return 'test.alphalawyer.cn'
  } else if (env === PRE) {
    return 'pre.alphalawyer.cn'
  } else if (env === LOCAL) {
    return 'dev.alphalawyer.cn'
  }
  return 'alphalawyer.cn'
}
