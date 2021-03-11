import axios from "axios";

export const GetUserDepositsTransactions = async (
  customerId: string,
  status?: string
) => {
  try {
    let res = await axios.get(
      `${process.env.REACT_APP_API_URL}/deposit-request?customer_id=${customerId}`
    );
    if (status) {
      return res.data.filter((deposit: any) => deposit.status === status) || [];
    }
    return res.data || [];
  } catch (error) {
    console.log("error :>> ", error);
  }
};
