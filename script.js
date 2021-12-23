//https://random-words-api.vercel.app/word

const startBtn = document.querySelector('.start-btn');
const textarea = document.querySelector('textarea');
const wordCont = document.querySelector('.word-container .container');

const api = 'https://random-words-api.vercel.app/word';

startBtn.addEventListener('click', async () => {
  
  wordCont.innerHTML = '';
  
  const input = document.createElement('input');
  const btn = document.createElement('input');
  input.setAttribute('type', 'number');
  input.setAttribute('placeholder', 'Enter Total Words...');
  input.classList.add('input-total');
  btn.classList.add('btn-total');
  btn.type = 'button';
  btn.value = 'Oke!';
  btn.style.display = 'block';
  
  startBtn.remove();
  wordCont.appendChild(input);
  wordCont.appendChild(btn);
  
  btn.addEventListener('click', async () => {
    
    
    
    if(input.value !== ''){
      if(parseInt(input.value) !== NaN){
        const values = parseInt(input.value);
        wordCont.innerHTML = '<b>Loading...</b>'
        const readyWords = await onStart(values);
        wordCont.innerHTML = readyWords;
        
        let seconds = 0;
        let index = 0;
        
        
        let checking = setInterval(() => {
          
          if(readyWords[index] !== textarea.value[index]){
            textarea.parentElement.parentElement.style.borderColor = 'rgb(242,129,129)';
          }else{
            textarea.parentElement.parentElement.style.borderColor = 'black';
          }
          
          if(readyWords == textarea.value){
            wordCont.innerHTML = `Finished in ${seconds} Seconds!`;
            startBtn.textContent = 'Again!';
            wordCont.appendChild(startBtn);
            clearInterval(checking);
            clearInterval(everySecond);
          }
          
          index += 1;
          
        }, 100);
        
        let everySecond = setInterval(() => {
          seconds += 1;
        }, 1000);
        
        
        
      }
    }
    
  });
  
  /*
  let countdown = 6;
  const words = await onStart(5);
  setInterval(() => {
    countdown -= 1;
    if(countdown > 0){
    wordCont.innerHTML = countdown;
    }else{
      wordCont.innerHTML = words;
    }
  }, 1000);
  */
  
});

function getData(url){
  return fetch(url)
  .then(res => res.json())
  .then(data => data)
  .catch(err => err);
}

async function getWord(){
  
  const data = await getData(api);
  return data[0].word;
  
}

async function onStart(times){
  
  let words = [];
  
  for(let i = 0; i < times; i++){
  const word = await getWord();
  words.push(word.toLowerCase());
  //console.log(word);
  }
  return words.join(' ');
  
}