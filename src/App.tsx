import Router from "./Router";
import { createGlobalStyle } from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools"; /* query 확인 (캐싱된 date) */
import { ThemeProvider } from "styled-components";
import { lightTheme,darkTheme } from "./theme";
import {useRecoilValue} from "recoil";
import { isDarkAtom } from "./atoms";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  * {
    box-sizing:border-box;
  }
  body {
    font-family : 'Noto Sans', sans-serif;
    background:${(props) => props.theme.bgColor};
    color:${(props) => props.theme.textColor};
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  ul {
    list-style:none;
  }
`;

function App() {

  // useRecoilValue(state) : Recoil state값 반환 (value 감지)
  // 업데이트 될 때 리렌더링
  const isDark = useRecoilValue(isDarkAtom)
  return (
    <>
      <ThemeProvider theme ={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}

export default App;
