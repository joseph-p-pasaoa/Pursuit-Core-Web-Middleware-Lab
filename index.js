// Joseph P. Pasaoa
// Middleware Lab - Frontend
//

/* CUSTOM HELPERS */
const log = console.log;


const getData = async (routeStr, queryStr) => {
  let url = `http://localhost:8110/${routeStr}${queryStr}`;
  let data = await axios.get(url);
  return data.data;
}
const clearConsole = (partNum) => {
  const stage = document.querySelector(`#consolePart${partNum}`);
  while (stage.firstChild) {
    stage.removeChild(stage.lastChild);
  }
}
const showData = (partNum, userInput, result) => {
  clearConsole(partNum);

  const consoleDiv = document.querySelector(`#consolePart${partNum}`);
  let makingInput = document.createElement('div');
  if (userInput !== '---') {
    makingInput.className = "show-input";
    makingInput.innerText = `{ "input": "${userInput}" }\n\n`;
  } else {
    makingInput.className = "show-input--fail";
    makingInput.innerText = `{ "input": --- }\n\n`;
  }
  setTimeout(() => { // adds more natural delay to display
      consoleDiv.append(makingInput);
      consoleDiv.innerHTML += JSON.stringify(result, null, 2);
  }, 125);
}


const execAnimal = async (event) => {
  const textBox = event.target.form[0];
  textBox.focus();
  let query = textBox.value.trim().split('');
  query = query.filter(char => char === ' ' || char.toLowerCase() !== char.toUpperCase())
    .join('').toLowerCase();
  if (query === '') {
    let jsonData = {
      status: "failure",
      message: "error: please enter a valid query. check and try again"
    }
    showData(1, '---', jsonData);
  } else {
    textBox.value = '';
    let jsonData = await getData(`animal`, `/${query}`);
    showData(1, query, jsonData);
  }
}

const execRandom = async (event) => {
  const textBoxFloor = event.target.form[2];
  const textBoxCeil = event.target.form[3];
  textBoxFloor.focus();
  if (isNaN(parseInt(textBoxFloor.value.trim())) || isNaN(parseInt(textBoxCeil.value.trim()))) {
    let jsonData = {
      status: "failure",
      message: "error: only valid numbers are acceptable. please check your inputs and try again"
    }
    showData(2, '---', jsonData);
  } else if (!(parseInt(textBoxFloor.value.trim()) + 1 < parseInt(textBoxCeil.value.trim()))) {
    let jsonData = {
      status: "failure",
      message: "error: your ceiling must be at least 2 higher than your floor. please check your inputs and try again"
    }
    showData(2, '---', jsonData);
  } else {
    let query = `?floor=${parseInt(textBoxFloor.value.trim())}&ceil=${parseInt(textBoxCeil.value.trim())}`;
    let jsonData = await getData(`random`, `${query}`);
    showData(2, query, jsonData);
  }
}

const execQueue = async (event) => {
  const op = event.target.value;
  const textBox = event.target.form[5];
  textBox.focus();
  if (op === 'peek' || op === 'dequeue') {
    let jsonData = await getData(`queue`, `/${op}`);
    showData(3, `/${op}/`, jsonData);
  } else {
    let query = textBox.value.trim().split('');
    query = query.filter(char => char === ' ' || char.toLowerCase() !== char.toUpperCase())
      .join('').toLowerCase();
    if (query === '') {
      let jsonData = {
        status: "failure",
        message: "error: please enter a valid query. check and try again"
      }
      showData(3, '---', jsonData);
    } else {
      query = `?name=${query}`;
      let jsonData = await getData(`queue`, `/${op}/${query}`);
      showData(3, `/${op}/${query}`, jsonData);
    }
  }
}


/* POST DOMLoad Execs */
document.addEventListener("DOMContentLoaded", () => {

    // BUTTON CLICK EVENT LISTENERS //
    document.querySelector('#allForm').addEventListener('click', (e) => {
        e.preventDefault();

        if (e.target.id === 'btnAnimal' && e.target.form[0].value.trim() !== '') {
          execAnimal(e);
        }
        if (e.target.id === 'btnRandom' && e.target.form[2].value.trim() !== '' && e.target.form[3].value.trim() !== '') {
          execRandom(e);
        }
        if (e.target.id === 'btnPeek' || e.target.id === 'btnDel' || (e.target.id === 'btnAdd' && e.target.form[5].value.trim() !== '')) {
          execQueue(e);
        }
    });

    // TEXTBOX ENTER KEYDOWN EVENT LISTENERS //
    document.querySelector('#textAnimal').addEventListener('keydown', (e) => {
        if (e.keyCode === 13 && e.target.value.trim() !== '') {
          execAnimal(e);
        }
    });
    document.querySelector('#textFloorNum').addEventListener('keydown', (e) => {
        if (e.keyCode === 13 && e.target.form[2].value.trim() !== '' && e.target.form[3].value.trim() !== '') {
          execRandom(e);
        }
    });
    document.querySelector('#textCeilNum').addEventListener('keydown', (e) => {
        if (e.keyCode === 13 && e.target.form[2].value.trim() !== '' && e.target.form[3].value.trim() !== '') {
          execRandom(e);
        }
    });
    document.querySelector('#textName').addEventListener('keydown', (e) => {
      if (e.keyCode === 13 && e.target.value.trim() !== '') {
          document.querySelector('#btnAdd').click();
      }
    });
});
