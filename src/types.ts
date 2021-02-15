export type userWalletsBalanceProps = {
   amount: number
   currency: "TZS" | "USD" | "GBP" | "KES" | "RWF";
}

export type bankDetails = {
   currency: string,
   bankName: string,
   branchName: string
   accountName: string,
   accountNumber: number,
   bankCode: string,
   swiftNumber: string,
}