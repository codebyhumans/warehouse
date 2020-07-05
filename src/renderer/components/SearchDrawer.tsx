import React, { useState, Fragment } from 'react';

import Drawer from '@atlaskit/drawer';
import { Search } from '@atlaskit/atlassian-navigation';
import { QuickSearch, ResultItemGroup, ObjectResult } from '@atlaskit/quick-search';

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
          <div>
            <ResultItemGroup title="Шпатлевка">
              <ObjectResult
                resultId="1"
                name="Шпатлевка ilmax 6440"
                containerName="финишная, полимерная основа, слой: 3 мм"
              />
              <ObjectResult
                resultId="2"
                name="Шпатлевка Ceresit CT 126. Гипсовая шпатлевка «старт-финиш»"
                containerName="финишная, гипсовая основа, слой: 10 мм"
              />
              <ObjectResult
                resultId="3"
                name="Шпатлевка Sniezka Acryl-Putz Start (Польша, 20 кг)"
                containerName="выравнивающая/финишная, гипсовая основа, слой: 30 мм"
              />
            </ResultItemGroup>
          </div>
        </QuickSearch>
      </Drawer>
    </Fragment>
  );
};
