let tg = window.Telegram.WebApp; //получаем объект webapp телеграма

tg.expand(); //расширяем на все окно

/* 
tg.MainButton.text = 'Changed Text'; //изменяем текст кнопки
tg.MainButton.setText('Changed Text1'); //изменяем текст кнопки иначе
tg.MainButton.textColor = '#F55353'; //изменяем цвет текста кнопки
tg.MainButton.color = '#143F6B'; //изменяем цвет бэкграунда кнопки
tg.MainButton.setParams({ color: '#143F6B' }); //так изменяются все параметры

let btn = document.getElementById('btn');
btn.addEventListener('click', function () {
  //вешаем событие на нажатие html-кнопки
  if (tg.MainButton.isVisible) {
    //если кнопка показана
    tg.MainButton.hide(); //скрываем кнопку
  } else {
    //иначе
    tg.MainButton.show(); //показываем
  }
});

let btnED = document.getElementById('btnED'); //получаем кнопку активировать/деактивировать
btnED.addEventListener('click', function () {
  //вешаем событие на нажатие html-кнопки
  if (tg.MainButton.isActive) {
    //если кнопка показана
    tg.MainButton.setParams({ color: '#E0FFFF' }); //меняем цвет
    tg.MainButton.disable(); //скрываем кнопку
  } else {
    //иначе
    tg.MainButton.setParams({ color: '#143F6B' }); //меняем цвет
    tg.MainButton.enable(); //показываем
  }
});

Telegram.WebApp.onEvent('mainButtonClicked', function () {
  tg.sendData('some string that we need to send');
  //при клике на основную кнопку отправляем данные в строковом виде
});

let usercard = document.getElementById('usercard'); //получаем блок usercard

let profName = document.createElement('p'); //создаем параграф
profName.innerText = `${tg.initDataUnsafe.user?.first_name}
${tg.initDataUnsafe.user?.last_name}
${tg.initDataUnsafe.user?.username} (${tg.initDataUnsafe.user?.language_code})`;
//выдем имя, "фамилию", через тире username и код языка
usercard.appendChild(profName); //добавляем

let userid = document.createElement('p'); //создаем еще параграф
userid.innerText = `${tg.initDataUnsafe.user?.id}`; //показываем user_id
usercard.appendChild(userid); //добавляем
 */

// =========================

const refs = {
  formEl: document.querySelector('.js-search-form[data-id="1"]'),
  heroEl: document.querySelector('.js-hero-container'),
};

refs.formEl.addEventListener('submit', event => {
  event.preventDefault();
  const heroName = event.target.elements.query.value.trim();
  searchHero(heroName)
    .then(hero => {
      renderHero(hero);
    })
    .catch(err => {
      console.log(err.message);
    });
});

function searchHero(heroInfo) {
  const baseUrl = 'https://superhero-search.p.rapidapi.com/api/';
  const PARAMS = new URLSearchParams({ hero: heroInfo });
  const url = `${baseUrl}?${PARAMS}`;
  const options = {
    headers: {
      'X-RapidAPI-Key': '9b3ff61931msh1b42d77d34e33dap1c29cajsn3d3169e0e2f4',
      'X-RapidAPI-Host': 'superhero-search.p.rapidapi.com',
    },
  };

  return fetch(url, options).then(response => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  });
}

function renderHero({ name, biography: { fullName }, images: { lg } }) {
  const markup = `<div class="hero-card card">
    <div class="image-container">
      <img
        src="${lg}"
        alt="#"
        class="hero-image"
      />
    </div>
    <div class="hero-body">
      <h4 class="hero-name">${fullName}</h4>
      <p class="hero-bio">
        ${name} - Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero, sed
        facilis, necessitatibus at neque cum deserunt maxime quos laudantium
        doloremque nesciunt ea voluptates! Atque fugiat assumenda incidunt
        laborum quas a!
      </p>
    </div>
  </div>`;

  refs.heroEl.innerHTML = markup;
}
