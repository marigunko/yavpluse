import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import { IconArrowRight } from '@utils/icons';
import * as yup from 'yup';
import { useFormik } from 'formik';
import userStore from '@store/user';
import api from '@utils/api';
import { observer } from 'mobx-react-lite';
import ChangePassword from '@components/Profile/ChangePassword';

const style = {
  label: {
    color: '#7B7B7B',
    mb: 0,
  },
  input: {
    _placeholder: { color: '#000000' },
    borderColor: '#DDDDDD',
  },
};

function Data() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const validationSchema = yup.object().shape({
    name: yup.string().required('Обязательное поле'),
    email: yup.string().email().required('Обязательное поле'),
  });

  const formik = useFormik({
    initialValues: {
      name: userStore.user.name,
      birth_day: userStore.user.birth_day,
      phone: userStore.user.phone,
      email: userStore.user.email,
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setErrors }) => {
      const data = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        // @ts-ignore
        data.append(key, value);
      });

      await api.user
        .updateProfile(data)
        .then((response) => {
          if (response.status === 200 && response.data === true) {
            userStore.setUser({
              ...userStore.user,
              name: values.name,
              birth_day: values.birth_day,
              phone: values.phone,
              email: values.email,
            });
            toast({
              title: 'Информация обновлена',
              status: 'success',
              duration: 3000,
              isClosable: true,
              position: 'top',
            });
          }
        })
        .catch((error) => {
          if (error.response?.status === 422) {
            if (error.response?.data?.message) {
              const message = JSON.parse(error.response.data.message);
              setErrors(message);
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
        });
    },
  });

  return (
    <Box px={4}>
      <form onSubmit={formik.handleSubmit}>
        <Stack gap={8}>
          <FormControl isRequired isInvalid={!!formik.errors.name}>
            <FormLabel sx={style.label}>Имя</FormLabel>
            <Input
              placeholder="Имя"
              type="text"
              variant={'flushed'}
              sx={style.input}
              {...formik.getFieldProps('name')}
            />
            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!formik.errors.birth_day}>
            <FormLabel>Дата рождения</FormLabel>
            <Input type="date" variant={'flushed'} sx={style.input} {...formik.getFieldProps('birth_day')} />
            <FormErrorMessage>{formik.errors.birth_day}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!formik.errors.email}>
            <FormLabel sx={style.label}>Электронная почта</FormLabel>
            <InputGroup>
              <Input
                placeholder="Привязать почту"
                type="email"
                variant={'flushed'}
                sx={style.input}
                {...formik.getFieldProps('email')}
              />
              <InputRightElement>
                <IconArrowRight color="#A0A0A0" w={6} h={6} />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!formik.errors.phone}>
            <FormLabel sx={style.label}>Телефон</FormLabel>
            <InputGroup>
              <Input
                placeholder="Привязать телефон"
                type="tel"
                variant={'flushed'}
                sx={style.input}
                {...formik.getFieldProps('phone')}
              />
              <InputRightElement>
                <IconArrowRight color="#A0A0A0" w={6} h={6} />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{formik.errors.phone}</FormErrorMessage>
          </FormControl>
        </Stack>

        <Center mt={24}>
          <Text color="#467CFF" fontWeight={500} onClick={onOpen}>
            Изменить пароль
          </Text>

          <ChangePassword onClose={onClose} isOpen={isOpen} />
        </Center>

        <Button
          type="submit"
          width="100%"
          bgColor="#41B14C"
          borderRadius={14}
          mt={8}
          isLoading={formik.isSubmitting}
          _focus={{
            textDecoration: 'none',
            bg: '#41B14C',
          }}
          _active={{
            textDecoration: 'none',
            bg: '#41B14C',
          }}
        >
          <Text fontWeight={600} color="#FFFFFF">
            Сохранить изменения
          </Text>
        </Button>
      </form>
    </Box>
  );
}

export default observer(Data);
