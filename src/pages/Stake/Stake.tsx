import { useState, useEffect, useMemo } from "react";
import { useAppContextValue } from "../../hooks/useContextValue";
import { useRewardRate } from "../../hooks/Abi";
import { calculateRewardRate } from "../../helpers/utils";
import { reduceDecimals } from "../../helpers/utils";
import NoWalletConnect from "../../components/UI/NoWalletConnect/NoWalletConnect";
import StakeForm from "../../components/UI/StakeForm/StakeForm";
import Title from "../../components/UI/Title/Title";
import Rate from "../../components/UI/Rate/Rate";
import ToolTipMes from "../../components/UI/ToolTipMes/ToolTipMes";

const Stake = () => {
  const rewardRate = useRewardRate();
  const context = useAppContextValue();
  const isConnected = context?.account?.isConnected;
  const {
    stakeBalance,
    periodFinish,
    totalSupply,
    inputValue: userInputValue,
  } = context;

  const [rate, setRate] = useState("0.00");

  useEffect(() => {
    if (
      totalSupply !== undefined &&
      stakeBalance !== undefined &&
      periodFinish !== undefined &&
      rewardRate !== undefined
    ) {
      const currentRate = calculateRewardRate(
        stakeBalance,
        periodFinish,
        rewardRate,
        totalSupply,
        userInputValue
      );
      setRate(currentRate);
    }
  }, [stakeBalance, periodFinish, rewardRate, totalSupply, userInputValue]);

  const reduceRate = useMemo(() => reduceDecimals(rate, 2), [rate]);

  return (
    <section className="container mainSection">
      {isConnected ? (
        <div className="mainSection__formWrap">
          <Title
            text={"Stake"}
            globalClassName={"title__h2"}
            titleTag={"h2"}
            localClassName={"appForm"}
            number={
              <Rate
                label={"Reward rate:"}
                rate={`${reduceRate}`}
                unit={"STRU/WEEK"}
                isTitle={true}
                tooltipId={"fullRewardRate"}
              />
            }
          />
          <StakeForm />
          <ToolTipMes
            id={"fullRewardRate"}
            position={"bottom"}
            content={`Full reward rate: ${rate} STRU`}
          />
        </div>
      ) : (
        <NoWalletConnect />
      )}
    </section>
  );
};

export default Stake;
