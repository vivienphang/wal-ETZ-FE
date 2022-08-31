import React from "react";
import { Box, Button } from "@chakra-ui/react";

export default function Calculator() {
  // Supporting functions
  const clear = () => {
    //clear
  };
  const display = () => {
    //display
  };
  return (
    <div>
      <Box className="calculator-grid">
        <Box className="output">
          <Box className="previous-operand">123,234*</Box>
          <Box className="current-operand" />
        </Box>
        <Button className="span-two">AC</Button>
        <Button>Del</Button>
        <Button>%</Button>
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
        <Button>*</Button>
        <Button>4</Button>
        <Button>5</Button>
        <Button>6</Button>
        <Button>+</Button>
        <Button>7</Button>
        <Button>8</Button>
        <Button>9</Button>
        <Button>-</Button>
        <Button>.</Button>
        <Button>0</Button>
        <Button className="span-two">=</Button>
      </Box>
    </div>
  );
}
