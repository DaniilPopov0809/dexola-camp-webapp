import { useMainContextValue } from "../../../hooks/useContextValue";
import Notification from "../Notification/Notification";
import styles from "./NotificationThumb.module.scss";

const NotificationThumb = () => {
  const mainContext = useMainContextValue();
  const {
    isSendingToken,
    isApproving,
    endOperation,
    errorMesStake,
    errorMesReward,
    errorMesWithdraw,
    statusStake,
    statusReward,
    statusWithdraw,
    amountStru,
    isGettingWithdraw,
    isGettingReward,
  } = mainContext;

  return (
    <div className={styles.thumb}>
      <Notification
        title={!isSendingToken ? "Wait aproving..." : "Adding"}
        amount={!isSendingToken ? "" : `${amountStru} STRU`}
        text={!isSendingToken ? "" : "to Staking"}
        isVisible={isSendingToken || isApproving}
        titleStatus={
          endOperation === "stake" ? `${amountStru} STRU successfully` : "Successfully"
        }
        textStatus={
          endOperation === "stake"
            ? "added to Staking"
            : "approved"
        }
        errorMes={errorMesStake}
        status={statusStake}
      />
      <Notification
        title={"Withdrawing"}
        amount={amountStru ? `${amountStru} STRU` : "all STRU"}
        text={"without Stake"}
        isVisible={isGettingWithdraw}
        titleStatus={amountStru ? `${amountStru} STRU` : "All STRU"}
        textStatus={"successfully withdrawed"}
        errorMes={errorMesWithdraw}
        status={statusWithdraw}
      />

      <Notification
        title={"Claiming rewards"}
        text={"without Stake"}
        isVisible={isGettingReward}
        titleStatus={"Successfully"}
        textStatus={"climed reward"}
        errorMes={errorMesReward}
        status={statusReward}
      />
    </div>
  );
};

export default NotificationThumb;
