import React, { useContext } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
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

// install Swiper modules
SwiperCore.use([EffectCube, Pagination]);

export default function AllAccDisplay(props: allAccDisplayPropInterface) {
  // Gettin account state
  const { accountsState } = useContext(AccountsContext);
  const { chosenAcc, setChosenAcc } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const settingAcc = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Use current Target instead of target
    // Dont know why target doesnt work
    // Setting the chosneAcc
    if (chosenAcc === e.currentTarget.value) {
      setChosenAcc("");
    } else {
      setChosenAcc(e.currentTarget.value);
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
    return (
      <SwiperSlide key={account._id} className="accCard">
        <Button
          className="accButton"
          key={account._id}
          onClick={settingAcc}
          value={account._id}
        >
          {account.accName}
        </Button>
        <h3>
          {account.accCurrency}:{balance}
        </h3>
      </SwiperSlide>
    );
  });

  return (
    <div className="HPComponent">
      <Swiper
        className="hpContainer"
        spaceBetween={50}
        slidesPerView={3}
        centeredSlides
      >
        {accountList}
        <SwiperSlide className="accCard">
          <Button onClick={onOpen}>Create New Account</Button>
        </SwiperSlide>
      </Swiper>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Account Creation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddAccount onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
