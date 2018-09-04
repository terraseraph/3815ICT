var w = 10;
    var cols, rows, value;
 
 
    function setup() {
        createCanvas(500, 500);
        video = createCapture(VIDEO);
        video.size(width, height);
        video.hide();
    }
 
    function draw() {
        video.loadPixels();
 
        //background(102);
 
        for (var x = 0; x < width + w; x += (w * cos(PI / 6) * 2)) { 
            index = 0;
            for (var y = 0; y < height + w; y += w * (1 + cos(PI / 3))) { 
 
                var loc = (y + x * width) * 4;
 
    // The functions red(), green(), and blue() pull out the three color components from a pixel.
                var r = video.pixels[loc];
                var g = video.pixels[loc + 1];
                var b = video.pixels[loc + 2];
 
                fill(r, g, b);
 
                push(); {
                    translate(x - ((w * cos(PI / 6)) * (index % 2)), y);
                    rotate(radians(30));
                    polygon(0, 0, 10, 6);
                }
                pop();
 
                index++;
                console.log(loc);
 
            }
        }
 
    }
 
    function polygon(x, y, radius, npoints) {
        var angle = TWO_PI / npoints;
        beginShape();
        for (var a = 0; a < TWO_PI; a += angle) {
            var sx = x + cos(a) * radius;
            var sy = y + sin(a) * radius;
            vertex(sx, sy);
        }
        endShape(CLOSE);
    }