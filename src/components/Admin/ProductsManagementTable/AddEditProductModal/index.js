import React, { useEffect, useState } from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import ProductForm from './ProductForm';
import { AdminCategoriesService, AdminProductsService } from 'services';
import { getCategoriesOptions } from 'services/Admin/CategoriesService';

export default function AddEditProductModal({ open, data, onOk, onCancel }) {
  const [form] = Form.useForm();
  const isEdit = !!data;
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const getCategoriesFilter = () => {
    AdminCategoriesService.getCategories({ pageNum: 1, pageSize: 10000 }, response => {
      setCategoriesOptions(getCategoriesOptions(response.items));
    }, () => {}, true)
  }

  useEffect(() => {
    getCategoriesFilter();
  }, []);

  const handleOk = (values) => {
    if (isEdit) {
      AdminProductsService.updateProduct(data.id, values, response => {
        notification.success({
          message: "Update product successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: error && error.title ? error.title : "Update product failure!",
        });
      })
    } else {
      AdminProductsService.createProduct(values, response => {
        notification.success({
          message: "Create product successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: error && error.title ? error.title : "Create product failure!",
        });
      })
    }

  }

  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               form={form}
               open={open}
               title={isEdit ? "Edit product" : "Add product"}
               okText={isEdit ? "Save" : "Add"}
               onOk={handleOk}
               onCancel={onCancel}
    >
      <ProductForm
        form={form}
        categoriesOptions={categoriesOptions}
        initialValues={data}
      />
    </ModalView>
  )
}
