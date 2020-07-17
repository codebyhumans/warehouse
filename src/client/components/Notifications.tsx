import React, { useContext, createContext, useState } from 'react';
import styled from 'styled-components';
import Flag, { FlagProps } from '@atlaskit/flag';

const FlagGroup = styled.div`
  position: fixed;
  bottom: 30px;
  left: 30px;
  z-index: 600;

  > * {
    margin-bottom: 1em;
  }
`;

interface INotificationsContext {
  addFlag: (args: FlagProps) => void;
  dismissFlag: () => void;
}

let notificationContext: React.Context<INotificationsContext>;

export const useNotifications = (): INotificationsContext => useContext(notificationContext);

export const Notifications: React.FC = () => {
  const [flags, setFlags] = useState<FlagProps[]>([]);

  const addFlag = (args: FlagProps) => {
    setFlags([args, ...flags]);
  };

  const dismissFlag = () => {
    setFlags(flags.slice(1));
  };

  notificationContext = createContext<INotificationsContext>({
    addFlag,
    dismissFlag,
  });

  return (
    <FlagGroup>
      {flags.map((flagProps) => (
        <Flag key={flagProps.id} {...flagProps} />
      ))}
    </FlagGroup>
  );
};
