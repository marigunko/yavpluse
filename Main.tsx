import 'moment/locale/ru';
import 'swiper/css';

import StoriesReceipt from '@components/Stories/Main/receipt';
import StoriesAbout from '@components/Stories/Main/about';
import StoriesBonus from '@components/Stories/Main/bonus';
import StoriesMultiply from '@components/Stories/Main/multiply';
import StoriesWithdrawals from '@components/Stories/Main/withdrawals';
import StoriesGet from '@components/Stories/Main/get';
import StoriesHow from '@app/components/Stories/Main/how';

import Story1 from '@assets/img/main-page/main-story-1.png';
import Story2 from '@assets/img/main-page/main-story-2.png';
import Story3 from '@assets/img/main-page/main-story-3.png';
import Story4 from '@assets/img/main-page/main-story-4.png';
import Story5 from '@assets/img/main-page/main-story-5.png';
import Story6 from '@assets/img/main-page/main-story-6.png';
import Story7 from '@assets/img/main-page/main-story-7.png';
import Banner from '@assets/img/main-page/main-banner.png';
import Lock from '@assets/icons/main-lock.svg';
import BonusBg from '@assets/img/main-page/main-bonus-bg.png';
import BonusSymbol1 from '@assets/icons/main-bonus-symbol-white.svg';
import BonusSymbol2 from '@assets/icons/main-bonus-symbol-purple.svg';

