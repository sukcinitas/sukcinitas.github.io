const { projects } = {
  projects: [
    {
      title: "List it off",
      content: [
        "A full stack React & Express.js application which allows to create and save shopping lists, to review shopping history and statistics. This app was built for completing a challenge actualizing an already made design (Figma).",
        "While building this app I practised using Redux (Redux Toolkit approach) to manage complex state and I used a relationaldatabase management system (SQLite) instead of NoSQL one for the first time.",
      ],
      links: [
        "https://github.com/sukcinitas/dc-shopping-list",
        "https://github.com/sukcinitas/dc-shopping-list-api",
        "https://list-it-off.netlify.app/",
      ],
      tools: "Typescript Sass React Redux Express SQLite Webpack Mocha & Chai",
      images: ["assets/sh-1.gif"],
    },

    {
      title: "Yours Next",
      content: [
        "A full stack application which allows to create groups with shared playlists stored in the database, to watch Youtube videos separately or in a synchronized (sort of) manner among group members and to chat in real-time using Socket.io.",
        "This project was challenging because yet again I was trying out several things all at once (Vue.js, Socket.io, utilizing several APIs). Also I had to find a good enough solution to structuring this app to keep it maintainable. But nothing beats the biggest challenge of coming up with a decent design 🥲.",
      ],
      links: [
        "https://github.com/sukcinitas/yours-next-client",
        "https://github.com/sukcinitas/yours-next-server",
        "https://yours-next-server.onrender.com/",
      ],
      tools:
        "Sass Vue.js Vuex Express MongoDB & Mongoose Passport.js Bcryptjs Socket.io Jest Webpack",
      images: ["assets/yn-1.gif"],
    },
    {
      title: "Up Up",
      content: [
        "A full stack app that allows users to vote in polls while authenticated users are allowed to create polls and to manage their profile information and created polls. Poll results are represented in a D3.js chart.",
        "It was challenging in a sense that I was building something from ground up as started developing my skills by actualizing this app. I learned how to connect front-end with back-end, measures that can be taken to increase app security. The app was my playground migrating from JavaScript to TypeScript, a place to practise using React hooks.",
      ],
      links: [
        "https://github.com/sukcinitas/up-up-client",
        "https://github.com/sukcinitas/up-up",
        "https://up-up.netlify.app/",
      ],
      tools:
        "Typescript Sass React Redux D3.js Express MongoDB & Mongoose Passport.js Jest & React Testing Library Webpack",
      images: ["assets/uu-1.gif"],
    },
    {
      title: "Cats Wiki",
      content: [
        "A responsive React & Express.js app that fetches information about cat breeds from CatAPI and keeps track of the most searched ones. This app was built for completing a challenge actualizing an already made design (Figma).",
        "While building this app I improved skills regarding responsive design, images, and TypeScript.",
      ],
      links: [
        "https://github.com/sukcinitas/dc-cat-wiki",
        "https://github.com/sukcinitas/dc-cat-wiki-api",
        "https://cats-wiki.netlify.app/#/",
      ],
      tools: "Typescript Sass React Express Mocha & Chai Webpack",
      images: ["assets/cw-1.gif"],
    },
    {
      title: "Metaless Upload",
      content: [
        "A responsive React & Express.js app that allows to upload images with removed EXIF data. Images are stored on a server. This app was also built for completing a challenge actualizing an already made design (Figma).",
        "While building this app I learned about file upload, drop events, browser Clipboard API.",
      ],
      links: [
        "https://github.com/sukcinitas/dc-img-uploader",
        "https://github.com/sukcinitas/dc-img-uploader-api",
        "https://metaless-upload.netlify.app/",
      ],
      tools: "React Styled-Components Express Piexifjs",
      images: ["assets/mu-1.gif"],
    },
  ],
};

function toggleArrows() {
  // toggle arrows
  const leftArrow = document.querySelector(".arrow__left");
  const rightArrow = document.querySelector(".arrow__right");
  if (currentProjectIdx === 0) {
    leftArrow.classList.add("arrow--hidden");
  } else if (currentProjectIdx === projects.length - 1) {
    rightArrow.classList.add("arrow--hidden");
  } else {
    leftArrow.classList.remove("arrow--hidden");
    rightArrow.classList.remove("arrow--hidden");
  }
}

// set project
let currentProjectIdx = -1;
function setProject(direction) {
  if (!projects.length) {
    return;
  }

  const newCurrentProjectIdx =
    currentProjectIdx + (direction === "right" ? 1 : -1);
  if (newCurrentProjectIdx >= 0 && newCurrentProjectIdx < projects.length) {
    currentProjectIdx = newCurrentProjectIdx;
  } else {
    return;
  }

  toggleArrows();

  const projectData = projects[currentProjectIdx];
  const projectInfo = document.querySelector(".project__info");
  const project = document.querySelector(".project");
  projectInfo.innerHTML = "";
  project.innerHTML = "";

  /* set project title, text, links and tech stack */
  createElement("h3", ["project__title"], [projectData.title], projectInfo);

  for (const text of projectData.content) {
    createElement("p", ["project__text"], [text], projectInfo);
  }

  const projectLinks = createElement(
    "div",
    ["project__links"],
    [],
    projectInfo
  );
  for (const link of projectData.links) {
    const linkNode = createElement("a", [], [], projectLinks);
    linkNode.href = link;
    linkNode.target = "_blank";
    linkNode.rel = "noopener noreferrer";

    if (!link.includes("github")) {
      linkNode.title = "To demo site";
    } else {
      linkNode.title = /(api|server|up-up$)/.test(link)
        ? "Backend code"
        : "Frontend code";
    }

    const classList = link.includes("github")
      ? ["devicon-github-original"]
      : ["fa", "fa-link"];
    createElement("i", classList, [], linkNode);
  }

  createElement("span", ["project__stack"], [projectData.tools], projectInfo);

  // set image
  const image = createElement(
    "img",
    ["project__img", "project__img--active"],
    [],
    project
  );
  image.alt = "Project name";
  image.src = projectData.images[0];
}

