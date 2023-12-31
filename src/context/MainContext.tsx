import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

type MainContextType = {
  amountStru: string;
  setAmountStru: Dispatch<SetStateAction<string>>;

  visibleModalMesStake: boolean;
  setVisibleModalMesStake: Dispatch<SetStateAction<boolean>>;
  isLoadingStake: boolean;
  setIsLoadingStake: Dispatch<SetStateAction<boolean>>;
  isSendingToken: boolean;
  setIsSendingToken: Dispatch<SetStateAction<boolean>>;
  isApproving: boolean;
  setIsApproving: Dispatch<SetStateAction<boolean>>;
  endOperation: "stake" | "approve" | undefined;
  setEndOperation: Dispatch<SetStateAction<"stake" | "approve" | undefined>>;
  statusStake: "success" | "error" | undefined;
  setStatusStake: Dispatch<SetStateAction<"success" | "error" | undefined>>;
  errorMesStake: string;
  setErrorMesStake: Dispatch<SetStateAction<string>>;

  isLoadingReward: boolean;
  setIsLoadingReward: Dispatch<SetStateAction<boolean>>;
  isGettingReward: boolean;
  setIsGettingReward: Dispatch<SetStateAction<boolean>>;
  statusReward: "success" | "error" | undefined;
  setStatusReward: Dispatch<SetStateAction<"success" | "error" | undefined>>;
  visibleModalMesReward: boolean;
  setVisibleModalMesReward: Dispatch<SetStateAction<boolean>>;
  errorMesReward: string;
  setErrorMesReward: Dispatch<SetStateAction<string>>;

  isLoadingWithdraw: boolean;
  setIsLoadingWithdraw: Dispatch<SetStateAction<boolean>>;
  isLoadingWithdrawAll: boolean;
  setIsLoadingWithdrawAll: Dispatch<SetStateAction<boolean>>;
  isGettingWithdraw: boolean;
  setIsGettingWithdraw: Dispatch<SetStateAction<boolean>>;
  statusWithdraw: "success" | "error" | undefined;
  setStatusWithdraw: Dispatch<SetStateAction<"success" | "error" | undefined>>;
  visibleModalMesWithdraw: boolean;
  setVisibleModalMesWithdraw: Dispatch<SetStateAction<boolean>>;
  errorMesWithdraw: string;
  setErrorMesWithdraw: Dispatch<SetStateAction<string>>;
};

export const MainContext = createContext<MainContextType | undefined>(
  undefined
);

export const MainProvider = ({ children }: { children: ReactNode }) => {
  const [visibleModalMesStake, setVisibleModalMesStake] = useState(false);
  const [isLoadingStake, setIsLoadingStake] = useState(false);
  const [isSendingToken, setIsSendingToken] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [endOperation, setEndOperation] = useState<
    "stake" | "approve" | undefined
  >(undefined);
  const [errorMesStake, setErrorMesStake] = useState("");
  const [statusStake, setStatusStake] = useState<
    "success" | "error" | undefined
  >(undefined);
  const [amountStru, setAmountStru] = useState("");

  const [isLoadingReward, setIsLoadingReward] = useState(false);
  const [isGettingReward, setIsGettingReward] = useState(false);
  const [statusReward, setStatusReward] = useState<
    "success" | "error" | undefined
  >(undefined);
  const [visibleModalMesReward, setVisibleModalMesReward] = useState(false);
  const [errorMesReward, setErrorMesReward] = useState("");

  const [isLoadingWithdraw, setIsLoadingWithdraw] = useState(false);
  const [isLoadingWithdrawAll, setIsLoadingWithdrawAll] = useState(false);
  const [isGettingWithdraw, setIsGettingWithdraw] = useState(false);
  const [statusWithdraw, setStatusWithdraw] = useState<
    "success" | "error" | undefined
  >(undefined);
  const [visibleModalMesWithdraw, setVisibleModalMesWithdraw] = useState(false);
  const [errorMesWithdraw, setErrorMesWithdraw] = useState("");

  //timeout for notification
  useEffect(() => {
    setVisibleModalMesStake(false);
    setVisibleModalMesReward(false);
    setVisibleModalMesWithdraw(false);

    let timer: NodeJS.Timeout | undefined;

    if (statusStake === "success" || statusStake === "error") {
      setVisibleModalMesStake(true);
      timer = setTimeout(() => {
        setVisibleModalMesStake(false);
        setStatusStake(undefined);
      }, 5000);
    }

    if (statusReward === "success" || statusReward === "error") {
      setVisibleModalMesReward(true);
      timer = setTimeout(() => {
        setVisibleModalMesReward(false);
        setStatusReward(undefined);
      }, 5000);
    }

    if (statusWithdraw === "success" || statusWithdraw === "error") {
      setVisibleModalMesWithdraw(true);
      timer = setTimeout(() => {
        setVisibleModalMesWithdraw(false);
        setStatusWithdraw(undefined);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [statusStake, statusReward, statusWithdraw]);

  return (
    <MainContext.Provider
      value={{
        //common state
        amountStru,
        setAmountStru,

        //state for stake operation
        statusStake,
        setStatusStake,
        visibleModalMesStake,
        setVisibleModalMesStake,
        isLoadingStake,
        setIsLoadingStake,
        isSendingToken,
        setIsSendingToken,
        isApproving,
        setIsApproving,
        endOperation,
        setEndOperation,
        errorMesStake,
        setErrorMesStake,

        //state for claim reward operation
        isLoadingReward,
        setIsLoadingReward,
        isGettingReward,
        setIsGettingReward,
        statusReward,
        setStatusReward,
        visibleModalMesReward,
        setVisibleModalMesReward,
        errorMesReward,
        setErrorMesReward,

        //state for withdraw operation
        isLoadingWithdraw,
        setIsLoadingWithdraw,
        isLoadingWithdrawAll,
        setIsLoadingWithdrawAll,
        isGettingWithdraw,
        setIsGettingWithdraw,
        statusWithdraw,
        setStatusWithdraw,
        visibleModalMesWithdraw,
        setVisibleModalMesWithdraw,
        errorMesWithdraw,
        setErrorMesWithdraw,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
