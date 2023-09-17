import { formatEther } from "viem";

const calculateRewards = (stru: bigint): number => {
  const struToNumber = Number(formatEther(stru));
  return parseFloat(struToNumber.toFixed(2));
};

export default calculateRewards;