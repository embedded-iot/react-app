import React from 'react';
import TableGrid from 'components/Common/TableGrid';
import { FrontUserSKUService } from 'services';
import { format } from 'utils';

const columns = [
  {
    title: '#',
    dataIndex: 'id',
  },
  {
    title: 'Image',
    dataIndex: 'avatar',
    render: (avatar, record) => <img src={avatar} alt={record.name} />,
  },
  {
    title: 'Product Name',
    dataIndex: 'name',
  },
  {
    title: 'Variant',
    dataIndex: 'offerName',
  },
  {
    title: 'SKU',
    dataIndex: 'id',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    render: (price) => format.formatCurrency(price),
  },
];

export default function SKUTable() {
  const RELOAD_EVENT_KEY = 'RELOAD_SKU_TABLE_EVENT_KEY';
  const tableConfig = {
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize: size, pageNum: page, searchText, ...restParams} = params || {};
      FrontUserSKUService.getSKUs({ ...restParams, page, size, searchText }, successCallback, failureCallback)
    },
    successCallback: (response) => {
      console.log(response);
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };


  return (
    <TableGrid configs={tableConfig}
               paginationConfig={{}}
               actionButtonList={{}}
               defaultParams={{}}
               defaultData={{}}
               isShowPagination={true}
               isShowSearch={true}
               isShowPageNum={true}
               isShowPageSize={true}
               onSelectedItemsChange={() => {}}
               RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
    />
  );
}