import {
  Box,
  Flex,
  IconButton,
  Img,
  Link,
  Slider,
  SliderFilledTrack,
  SliderTrack,
  Tag,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import userStore from '@store/user';
import { IconArrowRight, IconClock, IconClose } from '@utils/icons';
import { observer } from 'mobx-react-lite';
import moment, { Duration } from 'moment';
import React, { useEffect, useState } from 'react';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import Receipts from '@pages/Main/Receipts';

function Main() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenReceipt, onClose: onCloseReceipt, onOpen: onOpenReceipt } = useDisclosure();
  const { isOpen: isOpenAbout, onClose: onCloseAbout, onOpen: onOpenAbout } = useDisclosure();
  const { isOpen: isOpenBonus, onClose: onCloseBonus, onOpen: onOpenBonus } = useDisclosure();
  const { isOpen: isOpenMultiply, onClose: onCloseMultiply, onOpen: onOpenMultiply } = useDisclosure();
  const { isOpen: isOpenWithdrawals, onClose: onCloseWithdrawals, onOpen: onOpenWithdrawals } = useDisclosure();
  const { isOpen: isOpenGet, onClose: onCloseGet, onOpen: onOpenGet } = useDisclosure();
  const { isOpen: isOpenHow, onClose: onCloseHow, onOpen: onOpenHow } = useDisclosure();

  const btnRef = React.useRef(null);

  const history = useNavigate();
  const [nextHour] = useState(moment().add(1, 'hour').startOf('hour'));
  const [diff, setDiff] = useState<Duration>();

  useEffect(() => {
    setTimeout(() => {
      setDiff(moment.duration(moment().diff(nextHour)));
    }, 1000);
  });

  return (
    <Box pb={28}>
      <Box pt={6} px={4}>
        <Flex justifyContent="space-between" mb={1}>
          <Text fontWeight="500" color="#949494">
            1 монета = 1 рубль
          </Text>
          <Link
            as={RouterLink}
            to="/"
            _hover={{
              textDecoration: 'none',
            }}
            _focus={{
              textDecoration: 'none',
            }}
            _active={{
              textDecoration: 'none',
            }}
          >
            <Flex alignItems="center">
              <Text fontWeight="500" mr={1}>
                Мои монеты
              </Text>
              <IconArrowRight />
            </Flex>
          </Link>
        </Flex>
        <Flex alignItems="center">
          <Text fontSize={32} mr={2} fontWeight={600}>
            {userStore.user.balance_common}
          </Text>
          <Tag bgColor="#FC752A" borderRadius="25px" width="24px" height="24px" px={0} />
        </Flex>
      </Box>

      <Box pt={3}>
        <StoriesReceipt onClose={onCloseReceipt} isOpen={isOpenReceipt} />
        <StoriesAbout onClose={onCloseAbout} isOpen={isOpenAbout} />
        <StoriesBonus onClose={onCloseBonus} isOpen={isOpenBonus} />
        <StoriesMultiply onClose={onCloseMultiply} isOpen={isOpenMultiply} />
        <StoriesWithdrawals onClose={onCloseWithdrawals} isOpen={isOpenWithdrawals} />
        <StoriesGet onClose={onCloseGet} isOpen={isOpenGet} />
        <StoriesHow onClose={onCloseHow} isOpen={isOpenHow} />

        <Swiper spaceBetween={8} slidesPerView={2.5}>
          <SwiperSlide>
            <Box onClick={onOpenGet} position="relative">
              <Img ml={4} src={Story6} alt="Story6" borderRadius={24} />{' '}
              <Box position="absolute" top={2} left={4} width="100%" px={3}>
                <Text fontSize={16} fontWeight={600} color="#FFFFFF" width="85%">
                  Получайте бонусы и монеты
                </Text>
                <IconButton
                  aria-label="close"
                  icon={<IconClose w={5} h={5} />}
                  onClick={onClose}
                  position="absolute"
                  right={0}
                  top={-2}
                  zIndex={1}
                  variant="ghost"
                  color="#fff"
                  outline="none"
                  _focus={{ outline: 'none' }}
                />
              </Box>
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box onClick={onOpenHow} position="relative">
              <Img ml={4} src={Story7} alt="Story7" borderRadius={24} />{' '}
              <Box position="absolute" top={2} left={4} width="100%" px={3}>
                <Text fontSize={16} fontWeight={600} color="#FFFFFF" width="88%">
                  Как бонусы умножаются до монет?
                </Text>
                <IconButton
                  aria-label="close"
                  icon={<IconClose w={5} h={5} />}
                  onClick={onClose}
                  position="absolute"
                  right={0}
                  top={-2}
                  zIndex={1}
                  variant="ghost"
                  color="#fff"
                  outline="none"
                  _focus={{ outline: 'none' }}
                />
              </Box>
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box onClick={onOpenReceipt} position="relative">
              <Img ml={4} src={Story1} alt="Story1" borderRadius={24} />{' '}
              <Box position="absolute" top={2} left={4} width="100%" px={3}>
                <Text fontSize={16} fontWeight={600} color="#FFFFFF" width="85%">
                  Загрузить чек за 5 сек
                </Text>
                <IconButton
                  aria-label="close"
                  icon={<IconClose w={5} h={5} />}
                  onClick={onClose}
                  position="absolute"
                  right={0}
                  top={-2}
                  zIndex={1}
                  variant="ghost"
                  color="#fff"
                  outline="none"
                  _focus={{ outline: 'none' }}
                />
              </Box>
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box onClick={onOpenAbout} position="relative">
              <Img ml={4} src={Story2} alt="Story2" borderRadius={24} />{' '}
              <Box position="absolute" top={2} left={4} width="100%" px={3}>
                <Text fontSize={16} fontWeight={600} color="#FFFFFF" width="85%">
                  Про бонусы и монеты
                </Text>
                <IconButton
                  aria-label="close"
                  icon={<IconClose w={5} h={5} />}
                  onClick={onClose}
                  position="absolute"
                  right={0}
                  top={-2}
                  zIndex={1}
                  variant="ghost"
                  color="#fff"
                  outline="none"
                  _focus={{ outline: 'none' }}
                />
              </Box>
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box onClick={onOpenBonus} position="relative">
              <Img ml={4} src={Story3} alt="Story3" borderRadius={24} />{' '}
              <Box position="absolute" top={2} left={4} width="100%" px={3}>
                <Text fontSize={16} fontWeight={600} color="#FFFFFF" width="85%">
                  Как получить бонусы
                </Text>
                <IconButton
                  aria-label="close"
                  icon={<IconClose w={5} h={5} />}
                  onClick={onClose}
                  position="absolute"
                  right={0}
                  top={-2}
                  zIndex={1}
                  variant="ghost"
                  color="#fff"
                  outline="none"
                  _focus={{ outline: 'none' }}
                />
              </Box>
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box onClick={onOpenMultiply} position="relative">
              <Img ml={4} src={Story4} alt="Story4" borderRadius={24} />{' '}
              <Box position="absolute" top={2} left={4} width="100%" px={3}>
                <Text fontSize={16} fontWeight={600} color="#FFFFFF" width="85%">
                  Умножайте бонусы до монет
                </Text>
                <IconButton
                  aria-label="close"
                  icon={<IconClose w={5} h={5} />}
                  onClick={onClose}
                  position="absolute"
                  right={0}
                  top={-2}
                  zIndex={1}
                  variant="ghost"
                  color="#fff"
                  outline="none"
                  _focus={{ outline: 'none' }}
                />
              </Box>
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box onClick={onOpenWithdrawals} position="relative">
              <Img ml={4} src={Story5} alt="Story5" borderRadius={24} />{' '}
              <Box position="absolute" top={2} left={4} width="100%" px={3}>
                <Text fontSize={16} fontWeight={600} color="#FFFFFF" width="85%">
                  Вывод монет на карту
                </Text>
                <IconButton
                  aria-label="close"
                  icon={<IconClose w={5} h={5} />}
                  onClick={onClose}
                  position="absolute"
                  right={0}
                  top={-2}
                  zIndex={1}
                  variant="ghost"
                  color="#fff"
                  outline="none"
                  _focus={{ outline: 'none' }}
                />
              </Box>
            </Box>
          </SwiperSlide>
          <SwiperSlide />
        </Swiper>
      </Box>

      <Img src={Banner} alt="Баннер" px={4} pt={6} />

      <Receipts />

      <Link
        as={RouterLink}
        to="/bonus/my"
        _hover={{
          textDecoration: 'none',
        }}
        _focus={{
          textDecoration: 'none',
        }}
        _active={{
          textDecoration: 'none',
        }}
      >
        <Box bgImage={BonusBg} backgroundSize="cover" borderTopRadius="25px" py={3} px={3} mt={6} mx={1}>
          <Text fontWeight="500" color="#FFFFFF">
            Мои бонусы
          </Text>
          <Flex alignItems="center" pb={6}>
            <Text color="#FFFFFF" fontSize="32px" fontWeight={600} mr={2}>
              {userStore.user.balance_common}
            </Text>
            <Img src={BonusSymbol1} alt="" w={6} h={6} />
          </Flex>
        </Box>
      </Link>

      <Link
        as={RouterLink}
        to="/multiplier"
        _hover={{
          textDecoration: 'none',
        }}
        _focus={{
          textDecoration: 'none',
        }}
        _active={{
          textDecoration: 'none',
        }}
      >
        <Box py={3} px={3} borderRadius="24px" bg="white" zIndex={1} position="relative" top="-28px" mx={1}>
          <Text fontWeight={500}>Умножение бонусов</Text>
          <Text fontSize={32} fontWeight={600} mr={2}>
            До 200 монет
          </Text>
          <Slider defaultValue={50}>
            <SliderTrack>
              <SliderFilledTrack bgColor="#4C30F9" />
            </SliderTrack>
          </Slider>
          <Flex alignItems="center" my={2} justifyContent="space-between">
            <Flex alignItems="center">
              <Img src={BonusSymbol2} alt="" w={4} h={4} mr={2} />
              <Text fontWeight={500} color="#4C30F9">
                {userStore.user.balance_common}
              </Text>
              <Text fontWeight={500} color="#626262">
                &nbsp;/ 20 бонусов
              </Text>
            </Flex>
            <Flex alignItems="center" onClick={() => history('/multiplier/1')}>
              <Img src={Lock} color="#626262" mr={2} />
              <Text fontWeight={500} color="#626262">
                Нужно ещё&nbsp;
              </Text>
              <Text fontWeight="500" color="#626262">
                8
              </Text>
            </Flex>
          </Flex>
          <Box bgColor="#F6F6F6" borderRadius="14px" mt={4} p={2}>
            <Flex alignItems="center" justifyContent="center">
              <IconClock color="#626262" w={4} h={4} mr={2} />{' '}
              <Text fontSize={16} mr={2} fontWeight="500">
                Умножение через
              </Text>
              <Text fontSize={16} fontWeight="500">
                {diff && Math.abs(diff.minutes())} мин {diff && Math.abs(diff.seconds())} с
              </Text>
            </Flex>
          </Box>
        </Box>
      </Link>
    </Box>
  );
}

export default observer(Main);
