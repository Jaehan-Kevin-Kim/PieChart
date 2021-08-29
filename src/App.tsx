
import './App.css';
import PieChart from './PieChart';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import GitHubIcon from '@material-ui/icons/GitHub';
import { css } from "@emotion/css";

function App() {

  return (
    <div className="App">
      <header className={css`
      background-color:#111111;
         display: flex;
         flex-direction: column;
         justify-content: center;
         align-items: center;
         height: 8em;
         font-algin:center;
      `} >
            <a href="mailto:kevin.kim9685@gmail.com" className={css`
            color:white;
              font-weight: bolder;
              transition: opacity 0.2s ease;
            margin-bottom: 1em;`}>Kevin.kim9685@gmail.com</a>
            <ul className={css`padding:0; display:flex; list-style:none;`}>
                <li className="social-site__item"><a className={css`color: white; width: 1.1rem ;padding: 0 1rem; pointer:cursor;`} href="https://kevin-kim.netlify.app/"><HomeOutlinedIcon /></a>
                            </li>
                <li className="social-site__item"><a className={css`color: white; font-size: 0.8rem ;padding: 0 1rem; pointer:cursor;`} href="https://github.com/Jaehan-Kevin-Kim"><GitHubIcon /></a>
                            </li>
                            </ul>
        </header>
      <PieChart />
    </div>
  );
}

export default App;
