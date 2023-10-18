import { IconButton, IconButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CustomTextField: React.FC = styled(
  IconButton
)(() => {
  return {
    color: colors.gray[800],
    backgroundColor: colors.green[300],
    "&:hover": {
      backgroundColor: colors.green[400]
    },
    "&:disabled": {
      color: colors.gray[800],
      backgroundColor: colors.gray[600]
    }
  };
});