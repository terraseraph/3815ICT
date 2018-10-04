

describe("Cow", function() {
  describe("constructor", function() {
    it("Should load scores", function() {
        scores = new Scores()
        scores.load_scores(function(data){
            assert(data, typeof Object)
            
        })
    });

    it("should set cow's name if provided", function() {
        ms = new Minesweeper(100, 100, 10)
        console.log(ms.grid)
    });
  });

//   describe("#greets", function() {
//     it("should throw if no target is passed in", function() {

//     });

//     it("should greet passed target", function() {

//     });
//   });
});