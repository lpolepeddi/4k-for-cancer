mapboxgl.accessToken = 'pk.eyJ1IjoibHBvbGVwZWRkaSIsImEiOiJjamxsNjQzcmQwdTVoM3JzMW1iaGxxNjNoIn0.NHGJsP3-H9Yc4gGl7c1COw';

let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v9',

  center: [-98.678503, 39.999733],
  zoom: 3,
});

let chapters = {
  'usa': {
    bearing: 0,
    center: [-98.678503, 39.999733],
    zoom: 3,
    pitch: 0,
  },

  'alexandria-va': {
    bearing: 0,
    center: [-77.043440, 38.805496],
    zoom: 8,
    pitch: 0,
  },

  'warrenton-va': {
    bearing: 0,
    center: [-77.795739, 38.713375],
    zoom: 8,
    pitch: 0,
  },

  'charlottesville-va': {
    bearing: 0,
    center: [-78.476841, 38.029649],
    zoom: 8,
    pitch: 0,
  },
};

function isElementOnScreen(id) {
  let element = document.getElementById(id);
  let bounds = element.getBoundingClientRect();
  // return bounds.top < window.innerHeight && bounds.bottom > 0;
  return bounds.bottom - 130 > 0;
}

let activeChapterName = 'usa';
function setActiveChapter(chapterName) {
  console.log(chapterName);
  if (chapterName === activeChapterName) {
    return;
  }

  map.flyTo(chapters[chapterName]);

  document.getElementById(chapterName).setAttribute('class', 'active');
  document.getElementById(activeChapterName).setAttribute('class', '');
  activeChapterName = chapterName;
}

window.onscroll = function() {
  let chapterNames = Object.keys(chapters);
  for (let i = 0; i < chapterNames.length; i++) {
    let chapterName = chapterNames[i];

    if (isElementOnScreen(chapterName)) {
      setActiveChapter(chapterName);
      break;
    }
  }
};
