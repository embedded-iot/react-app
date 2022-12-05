import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form } from 'antd';
import AccountStaffForm from './AccountStaffForm';
import Icon from 'components/Common/Icon';
import walletIcon from 'images/wallet-icon.png'

export default function AddEditAccountStaffModal({ open, onOk, onCancel }) {
  const [form] = Form.useForm();
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               form={form}
               open={open}
               title={<><Icon src={walletIcon} width={24} height={24} /> New Wallet</>}
               okText={"Continue"}
               onOk={onOk}
               onCancel={onCancel}
               hideCancelBtn={true}
               maskClosable={true}
    >
      <AccountStaffForm form={form} />
    </ModalView>
  )
}
