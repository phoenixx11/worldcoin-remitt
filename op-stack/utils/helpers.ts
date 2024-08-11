import { ethers } from 'ethers';

export const formatBigNumber = (value: ethers.BigNumber, decimals: number = 18): string => {
  return ethers.utils.formatUnits(value, decimals);
};
