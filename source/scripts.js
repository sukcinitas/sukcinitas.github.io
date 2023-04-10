function slideProjectIn(idx) {
  const projectSlider = document.querySelector('.projects__list');
  const projectSliderArray = Array.from(projectSlider.children);
  const project = projectSliderArray[idx];
  const target = document.querySelector('.projects__title--selected');
  const title = document.querySelector(`.projects__title[data-tid="${idx}"]`);

  const whichScreen = `${idx * -100}vw`;
  projectSlider.style.setProperty('transform', `translateX(${whichScreen})`);
  projectSlider.style.setProperty('transition', 'transform 3s ease');
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

function toggleClass(event, className) {
  const icon = event.currentTarget;
  icon.classList.toggle(className);
}

const techIcons = Array.from(document.querySelectorAll('.tech-stack__icon'));
techIcons.forEach((techIcon) => {
  techIcon.addEventListener('mouseover', (e) => toggleClass(e, 'colored'));
  techIcon.addEventListener('mouseout', (e) => toggleClass(e, 'colored'));
});

function changeGreetings(phrase) {
  const greetings = document.querySelector('.greetings')
  setTimeout(() => {
    greetings.innerHTML = phrase
  }, 1000)
}

function loadBody() {
  document.body.style.visibility = 'visible';
}

const portfolioBtn = document.querySelector('.header__brand-additional');
portfolioBtn.addEventListener('click', () => {
  window.scrollTo(0, document.querySelector('.projects').offsetTop, { behavior: smooth });
});

const homeBtn = document.querySelector('.header__brand');
homeBtn.addEventListener('click', () => {
  window.scrollTo(0, 0, { behavior: smooth });
});

const arrow = document.querySelector('.scroll-arrow');
arrow.addEventListener('click', () => {
  const sections = [
    document.querySelector('.about'),
    document.querySelector('.tech-stack'),
    document.querySelector('.projects'),
    ...Array.from(document.querySelectorAll('.info')),
    document.querySelector('.contact'),
  ];
  let next;
  const current = document.querySelector('.in');
  if (current === sections[sections.length - 1]) {
    next = sections[0];
  } else {
    next = sections[sections.indexOf(current) + 1];
  }

  if (next.classList.contains('about')) {
    window.scrollTo(0, 0);
  } else {
    window.scrollTo(0, next.offsetTop);
  }
});

function renewNavbar(idx) {
  const bars = Array.from(document.querySelectorAll('.navbar__bar'))
  for (let i = 0; i < bars.length; i++) {
    const bar = bars[i]
    if (i <= idx) {
      bar.classList.add('active')
    } else {
      bar.classList.remove('active')
    }
  }
}
const sections = [
  document.querySelector('.about'),
  document.querySelector('.tech-stack'),
  document.querySelector('.projects'),
  ...Array.from(document.querySelectorAll('.info')),
  document.querySelector('.contact'),
];
let intersectionIndex = undefined
if (!!window.IntersectionObserver) {
  const options = {
    rootMargin: '0px',
    threshold: [0.3, 0.3],
  };
  const callback = (entries) => {
    const about = document.querySelector('.about');
    const tech = document.querySelector('.tech-stack');
    const arrow = document.querySelector('.scroll-arrow');
    const contact = document.querySelector('.contact');
    entries.forEach((entry) => {
      entry.isIntersecting
        ? entry.target.classList.add('in')
        : entry.target.classList.remove('in');
        if (entry.isIntersecting) {
          intersectionIndex = sections.findIndex(e => e === entry.target)
          renewNavbar(intersectionIndex)
        }

      arrow.classList.remove('scroll-arrow--rotated');
      if (entry.target === tech) {
        // animate tech stacking whenever comes in viewport
        const divs = document.querySelectorAll('.tech-stack__list i');
        if (entry.isIntersecting) {
          for (let i = 0; i < divs.length; i++) {
            divs[i].classList.add('active');
          }
        } else {
          for (let i = 0; i < divs.length; i++) {
            divs[i].classList.remove('active');
          }
        }
      } else if (entry.target === about) {
        // pause title animation if not in viewport
        const titles = Array.from(document.querySelectorAll('.about__title'));
        if (entry.isIntersecting) {
          titles.forEach((title) => {
            title.classList.remove('paused');
          });
        } else {
          titles.forEach((title) => {
            title.classList.add('paused');
          });
        }
      } else if (document.querySelector('.in') === contact) {
        arrow.classList.add('scroll-arrow--rotated');
        changeGreetings('Get in touch!')
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);

  sections.forEach((section, index) => {
    observer.observe(section);
  });
} else {
  document.querySelector('.scroll-arrow').style.dislay = 'none';
  function comesInViewport(element, idx = 0) {
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
          const target = element
            .querySelector('.project__wrapper')
            .querySelector('.project__info')
            .querySelector('.project__icons')
            .querySelector('.fa-chevron-up');
          if (target) {
            target.classList.remove('fa-chevron-up');
            target.classList.add('fa-chevron-down');
          }
        } else {
          element.classList.remove('active');
        }
      }

      // checking if title is in viewport
      const titles = Array.from(document.querySelector('.about__title'));
      titles.forEach((title) => {
        if (comesInViewport(title)) {
          title.classList.remove('paused');
        } else {
          title.classList.add('paused');
        }
      });
    },
    {
      passive: true,
    }
  );
}
