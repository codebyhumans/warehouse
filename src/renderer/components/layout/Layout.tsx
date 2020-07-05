import React from 'react';
import styled from 'styled-components';

import { colors } from '../base/colors';

export const Layout: React.FC = (props) => (
  <div>
    <Bar>
      <ul>
        <li>Продукты</li>
        <li>Продукты 2</li>
        <li>Продукты 3</li>
        <li>Продукты 4</li>
      </ul>
    </Bar>
    <div>{props.children}</div>
  </div>
);

const Bar = styled.div`
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    position: fixed;
    width: 50px;
    height: 100%;
    overflow: auto;
    border-right: 1px solid ${colors.blue};
    transition: 0.5s;
    background: ${colors.grey};

    :hover {
      width: 200px;
    }
  }

  li a {
    display: block;
    padding: 8px 16px;
  }
`;