function createElement(tag, classNames, textChildren, appendTo) {
  const element = document.createElement(tag);
  for (const className of classNames) {
    element.classList.add(className);
  }
  for (const textChild of textChildren) {
    const textNode = document.createTextNode(textChild);
    element.appendChild(textNode);
  }
  appendTo.append(element);

  return element;
}

function toggleClass(event, className) {
  const element = event.currentTarget;
  element.classList.toggle(className);
}

// stacking animation
const techIcons = Array.from(document.querySelectorAll(".tech-stack__icon"));
techIcons.forEach((techIcon) => {
  techIcon.addEventListener("mouseover", (e) => toggleClass(e, "colored"));
  techIcon.addEventListener("mouseout", (e) => toggleClass(e, "colored"));
});

function loadBody() {
  setProject("right");
  document.body.style.visibility = "visible";
}

const portfolioBtn = document.querySelector(".header__brand-additional");
portfolioBtn.addEventListener("click", () => {
  window.scrollTo(0, document.querySelector(".projects").offsetTop, {
    behavior: smooth,
  });
});

// home button click
const homeBtn = document.querySelector(".header__brand");
homeBtn.addEventListener("click", () => {
  window.scrollTo(0, 0, { behavior: smooth });
});

// down arror behavior
const arrow = document.querySelector(".scroll-arrow");
arrow.addEventListener("click", () => {
  const sections = [
    document.querySelector(".about"),
    document.querySelector(".tech-stack"),
    document.querySelector(".projects"),
    ...Array.from(document.querySelectorAll(".info")),
    document.querySelector(".contact"),
  ];
  let next;
  const current = document.querySelector(".in");
  if (current === sections[sections.length - 1]) {
    next = sections[0];
  } else {
    next = sections[sections.indexOf(current) + 1];
  }

  if (next.classList.contains("about")) {
    window.scrollTo(0, 0);
  } else {
    window.scrollTo(0, next.offsetTop);
  }
});

// renew navbar
function renewNavbar(idx) {
  const bars = Array.from(document.querySelectorAll(".navbar__bar"));
  for (let i = 0; i < bars.length; i++) {
    const bar = bars[i];
    if (i <= idx) {
      bar.classList.add("active");
    } else {
      bar.classList.remove("active");
    }
  }
}

function clickBar(idx) {
  sections[idx].scrollIntoView({ behavior: "smooth" });
}

const sections = [
  document.querySelector(".about"),
  document.querySelector(".tech-stack"),
  document.querySelector(".projects"),
  ...Array.from(document.querySelectorAll(".info")),
  document.querySelector(".contact"),
];
let intersectionIndex;
if (window.IntersectionObserver) {
  const options = {
    rootMargin: "0px",
    threshold: [0.3, 0.3],
  };
  const callback = (entries) => {
    const about = document.querySelector(".about");
    const tech = document.querySelector(".tech-stack");
    const arrow = document.querySelector(".scroll-arrow");
    const contact = document.querySelector(".contact");
    const greetings = document.querySelectorAll(".greetings");

    entries.forEach((entry) => {
      entry.isIntersecting
        ? entry.target.classList.add("in")
        : entry.target.classList.remove("in");

      if (entry.isIntersecting) {
        intersectionIndex = sections.findIndex((e) => e === entry.target);
        renewNavbar(intersectionIndex);
      }

      arrow.classList.remove("scroll-arrow--rotated");
      if (entry.target === tech) {
        // animate tech stacking whenever comes in viewport
        const divs = document.querySelectorAll(".tech-stack__list i");
        if (entry.isIntersecting) {
          for (const element of divs) {
            element.classList.add("active");
          }
        } else {
          for (const element of divs) {
            element.classList.remove("active");
          }
        }
      } else if (entry.target === about) {
        // pause title animation if not in viewport
        const titles = Array.from(document.querySelectorAll(".about__title"));
        if (entry.isIntersecting) {
          titles.forEach((title) => {
            title.classList.remove("paused");
          });
        } else {
          titles.forEach((title) => {
            title.classList.add("paused");
          });
        }
      } else if (document.querySelector(".in") === contact) {
        arrow.classList.add("scroll-arrow--rotated");
        greetings[0].classList.add("fade-in");
        setTimeout(() => {
          greetings[0].style.display = "none";
          greetings[1].style.display = "block";
          setTimeout(() => {
            greetings[1].classList.add("fade-in");
          }, 100);
        }, 1400);
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);

  sections.forEach((section, index) => {
    observer.observe(section);
  });
} else {
  // instead of intersection observer
  document.querySelector(".scroll-arrow").style.dislay = "none";
  document.addEventListener("scroll", toggleActiveIfNoIntersectionObserver, {
    passive: true,
  });
}

function toggleActiveIfNoIntersectionObserver() {
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

  // checking if tech stack comes in viewport
  const el = document.querySelector(".tech-stack");
  const divs = document.querySelectorAll(".tech-stack__list i");
  if (comesInViewport(el, 0)) {
    for (const element of divs) {
      element.classList.add("active");
    }
  } else {
    for (const element of divs) {
      element.classList.remove("active");
    }
  }

  // checking if title is in viewport
  const titles = Array.from(document.querySelector(".about__title"));
  titles.forEach((title) => {
    if (comesInViewport(title)) {
      title.classList.remove("paused");
    } else {
      title.classList.add("paused");
    }
  });
}
