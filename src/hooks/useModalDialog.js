import {
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import { Button, Modal } from 'antd';
const ModalContext = createContext();

const DEFAULT_MODAL_DIALOG_STATE = {
  open: false,
  content: '',
  footer: []
}

export const ModalProvider = ({ children }) => {

  const [modalState, extendModalState] = useState(DEFAULT_MODAL_DIALOG_STATE);
  const modalStateRef = useRef(modalState);

  const setModalState = (value) => {
    extendModalState(value);
    modalStateRef.current = value;
  }

  function showConfirmDialog({ title, content, footer }) {
    footer.map(button => {
      button.loading = !!button.loading;
      button.disabled = !!button.disabled;
      return button
    })
    setModalState({
      ...modalStateRef.current,
      title,
      content,
      footer: footer,
      open: true
    });
  }

  function closeModalDialog() {
    setModalState(DEFAULT_MODAL_DIALOG_STATE);
  }


  function disableModalLoading() {
    const _modalState = { ...modalStateRef.current };
    if (_modalState.footer) {
      _modalState.footer.forEach(button => {
        button.loading = false;
      });

      setModalState(_modalState);
    }
  }

  function setModalButtonLoading(buttonId, loading = true) {
    const _modalState = { ...modalStateRef.current };
    if (_modalState.footer) {
      _modalState.footer.forEach(button => {
        if (button.id && button.id === buttonId) {
          button.loading = loading;
        }
      });
      setModalState(_modalState);
    }
  }

  function enableModalButtons() {
    const _modalState = { ...modalStateRef.current };
    if (_modalState.footer) {
      _modalState.footer.forEach(button => {
        button.disable = false;
      });

      setModalState(_modalState);
    }
  }

  function getModalLoadingState() {
    let loading = false;

    if (modalStateRef.current.footer) {
      loading = modalStateRef.current.footer.some(button => {
        console.log(button.title, button.loading)
        return button.loading;
      });
    }
    console.log('loading', loading)
    return loading;
  }


  const value = {
    setModalState,
    showConfirmDialog,
    closeModalDialog,
    enableModalButtons,
    disableModalLoading,
    setModalButtonLoading,
    getModalLoadingState
  };

  let buttonCounts = 0;
  return (
    <ModalContext.Provider value={value}>
      {children}
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
    </ModalContext.Provider>
  );
};

export const useModalDialog = () => {
  return useContext(ModalContext);
};
