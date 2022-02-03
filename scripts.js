function slideProjectIn(idx) {
  const projectSlider = document.querySelector('.projects__list');
  const projectSliderArray = Array.from(projectSlider.children);
  const project = projectSliderArray[idx];
  const target = document.querySelector('.projects__title--selected');
  const title = document.querySelector(`.projects__title[data-tid="${idx}"]`);

  projectSlider.style.left = `${idx * -100}vw`;
  target.classList.remove('projects__title--selected');
  title.classList.add('projects__title--selected');

  projectSliderArray.forEach((project) => {
    project.classList.remove('active');
  });
  project.classList.add('active');
}

function changeActiveImg(e, project, imgNum, projectNum) {
  const target = e.currentTarget;
  const idx = Number(target.dataset.iid[1]) + 1; // only numbers till 10s
  const imgTrackList = Array.from(
    document.querySelectorAll(`.project__img-num`)
  );
  const imgTrack = imgTrackList[projectNum - 1];
  let img;
  if (idx === imgNum) {
    img = document.querySelector(`.project__img[data-iid="${project}${0}"]`);
    imgTrack.innerHTML = `01/0${imgNum}`;
  } else {
    img = target.nextElementSibling;
    imgTrack.innerHTML = `0${idx + 1}/0${imgNum}`;
  }
  target.classList.remove('project__img--active');
  img.classList.add('project__img--active');
}

function toggleDevIcon(event) {
  const icon = event.currentTarget;
  if (event.type === 'mouseout') {
    icon.classList.remove('colored');
  } else {
    icon.classList.add('colored');
  }
}

const techIcons = Array.from(document.querySelectorAll('.tech-stack__icon'));
techIcons.forEach((techIcon) => {
  techIcon.addEventListener('mouseover', toggleDevIcon);
  techIcon.addEventListener('mouseout', toggleDevIcon);
});

function comesInViewport(element, idx) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >=
      -0.7 * (window.innerHeight || document.documentElement.clientHeight) &&
    rect.top <=
      0.7 * (window.innerHeight || document.documentElement.clientHeight) &&
    rect.left >= 0 &&
    rect.right <=
      (window.innerWidth || document.documentElement.clientWidth) + 100
  );
}

document.addEventListener(
  'scroll',
  function () {
    // checking if tech stack comes in viewport
    const el = document.querySelector('.tech-stack');
    const divs = document.querySelectorAll('.tech-stack__list i');
    if (comesInViewport(el, 0)) {
      for (var i = 0; i < divs.length; i++) {
        divs[i].classList.add('active');
      }
    } else {
      for (var i = 0; i < divs.length; i++) {
        divs[i].classList.remove('active');
      }
    }
    //checking if project comes in viewport
    const projectArray = Array.from(document.querySelectorAll('.project'));

    projectArray.forEach((project, idx) => {
      toggleActiveClass(project, idx);
    });

    function toggleActiveClass(element, idx) {
      if (comesInViewport(element, idx)) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    }
  },
  {
    passive: true,
  }
);

function toggleInfo(e) {
  const target = e.target;
  const isMinified = target.classList.contains('fa-chevron-up');
  if (isMinified) {
    const parent = target.parentElement.parentElement;
    target.classList.remove('fa-chevron-up');
    target.classList.add('fa-chevron-down');
    parent.style.top = 'auto';
  } else {
    const parent = target.parentElement.parentElement;
    target.classList.add('fa-chevron-up');
    target.classList.remove('fa-chevron-down');
    parent.style.top = '500px';
  }
}

function chooseDisplay(e) {
  const target = e.target;
  const list = document.querySelector('.projects__list');
  const titles = document.querySelector('.projects__titles');
  let sibling;
  list.style.left = 0;
  if (target.classList.contains('fa-ellipsis-h')) {
    sibling = target.nextElementSibling;
    list.classList.remove('projects__list--list');
    titles.classList.remove('projects__titles--list');
  } else {
    sibling = target.previousElementSibling;
    list.classList.add('projects__list--list');
    titles.classList.add('projects__titles--list');
  }
  target.classList.add('selected');
  sibling.classList.remove('selected');

  const projectSlider = document.querySelector('.projects__list');
  const projectSliderArray = Array.from(projectSlider.children);
  projectSliderArray.forEach((project) => {
    project.classList.remove('active');
  });
}
