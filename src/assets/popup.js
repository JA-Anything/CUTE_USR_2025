// cute-usr/src/assets/popup.js
$(document).ready(function () {
  const popupContainer = $('#popup-container')
  const popupTitle = $('#popup-title')
  const popupText = $('#popup-text')

  // 彈出式視窗內容資料
  const popupData = {
    wildBirdRescueCenter: {
      title: '台北鳥會野鳥救傷中心',
      text: '台北鳥會野鳥救傷中心是致力於救援受傷野鳥的機構。',
    },
    wFuyangEcoPark: {
      title: '富陽自然生態公園',
      text: '富陽自然生態公園是一個適合賞蝶、觀察昆蟲的城市綠洲。',
    },
    cute: {
      title: '中國科技大學',
      text: '中國科技大學是一所提供多元課程和活動的大學。',
    },
    zuShiMiao: {
      title: '石泉巖清水祖師廟',
      text: '石泉巖清水祖師廟是當地著名的信仰中心。',
    },
    dawoXinShe: {
      title: '大我新舍',
      text: '大我新舍是中國科技大學學生的宿舍。',
    },
    liheEcoPark: {
      title: '黎和生態公園',
      text: '黎和生態公園是提供市民休閒遊憩的自然公園。',
    },
  }

  // 處理選單點擊事件
  $('.popup-link').on('click', function (e) {
    e.preventDefault()
    const href = $(this).attr('href')
    const id = href.substring(1) // 取得 # 後面的 id

    const data = popupData[id]
    if (data) {
      popupTitle.text(data.title)
      popupText.text(data.text)
      popupContainer.fadeIn()
    }
  })

  // 點擊彈出式視窗背景關閉視窗
  popupContainer.on('click', function (e) {
    if ($(e.target).is(popupContainer)) {
      popupContainer.fadeOut()
    }
  })
})
