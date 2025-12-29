"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * 根据ID查找父级，如果没有父级则返回自身
 * @param {Array} tree - 树形数据源 (data数组)
 * @param {String|Number} targetId - 要查找的ID
 * @returns {Object|null} - 返回父级对象、自身对象，若未找到则返回 null
 */
function findParentOrSelf(tree, targetId) {
    let result = null;
  
    // 定义递归查找函数
    // list: 当前层级的列表
    // parent: 上一层的节点 (如果是顶层则为 null)
    const traverse = (list, parent) => {
      for (const item of list) {
        // 如果已经找到了结果，直接结束循环
        if (result) return;
  
        // 判断当前项是否为目标
        if (item.id === targetId) {
          // 核心逻辑：如果有 parent，返回 parent；否则返回 item 本身
          result = parent ? parent : item; 
          return;
        }
  
        // 如果当前项有子级，继续递归查找，并将当前 item 作为 parent 传入
        if (item.children && item.children.length > 0) {
          traverse(item.children, item);
        }
      }
    };
  
    // 开始执行
    traverse(tree, null);
  
    return result;
  }
const App = ({ list = [], categoryId }) => {
    const [currentSelectItem, setCurrentSelectItem] = useState({});
    const [currentId, setCurrentId] = useState(categoryId);

    useEffect(() => {
        if(categoryId) {
            const item = findParentOrSelf(list, categoryId)
            item && setCurrentSelectItem({id: item.id, name: item.name, children: item.children});
        }
    }, []);

    const swithHandle = (item) => {
        setCurrentSelectItem({...item});
    };
    const renderList = () => {
        return list.map((item) => {
            return item.children && item.children.length ? <div
                    key={item.id}
                    className={`cursor-pointer leve-item relative ${
                        item.id === currentSelectItem.id ? "active" : ""
                    }`}
                    onClick={() => swithHandle(item)}
                >
                    {item.name}
                </div> : <Link
                    href={`/course/${item.id}`}
                    className={`leve-item relative ${item.id === currentId ? "active" : ""}`}
                    key={item.id}
                >
                    {item.name}
                </Link>
            ;
        });
    };

    const renderItem = (childrenList) => {
        return childrenList.map((item) => {
            return (
                <Link
                    href={`/course/${item.id}`}
                    className={`leve-item relative ${item.id === currentId ? "active" : ""}`}
                    key={item.id}
                >
                    {item.name}
                </Link>
            );
        });
    };
    return (
        <>
            <div className="catergory-wrap mb-2.5">
                <div className="flex">
                    <div className="leve-1 leve-item">
                        <Link href="/course">全部</Link>
                    </div>
                    {renderList()}
                </div>
                {list.map((item) => {
                    if (item.children) {
                        return (
                            <div
                                key={item.id}
                                className="leve-2 mt-2.5"
                                style={{
                                    display:
                                        currentSelectItem.id === item.id
                                            ? "block"
                                            : "none",
                                }}
                            >
                                {renderItem(item.children)}
                            </div>
                        );
                    }
                })}
            </div>
        </>
    );
};

export default App;
