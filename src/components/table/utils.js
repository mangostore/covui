import cloneDeep from 'lodash/cloneDeep';

// 把嵌套的列转化为平级的一维列
function getAllColumns(columns) {
  const results = [];

  columns.forEach((column) => {
    if (column.children) {
      results.push(column);
      results.push(...getAllColumns(column.children));
    } else {
      results.push(column);
    }
  });

  return results;
}

// 递归地获取子组件
export function getColumns(columns) {
  const results = [];

  for (let i = 0; i < columns.length; i += 1) {
    const column = columns[i];

    if (column.$options.name === 'co-table-column') {
      if (column.$children.length > 0) {
        column.children = getColumns(column.$children);
      } else {
        delete column.children;
      }

      results.push(column);
    }
  }

  return results;
}

// 获取最底层的列组件
export function getFlattenColumns(columns) {
  const results = [];

  for (let i = 0; i < columns.length; i += 1) {
    const column = columns[i];

    if (column.children) {
      results.push(...getFlattenColumns(column.children));
    } else {
      results.push(column);
    }
  }

  return results;
}

// 获取表头数据结构
export function getHeaderRows(columns) {
  const rows = [];
  const allColumns = getAllColumns(columns);
  let maxLevel = 1;

  function traverse(column, parent) {
    // 为设置 rowspan 确定层级
    if (parent) {
      column.level = parent.level + 1;

      if (maxLevel < column.level) {
        maxLevel = column.level;
      }
    }

    if (column.children) {
      let colSpan = 0;

      column.children.forEach((subColumn) => {
        traverse(subColumn, column);
        colSpan += subColumn.colSpan;
      });

      column.colSpan = colSpan;
    } else {
      column.colSpan = 1;
    }
  }

  columns.forEach((column) => {
    column.level = 1;
    traverse(column);
  });

  for (let i = 0; i < maxLevel; i += 1) {
    rows.push([]);
  }

  allColumns.forEach((column) => {
    if (column.children) {
      column.rowSpan = 1;
    } else {
      column.rowSpan = maxLevel - column.level + 1;
    }

    rows[column.level - 1].push(column);
  });

  return rows;
}

// 排序方法，支持自定义
export function orderBy(array = [], sortKey, reverse, sortMethod) {
  const order = reverse === 'asc' ? 1 : -1;

  if (!sortKey && !sortMethod) {
    return array;
  }

  return array.slice().sort((a, b) => {
    if (sortMethod) {
      return sortMethod(Number.parseFloat(a[sortKey]), Number.parseFloat(b[sortKey]), reverse);
    }

    return Number.parseFloat(a[sortKey]) > Number.parseFloat(b[sortKey]) ? order : -order;
  });
}

// 获取表格单元格 dom 元素，没有则返回 null
export function getCellDom(event) {
  let dom = event.target;

  while (dom && dom.tagName.toUpperCase() !== 'HTML') {
    if (dom.tagName.toUpperCase() === 'TD') {
      return dom;
    }

    dom = dom.parentNode;
  }

  return null;
}

export function getColumnByCell(columns, cell) {
  const matches = (cell.className || '').match(/co-table_column_[^\s]+/gm);
  let column = null;

  if (matches) {
    columns.forEach((item) => {
      if (item.columnId === matches[0]) {
        column = item;
      }
    });
  }

  return column;
}

// 获取拉平的 data 数据
export function getFlattenRows(rows = [], childrenName = '') {
  const results = [];
  let array = rows;

  for (let i = 0; i < array.length; i += 1) {
    const row = array[i];

    results.push(row);
    array = array.concat(row[childrenName] || []);
  }

  return results;
}

// 给数据添加条件颜色
export function dataConditionDeal(array = [], conditions = [], colors = []) {
  const results = cloneDeep(array);

  results.forEach((item, index) => {
    item.index = index;
  });

  conditions.forEach((item) => {
    const {
      mainId,
      midColorIndex,
      minCount,
      minColorIndex,
      maxCount,
      maxColorIndex,
      sections,
    } = item;

    const ascArray = orderBy(results, mainId, 'asc');

    if (midColorIndex > -1) {
      results.forEach((item) => {
        if (midColorIndex === 0) {
          item[`${mainId}_color`] = '';
        } else {
          item[`${mainId}_color`] = colors[midColorIndex - 1];
        }
      });
    }

    const minArray = ascArray.slice(0, minCount);
    const maxArray = maxCount > 0 ? ascArray.slice(-maxCount) : [];

    if (minArray.length > 0) {
      minArray.forEach((item) => {
        const index = item.index;
        results[index][`${mainId}_color`] = colors[minColorIndex];
      });
    }

    if (maxArray.length > 0) {
      maxArray.forEach((item) => {
      const index = item.index;
        results[index][`${mainId}_color`] = colors[maxColorIndex];
      });
    }

    sections.forEach((section) => {
      const {
        operator,
        operatorValue1,
        operatorValue2,
        secColorIndex,
      } = section;
      const value1 = Number.parseFloat(operatorValue1);
      const value2 = Number.parseFloat(operatorValue2);
      switch (operator) {
        case 'eq':
        results.forEach((item) => {
          if (Number.parseFloat(item[mainId]) === value1) {
            item[`${mainId}_color`] = colors[secColorIndex];
          }
        });
        break;

        case 'ne':
        results.forEach((item) => {
          if (Number.parseFloat(item[mainId]) !== value1) {
            item[`${mainId}_color`] = colors[secColorIndex];
          }
        });
        break;

        case 'gt':
        results.forEach((item) => {
          if (Number.parseFloat(item[mainId]) > value1) {
            item[`${mainId}_color`] = colors[secColorIndex];
          }
        });
        break;

        case 'ge':
        results.forEach((item) => {
          if (Number.parseFloat(item[mainId]) >= value1) {
            item[`${mainId}_color`] = colors[secColorIndex];
          }
        });
        break;

        case 'lt':
        results.forEach((item) => {
          if (Number.parseFloat(item[mainId]) < value1) {
            item[`${mainId}_color`] = colors[secColorIndex];
          }
        });
        break;

        case 'le':
        results.forEach((item) => {
          if (Number.parseFloat(item[mainId]) <= value1) {
            item[`${mainId}_color`] = colors[secColorIndex];
          }
        });
        break;

        case 'range':
        results.forEach((item) => {
          if (Number.parseFloat(item[mainId]) >= value1 &&
            Number.parseFloat(item[mainId]) <= value2) {
            item[`${mainId}_color`] = colors[secColorIndex];
          }
        });
        break;

        default:
        break;
      }
    });
  });

  return results;
}

/**
 * 过滤树形结构
 * @param  {array}    array    过滤数组
 * @param  {string}   children 子数组对应的key
 * @param  {string}   parent   子数组的父对象
 * @param  {function} callback 过滤函数
 * @return {array}             过滤后的数组
 */
export function treeFilter(array, children, parent, callback) {
  const filterArray = array.filter((item, index, array) => callback(item, index, array));

  filterArray.forEach((item) => {
    if (item[children] && item[children].length > 0) {
      treeFilter(item[children], children, item, callback);
    }
  });

  if (parent) {
    parent[children] = filterArray;
  }

  return filterArray;
}
