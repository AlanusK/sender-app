import axios from "axios";

export const GetUserWithdrawalTransactions = async (customerId: string, status?: string) => {
  try {
    let res = await axios.get(
      `${process.env.REACT_APP_API_URL}/payout?customer_id=${customerId}`
    );
    if(status){
      return (
        res.data.filter((withdrawal: any) => withdrawal.status === status) || []
      );
    }
    return res.data || [];
  } catch (error) {
    console.log("error :>> ", error);
  }
};
