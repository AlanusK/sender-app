import StellarSdk, {
  BASE_FEE,
  Networks,
  Operation,
  TransactionBuilder,
} from "stellar-sdk";

interface StellarUtilsProps {
  WalletDetails(publicKey: string): Promise<any>;
  getStellarPublicKey(secretKey: string): Promise<string>;
  establishDefaultTrustlines(secretKey: string): Promise<any>;
}

const horizonUrl =
  process.env.REACT_APP_API_NODE_ENV !== "production"
    ? "https://horizon.stellar.org"
    : "https://horizon-testnet.stellar.org";

const network_passphrase =
  process.env.REACT_APP_API_NODE_ENV !== "production" ? Networks.PUBLIC : Networks.TESTNET;

const createStellarHorizonServer = () => {
  return new StellarSdk.Server(horizonUrl);
};

const getKeypair = (secretKey: string) => {
  return StellarSdk.Keypair.fromSecret(secretKey);
};

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

  getStellarPublicKey: async (secretKey: string) => {
    const keypPair = await getKeypair(secretKey);
    return keypPair.publicKey();
  },

  establishDefaultTrustlines: async (secretKey: string) => {
    const customerWalletKeyPair = await getKeypair(secretKey);
    const customerWalletPublicKey = await StellarUtils.getStellarPublicKey(
      secretKey
    );
    const TZSAsset = new StellarSdk.Asset(
      "TZS",
      process.env.REACT_APP_ISSUING_ACCOUNT_PUBLIC_KEY
    );
    const KESAsset = new StellarSdk.Asset(
      "KES",
      process.env.REACT_APP_ISSUING_ACCOUNT_PUBLIC_KEY
    );
    const account = await createStellarHorizonServer().loadAccount(
      customerWalletPublicKey
    );
    const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: network_passphrase,
    })
      .addOperation(
        Operation.changeTrust({
          asset: TZSAsset,
        })
      )
      .addOperation(
        Operation.changeTrust({
          asset: KESAsset,
        })
      )
      .setTimeout(0)
      .build();
    try {
      transaction.sign(customerWalletKeyPair);
      const result = await createStellarHorizonServer().submitTransaction(
        transaction
      );
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
