import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
import AutoCompleteInput from 'components/Common/AutoCompleteInput';
import { ORDER_STATUS_OPTIONS, RESPONSIVE_MEDIAS } from 'components/contants';
import { useMediaQuery } from 'react-responsive';

export default function OrdersHistoryFilters({ productType = '', serviceId= '', products = [], onChange = () => {} }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const isTablet = useMediaQuery(RESPONSIVE_MEDIAS.TABLET);
  // eslint-disable-next-line
  const spanCol = isMobile && 24 || isTablet && 8 || 6;
  const [filters, setFilters] = useState({});
  const [filtersInputValues, setFiltersInputValues] = useState({});

  let productsOptions = [{ label: 'ALL', value: 'all'}];
  let servicesOptions = [];
  products.forEach(product => {
    productsOptions.push({
      label: product.type.toUpperCase(),
      value: product.type,
    })
    servicesOptions = [
      ...servicesOptions,
      ...(product.services.map(service => ({ label: service.name, value: service.id, type: product.type }))),
    ]
  })

  const filterServicesByProductType  = (productType) => {
    return servicesOptions.filter(service => (productType && productType !== 'all') ? service.type === productType : true);
  }

  const statusOptions = ORDER_STATUS_OPTIONS;

  const onChangeInput = (value, name) => {
    setFiltersInputValues(prevFilters => ({ ...prevFilters, [name]: value }));
  }

  const onSelectInput = (value, name, inputValue) => {
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  }

  const handlerSearch = () => {
    onChange(filters);
  }

  const handlerClear = () => {
    setFilters({});
    setFiltersInputValues({});
    onChange({});
  }

  return (
    <Row gutter={[10, 10]}>
      {/*<Col span={4}>
        <InputText placeholder="Tìm theo mã đơn hàng"
                   value={filters.orderId}
                   name="orderId"
                   onChange={onChangeInput}
        />
      </Col>
      <Col span={4}>
        <InputText placeholder="Tìm theo Post ID"
                   value={filters.postId}
                   name="postId"
                   onChange={onChangeInput}
        />
      </Col>*/}
      {
        !productType && (
          <Col span={spanCol}>
            <AutoCompleteInput options={productsOptions}
                               placeholder="Tìm theo loại dịch vụ"
                               name="productType"
                               value={filtersInputValues.productType || ''}
                               onChange={onChangeInput}
                               onSelect={onSelectInput}
            />
          </Col>
        )
      }
      {
        !serviceId && (
          <Col span={spanCol}>
            <AutoCompleteInput options={filterServicesByProductType(filters.productType)}
                               value={filtersInputValues.serviceId}
                               placeholder="Tìm theo thể loại"
                               name="serviceId"
                               onChange={onChangeInput}
                               onSelect={onSelectInput}
            />
          </Col>
        )
      }
      <Col span={spanCol}>
        <AutoCompleteInput options={statusOptions}
                           value={filtersInputValues.status}
                           placeholder="Tìm theo trạng thái"
                           name="status"
                           onChange={onChangeInput}
                           onSelect={onSelectInput}
        />
      </Col>
      <Col span={isTablet ? 24 : spanCol } style={{textAlign: (isMobile || isTablet) ? 'right' : ''}}>
        <Button type="primary" onClick={handlerSearch} style={{marginRight: '10px'}}>Tìm kiếm</Button>
        <Button onClick={handlerClear}>Xóa lọc</Button>
      </Col>
    </Row>
  );
}
