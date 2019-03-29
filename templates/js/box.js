 function getAccessToken() {

    var ttl = sessionStorage.getItem("ttl");
    var now = new Date().getTime();
    console.log("ttl:" + (ttl-now)/1000);
    //Update token if less than 4 mins left
    var timeLeft = (ttl-now)/1000;
    if(timeLeft<240 && timeLeft>10) {
        getToken(sessionStorage.getItem("urlParams"),writeUpdate());
    }

  return sessionStorage.getItem("accessToken");
  };
function writeUpdate() {
  console.log("token updated from generator");
}

function getToken(urlParams,callback) {
  return $.ajax({
    //url: 'https://box-heroku-token-generator.herokuapp.com/jwttokengenerator?',
    url: 'http://localhost:9090/jwttokengenerator?',
    headers: {},
    type: 'get',
    data:urlParams,
    success: function(response) {
      console.log("accessToken:" + response.userToken);
      sessionStorage.setItem("accessToken",response.userToken);
      sessionStorage.setItem("ttl",response.ttl);
      sessionStorage.setItem("urlParams",urlParams);
      callback;
    },
    error: function(xhr, status, error) {
      console.log(JSON.stringify(xhr));
      console.log("error:" + xhr.responseText);

  }
});
}
function login(page,urlParams) {
  getToken(urlParams,redirect(page));

}
function redirect(page) {
  window.location.replace(page);
}
