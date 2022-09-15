import { BsBank2, BsSafe2Fill } from "react-icons/bs";
import { FaHouseUser } from "react-icons/fa";
import {
  GiHamburgerMenu,
  GiMoneyStack,
  GiPiggyBank,
  GiReceiveMoney,
  GiRollingDices,
  GiTakeMyMoney,
} from "react-icons/gi";
import { IoFitnessSharp, IoRestaurantSharp } from "react-icons/io5";
import {
  MdHealthAndSafety,
  MdOutlinePhonelinkRing,
  MdSchool,
  MdShoppingBag,
  MdShoppingCart,
  MdTrain,
} from "react-icons/md";
import { TbBeach } from "react-icons/tb";

export const incomeCategories = [
  {
    name: "Wages",
    icon: GiMoneyStack,
  },
  {
    name: "Sales",
    icon: GiTakeMyMoney,
  },
  {
    name: "Passive Income",
    icon: GiReceiveMoney,
  },
  {
    name: "Gambling",
    icon: GiRollingDices,
  },
  {
    name: "Dividends",
    icon: GiPiggyBank,
  },
  { name: "Misc. Income", icon: GiHamburgerMenu },
];
export const expenseCategories = [
  {
    name: "Housing",
    icon: FaHouseUser,
  },
  {
    name: "Restaurants",
    icon: IoRestaurantSharp,
  },
  {
    name: "Groceries",
    icon: MdShoppingCart,
  },
  {
    name: "Shopping",
    icon: MdShoppingBag,
  },
  {
    name: "Insurance",
    icon: MdHealthAndSafety,
  },
  {
    name: "Transportation",
    icon: MdTrain,
  },
  {
    name: "Education",
    icon: MdSchool,
  },
  {
    name: "Leisure",
    icon: TbBeach,
  },
  {
    name: "Telecommunications",
    icon: MdOutlinePhonelinkRing,
  },
  {
    name: "Tax",
    icon: BsBank2,
  },
  {
    name: "Health & Beauty",
    icon: IoFitnessSharp,
  },
  { name: "Misc. Expense", icon: GiHamburgerMenu },
];

export const inaccessibleCategories = [
  { name: "Init. Account", icon: BsSafe2Fill },
];
