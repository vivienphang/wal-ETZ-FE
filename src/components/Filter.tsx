import React, { useState } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  useDisclosure,
} from "@chakra-ui/react";
import { filterPropInterface } from "../types/propInterface";

export default function Filter(props: filterPropInterface) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { filters, setFilters } = props;

  const initialDateConfig = {
    startDate: filters.startDate,
    endDate: filters.endDate,
  };

  const [dateConfig, setDateConfig] = useState(initialDateConfig);
  const [viewExpenseConfig, setViewExpenseConfig] = useState(false);
  const [viewIncomeConfig, setViewIncomeConfig] = useState(false);

  const handleStartDateChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newStartDate = e.target.value;
    console.log(newStartDate);
    setDateConfig({ ...dateConfig, startDate: newStartDate });
  };

  const handleEndDateChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newEndDate = e.target.value;
    console.log(newEndDate);
    setDateConfig({ ...dateConfig, endDate: newEndDate });
  };

  const handleViewExpenseSwitch = () => {
    setViewExpenseConfig(!viewExpenseConfig);
  };

  const handleViewIncomeSwitch = () => {
    setViewIncomeConfig(!viewIncomeConfig);
  };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setFilters({
      ...filters,
      ...dateConfig,
      viewIncome: viewIncomeConfig,
      viewExpense: viewExpenseConfig,
    });
    onClose();
  };

  return (
    <>
      <IconButton
        variant="ghost"
        onClick={onOpen}
        icon={<HamburgerIcon />}
        aria-label="Record Filter"
      />

      <Modal
        closeOnEsc
        closeOnOverlayClick={false}
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
      >
        <form onSubmit={handleFormSubmit}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Filter Settings</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Start Date</FormLabel>
                <Input
                  placeholder="Select Start Date"
                  size="md"
                  type="date"
                  value={dateConfig.startDate}
                  onChange={handleStartDateChange}
                />
                <FormLabel>End Date</FormLabel>
                <Input
                  placeholder="Select End Date"
                  size="md"
                  type="date"
                  value={dateConfig.endDate}
                  onChange={handleEndDateChange}
                />
              </FormControl>
              {filters.viewExpense !== undefined && (
                <>
                  <FormLabel>View Expense</FormLabel>
                  <Switch
                    isChecked={viewExpenseConfig}
                    onChange={handleViewExpenseSwitch}
                    isDisabled={viewIncomeConfig}
                  />
                </>
              )}
              {filters.viewIncome !== undefined && (
                <>
                  <FormLabel>View Income</FormLabel>
                  <Switch
                    isChecked={viewIncomeConfig}
                    onChange={handleViewIncomeSwitch}
                    isDisabled={viewExpenseConfig}
                  />
                </>
              )}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Filter Records
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
