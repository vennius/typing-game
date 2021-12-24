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
  
  let seconds = 0;
  
  btn.addEventListener('click', async () => {
    
    if(input.value !== ''){
    if(parseInt(input.value) !== NaN){
      
    const totalWord = parseInt(input.value);
    wordCont.innerHTML = '<b>Loading...</b>';
    
    const readyWords = await onStart(totalWord);
    
    wordCont.innerHTML = '<p>'+readyWords+'</p>';
    
    let checking = setInterval(() => {
      const textValue = textarea.value;
      //const textValue = [...textarea.value];
      //console.log(textValue);
      if(!readyWords.includes(textValue)){
        textarea.parentElement.style.borderColor = 'salmon';
      }else{
        textarea.parentElement.style.borderColor = 'black';
        
      }
      
      if(textValue == readyWords){
        const newP = document.createElement('p');
        const newBtn = startBtn;
        newBtn.textContent = 'Again?';
        newP.classList.add('finish-text');
        newP.textContent = `Finished in ${seconds} Seconds!`;
        wordCont.innerHTML = '';
        wordCont.appendChild(newP);
        wordCont.appendChild(newBtn);
        newBtn.addEventListener('click', () => {
          textarea.value = '';
        });
        clearInterval(counter);
        clearInterval(checking);
      }
      
    }, 500);
    
    const counter = setInterval(() => {
      seconds += 1;
    }, 1000);
    
  }
    }
  });
  
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