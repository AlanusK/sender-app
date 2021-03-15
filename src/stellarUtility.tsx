import axios from "axios";
import StellarSdk, {
  Account,
  Asset,
  BASE_FEE,
  Memo,
  MemoHash,
  MemoID,
  MemoText,
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
  createSEP24Transaction(
    authToken: any,
    receivingAddress: any,
    asset: any,
    transactionType: "deposit" | "withdraw"
  ): Promise<any>;
  retrieveSEP24Transaction(
    authToken: string,
    transactionId: string
  ): Promise<any>;
  initiateAssetTransfer(
    userKeyPair: any,
    userAuth: string,
    pendingSEP24Transaction: any,
    asset: string
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

const horizonServer = () => {
  return new StellarSdk.Server(horizonUrl);
};

const getMemo = (memoString: string, memoType: string): any => {
  let memo;
  if (memoType === "hash") {
    memo = new Memo(
      MemoHash,
      Buffer.from(memoString, "base64").toString("hex")
    );
  } else if (memoType === "id") {
    memo = new Memo(MemoID, memoString);
  } else if (memoType === "text") {
    memo = new Memo(MemoText, memoString);
  } else {
    Promise.reject(`Invalid memo_type: ${memoString} (${memoType})`);
  }
  return Promise.resolve(memo);
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
    const account = await horizonServer().loadAccount(customerWalletPublicKey);
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
      const result = await horizonServer().submitTransaction(transaction);
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
  createSEP24Transaction: async (
    authToken,
    receivingAddress,
    asset,
    transactionType
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
      `${process.env.REACT_APP_STELLAR_SERVER_URL}/transactions/${transactionType}/interactive`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return interactiveResponse.data.id;
  },
  retrieveSEP24Transaction: async (authToken, transactionId) => {
    const transactionResponse = await axios.get(
      `${process.env.REACT_APP_STELLAR_SERVER_URL}/transaction?id=${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return transactionResponse.data;
  },
  initiateAssetTransfer: async (
    userKeyPair,
    userAuth,
    pendingSEP24Transaction,
    asset
  ) => {
    let memo = await getMemo(
      pendingSEP24Transaction.withdraw_memo,
      pendingSEP24Transaction.withdraw_memo_type
    );

    const { sequence } = await horizonServer()
      .accounts()
      .accountId(userKeyPair.publicKey())
      .call();
    const account = new Account(userKeyPair.publicKey(), sequence);
    const txn = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: network_passphrase,
    })
      .addOperation(
        Operation.payment({
          destination: pendingSEP24Transaction.withdraw_anchor_account,
          asset: new Asset(
            asset,
            process.env.REACT_APP_ISSUING_ACCOUNT_PUBLIC_KEY
          ),
          amount: pendingSEP24Transaction.amount_in,
        })
      )
      .addMemo(memo)
      .setTimeout(0)
      .build();

    txn.sign(userKeyPair);
    return await horizonServer().submitTransaction(txn);
  },
};
