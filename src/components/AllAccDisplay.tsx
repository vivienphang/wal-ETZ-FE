import React, { useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Text,
  Heading,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectCube, Pagination } from "swiper/core";

import { AccountsContext } from "../provider/GlobalProvider";
import { allAccDisplayPropInterface } from "../types/propInterface";
import AddAccount from "./AddAccount";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/components/effect-cube/effect-cube.min.css";
import "swiper/components/pagination/pagination.min.css";
import colorList from "../constants/colorList";
import currencyList from "../constants/currencyList";
import { currencyInterface } from "../types/constantInterface";

// install Swiper modules
SwiperCore.use([EffectCube, Pagination]);

export default function AllAccDisplay(props: allAccDisplayPropInterface) {
  // Gettin account state
  const { accountsState } = useContext(AccountsContext);
  const { chosenAcc, setChosenAcc } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const settingAcc = (e: React.MouseEvent<HTMLDivElement>) => {
    // Use current Target instead of target
    // Dont know why target doesnt work
    // Setting the chosneAcc
    if (chosenAcc === e.currentTarget.id) {
      setChosenAcc("");
    } else {
      setChosenAcc(e.currentTarget.id);
    }
  };
  // Get the current accBalance

  const accountList = accountsState!.map((account) => {
    // Getting current
    let inc = 0;
    let exp = 0;
    let balance = 0;
    account.accRecords!.forEach((rec) => {
      const { amount } = rec!;
      if (rec.isExpense) {
        exp += Number(amount);
      } else if (!rec.isExpense) {
        inc += Number(amount);
      }
      balance = inc - exp;
    });

    const filterCurrency = (currency: currencyInterface) => {
      return account.accCurrency === currency.currencyAbbv;
    };

    const selectedCurrency = currencyList.filter(filterCurrency)[0];
    return (
      <SwiperSlide key={account._id} className="accCard">
        <Box
          className="accButton"
          key={account._id}
          onClick={settingAcc}
          id={account._id}
          w="100%"
          h="100%"
        >
          <Box
            w="100%"
            h="50%"
            display="flex"
            alignContent="center"
            justifyContent="center"
            alignItems="center"
          >
            <Heading fontSize="md">{account.accName}</Heading>
          </Box>
          <Box
            w="100%"
            bg={colorList.alternateRowColor}
            h="30%"
            display="flex"
            alignContent="center"
            justifyContent="center"
            alignItems="center"
          >
            <Text fontSize="sm">{selectedCurrency.currencyAbbv}</Text>
          </Box>
          <Box
            w="100%"
            h="20%"
            color={balance < 0 ? colorList.moneyRed : colorList.moneyGreen}
          >
            <Text>
              {`${selectedCurrency.currencySymbol} ${Math.abs(
                Number(balance.toFixed(2))
              ).toLocaleString()}`}
            </Text>
          </Box>
        </Box>
      </SwiperSlide>
    );
  });
  // py={5} px={4}
  return (
    <Box className="carouselContainer">
      <Swiper
        className="hpContainer"
        spaceBetween={50}
        slidesPerView={2}
        centeredSlides
        centeredSlidesBounds
        height={15}
      >
        {accountList}
        <SwiperSlide className="accCard">
          <Box
            onClick={onOpen}
            bg={colorList.drawerModal}
            display="flex"
            justifyContent="center"
            alignItems="center"
            alignContent="center"
          >
            <Text fontSize="xl">New Account</Text>
          </Box>
        </SwiperSlide>
      </Swiper>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={colorList.drawerModal}>
          <ModalHeader>Account Creation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddAccount onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
