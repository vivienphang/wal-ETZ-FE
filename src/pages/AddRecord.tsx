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
  ModalFooter,
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
import { addRecord } from "../reducers/accountReducer";
import { addRecordInterface } from "../types/accountReducerInterface";
import { AccountsContext } from "../provider/GlobalProvider";
import { addRecordPropInterface } from "../types/propInterface";
import Camera from "../components/Camera";

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
    new File([""], "filename")
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

    console.log(token);
    console.log(data);
    accountsDispatch!(await addRecord({ ...data, token }, isPhotoUploaded));
    onClose();
  };

  useEffect(() => {
    setData({ ...data, recordCategory: cat });
  }, [cat]);
  useEffect(() => {
    setData({ ...data, acc });
  }, [acc]);

  useEffect(() => {
    console.log("useEffect:", isPhotoUploaded);
  }, [isPhotoUploaded]);

  return (
    <div>
      <form onSubmit={createRecord}>
        <FormControl>
          <Center>
            <FormLabel>Select Account</FormLabel>
          </Center>
          <AccountList acc={acc} setAcc={setAcc} />
          <Center mt={1}>
            <FormLabel>
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
            <FormLabel>Date of Transaction</FormLabel>
          </Center>
          <Input
            placeholder="Date And Time"
            type="datetime-local"
            onChange={updateDate}
            value={data.recordDate}
          />
          <Center mt={1}>
            <FormLabel>Record Name</FormLabel>
          </Center>
          <Input
            placeholder="Record Name"
            type="string"
            onChange={updateName}
          />
          <Center mt={1}>
            <FormLabel>Select Category</FormLabel>
          </Center>
          <CategoryList
            setCat={setCat}
            cat={cat}
            isExpense={data.isExpense!}
            isAddRecord
            isDisabled={false}
          />
          <Center mt={1}>
            <FormLabel>Comments</FormLabel>
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
            <FormLabel>Have a receipt?</FormLabel>
            <Button colorScheme="cyan" onClick={onCameraOpen}>
              Add Photo
            </Button>
          </Center>
          <VStack divider={<StackDivider />} spacing={10} />
          <Center>
            <Button type="submit">Create Record</Button>
          </Center>
        </FormControl>
        <Modal isOpen={isCameraOpen} onClose={onCameraClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Snap your receipt</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p>I am modal body</p>
              <Camera
                isPhotoUploaded={isPhotoUploaded}
                setIsPhotoUploaded={setIsPhotoUploaded}
              />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3}>
                Close
              </Button>
              <Button colorScheme="red" onClick={onCameraClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </form>
    </div>
  );
}
