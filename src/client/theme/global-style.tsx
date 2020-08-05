import { injectGlobal } from 'styled-components'

injectGlobal`
  .truncate {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`
