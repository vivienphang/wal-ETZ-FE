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
    // if (e.currentTarget.classList.contains("circle-sketch-highlight")) {
    //   e.currentTarget.classList.remove("circle-sketch-highlight");
    // } else {
    //   e.currentTarget.classList.add("circle-sketch-highlight");
    // }
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
    return (
      <SwiperSlide key={account._id} className="accCard">
        <Box
          className="accButton"
          key={account._id}
          onClick={settingAcc}
          id={account._id}
        >
          <Text fontSize="xl">{account.accName}</Text>
          <Text
            fontSize="xl"
            as="i"
            color={balance < 0 ? "#F56565" : "#48BB78"}
          >
            {account.accCurrency}:
            {Math.abs(Number(balance.toFixed(2))).toLocaleString()}
          </Text>
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
          <Box onClick={onOpen} bg="#ffffeb">
            <Text fontSize="xl">Create Account</Text>
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
