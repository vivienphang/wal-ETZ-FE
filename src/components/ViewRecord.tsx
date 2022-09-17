import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Switch,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import React, { useContext, useEffect, useState } from "react";
import CategoryList from "../atoms/CategoryList";
import { AccountsContext } from "../provider/GlobalProvider";
import { deleteRecord, editRecord } from "../reducers/accountReducer";
import { addRecordInterface } from "../types/accountReducerInterface";
import { viewRecordPropInterface } from "../types/propInterface";

export default function ViewRecord(props: viewRecordPropInterface) {
  const { currentAcc, chosenRec, onClose } = props;
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

  const {
    isOpen: photoIsOpen,
    onOpen: photoOnOpen,
    onClose: photoOnClose,
  } = useDisclosure();
  const { accountsDispatch } = useContext(AccountsContext);

  const [cat, setCat] = useState(chosenRec.recordCategory!);
  const [enableEdit, setEnableEdit] = useState(false);
  const [defaultData, setDefaultData] = useState<addRecordInterface>(initData);
  const [data, setData] = useState<addRecordInterface>(initData);
  const [formError, setFormError] = useState(false);

  const handleEnableEdit = () => {
    setEnableEdit(!enableEdit);
    setData(defaultData);
    setCat(defaultData.recordCategory!);
  };

  const handleToggleExpense = () => {
    setData({ ...data, isExpense: !data.isExpense });
  };

  const updateAmount = (value: string) => {
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

  const handleEditRecord = async (e: React.FormEvent) => {
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
    accountsDispatch!(await editRecord({ ...data, token }, chosenRec._id!));
    onClose();
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    accountsDispatch!(await deleteRecord(chosenRec._id!, data.acc!, token!));
    onClose();
  };

  useEffect(() => {
    setData({ ...data, recordCategory: cat });
  }, [cat]);

  useEffect(() => {
    setData({
      amount: chosenRec.amount?.toString(),
      isExpense: chosenRec.isExpense,
      recordName: chosenRec.recordName,
      recordComment: chosenRec.recordComment ? chosenRec.recordComment : "",
      recordCategory: chosenRec.recordCategory,
      recordPhoto: chosenRec.recordPhoto ? chosenRec.recordPhoto : "",
      recordDate: DateTime.fromISO(chosenRec.recordDate!).toISO({
        suppressMilliseconds: true,
        suppressSeconds: true,
        includeOffset: false,
      }),
      acc: currentAcc._id,
    });
    setDefaultData({
      amount: chosenRec.amount?.toString(),
      isExpense: chosenRec.isExpense,
      recordName: chosenRec.recordName,
      recordComment: chosenRec.recordComment ? chosenRec.recordComment : "",
      recordCategory: chosenRec.recordCategory,
      recordPhoto: chosenRec.recordPhoto ? chosenRec.recordPhoto : "",
      recordDate: DateTime.fromISO(chosenRec.recordDate!).toISO({
        suppressMilliseconds: true,
        suppressSeconds: true,
        includeOffset: false,
      }),
      acc: currentAcc._id,
    });
  }, [chosenRec, currentAcc]);

  return (
    <>
      <FormControl display="flex" alignItems="end">
        <FormLabel mb={0}>Edit Record?</FormLabel>
        <Switch size="md" isChecked={enableEdit} onChange={handleEnableEdit} />
      </FormControl>
      <form onSubmit={handleEditRecord}>
        <FormControl>
          <Center mt={3}>
            <FormLabel>
              {data.isExpense ? "Expense " : "Income "}
              Amount
            </FormLabel>
          </Center>
          <Flex>
            <Box w="25%">
              <Center>
                {data.isExpense ? (
                  <Switch
                    size="lg"
                    isChecked
                    onChange={handleToggleExpense}
                    colorScheme="red"
                    disabled={!enableEdit}
                  />
                ) : (
                  <Switch
                    size="lg"
                    isChecked={false}
                    onChange={handleToggleExpense}
                    colorScheme="red"
                    disabled={!enableEdit}
                  />
                )}
              </Center>
            </Box>
            <Box w="75%">
              <NumberInput
                defaultValue={data.amount}
                onChange={updateAmount}
                value={data.amount}
                precision={2}
                step={0.1}
                min={0}
              >
                <NumberInputField
                  type="number"
                  value={data.amount}
                  placeholder={data.amount}
                  disabled={!enableEdit}
                />
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
            disabled={!enableEdit}
          />
          <Center mt={1}>
            <FormLabel>Record Name</FormLabel>
          </Center>
          <Input
            placeholder={data.recordName}
            type="string"
            onChange={updateName}
            value={data.recordName}
            defaultValue={data.recordName}
            disabled={!enableEdit}
          />
          <Center mt={1}>
            <FormLabel>Select Category</FormLabel>
          </Center>
          <CategoryList
            setCat={setCat}
            cat={cat}
            isExpense={data.isExpense!}
            isAddRecord={false}
            isDisabled={!enableEdit}
          />
          <Center mt={1}>
            <FormLabel>Comments</FormLabel>
          </Center>
          <Textarea
            placeholder={data.recordComment}
            size="sm"
            resize="none"
            onChange={updateComment}
            value={data.recordComment}
            defaultValue={data.recordComment}
            disabled={!enableEdit}
            mb={1}
          />
          <Center>
            <FormHelperText
              className={formError ? "show" : "hide"}
              color="red"
              my={1}
            >
              Please check your input!
            </FormHelperText>
          </Center>
          <Flex justifyContent="space-between" w="100%">
            <ButtonGroup spacing={1} mb={3}>
              <Button type="submit" disabled={!enableEdit} colorScheme="green">
                Edit
              </Button>
              <Button
                disabled={!enableEdit}
                colorScheme="red"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </ButtonGroup>
            <Button onClick={photoOnOpen}>View Receipt</Button>
          </Flex>
        </FormControl>
      </form>
      <Modal
        closeOnEsc
        closeOnOverlayClick={false}
        isCentered
        isOpen={photoIsOpen}
        onClose={photoOnClose}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent bg="#FFFFEB">
          <ModalHeader>Receipt</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
              src={data.recordPhoto}
              alt={`Receipt for ${data.recordName}`}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={photoOnClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
