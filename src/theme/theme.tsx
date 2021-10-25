import { createTheme } from '@material-ui/core/styles'
import { Global, css } from '@emotion/react'

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    default: Palette['primary']
  }
  interface PaletteOptions {
    default: PaletteOptions['primary']
  }
}

const GlobalStyles = () => (
  <Global
    styles={css`
      * {
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
        outline: none;
        box-sizing: border-box;
      }
      body {
        background-color: #e9e9e9;
      }
      a {
        text-decoration: none;
      }
      .scale {
        transition: all 0.5s ease;
      }
      .scale:hover {
        transform: scale(1.1);
        -webkit-box-shadow: 2px 4px 15px -4px rgba(0, 0, 0, 0.86);
        box-shadow: 2px 4px 15px -4px rgba(0, 0, 0, 0.86);
      }
      .animation-slidedown {
        animation: slideDown 1s ease;
      }
      .box:before {
        content: 'carregando imagem...';
        position: absolute;
        top: 50%;
        left: 25%;
        z-index: -1;
      }
      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `}
  />
)

const theme = createTheme({
  palette: {
    primary: {
      main: '#fff159',
    },
    secondary: {
      main: '#3483fa',
    },
    default: {
      main: '#333',
    },
  },
})

export { theme, GlobalStyles }
