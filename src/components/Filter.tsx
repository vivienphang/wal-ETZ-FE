import { DateTime } from "luxon";
import React, { useState } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
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
  Select,
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

  const handleQuickSelect: React.ChangeEventHandler<HTMLSelectElement> = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDateRange = e.target.value;
    const currentDate = DateTime.now();
    switch (selectedDateRange) {
      case "currentWeek":
        setDateConfig({
          startDate: currentDate.startOf("week").toISODate(),
          endDate: currentDate.endOf("week").toISODate(),
        });
        break;
      case "lastWeek":
        setDateConfig({
          startDate: currentDate.minus({ week: 1 }).startOf("week").toISODate(),
          endDate: currentDate.minus({ week: 1 }).endOf("week").toISODate(),
        });
        break;
      case "currentMonth":
        setDateConfig({
          startDate: currentDate.startOf("month").toISODate(),
          endDate: currentDate.endOf("month").toISODate(),
        });
        break;
      case "lastMonth":
        setDateConfig({
          startDate: currentDate
            .minus({ month: 1 })
            .startOf("month")
            .toISODate(),
          endDate: currentDate.minus({ month: 1 }).endOf("month").toISODate(),
        });
        break;
      case "currentYear":
        setDateConfig({
          startDate: currentDate.startOf("year").toISODate(),
          endDate: currentDate.endOf("year").toISODate(),
        });
        break;
      case "lastYear":
        setDateConfig({
          startDate: currentDate.minus({ year: 1 }).startOf("year").toISODate(),
          endDate: currentDate.minus({ year: 1 }).endOf("year").toISODate(),
        });
        break;
      default:
        break;
    }
  };

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
              <Center>
                <FormLabel>Quick Date Select</FormLabel>
              </Center>
              <Select
                onChange={handleQuickSelect}
                placeholder="Quick Date Select"
              >
                <option value="currentWeek">This Week</option>
                <option value="lastWeek">Last Week</option>
                <option value="currentMonth">This Month</option>
                <option value="lastMonth">Last Month</option>
                <option value="currentYear">This Year</option>
                <option value="lastYear">Last Year</option>
              </Select>
              <Flex>
                <Box w="49%" my={5} mr={1}>
                  <Center>
                    <FormLabel>Start Date</FormLabel>
                  </Center>
                  <Input
                    placeholder="Select Start Date"
                    size="md"
                    type="date"
                    value={dateConfig.startDate}
                    onChange={handleStartDateChange}
                  />
                </Box>
                <Box w="49%" my={5} ml={1}>
                  <Center>
                    <FormLabel>End Date</FormLabel>
                  </Center>
                  <Input
                    placeholder="Select End Date"
                    size="md"
                    type="date"
                    value={dateConfig.endDate}
                    onChange={handleEndDateChange}
                  />
                </Box>
              </Flex>
              <Flex>
                {filters.viewExpense !== undefined && (
                  <Box w="50%" my={2}>
                    <Center>
                      <FormLabel>View Expense</FormLabel>
                      <br />
                      <Switch
                        isChecked={viewExpenseConfig}
                        onChange={handleViewExpenseSwitch}
                        isDisabled={viewIncomeConfig}
                      />
                    </Center>
                  </Box>
                )}
                {filters.viewIncome !== undefined && (
                  <Box w="50%" my={2}>
                    <Center>
                      <FormLabel>View Income</FormLabel>
                      <br />
                      <Switch
                        isChecked={viewIncomeConfig}
                        onChange={handleViewIncomeSwitch}
                        isDisabled={viewExpenseConfig}
                      />
                    </Center>
                  </Box>
                )}
              </Flex>
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
