import StellarSdk from "stellar-sdk";

interface StellarUtilsProps {
  WalletDetails(publicKey: string): Promise<any>;
}

const horizonUrl =
  process.env.NODE_ENV === "production"
    ? "https://horizon.stellar.org"
    : "https://horizon-testnet.stellar.org";

export const StellarUtils: StellarUtilsProps = {
  WalletDetails: (publicKey) => {
    return new Promise(async (resolve) => {
      const account = await new StellarSdk.Server(horizonUrl)
        .accounts()
        .accountId(publicKey)
        .call();
      resolve(account);
    });
  },
};
