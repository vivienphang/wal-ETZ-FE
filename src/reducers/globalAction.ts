import axios, { AxiosResponse } from "axios";
import {
  singularAccountInterface,
  accountRecordsInterface,
} from "../types/accountReducerInterface";
import { globalActionInterface } from "../types/globalActionInterface";
import ACTIONS from "./actions";

axios.defaults.withCredentials = true;

const status = {
  POPULATE_FAIL: "failed to populate user data",
  POPULATE_SUCCESS: "populated user data",
};

export async function getData(token: string) {
  let userData: AxiosResponse | null = null;
  try {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    userData = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/users/populateRecords`,
      config
    );
  } catch (err) {
    console.log("can't get user data by axios");
    return "error";
  }

  let globalAction: globalActionInterface;
  if (userData?.data.status !== status.POPULATE_SUCCESS) {
    globalAction = {
      userAction: { type: ACTIONS.ERROR },
      accountAction: { type: ACTIONS.ERROR },
      exchangeRateAction: { type: ACTIONS.ERROR },
    };
  } else {
    const { _id, defaultCurrency, email, username, accounts, profilePicture } =
      userData.data.data.user;
    const accountsArray: singularAccountInterface[] = [];
    accounts.forEach((account: singularAccountInterface) => {
      const recordsArray: accountRecordsInterface[] = [];
      if (account.accRecords) {
        account.accRecords.forEach((record: accountRecordsInterface) => {
          recordsArray.push(record);
        });
      }
      const { _id: accId, accCurrency, accName } = account;
      accountsArray.push({
        _id: accId,
        accCurrency,
        accRecords: recordsArray,
        accName,
      });
    });
    const { AUD, CNY, HKD, IDR, JPY, MYR, SGD, THB, TWD, USD, VND } =
      userData.data.data.exchangeRate;
    globalAction = {
      userAction: {
        type: ACTIONS.RETRIEVE,
        payload: {
          _id,
          defaultCurrency,
          email,
          username,
          profilePicture,
        },
      },
      accountAction: {
        type: ACTIONS.RETRIEVE,
        payload: accountsArray,
      },
      exchangeRateAction: {
        type: ACTIONS.RETRIEVE,
        payload: {
          AUD: Number(AUD),
          CNY: Number(CNY),
          HKD: Number(HKD),
          IDR: Number(IDR),
          JPY: Number(JPY),
          MYR: Number(MYR),
          SGD: Number(SGD),
          THB: Number(THB),
          TWD: Number(TWD),
          USD: Number(USD),
          VND: Number(VND),
        },
      },
    };
  }

  return globalAction;
}

export async function updateProfile(
  username: string,
  currency: string,
  token: string
) {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const updateData = {
    username,
    currency,
  };
  let updateUserProfile: AxiosResponse;
  try {
    updateUserProfile = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/users/updateProfile/`,
      updateData,
      config
    );
  } catch (err) {
    console.log(err);
    return {
      userAction: { type: ACTIONS.ERROR },
      exchangeRateAction: { type: ACTIONS.ERROR },
    };
  }

  return {
    userAction: {
      type: ACTIONS.SET,
      payload: updateUserProfile.data.data.user,
    },
    exchangeRateAction: {
      type: ACTIONS.SET,
      payload: updateUserProfile.data.data.exchangeRate,
    },
  };
}
export async function updateCurrency(currency: string, token: string) {
  console.log("running update currency");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const updateCurrency = { currency };
  let newCurrency: AxiosResponse;
  try {
    newCurrency = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/users/updateCurrencyOnly)`,
      updateCurrency,
      config
    );
    console.log("newCurrency:", newCurrency);
  } catch (err) {
    return {
      userAction: { type: ACTIONS.ERROR },
      exchangeRateAction: { type: ACTIONS.ERROR },
    };
  }
  return {
    userAction: {
      type: ACTIONS.SET,
      payload: newCurrency.data.data.user,
    },
    exchangeRateAction: {
      type: ACTIONS.SET,
      payload: newCurrency.data.data.exchangeRate,
    },
  };
}
