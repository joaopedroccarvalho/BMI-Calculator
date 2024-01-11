import { useEffect, useState } from 'react';
import styles from './App.module.css';
import powerImage from './assets/powered-copy.png';
import leftArrowImage from './assets/leftarrow.png';
import {GridItem} from './components/GridItem/GridItem';
import darkTheme from './assets/temaescuro3.jpg';
import lightTheme from './assets/temaclaro3.jpg';

import {levels, calculateImc, Level} from './helpers/imc';


const App = () => {
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null)
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [bodyBackgroundColor, setBodyBackgroundColor] = useState('#fff');


  const handleCalculateButton = () => {
    if(heightField && weightField) {
      setToShow(calculateImc(heightField, weightField));
    } else {
      alert('Digite todos os campos.')
    }
  }

  const handleBackButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }
  

  const handleThemeToggle = () => {
    setIsDarkTheme(!isDarkTheme);
    
  };
  useEffect(() => {
    // Atualiza o estado do backgroundColor do body com base no estado isDarkTheme
    setBodyBackgroundColor(isDarkTheme ? '#000' : '#fff');
  }, [isDarkTheme]);

  return (
    <body 
      className={isDarkTheme ? 'dark-theme' : 'light-theme'}
      style={{
      backgroundColor: bodyBackgroundColor,
      padding: '70px' 
    }}>
      <div className={styles.main}>
        <header>
          <div className={styles.headerContainerWrapper}>
            <div className={styles.headerContainer}>
              <img 
                className={styles.headerContainerImg} 
                src={powerImage} 
                alt="Logo IMC" 
                width={50}
              />
              <p style={{ color: isDarkTheme ? '#fff' : '#6a7d8b' }}>Create by
              <a style={{ color: isDarkTheme ? '#fff' : '#6a7d8b' }} href="https://github.com/joaopedroccarvalho"> João Pedro</a></p>
            </div>
          <div className={styles.headerContainerImg}>
              <img
                title={isDarkTheme ? 'Modo Escuro' : 'Modo Claro'}
                onClick={handleThemeToggle}
                src={isDarkTheme ? darkTheme : lightTheme}
                alt="Tema"
                width={30}
              />
            </div>
          </div>
        </header>

        <div className={styles.container}>
          <div className={styles.leftSide}>
            <h1 style={{color: isDarkTheme ? '#fff' : '#3a4b5c' }}>Calcule o seu IMC</h1>
            <p style={{ color: isDarkTheme ? '#fff' : '#6a7d8b' }}>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial da Saúde para calcular o peso ideal de cada pessoa.</p>

            <input 
              type="number" 
              placeholder='Digite a sua altura. Ex: 1.5 (em metros)'
              value={heightField > 0 ? heightField: ''}
              onChange={e => setHeightField(parseFloat(e.target.value))}
              disabled={toShow ? true : false}
              style={{ 
                backgroundColor: isDarkTheme ? '#000' : '#fff',
                color: isDarkTheme ? '#fff' : '#000' }}
            />
            <input 
              type="number" 
              placeholder='Digite o seu peso. Ex: 75.3 (em kg)'
              value={weightField > 0 ? weightField : ''}
              onChange={e => setWeightField(parseFloat(e.target.value))}
              disabled={toShow ? true : false}
              style={{ 
                backgroundColor: isDarkTheme ? '#000' : '#fff',
                color: isDarkTheme ? '#fff' : '#000'
              }}
            />
            <button 
              onClick={handleCalculateButton} 
              disabled={toShow ? true : false}>
              Calcular
            </button>
          </div>
          <div className={styles.rightSide}>
            {!toShow && 
              <div className={styles.grid}>
                {levels.map((item, key)=>(
                  <GridItem key={key} item={item}/>
                ))}
              </div>
            }
            {toShow &&
              <div className={styles.rightBig}>
                <div className={styles.rightArrow} onClick={handleBackButton}>
                  <img src={leftArrowImage} alt='' width={25}/>
                </div>
                <GridItem item={toShow}/>
              </div>
            }
          </div>
        </div>
      </div>
    </body>
  )
}


export default App;