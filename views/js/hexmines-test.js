var hex_size = 20;
var map_size = 8; // FIXME: This should be called map size, but I started with hexagons, and refactoring would be too hard
var origin;
var padding = 0;
var grid_type = "HEXAGON" // Change this value for different grid types (HEXAGON, TRIANGLE, PARRALELOGRAM, RECTANGLE)
var intersections = [];

function setup() { 
  createCanvas(700, 700);
	angleMode(RADIANS);
	origin = createVector(width/2, height/2);
} 

function draw() { 
  background(32);
	stroke(255);
	strokeWeight(1);
	
	//translate(300, 300);
	if(grid_type == "HEXAGON"){
		for (var q = -map_size; q <= map_size; q++) {
				var r1 = max(-map_size, -q - map_size);
				var r2 = min(map_size, -q + map_size);
				for (var r = r1; r <= r2; r++) {
					draw_hexagon(hex_to_pixel(q, r), hex_size, q, r);
				}
		}
	}
	else if(grid_type == "TRIANGLE"){
		translate(-width/2 + 25, -height/2 +50);
		var map_size = map_size * 2;
		for (var q = 0; q <= map_size; q++) {
				for (var r = 0; r <= map_size - q; r++) {
					draw_hexagon(hex_to_pixel(q,r), hex_size, q, r);
				}
		}
	}
	else if(grid_type == "PARALELLOGRAM"){

		for (var q = -map_size; q <= map_size; q++) {
    	for (var r = -map_size; r <= map_size; r++) {
        //map.insert(Hex(q, r, -q-r)));
				draw_hexagon(hex_to_pixel(q,r), hex_size, q, r);
    	}
		}
	}
	else if(grid_type == "RECTANGLE"){
		translate(-width/2 + 30, -height/2 + 80);
		for (var r = 0; r < map_size * 2; r++) {
				var r_offset = floor(r/2); // or r>>1
				for (var q = -r_offset; q < (map_size*2) - r_offset; q++) {
					draw_hexagon(hex_to_pixel(q,r), hex_size, q,r);
				}
		}
	}
	strokeWeight(8);
	stroke(255, 180);
	for(var i = 0; i < intersections.length; i++){
		point(intersections[i].x, intersections[i].y);
	}
	intersections = [];

		
	
}

function pixel_to_hex(x, y){
	q= (x*sqrt(3)/3-y/3)/hex_size;
	r=(-x/3+sqrt(3)/3*y)/hex_size;
	return createVector(round(q),round(r));
}

function hex_to_pixel(q, r) {
	// This is basically a matrix multiplication between a hexagon orientation matrix 
	// and the vector {q; r}
    var x = (sqrt(3) * q + sqrt(3)/2 * r) * (hex_size ) ;
    var y = (0 * q + 3/2 * r) * hex_size;
    return createVector(x + origin.x, y + origin.y);
}


function draw_hexagon(center, size, q, r, drawCities = true){
	points = [];
	for(var i = 0; i < 6; i++){
		points.push(hex_corner(center, size - padding, i));
		var c = hex_corner(center, size, i);
		if(intersections_includes(c) == false && drawCities)
			intersections.push(c);

	}
	
	beginShape();
	for(i = 1; i <= 6; i++){
		fill(map(-q-r, -map_size, map_size, 0, 255),
			map(r, -map_size, map_size, 0, 255), 
				map(q, -map_size, map_size, 0, 255));
		point(points[i % 6].x, points[i % 6].y);
		vertex(points[i % 6].x, points[i % 6].y);
		line(points[i-1].x, points[i-1].y, points[i % 6].x, points[i % 6].y);
	}
	endShape();
	fill(255);
	
	textSize(10);
	textAlign(CENTER, CENTER);
	text(q + " " + r + " \n" + (-q-r), center.x + 1, center.y + 2)
	
}

function intersections_includes(c){
	for(var i = 0; i < intersections.length; i++){
		// I have to use approx because the padding rsults in the 
		// intersections not having the EXACT same location (and other things don't line up)
		if(approx(intersections[i].x,c.x) && approx(intersections[i].y, c.y)){
			return true;
		}
	}
	return false;
}

epsilon = padding + 1;

function approx(a,b){
	if(abs(a - b) < epsilon)
		return true;
	return false;
}

function hex_corner(center, size, i){
    var angle_deg = 60 * i   + 30
    var angle_rad = PI/180 * angle_deg;
    return createVector(center.x + size * cos(angle_rad),
                 center.y + size * sin(angle_rad));
}