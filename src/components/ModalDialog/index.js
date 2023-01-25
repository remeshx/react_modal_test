import React from 'react';

import { Button, Modal } from 'antd';
import { useModalDialog } from '../../hooks/useModalDialog';

export const ModalDialog = () => {

  const { modalState } = useModalDialog();

  let buttonCounts = 0;
  return (
    <Modal
      title={modalState.title}
      open={modalState.open}
      centered='true'
      footer={modalState.footer.map((button) => {
        buttonCounts++;
        return (<Button key={'dialog-button-' + buttonCounts} disabled={button.disabled} loading={button.loading} onClick={button.onClick}>
          {button.title}
        </Button>)
      })}
    >
      {modalState.content}
    </Modal>
  )
}




export default ModalDialog;