import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Switch,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  StackDivider,
  VStack,
  Textarea,
} from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";
import CategoryList from "../atoms/CategoryList";
import AccountList from "../components/AccountList";
import { addRecord, addRecordNoPhoto } from "../reducers/accountReducer";
import { addRecordInterface } from "../types/accountReducerInterface";
import { AccountsContext } from "../provider/GlobalProvider";
import { addRecordPropInterface } from "../types/propInterface";
import Camera from "../components/Camera";
import colorList from "../constants/colorList";

export default function AddRecord(props: addRecordPropInterface) {
  const { onClose } = props;
  const {
    isOpen: isCameraOpen,
    onOpen: onCameraOpen,
    onClose: onCameraClose,
  } = useDisclosure();

  const initData = {
    acc: "",
    amount: "",
    isExpense: false,
    recordName: "",
    recordComment: "",
    recordCategory: "",
    recordPhoto: "",
    recordDate: "",
  };

  const { accountsDispatch } = useContext(AccountsContext);
  const [acc, setAcc] = useState("");
  const [cat, setCat] = useState("");
  const [data, setData] = useState<addRecordInterface>(initData);
  const [formError, setFormError] = useState(false);
  const [isPhotoUploaded, setIsPhotoUploaded] = useState<File>(
    new File([""], "nophoto")
  );

  const handleToggleExpense = () => {
    setData({ ...data, isExpense: !data.isExpense });
  };

  const updateAmount: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    const sanitization = value.trim().match(/\d*(\.\d{0,2})?/);
    const sanitizedValue = sanitization ? sanitization[0] : "";
    setData({ ...data, amount: sanitizedValue });
  };
  const updateDate: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setData({ ...data, recordDate: e.target.value });
  };
  const updateName: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setData({ ...data, recordName: e.target.value });
  };
  const updateComment: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setData({ ...data, recordComment: e.target.value });
  };

  const createRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !data.acc ||
      !data.amount ||
      !data.recordDate ||
      !data.recordCategory ||
      !data.recordName
    ) {
      setFormError(true);
      setTimeout(() => {
        setFormError(false);
      }, 2500);
      return;
    }
    const token = localStorage.getItem("token");
    accountsDispatch!(await addRecord({ ...data, token }, isPhotoUploaded));
    if (isPhotoUploaded.name !== "nophoto") {
      accountsDispatch!(await addRecord({ ...data, token }, isPhotoUploaded));
    } else {
      accountsDispatch!(await addRecordNoPhoto({ ...data, token }));
    }
    onClose();
  };

  useEffect(() => {
    setData({ ...data, recordCategory: cat });
  }, [cat]);
  useEffect(() => {
    setData({ ...data, acc });
  }, [acc]);

  return (
    <div>
      <form onSubmit={createRecord}>
        <FormControl>
          <Center>
            <FormLabel color={colorList.textColor}>Select Account</FormLabel>
          </Center>
          <AccountList acc={acc} setAcc={setAcc} />
          <Center mt={1}>
            <FormLabel color={colorList.textColor}>
              {data.isExpense ? "Expense " : "Income "}
              Amount
            </FormLabel>
          </Center>
          <Flex>
            <Box w="25%">
              <Center>
                <Switch
                  size="lg"
                  isChecked={data.isExpense}
                  onChange={handleToggleExpense}
                  colorScheme="red"
                />
              </Center>
            </Box>
            <Box w="75%">
              <NumberInput defaultValue={0} precision={2} step={0.1} min={0}>
                <NumberInputField
                  type="number"
                  onChange={updateAmount}
                  value={data.amount}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
          </Flex>
          <Center mt={1}>
            <FormLabel color={colorList.textColor}>
              Date of Transaction
            </FormLabel>
          </Center>
          <Input
            placeholder="Date And Time"
            type="datetime-local"
            onChange={updateDate}
            value={data.recordDate}
          />
          <Center mt={1}>
            <FormLabel color={colorList.textColor}>Record Name</FormLabel>
          </Center>
          <Input
            placeholder="Record Name"
            type="string"
            onChange={updateName}
          />
          <Center mt={1}>
            <FormLabel color={colorList.textColor}>Select Category</FormLabel>
          </Center>
          <CategoryList
            setCat={setCat}
            cat={cat}
            isExpense={data.isExpense!}
            isAddRecord
            isDisabled={false}
          />
          <Center mt={1}>
            <FormLabel color={colorList.textColor}>Comments</FormLabel>
          </Center>
          <Textarea
            placeholder="Enter your comments here"
            size="sm"
            resize="none"
            onChange={updateComment}
            value={data.recordComment}
            mb={1}
          />
          <Center>
            <FormHelperText
              className={formError ? "show" : "hide"}
              transition="0.8s linear"
              color="red"
              my={1}
            >
              Please check your input!
            </FormHelperText>
          </Center>
          <Center>
            <FormLabel color={colorList.textColor}>Have a receipt?</FormLabel>
            <Button
              bg={colorList.buttonSecondary}
              color={colorList.textColor}
              _hover={{
                bg: colorList.component,
                color: colorList.textColor,
              }}
              _active={{
                bg: colorList.buttonPrimary,
                color: colorList.drawerModal,
              }}
              onClick={onCameraOpen}
            >
              Add Photo
            </Button>
          </Center>
          <VStack divider={<StackDivider />} spacing={10} />
          <Center>
            <Button
              type="submit"
              bg={colorList.buttonPrimary}
              color={colorList.drawerModal}
              _hover={{
                bg: colorList.component,
                color: colorList.textColor,
              }}
              _active={{
                bg: colorList.buttonSecondary,
                color: colorList.textColor,
              }}
              mt={2}
            >
              Create Record
            </Button>
          </Center>
        </FormControl>
        <Modal isOpen={isCameraOpen} onClose={onCameraClose}>
          <ModalOverlay />
          <ModalContent bg={colorList.drawerModal}>
            <ModalHeader color={colorList.textColor}>
              Snap your receipt
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Camera
                isPhotoUploaded={isPhotoUploaded}
                setIsPhotoUploaded={setIsPhotoUploaded}
                onCameraClose={onCameraClose}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </form>
    </div>
  );
}
