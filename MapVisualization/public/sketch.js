let canvas;
let myMap;
let data;

let key = 'AIzaSyBHiExLDyBVehYKMJOSw2PdtDmDf2h-HFY';
// let key = user.key;

let style = [{
    "elementType": "geometry",
    "stylers": [{
      "color": "#1c2541"
    }]
  },
  {
    "elementType": "labels",
    "stylers": [{
      "visibility": "off"
    }]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#8ec3b9"
    }]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [{
      "color": "#1a3646"
    }]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [{
      "color": "#4b6878"
    }]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [{
      "visibility": "off"
    }]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#64779e"
    }]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [{
      "visibility": "off"
    }]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [{
      "color": "#4b6878"
    }]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [{
      "color": "#334e87"
    }]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{
      "color": "#283d6a"
    }]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#6f9ba5"
    }]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [{
      "color": "#1d2c4d"
    }]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#539aab"
      },
      {
        "lightness": -50
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#3c7680"
    }]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{
      "color": "#304a7d"
    }]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#98a5be"
    }]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [{
      "color": "#1d2c4d"
    }]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{
        "color": "#3d8180"
      },
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [{
        "color": "#255763"
      },
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#b0d5ce"
    }]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [{
      "color": "#023e58"
    }]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#98a5be"
    }]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [{
      "color": "#1d2c4d"
    }]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#3a506b"
      },
      {
        "weight": 0.5
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{
      "color": "#0b132b"
    }]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#4e6d70"
    }]
  }
]

let options = {
  //location infor for the NYC
  lat: 40.782,
  lng: -73.940,
  zoom: 12,
  styles: style
};
let mappa = new Mappa('Google', key);

let mazes = [];

function preload() {
  // Get the most recent earthquake in the database
  let url = 'http://104.131.113.151:3000/urbanmaze';

  // data = null;
  data = loadJSON(url);
  console.log(data);
}

function setup() {

  canvas = createCanvas(windowWidth, windowHeight);

  // Create a tile map and overlay the canvas on top.
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  noStroke();

  for (let i in data) {
    mazes.push(new Maze(data[i]));
  }

}

function draw() {

  clear();

  const zoom = myMap.zoom();

  for (let maze of mazes) {
    maze.update(zoom);
    // maze.createPLocation();
    maze.displayMaze();
    maze.displayPlayers();
  }
  // mazes[0].update();
  // mazes[0].display();
  // put drawing code here
}