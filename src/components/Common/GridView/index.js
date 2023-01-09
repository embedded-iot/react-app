import React from 'react';
import { Col, Empty, Row } from 'antd';

const GridView = ({
                dataSource = [],
                gridItemTemplate = () => {},
                onSelectGridItem = () => {},
                isAllowSelection = false,
                gutter = [20, 20],
                colSpan = 6
}) => {
  return (
    <Row gutter={gutter}>
      {
        dataSource.map((item, index) => (
          <Col span={colSpan} key={index} onClick={ () => onSelectGridItem(item)} >
            {
              gridItemTemplate({ item, index })
            }
          </Col>
        ))
      }
      { !dataSource.length && (
        <Col span={24}>
          <Empty />
        </Col>
      ) }
    </Row>
  )
}


export default GridView;
