import { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { formatEther } from "viem";
import Rate from "../Rate/Rate";
import MainButton from "../MainButton/MainButton";
import ButtonLoader from "../ButtonLoader/ButtonLoader";
import MessageModal from "../MessageModal/MessageModal";
import TextMessageModall from "../TextMessageModal/TextMessageModal";
import MessageIcon from "../MessageIcon/MessageIcon";
import { claimReward, waitForOperation } from "../../../helpers/operations";
import { reduceDecimals } from "../../../helpers/utils";
import { useEarned } from "../../../hooks/Abi";
import { Oval } from "react-loader-spinner";
import { InitialValueType } from "../../../types";

import errorCross from "../../../images/errorCross.svg";
import successCheck from "../../../images/successCheck.svg";

const initialValues: InitialValueType = {
  amount: "",
};

const ClaimRewardForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | undefined>(
    undefined
  );
  const [isGettingReward, setIsGettingReward] = useState(false);
  const earned = useEarned();

  const handleSubmit = async (
    _values: InitialValueType,
    { resetForm, setSubmitting }: FormikHelpers<InitialValueType>
  ) => {
    setStatus(undefined);
    setIsLoading(true);
    setSubmitting(true);

    const claimRewardsHash = await claimReward();
    if (!claimRewardsHash) {
      setIsLoading(false);
      setStatus("error");
      return;
    }
    setIsGettingReward(true);
    const isSuccess = await waitForOperation(claimRewardsHash);
    if (!isSuccess) {
      setIsLoading(false);
      setIsGettingReward(false);
      setStatus("error");
      return;
    }
    setSubmitting(false);
    setIsLoading(false);
    setIsGettingReward(false);
    setStatus("success");
    resetForm();
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form autoComplete="off">
            <div className="form__rateWrap">
              <Rate
                label={"Available:"}
                rate={earned ? reduceDecimals(formatEther(earned), 2) : "0.00"}
                unit={"STRU"}
              />
            </div>
            <div className="form__buttonWrap">
              <MainButton
                children={
                  <ButtonLoader text={"Claim Rewards"} isLoading={isLoading} />
                }
                type="submit"
                disabled={isSubmitting || !earned || +formatEther(earned) === 0}
                globalClassName={"linkButton"}
                localClassName={"form__button"}
                additionalClassName={"form__buttonTextWrap"}
              />
            </div>
          </Form>
        )}
      </Formik>
      <MessageModal
        text={<TextMessageModall title={"Claiming"} text={"rewards"} />}
        children={
          <Oval
            height={32}
            width={32}
            color="#20FE51"
            wrapperStyle={{ marginRight: "8px" }}
            wrapperClass={isGettingReward ? "visibleSpinner" : "hiddenSpinner"}
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#6E758B"
            strokeWidth={8}
            strokeWidthSecondary={8}
          />
        }
        isLoading={isGettingReward}
      />
      <MessageModal
        text={
          status === "success" ? (
            <TextMessageModall title={"Successfully"} text={"climed reward"} />
          ) : (
            <TextMessageModall
              title={"Connection Error."}
              text={"Please try again"}
            />
          )
        }
        children={
          status === "success" ? (
            <MessageIcon iconPath={successCheck} bgColor={"#20FE51"} />
          ) : (
            <MessageIcon iconPath={errorCross} bgColor={"#FE2D20"} />
          )
        }
        status={status}
      />
    </>
  );
};

export default ClaimRewardForm;