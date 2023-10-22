import { Box, Tooltip } from "@mui/material";

type TooltipDatagridCellProps = {
  displayValue: string;
};

const TooltipDatagridCell: React.FC<TooltipDatagridCellProps> = ({
  displayValue,
}) => {
  return (
    <Tooltip title={displayValue}>
      <Box
        sx={{
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {displayValue}
      </Box>
    </Tooltip>
  );
};

export default TooltipDatagridCell;
