import React, { useState, Fragment } from 'react';

import Drawer from '@atlaskit/drawer';
import { Search } from '@atlaskit/atlassian-navigation';
import { QuickSearch, ResultItemGroup, ObjectResult } from '@atlaskit/quick-search';
import styled from 'styled-components';

const Result = styled.div`
  padding-left: 8px;
`;

export const SearchDrawer = () => {
  const [isOpen, setOpen] = useState(false);

  const onClick = () => {
    setOpen(!isOpen);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Search onClick={onClick} label="Поиск" placeholder="Поиск" tooltip={() => <div />} />
      <Drawer isOpen={isOpen} onClose={onClose} width="wide">
        <QuickSearch isLoading={false} placeholder="Поиск">
          <Result>
            <ResultItemGroup title="Категории">
              <ObjectResult resultId="c-1" name="Шпатлевка" />
              <ObjectResult resultId="c-2" name="Краска" />
            </ResultItemGroup>
            <ResultItemGroup title="Шпатлевка">
              <ObjectResult
                resultId="p-1"
                name="Шпатлевка ilmax 6440"
                containerName="финишная, полимерная основа, слой: 3 мм"
              />
              <ObjectResult
                resultId="p-2"
                name="Шпатлевка Ceresit CT 126. Гипсовая шпатлевка «старт-финиш»"
                containerName="финишная, гипсовая основа, слой: 10 мм"
              />
              <ObjectResult
                resultId="p-3"
                name="Шпатлевка Sniezka Acryl-Putz Start (Польша, 20 кг)"
                containerName="выравнивающая/финишная, гипсовая основа, слой: 30 мм"
              />
            </ResultItemGroup>
          </Result>
        </QuickSearch>
      </Drawer>
    </Fragment>
  );
};
