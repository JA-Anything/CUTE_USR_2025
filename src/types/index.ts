// 定義選單項目的型別
export interface MenuItem {
  id: string
  label: string
  hidden?: boolean
  className?: string
  name?: string
  path?: string
  image?: string // 選單項目的圖片路徑
  position?: {
    // 自訂 absolute 位置
    top?: string
    left?: string
    right?: string
    bottom?: string
  }
  children?: MenuItem[]
}
