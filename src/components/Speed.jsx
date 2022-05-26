import { useState } from 'react';
import { styled } from '@mui/material/styles';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import ComputerIcon from '@mui/icons-material/Computer';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'absolute',
  '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

const actions = [
  { icon: <AccountTreeTwoToneIcon />, name: 'RIN' },
  { icon: <LocationSearchingIcon />, name: 'Snypr' },
  { icon: <ComputerIcon />, name: 'Nxlogs' },
  // { icon: <PrecisionManufacturingIcon />, name: 'SOAR' },
];

export default function PlaygroundSpeedDial() {
  const [direction, setDirection] = useState('right');
  const [hidden, setHidden] = useState(false);

  return (
    <StyledSpeedDial
      sx={{ marginTop: '1%', marginLeft: '0.5%' }}
      ariaLabel='SpeedDial playground example'
      hidden={hidden}
      icon={<SpeedDialIcon />}
      direction={direction}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
        />
      ))}
    </StyledSpeedDial>
  );
}
