import axios from "axios";
import StellarSdk, {
  BASE_FEE,
  Networks,
  Operation,
  Transaction,
  TransactionBuilder,
} from "stellar-sdk";

interface StellarUtilsProps {
  WalletDetails(publicKey: string): Promise<any>;
  getStellarPublicKey(secretKey: string): Promise<string>;
  getKeypair(secretKey: string): Promise<any>;
  establishDefaultTrustlines(secretKey: string): Promise<any>;
  validateStellarWalletSecretKey(secretKey: string): Promise<boolean>;
  getSEP10AuthToken(keyPair: string): Promise<any>;
  createStellarDepositTransaction(
    authToken: any,
    receivingAddress: any,
    asset: any
  ): Promise<any>;
}

const horizonUrl =
  process.env.REACT_APP_API_NODE_ENV === "production"
    ? "https://horizon.stellar.org"
    : "https://horizon-testnet.stellar.org";

const network_passphrase =
  process.env.REACT_APP_API_NODE_ENV === "production"
    ? Networks.PUBLIC
    : Networks.TESTNET;

const createStellarHorizonServer = () => {
  return new StellarSdk.Server(horizonUrl);
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
  getKeypair: (secretKey: string) => {
    return StellarSdk.Keypair.fromSecret(secretKey);
  },
  getStellarPublicKey: async (secretKey: string) => {
    const keypPair = await StellarUtils.getKeypair(secretKey);
    return keypPair.publicKey();
  },

  establishDefaultTrustlines: async (secretKey: string) => {
    const customerWalletKeyPair = await StellarUtils.getKeypair(secretKey);
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
  validateStellarWalletSecretKey: (secretKey: string) => {
    if (!secretKey.startsWith("S")) {
      return Promise.resolve(false);
    }
    if (secretKey.length !== 56) {
      return Promise.resolve(false);
    }
    return Promise.resolve(true);
  },
  getSEP10AuthToken: async (userKeypair: any) => {
    try {
      const challengeResponse = await axios.get(
        `${
          process.env.REACT_APP_STELLAR_SERVER_URL
        }/auth?account=${userKeypair.publicKey()}`
      );
      const transaction: any = new Transaction(
        challengeResponse.data.transaction,
        challengeResponse.data.network_passphrase
      );
      transaction.sign(userKeypair);
      const tokenResponse = await axios.post(
        `${process.env.REACT_APP_STELLAR_SERVER_URL}/auth`,
        { transaction: transaction.toXDR() }
      );
      return Promise.resolve(tokenResponse.data.token);
    } catch (error) {
      console.log("error :>> ", error);
    }
  },
  createStellarDepositTransaction: async (
    authToken,
    receivingAddress,
    asset
  ) => {
    const formData = new FormData();
    const postDepositParams: any = {
      asset_code: asset,
      account: receivingAddress,
      lang: "en",
      claimable_balance_supported: true,
    };
    Object.keys(postDepositParams).forEach((key) => {
      formData.append(key, postDepositParams[key]);
    });
    const interactiveResponse = await axios.post(
      `${process.env.REACT_APP_STELLAR_SERVER_URL}/transactions/deposit/interactive`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return interactiveResponse.data.id;
  },
};
