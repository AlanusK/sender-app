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


export type IUserData = {
   name: string,
   email: string,
   phone: string,
   language: string,
   stellar_address: string,
   secretKey: string,
   address: string,
   currency: string,
   userId: string
   publicKey: string
   userWallets: userWalletsBalanceProps[]
}

export type ExtendedJwtPayload = {
   iss?: string;
   sub?: string;
   aud?: string[] | string;
   exp?: number;
   nbf?: number;
   iat?: number;
   jti?: string;
   id: string;
   verified?: boolean;
   api_access?: boolean;
}

export type StellarWalletBalanceProps = {
   balance: number;
   asset_type: string;
   asset_code: string;
   asset_issuer: string
}

export type IWalletOperationProps = {
   kind: "SEND" | "DEPOSIT" | "WITHDRAWAL" | "";
   processingStatus: "idle" | "pending" | "success" | "error" | string;
   processingError: any,
   processingValue: any,
   amount: number;
   fee: number;
   referenceId: string;
   currency: string;
   receivingAccount: {
      channel: "BANK DEPOSIT" | "MOBILE TRANSFER" | "WALLET" | "BANK TRANSFER" | "MOBILE MONEY" | "WALLET TRANSFER" | "",
      channelProvider: any;
      accountName: any;
      accountNumber: any;
      swiftNumber: any;
      routingNumber?: string;
   };
   requireSecretKey: boolean
}


export type IPayoutMethodsProps = {
   type: string, name: string, value: string, key: string, currency?: string
}


export type IndividualTransactionsProps = {
   date: string;
   amount: string;
   status: string;
   meta: any,
   type: string
   key: string
}