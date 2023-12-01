import 'swiper/css';

import Lightning from '@app/assets/icons/lightning.svg';
import IconMapPin from '@app/assets/img/icon-map-pin.svg';
import IconMapTrifold from '@app/assets/img/icon-map-trifold.svg';
import BannerAdvertisement from '@assets/img/banner-advertisement.png';
import BannerNews from '@assets/img/banner-news.jpeg';
import {
  Box,
  Button,
  CircularProgress,
  Flex,
  IconButton,
  Img,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
} from '@chakra-ui/react';
import { IconArrowRight, IconFavourite, IconSearch } from '@utils/icons';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { NavLink as RouterLink, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import BonusCategories from '@components/Bonus/BonusCategories';
import api from '@utils/api';
import { AxiosResponse } from 'axios';
import { IAction } from '@app/interfaces';
import ActionsList from '@components/Bonus/ActionsList';

function Bonus() {
  const { category_id } = useParams();
  const [actions, setActions] = useState<IAction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchActions = () => {
    setIsLoading(true);
    api.actions
      .list({ expand: 'image_url_small,action_partner_logo_url_small', category_id })
      .then((response: AxiosResponse<IAction[]>) => setActions(response.data))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => fetchActions(), [category_id]);

  return (
    <Box bgColor="#F6F6F6">
      <Box px={5} pt={5}>
        <Flex justifyContent="space-between" alignItems="center">
          <Box px={5}>
            <Flex justifyContent="space-between" alignItems="center">
              <Img src={IconMapPin} alt="IconMapPin" w={4} h={4} mr={2} />
              <Text fontSize={16} fontWeight={500} mr={2}>
                Санкт-Петербург
              </Text>
              <IconArrowRight />
            </Flex>
          </Box>
          <Button
            color="#fff"
            borderRadius="25px"
            size="sm"
            bgColor="#4C30F9"
            _hover={{
              bgColor: '#4C30F9',
            }}
            _active={{
              bbgColor: '#4C30F9',
            }}
            _focus={{
              bgColor: '#4C30F9',
            }}
          >
            <Flex alignItems="center">
              <Img src={IconMapTrifold} w={3} h={3} mr={2} />
              <Text fontSize={14} fontWeight={600}>
                На карте
              </Text>
            </Flex>
          </Button>
        </Flex>
      </Box>

      <Box px={5} mt={5}>
        <Flex justifyContent="space-between">
          <InputGroup mr={3}>
            <Input
              type="text"
              placeholder="Поиск по товарам и местам..."
              bgColor="#fff"
              border="none"
              borderRadius="15px"
            />
            <InputRightElement>
              <IconSearch color="#A0AEC0" w={6} h={6} />
            </InputRightElement>
          </InputGroup>
          <IconButton
            aria-label="fav"
            icon={<IconFavourite w={6} h={6} />}
            borderRadius="full"
            color="#A0AEC0"
            bgColor="#fff"
          />
        </Flex>
      </Box>

      <Box pl={5} mt={5}>
        <Swiper slidesPerView={1.5} spaceBetween={20}>
          <SwiperSlide>
            <Link>
              <Img src={BannerAdvertisement} alt="BannerAdvertisement" borderRadius="md" />{' '}
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link as={RouterLink} to="/news">
              <Img src={BannerNews} alt="BannerNews" borderRadius="md" />{' '}
            </Link>
          </SwiperSlide>
        </Swiper>
      </Box>

      <Box px={5} mt={5}>
        <Box bg="linear-gradient(105.97deg, #EBECFF 31.18%, #DEE1FF 96.64%)" borderRadius="20px" p={4} mt={3}>
          <Flex justifyContent="space-between">
            <Box>
              <Flex alignItems="center">
                <Img src={Lightning} alt="lightning" w={3} h={3} mr={1} />
                <Text fontSize={14} fontWeight={600}>
                  Супер-бонусы
                </Text>
              </Flex>
              <Text fontSize={20} fontWeight={600}>
                Красота и здоровье
              </Text>
              <Text fontSize={14} fontWeight={600} color="#9E9DBC">
                До 12 янв
              </Text>
            </Box>
            <Button
              bg="linear-gradient(105.06deg, #4C30F9 8.57%, #875EFF 113.7%)"
              color="#fff"
              borderRadius="25px"
              size="sm"
            >
              5-20%
            </Button>
          </Flex>
        </Box>
      </Box>

      <BonusCategories />

      <Box px={5}>
        {isLoading && (
          <Flex m={5} alignItems={'center'} justifyContent={'center'}>
            <CircularProgress isIndeterminate />
          </Flex>
        )}
        <ActionsList actions={actions} />
      </Box>
    </Box>
  );
}

export default observer(Bonus);
