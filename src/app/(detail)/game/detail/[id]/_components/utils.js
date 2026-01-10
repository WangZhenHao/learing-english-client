
export function addHideWord(arr, N) {
  let totalCount = 0
  const newArr = arr.map(list => {
    // 防止 N 大于当前数组长度
    const count = Math.min(N, list.length)
    totalCount += count
    // 随机打乱索引
    const indexes = list
      .map((_, i) => i)
      .sort(() => Math.random() - 0.5)
      .slice(0, count)

    // 给选中的对象加 hideWord
    return list.map((item, index) => {
      if (indexes.includes(index)) {
        return { ...item, hideWord: true }
      }
      return item
    })
  })
    return {
      content: newArr,
      totalCount
    }
  }
  
  function filterWrod(text) {
    if(!text) return ''
    return text.toLowerCase().replace(/\s+/g, '')
  }
  export function checkRightWord(wordMap, userWord) {
    wordMap.forEach((item, index) => {
      if(item.hideWord) {
        if(filterWrod(item.text) === filterWrod(userWord[index])) {
          item.isRight = true;
        } else {
          item.isRight = false;
        }
        
      }
    })

    return wordMap
  }