









(function () {
    var context = document.querySelector('#context');
    var form = document.querySelector('#senddata');
    form.addEventListener('submit', function(evt){
       evt.preventDefault();
      ajax('post.php?nom=wassim',form,'POST')
 
})

     ajax('get.php?nom=wassim',context,'GET')

    ajax('get.php?nom=callbak',v=>{
        console.log('afiche par callbak  '+v)
        
    },'GET')







/////////////////simple or callbak///////////////////////////////////////////

    function ajax(url,element,method) {
        
        var getHttpRequest = function () {
            var httpRequest;
            // ancien code de compatibilité, aujourd’hui inutile
            if (window.XMLHttpRequest) { // Mozilla, Safari, ...
                httpRequest = new XMLHttpRequest();
            } else if (window.ActiveXObject) { // IE
                httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            }
            return httpRequest
        }
        var httpRequest = getHttpRequest();
        var data;



        httpRequest.open(method, url, true);
       if(method==='POST'){
        data = new FormData(element); }
        else{
              httpRequest.onreadystatechange = function () {

                            if (httpRequest.status === 200 && httpRequest.readyState===4) {
                                        if(typeof element === 'function'){
                                                element(httpRequest.responseText)
                                        }
                                        else{
                                          element.innerHTML = httpRequest.responseText
                                          console.log(httpRequest.responseText);}
                              } else {
                                  if(httpRequest.readyState===4){
                                  console.log('Un problème est survenu avec la requête.');
                              }
                              }


            }
        }



        httpRequest.send(data); 
        }
        
        
   ///////////////////par methode promis//////////////////////////////////     

    function promiseAjax(url,data,method){
        return new Promise((Resolve,Catch)=>{
             var getHttpRequest = function () {
            var httpRequest;
            // ancien code de compatibilité, aujourd’hui inutile
            if (window.XMLHttpRequest) { // Mozilla, Safari, ...
                httpRequest = new XMLHttpRequest();
            } else if (window.ActiveXObject) { // IE
                httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            }
            return httpRequest
        }
        var httpRequest = getHttpRequest();
        httpRequest.open(method, url, true);
       if(method==='POST'){
        data = new FormData(data); }
        else{
              httpRequest.onreadystatechange = function () {

                            if (httpRequest.status === 200 && httpRequest.readyState===4) {
                                Resolve(httpRequest.responseText)
                                       
                              } else {
                                  if(httpRequest.readyState===4){
                                         Catch(httpRequest)
                                  
                              }
                              }


            }
        }



        httpRequest.send(data); 
            
        })
    }
    
    
    promiseAjax('get.php?nom=promise',null,'GET')
            .then(v=>{console.log('metode promise'+v)})
            .catch(v=>console.log('metode promise'+v))
    

})()

