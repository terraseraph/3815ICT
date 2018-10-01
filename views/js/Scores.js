class Scores{
    constructor(){
        this.id
    }
    
    
  /** Load the scores from file */
  load_scores(gameName = 'classic'){
    $.get("/get_scores/"+gameName, function(data){
      console.log("Scores loaded", data)
    //   data = JSON.stringify(data)
      for(var i = 0; i < data.Scores.Players.length; i++){
        var dat = data.Scores.Players[i]
        console.log(dat)
        if(dat.gameName == undefined){
            dat.gameName = "classic"
        }
        this.id = dat.id
          var table = (`<tr>
            <td>${dat.id}</td>
            <td>${dat.name}</td>
            <td>${dat.score}</td>
            <td>${dat.gameName}</td>
            <tr>
          `)
        $('#scores').append(table)
          
      }
    })
  }
  
  
  /** Save score to file */
  save_score(input_name, time, gameName, cb){
    $.get(`/save_score/${input_name}/${time}/${gameName}`, function(dat){
      cb(`Saved: ${input_name} : ${time}, ${gameName}`)
      var id = this.id + 1
        var table = (`<tr>
            <td>--</td>
            <td>${input_name}</td>
            <td>${time}</td>
            <td>${gameName}</td>
            <tr>
          `)
        $('#scores').append(table)
    })
  }
    
}