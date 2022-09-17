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

  const accountList = accountsState!.map((account) => (
    // Setting the account
    // Need the total balance of the individual account
    <SwiperSlide key={account._id} className="accCard">
      <Button
        className="accButton"
        key={account._id}
        onClick={settingAcc}
        value={account._id}
      >
        {account.accName}
      </Button>
      {/* Need to style this  */}
      <h3>
        $:
        {account.accCurrency}
      </h3>
    </SwiperSlide>
  ));
  return (
    <div className="HPComponent">
      <Swiper
        className="carouselContainer"
        spaceBetween={50}
        slidesPerView={3}
        centeredSlides
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
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
