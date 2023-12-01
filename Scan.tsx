import 'react-html5-camera-photo/build/css/index.css';
import './style.css';

import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  Flex,
  Img,
  Modal,
  ModalContent,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import HandReceipt from '@components/Scan/HandReceipt';
import ModalSuccess from '@components/Scan/ModalSuccess';
import ReceiptStore from '@store/receipt';
import API from '@utils/api';
import { IconClose } from '@utils/icons';
import React, { useEffect, useRef, useState } from 'react';
import QrReader from 'react-qr-reader';
import BtnIcon1 from '@assets/icons/scan-btn-icon-1.svg';
import BtnIcon2 from '@assets/icons/scan-btn-icon-2.svg';
import ScanField from '@app/assets/img/scan-field.svg';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

function Index({ isOpen, onClose }: IProps) {
  const toast = useToast();
  const qrReaderRef = useRef<QrReader>(null);
  const [file, setFile] = useState<Blob>();
  const [qrData, setQrData] = useState('');
  const [scanStatus, setScanStatus] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [stopScan, setStopScan] = useState(isOpen);

  const { isOpen: isOpenModalSuccess, onClose: onCloseModalSuccess, onOpen: onOpenModalSuccess } = useDisclosure();

  const { isOpen: isOpenHandReceipt, onClose: onCloseHandReceipt, onOpen: onOpenHandReceipt } = useDisclosure();

  const createReceipt = (data: FormData) => {
    API.receipt
      .create(data)
      .then((response) => {
        if (response.data === true) {
          onOpenModalSuccess();
          setStopScan(true);
          ReceiptStore.fetchReceipts();
        }
      })
      .catch((error) => {
        if (error.response?.status === 422) {
          if (error.response?.data?.message) {
            const message = JSON.parse(error.response.data.message);
            const errorMessage = message?.data_raw
              ? 'Такой чек уже есть'
              : message?.fn
              ? 'Данный чек не принадлежит ни одному из партнёров'
              : 'Ошибка сервера. Повторите позже';
            toast({
              title: errorMessage,
              status: 'error',
              duration: 3000,
              isClosable: true,
              position: 'top',
            });
          }
        } else {
          toast({
            title: 'Ошибка сервера. Повторите позже',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top',
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleScan = (data: string | null) => {
    console.log('handleScan', data);
    if (data) {
      const formData = new FormData();

      formData.append('data_raw', data);

      createReceipt(formData);
    }
  };

  const handleClickScan = () => {
    qrReaderRef.current?.openImageDialog();
  };

  const handleError = (error: string) => {
    console.error('error', error);
  };

  const sendReceipt = () => {
    setLoading(true);

    const data = new FormData();

    data.append('file', file || '');
    data.append('data_raw', qrData);

    createReceipt(data);
  };

  useEffect(() => {
    setStopScan(!isOpen);
    if (!isOpen) {
      // reset on close
      setFile(undefined);
      setScanStatus(undefined);
      // @ts-ignore
      if (qrReaderRef.current?.els?.input !== undefined) {
        // @ts-ignore
        qrReaderRef.current.els.input.value = null;
      }
    }
  }, [isOpen]);

  const successScanHandle = (e: string | null) => {
    // @ts-ignore
    setFile(qrReaderRef.current.els.input.files[0]);

    if (e !== null) {
      setScanStatus('success');
      setQrData(e);
    } else {
      setScanStatus('error');
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalContent borderRadius={0} height="100%" bgColor="#000000" py={4}>
          <Box width="100%" position="relative" zIndex={100} bgColor="#000000" px={4}>
            <Center>
              <Text fontWeight={500} color={file ? '#000' : '#fff'} mt={2} pb={2}>
                Сканер чеков
              </Text>
            </Center>
            <IconClose
              // @ts-ignore
              onClick={onClose}
              position="absolute"
              top={1}
              right={4}
              bgColor="#F1F1F1"
              width={9}
              height={9}
              border="6px solid #F1F1F1"
              borderRadius="25px"
            />
          </Box>

          {!stopScan && !file && (
            <QrReader delay={500} onError={handleError} onScan={handleScan} style={{ width: '100%', height: '100%' }} />
          )}

          {scanStatus === 'error' && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>Код не распознан</AlertTitle>
            </Alert>
          )}

          {scanStatus === 'success' && (
            <Alert status="success">
              <AlertIcon />
              <AlertTitle mr={2}>Код распознан</AlertTitle>
            </Alert>
          )}

          <Box display={file ? 'block' : 'none'}>
            <QrReader
              ref={qrReaderRef}
              delay={300}
              onError={() => setScanStatus(undefined)}
              onScan={successScanHandle}
              legacyMode
              style={{ width: '100%', height: '100%' }}
            />
          </Box>

          <Img
            src={ScanField}
            alt="scan field"
            w="60%"
            h="auto"
            position="absolute"
            top="45%"
            left="20%"
            transform="translateY(-50%)"
            zIndex={100}
          />

          <Box position="relative" bgColor="#000000">
            <Box position="absolute" top="-80px" w="full" zIndex={100}>
              {scanStatus === 'success' && (
                <Box px={3} mt={5} mb={3}>
                  <Button w="100%" colorScheme="green" isLoading={loading} onClick={sendReceipt}>
                    Отправить
                  </Button>
                </Box>
              )}

              {!file && (
                <Text color="#fff" textAlign="center" fontWeight={600} mb={5}>
                  Наведите сканер на QR-код
                  <br /> и он определится автоматически
                </Text>
              )}
              {file && (
                <Text color="#000" textAlign="center" fontWeight={600} mb={5}>
                  Если код на изображении распознан
                  <br />
                  нажмите кнопку "отправить"
                </Text>
              )}
            </Box>
            <Box px={4}>
              <Button onClick={onOpenHandReceipt} w="100%" bgColor="#EDEDED" mb={4}>
                <Flex alignItems="center">
                  <Img src={BtnIcon1} alt="icon" w={6} h={6} mr={1} />
                  <Text fontWeight={600}>Ввести данные чека вручную</Text>
                </Flex>
              </Button>
              <Button onClick={handleClickScan} w="100%" bgColor="#EDEDED">
                <Flex alignItems="center">
                  <Img src={BtnIcon2} alt="icon" w={6} h={6} mr={1} />
                  <Text fontWeight={600}>Загрузить из галереи</Text>
                </Flex>
              </Button>
            </Box>
          </Box>
        </ModalContent>
      </Modal>

      <ModalSuccess isOpen={isOpenModalSuccess} onClose={onCloseModalSuccess} onCloseScan={onClose} />

      <HandReceipt isOpen={isOpenHandReceipt} onClose={onCloseHandReceipt} onOpenModalSuccess={onOpenModalSuccess} />
    </>
  );
}

export default Index;
