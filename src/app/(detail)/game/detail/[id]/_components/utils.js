export function addHideWord(arr, N) {
    let totalCount = 0;
    const newArr = arr.map((list) => {
        // 防止 N 大于当前数组长度
        const count = Math.min(N, list.length);
        totalCount += count;
        // 随机打乱索引
        const indexes = list
            .filter((item) => item.boundaryType === "WordBoundary")
            .map((_, i) => i)
            .sort(() => Math.random() - 0.5)
            .slice(0, count);

        // 给选中的对象加 hideWord
        return list.map((item, index) => {
            if (indexes.includes(index)) {
                return { ...item, hideWord: true };
            }
            return item;
        });
    });
    return {
        content: newArr,
        totalCount,
    };
}

function filterWrod(text) {
    if (!text) return "";
    return text.toLowerCase().replace(/\s+/g, "");
}
export function checkRightWord(wordMapItem, userWord) {
  let count = 0
  wordMapItem.forEach((item, index) => {
        if (item.hideWord) {
            if (filterWrod(item.text) === filterWrod(userWord[index])) {
                item.isRight = true;
                count++
            } else {
                item.isRight = false;
            }
        }
    });

    return {
      wordMapItem,
      count
    };
}

export function checkScore(wordMap) { 
  let totalCount = 0
  let perScore = 0

  wordMap.forEach((item) => {
    item.forEach((subItem) => {
      if (subItem.hideWord) {
        totalCount++;
      }
    })
  });

  perScore = (100 / totalCount).toFixed(2)
  const spill = 100 - totalCount * perScore

  return {
    totalCount,
    perScore,
    spill 
  }
}


export const keyBoardMap = {
  "space": { name: '下一个单词' },
  "enter": { name: '单词发音' },
  "Command/alt + enter": { name: '整句发音' },
  "Command/alt + ↑": { name: '隐藏/查看全部答案' },
  "Command/alt + ↓": { name: '隐藏/查看当前答案' },
  "Command/alt + →": { name: '下一题'},
  "Command/alt + ←": { name: '上一题' },
  // "Command/alt + ↓": { name: '查看答案' },
}