import React from 'react';
import styled from 'styled-components';
import { useLoadingStore } from '../store/loadingStore';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.95);
  z-index: 1040;
`;

const Modal = styled.div<{ show: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${(props) => (props.show ? 'block' : 'none')};
  z-index: 1050;
  background-color: #9f9b9b;
  padding: ${(props) => props.theme.spacing(2)};
  border-radius: ${(props) => props.theme.spacing(1)};
  .modal-content {
    width: 100px;
  }
`;

const Spinner = styled.div`
  width: 3rem;
  height: 3rem;
  border: 0.4em solid rgba(0, 0, 0, 0.1);
  border-top: 0.4em solid ${(props) => props.theme.colors.primary};
  border-radius: 50%;
  animation: spin 0.75s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingModal: React.FC = () => {
  const { show } = useLoadingStore();

  if (!show) return null;

  return (
    <>
      <Modal show={show} role="dialog">
        <Spinner role="status" />
      </Modal>
      <ModalBackdrop />
    </>
  );
};

export default LoadingModal;
