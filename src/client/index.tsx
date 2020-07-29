import dayjs from 'dayjs'
import React from 'react'
import { render } from 'react-dom'
import 'dayjs/locale/ru'
import '!style-loader!css-loader!@atlaskit/css-reset/dist/bundle.css'

import { App } from './App'

dayjs.locale('ru')

render(<App />, document.getElementById('root'))
