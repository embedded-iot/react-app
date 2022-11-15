import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'antd';
import { events } from 'utils';
import TableView from 'components/Common/TableView';
import GridView from 'components/Common/GridView';
import DropdownSelect from 'components/Common/DropdownSelect';
import InputSearch from 'components/Common/InputSearch';
import PaginationBox from 'components/Common/PaginationBox';

import './style.scss';


const defaultPageSizeOptions = [10, 20, 50, 100];

export default function TableGrid({
                                    type = 'table',
                                    configs = {},
                                    paginationConfig = {},
                                    headerActionsConfig = {
                                      buttonList: [],
                                      actionItems: [],
                                      onActionItemClick: () => {},
                                    },
                                    defaultParams = {},
                                    defaultData = {},
                                    isSingleSelection = false,
                                    onSelectedItemsChange = () => {},
                                    onSelectGridItem = () => {},
                                    isShowPagination = false,
                                    isAllowSelection = false,
                                    RELOAD_EVENT_KEY = '',
                                    UPDATE_DATA_EVENT_KEY = ''
                                  }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pageNumOptions, setPageNumOptions] = useState([]);
  const [searchText, setSearchText] = useState([]);
  const [params, setParams] = useState({
    pageSize: 20,
    pageNum: 1,
    ...defaultParams
  });
  const [data, setData] = useState({
    items: [],
    totalCount: 0,
    ...defaultData
  });

  const pageSizeOptions = (paginationConfig.pageSizeOptions
    || defaultPageSizeOptions).map(pageSize => ({
    label: `${pageSize} per page`,
    value: pageSize.toString(),
  }))

  const getDataFunc = useCallback((newParams = {}) => {
    if (!configs.getDataFunc) return;
    configs.getDataFunc(newParams, (response) => {
      setData(response);
      configs.successCallback(response);
    }, error => {
      configs.failureCallback(error);
    })
    // eslint-disable-next-line
  }, []);

  const updateDataListenerFunc = () => {
    let updateDataListener = null;
    if (!!UPDATE_DATA_EVENT_KEY) {
      updateDataListener = events.subscribe(UPDATE_DATA_EVENT_KEY, (payload = {}) => {
        const { key, record } = payload;
        const newData = {
          ...data,
          items: data.items.map(item => item.key === key ? record : item),
        }
        setData(newData);
      })
    }
    return () => {
      updateDataListener && updateDataListener.remove();
    };
  }

  const reloadListenerFunc = () => {
    let reloadListener = null;
    if (!!RELOAD_EVENT_KEY) {
      reloadListener = events.subscribe(RELOAD_EVENT_KEY, (payload = {}) => {
        setSelectedRowKeys([]);
        const newParams = { ...params, ...payload };
        setParams(newParams);
        getDataFunc(newParams);
      })
    }
    return () => {
      reloadListener && reloadListener.remove();
    };
  }

  useEffect(() => {
    getDataFunc(params);
    updateDataListenerFunc();
    reloadListenerFunc();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const calculatorTotalPage = Math.floor(data.totalCount/params.pageSize) + (data.totalCount % params.pageSize ? 1 : 0 );
    const totalPage = data.totalPage || calculatorTotalPage || 0;
    const pageNumOptionList = [...Array(totalPage)].map((item, index) => ({
      label: `Page ${index + 1}`,
      value: (index + 1).toString(),
    }));
    setPageNumOptions(pageNumOptionList);
  }, [params, data]);

  const onSelectChange = (newSelectedRowKey = []) => {
    const selectedKeys = isSingleSelection ? ( newSelectedRowKey.length ? [newSelectedRowKey[newSelectedRowKey.length - 1]]: []) : newSelectedRowKey;
    setSelectedRowKeys(selectedKeys);
    onSelectedItemsChange(selectedKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const onPaginationChange = (page, pageSize) => {
    const newParams = { ...params, pageNum: page };
    setParams(newParams);
    getDataFunc(newParams);
  };

  const onDropdownChange = (value, name) => {
    const newParams = { ...params, [name]: +value };
    setParams(newParams);
    getDataFunc(newParams);
  };

  const onSearchChange = (value, name) => {
    setSearchText(value);
  };

  const handleSearch = () => {
    const newParams = { ...params, [configs.searchTextKey || "keyword"]: searchText };
    setParams(newParams);
    getDataFunc(newParams);
  };

  const ACTION_TYPES = {
    'searchText': (
      <InputSearch
        name={configs.searchTextKey || "keyword"}
        placeholder={configs.searchPlaceholder}
        onChange={onSearchChange}
      />
    ),
    'pageNum': (
      <DropdownSelect
        name="pageNum"
        options={pageNumOptions}
        defaultValue={params.pageNum.toString()}
        onChange={onDropdownChange}
      />
    ),
    'pageSize': (
      <DropdownSelect
        name="pageSize"
        options={pageSizeOptions}
        defaultValue={params.pageSize.toString()}
        onChange={onDropdownChange}
      />
    ),
    'searchButton': (
      <Button type='primary' onClick={handleSearch}>Find</Button>
    ),
  }

  const filteredHeaderActions = headerActionsConfig.buttonList ? headerActionsConfig.buttonList.filter(item => {
    return item.requiredSelection === undefined
      || (item.requiredSelection === true && selectedRowKeys.length)
      || (item.requiredSelection === false && selectedRowKeys.length === 0)
  }) : [];

  const leftFilteredHeaderActions = filteredHeaderActions.filter(item => item.align !== 'right');
  const rightFilteredHeaderActions = filteredHeaderActions.filter(item => item.align === 'right');

  return (
    <div className="table-view-wrapper">
      {
        !!filteredHeaderActions.length && (
          <div className="table-header">
            {
              !!leftFilteredHeaderActions.length && (
                <div className="table-header__left-block">
                  {
                    leftFilteredHeaderActions.map((item) => {
                      return ACTION_TYPES[item.type] || item.render;
                    })
                  }
                </div>
              )
            }
            {
              !!rightFilteredHeaderActions.length && (
                <div className="table-header__right-block">
                  {
                    rightFilteredHeaderActions.map(item => {
                      return ACTION_TYPES[item.type] || item.render;
                    })
                  }
                </div>
              )
            }
          </div>
        )
      }
      <div className="selected-item-label">{ hasSelected && `Selected ${selectedRowKeys.length} items.`} </div>
      {
        type === 'table' && (
          <TableView
            rowSelection={isAllowSelection ? rowSelection : null}
            columns={configs.columns}
            dataSource={data.items}
            pagination={false}
            rowKey={record => record.id}
          />
        )
      }
      {
        type !== 'table' && (
          <GridView
            gutter={configs.gutter}
            colSpan={configs.colSpan}
            isAllowSelection={isAllowSelection}
            dataSource={data.items}
            gridItemTemplate={configs.gridItemTemplate}
            onSelectGridItem={onSelectGridItem}
          />
        )
      }
      <br/>
      {
        isShowPagination && !!data.totalCount && (
          <div className="pagination-box">
            <PaginationBox
              {...paginationConfig}
              total={data.totalCount}
              pageSize={params.pageSize}
              current={params.pageNum}
              onChange={onPaginationChange}
              showSizeChanger={false}
            />
          </div>
        )
      }
    </div>
  );
}
