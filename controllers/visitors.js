const axios = require('axios')
const moment = require('moment')

module.exports.getVisitors = (req,res) =>{

  let url = `https://data.lacity.org/resource/trxm-jn3c.json`
  if(req.query.date){
    let date = moment(new Date(Number(req.query.date))).format()
    var month = moment(date).set({'date': 1}).format('YYYY-MM-DDT00:00:00.000');
    url = url + `?month=${month}`
  }

  let ignored = req.query.ignore ? req.query.ignore : ""
    axios.get(url)
        .then(response => {
            let allVisitors = response.data
            let responseArr = []
            for(visitor of allVisitors){
              let returnObj = {};
              if(req.query.date){
                returnObj.month = moment(new Date(Number(req.query.date))).format('MMM')
                returnObj.year = moment(new Date(Number(req.query.date))).format('Y')
              }
              else{
                returnObj.month = moment(visitor.month).format('MMM')
                returnObj.year = moment(visitor.month).format('Y')
              }

              returnObj.total = getSum(visitor,ignored)

              let max = getMax(visitor, ignored)
              let min = getMin(visitor, ignored)

              returnObj.highest = {} 
              returnObj.lowest = {}
              returnObj.highest.museum = max
              returnObj.highest.visitors = visitor[max]
              returnObj.lowest.museum = min 
              returnObj.lowest.visitors = visitor[min]

              
              if(ignored !== ""){
                returnObj.ignored = {}
                returnObj.ignored.museum = ignored
                returnObj.ignored.visitor =  visitor[ignored]
              }
              
              responseArr.push(returnObj)
            }
            res.json(responseArr);
        }, error => {
            console.log(error);
            res.send(error);
    });
}

getMax = (visitor, ignored) => {
  let max = Object.keys(visitor).reduce((a, b) =>  {   
    if(ignored !== ""){ 
      if(a !== ignored && b !== ignored){
        return  parseInt(visitor[a]) > parseInt(visitor[b]) ? a : b
      }
    }   
    else    return  parseInt(visitor[a]) > parseInt(visitor[b]) ? a : b
  });
  return max;
}
getMin = (visitor, ignored) => {
  let min = Object.keys(visitor).reduce((a, b) =>  { 
    if(ignored !== ""){ 
      if(a !== ignored && b !== ignored){
        return  parseInt(visitor[a]) < parseInt(visitor[b]) ? a : b
      }
    }   
    else    return  parseInt(visitor[a]) > parseInt(visitor[b]) ? a : b
  });
  return min
}
getSum = (visitor, ignored) => {
  console.log(visitor)
  let sum = 0
  Object.keys(visitor).forEach((current) =>  { 
    console.log(visitor[current])
    if(current !== 'month'){
      if(ignored !== "" && current != ignored){ 
        sum = sum + parseInt(visitor[current])
      }   
    }
  });
  return sum
}

