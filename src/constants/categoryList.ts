import {
  FcInTransit,
  FcPhoneAndroid,
  FcReading,
  FcHome,
  FcLandscape,
  FcNightPortrait,
  FcPaid,
  FcLinux,
} from "react-icons/fc";

import {
  GiCardAceSpades,
  GiHamburgerMenu,
  GiMoneyStack,
  GiPiggyBank,
  GiReceiveMoney,
  GiTakeMyMoney,
} from "react-icons/gi";

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
    icon: GiCardAceSpades,
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
    icon: FcHome,
  },
  {
    name: "Restaurants",
    icon: FcLinux,
  },
  {
    name: "Groceries",
    icon: FcPaid,
  },
  {
    name: "Shopping",
    icon: FcLinux,
  },
  {
    name: "Insurance",
    icon: FcLinux,
  },
  {
    name: "Transportation",
    icon: FcInTransit,
  },
  {
    name: "Education",
    icon: FcReading,
  },
  {
    name: "Leisure",
    icon: FcLandscape,
  },
  {
    name: "Telecommunications",
    icon: FcPhoneAndroid,
  },
  {
    name: "Tax",
    icon: FcLinux,
  },
  {
    name: "Health & Beauty",
    icon: FcNightPortrait,
  },
];
