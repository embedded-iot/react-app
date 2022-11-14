import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import CategoryForm from './CategoryForm';
import { AdminCategoriesService, BaseService } from 'services';

export default function AddEditCategoryModal({ open, data, onOk, onCancel }) {
  const [form] = Form.useForm();
  const isEdit = !!data;
  const handleOk = (values) => {
    const { displayOrder, name, slug, state, avatarFileList } = values;
    const featureImage = !!avatarFileList.length ? avatarFileList[0].response.url : null;
    const categoryData = {
      displayOrder, name, slug, state, featureImage
    }
    if (isEdit) {
      AdminCategoriesService.updateCategory(data.id, categoryData, response => {
        notification.success({
          message: "Update category successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error,"Update category failure!" ),
        });
      })
    } else {
      AdminCategoriesService.createCategory(categoryData, response => {
        notification.success({
          message: "Create category successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error, "Create category failure!"),
        });
      })
    }

  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               form={form}
               open={open}
               title={isEdit ? "Edit category" : "Add category"}
               okText={isEdit ? "Save" : "Add"}
               onOk={handleOk}
               onCancel={onCancel}
    >
      <CategoryForm
        form={form}
        initialValues={data}
      />
    </ModalView>
  )
}
