
/**
 * Cell class
 * @constructor Cell
 * 
 */
class HexCell{
  constructor(size, q, r, map_size, width, height){
  // this.i = i;
  // this.j = j;
  
  
  // this.x = i * w;
  // this.y = j * w;
  // this.w = w;
  // this.neighborCount = 0;

  // this.mine = false;
  // // this.marked = false;
  // this.revealed = false;
  // this.isFlag = false
  // this.gameOver = false
  // this.neighborFlags = 0
  // this.neighbourCells = []
  
  // this.revealedCount = 0
  // this.flagCount = 0
  // this.hex = hex
  // this.xOffset = w / 2;
  // this.yOffset = w;
  
  this.textOffsetX = (this.w * 0.5 )
  this.textOffsetY = (this.w - 6)
  
  this.poly = []
  this.width = width
  this,height = height
  this.q = q;
  this.r = r;
  this.size = size;
  this.map_size = map_size;
  this.hex_size = 20
  this.origin = createVector(this.width/2, this.height/2);
  this.center = this.hex_to_pixel(this.q, this.r);
  this.padding = 0
  this.intersections = []
  this.epsilon = this.padding + 1;
  this.show_location()
  }
  
  show_location(){
    console.log(this.center)
  }
  
  
  show(center = this.center, size = this.size, q = this.q, r = this.r, drawCities = false){
    // translate(100,100);
  	var points = [];
  	for(var i = 0; i < 6; i++){
  		points.push(this.hex_corner(center, size - this.padding, i));
  		var c = this.hex_corner(this.center, this.size, i);
  		if(this.intersections_includes(c) == false && drawCities){
  			this.intersections.push(c);
  		}
	  }
  	beginShape();
  	for(i = 1; i <= 6; i++){
  		fill(map(-q-r, -this.map_size, this.map_size, 0, 255),
  			map(r, -this.map_size, this.map_size, 0, 255), 
  				map(q, -this.map_size, this.map_size, 0, 255));
  		point(points[i % 6].x, points[i % 6].y);
  		vertex(points[i % 6].x, points[i % 6].y);
  		line(points[i-1].x, points[i-1].y, points[i % 6].x, points[i % 6].y);
  	}
  	endShape();
  	fill(255);
  	
  	textSize(10);
  	textAlign(CENTER, CENTER);
  	text(q + " " + r + " \n" + (-q-r), this.center.x + 1, this.center.y + 2)
  }  
    intersections_includes(c){
    	for(var i = 0; i < this.intersections.length; i++){
    		// I have to use approx because the padding rsults in the 
    		// intersections not having the EXACT same location (and other things don't line up)
    		if(this.approx(this.intersections[i].x,c.x) && this.approx(this.intersections[i].y, c.y)){
    			return true;
    		}
    	}
    	return false;
    }

    hex_corner(center, size, i){
        var angle_deg = 60 * i   + 30
        var angle_rad = PI/180 * angle_deg;
        return createVector(center.x + size * cos(angle_rad),
                     center.y + size * sin(angle_rad));
    }
    
    approx(a,b){
    	if(abs(a - b) < this.epsilon)
    		return true;
    	return false;
    }
    
    pixel_to_hex(x, y){
    	var q= (x*sqrt(3)/3-y/3)/this.hex_size;
    	var r=(-x/3+sqrt(3)/3*y)/this.hex_size;
    	return createVector(round(q),round(r));
    }
    
    hex_to_pixel(q, r) {
    	// This is basically a matrix multiplication between a hexagon orientation matrix 
    	// and the vector {q; r}
        var x = (sqrt(3) * q + sqrt(3)/2 * r) * (this.hex_size) ;
        var y = (0 * q + 3/2 * r) * this.hex_size;
        console.log(x, y)
        return createVector(x + this.origin.x, y + this.origin.y);
    }  
  
  
}
