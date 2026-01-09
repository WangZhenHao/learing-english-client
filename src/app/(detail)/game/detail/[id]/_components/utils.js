export function addHideWord(arr, N) {
    return arr.map(list => {
      // 防止 N 大于当前数组长度
      const count = Math.min(N, list.length)
  
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
  }
  