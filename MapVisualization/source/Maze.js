class Maze {
  constructor(mazeData) {
    console.log(mazeData);
    this.id = Number(mazeData.ID);
    this.locations = createVector(Number(mazeData.lat), Number(mazeData.lng));
    this.mazeID = Number(mazeData.mazeID);
    this.date = mazeData.date;
    this.count = Number(mazeData.views);
    //random points for users
    this.pLocations = [];
    this.pPlayers = [];

    this.mazeR;
    this.pPlayersR;

    //colors for the maze types
    let colorG = ['#5BC0EB', '#9BC53D', '#E55934', '#FA7921'];

    this.color = color(colorG[(this.mazeID - 1)]);

    for (let i = 0; i < this.count; i++) {
      this.pLocations.push(createVector(random(-10, 10), random(-10, 10)));
      this.pPlayers.push(createVector(0, 0));
    }
  }

  //diameter changes when zoomed
  update(zoom) {
    this.mazeR = zoom;
    this.playerR = zoom / 5;

    this.pos = myMap.latLngToPixel(this.locations.x, this.locations.y);

    for (let i = 0; i < this.count; i++) {
      // console.log(this.pLocations[i].x);
      if (this.pLocations[i].x < 0) {
        this.pPlayers[i].x = this.pLocations[i].x + this.pos.x - zoom / 2;
      } else {
        this.pPlayers[i].x = this.pLocations[i].x + this.pos.x + zoom / 2;
      }

      if (this.pLocations[i].y < 0) {
        this.pPlayers[i].y = this.pLocations[i].y + this.pos.y - zoom / 2;
      } else {
        this.pPlayers[i].y = this.pLocations[i].y + this.pos.y + zoom / 2;
      }
    }

    // for (let i = 0; i < this.count; i++) {
    //   this.pPlayers[i].x = this.pLocations[i].x + this.pos.x + zoom / 2;
    //   this.pPlayers[i].y = this.pLocations[i].y + this.pos.y + zoom / 2;
    // }

  }

  displayMaze() {
    // console.log(this.pos);
    push();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.mazeR, this.mazeR);
    pop();
  }

  displayPlayers() {
    // console.log(this.pPlayers.length);
    for (let i = 0; i < this.count; i++) {
      let c = color('#FDE74C');
      push();
      fill(c);
      ellipse(this.pPlayers[i].x, this.pPlayers[i].y, this.playerR, this.playerR);
      pop();
    }
  }
}