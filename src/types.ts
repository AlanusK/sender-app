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
   secret_key: string,
   address: string,
   currency: string,
   userId: string
   public_key: string
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
   id: string
}

export type StellarWalletBalanceProps = {
   balance: "";
   asset_type: string;
   asset_code: string;
   asset_issuer: string
}