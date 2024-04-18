/**
 * 从 itemElement 中抽离出所有的 imgElements
 */
export const getImgElements = (itemElements) => {
  const imgEls = []

  itemElements.forEach((el) => {
    imgEls.push(...el.getElementsByTagName('img'))
  })

  return imgEls
}

/**
 * 生成所有的图片链接数组
 */
export const getAllImg = (imgElements) => {
  return imgElements.map((img) => {
    return img.src
  })
}

/**
 * 监听图片数组加载完成（通过 promise 完成）
 */
export const onComplateImgs = (imgs) => {
  // promise 集合
  const promiseAll = []

  // 循环构建 promiseAll
  imgs.forEach((img, index) => {
    promiseAll[index] = new Promise((resolve, reject) => {
      const imageObj = new Image()
      imageObj.src = img
      imageObj.onload = () => {
        resolve({ img, index })
      }
    })
  })

  return Promise.all(promiseAll)
}
