{
  const stepList = Array.from(document.querySelectorAll('.stepList'));
  const navItems = Array.from(document.querySelectorAll('.navItem'));
  const navUl = document.querySelector('.nav-list');
  const stepsCount = document.querySelectorAll('.stepsCount');
  const navItemChecked = document.querySelectorAll('svg.navItemChecked');
  const progress = document.querySelector('.progress');
  const submit = document.querySelector('button.submit');
  const form = document.forms.form;

  let username = form.elements.username;
  let phoneNumber = form.elements.phoneNumber;
  let currentIndx = 0;
  let currentUl;
  let currentNavItem;
  let orderHistory = [];
  let order = [];

  function createChoiceObject(key, value) {
    choice = {};
    choice[key] = value;
    return choice;
  }

  function changeProgress(index) {
    stepsCount.forEach((count) => (count.innerHTML = index));
    progress.style.width = `${(100 * index) / 5}%`;
    console.log(progress.style.width);
  }

  function showPreviousList(currentNavIndex) {
    stepList[currentNavIndex].style.display = 'none';
    stepList[currentNavIndex].previousElementSibling.style.display = '';
    navItems[currentNavIndex].classList.remove('subtitle--active');

    changeProgress(currentNavIndex);

    currentNavIndex--;
    navItemChecked[currentNavIndex].classList.remove('checked-visible');
    navItems[currentNavIndex].classList.remove('stepBack');

    console.log(order[currentNavIndex]);
    console.log(currentNavIndex);
    // let popped = order.pop();
    order.pop();
    // console.log(popped);
    console.log(order);
  }

  function showNextList(currentIndx) {
    stepList[currentIndx].style.display = 'none';
    stepList[currentIndx].nextElementSibling.style.display = '';

    navItems[currentIndx].classList.add('stepBack');
    navItemChecked[currentIndx].classList.add('checked-visible');
  }

  function changeProgressAndSaveHistory(currentIndx) {
    navItems[currentIndx].classList.add('subtitle--active');
    changeProgress(currentIndx + 1);

    console.log(currentIndx);
    let choiceValue = currentLi.getAttribute('data-type');
    let choiceKey = `step${currentIndx}`;

    let choice = createChoiceObject(choiceKey, choiceValue);
    console.log(choice);

    // console.log(Object.keys(choice));
    // console.log(choice[choiceKey]);

    orderHistory.push(choice);
    console.log(orderHistory);

    order.push(choice);
    console.log(order);
  }

  let step = 1;
  changeProgress(step);

  stepList.forEach((list) => (list.style.display = 'none'));
  stepList[0].style.display = '';

  document.addEventListener('click', function (event) {
    currentLi = event.target.closest('li.brief-list__item');

    if (currentLi == null) return;

    currentUl = currentLi.parentNode;

    console.log(Number(currentUl.dataset.index));
    currentIndx = Number(currentUl.dataset.index);

    showNextList(currentIndx);

    changeProgressAndSaveHistory(currentIndx + 1);

    if (navItems[currentIndx].previousElementSibling == null) {
      return;
    } else {
      navItems[currentIndx].previousElementSibling.classList.remove('stepBack');
    }
  });

  navUl.addEventListener('click', function (event) {
    currentNavItem = event.target.closest('li.navItem');
    if (currentNavItem == null) return;

    if (currentNavItem.classList.contains('stepBack')) {
      let currentNavIndex = navItems.indexOf(currentNavItem);
      console.log('stepBack', currentNavIndex);

      showPreviousList(currentNavIndex + 1);

      if (navItems[currentNavIndex].previousElementSibling == null) return;
      navItems[currentNavIndex].previousElementSibling.classList.add(
        'stepBack'
      );
    } else {
      return console.log('non-active-link');
    }
  });

  submit.addEventListener('click', function (e) {
    e.preventDefault();

    localStorage.setItem('order', JSON.stringify(order));
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

    let orderParse = localStorage.getItem('order');
    console.log(orderParse);
    orderParse = JSON.parse(orderParse);
    console.log(orderParse);

    console.log(localStorage.getItem('orderHistory'));
  });

  username.addEventListener('change', function () {
    let usernameKey = 'username';
    let usernameValue = username.value;
    pushInputToOrder(usernameKey, usernameValue);
  });

  phoneNumber.addEventListener('change', function () {
    let phoneNumberKey = 'phoneNumber';
    let phoneNumberValue = phoneNumber.value;
    pushInputToOrder(phoneNumberKey, phoneNumberValue);
  });

  function pushInputToOrder(key, value) {
    let choice = createChoiceObject(key, value);
    orderHistory.push(choice);
    order.push(choice);
  }
}
