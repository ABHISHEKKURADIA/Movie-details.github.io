var myElement=document.getElementsByTagName("input")[0];
        var body=document.getElementsByTagName("body")[0];
        var div=document.getElementsByTagName("div")[0];
body.className="container-fluid mt-2";

        function apiCall()
        {
            let span=document.createElement("span");
            span.className="main col";
            let img=document.createElement("img");
            let p=document.createElement("p");
            let h1=document.createElement("h1");
            img.className="poster rounded img-responsive";
            $.getJSON('http://www.omdbapi.com/?i=tt3896198&apikey=aa00ff9e&t='+encodeURI(myElement.value)).then(function(res){
                if(res.Error=="Movie not found!" || res.Error=="Movie not found!")
                {
                    return false;
                }
                h1.innerHTML=res.Title+" ("+res.Released.slice(-4)+")";
                p.textContent=res.Plot;
                console.log(res);
                img.setAttribute("src",res.Poster);
                span.appendChild(img);
                span.appendChild(h1);
                span.appendChild(p);
                div.appendChild(span);
            });
            return false;
        };
 
        function sample()
        {
            let name="Ip Man";
            myElement.value=name;
            apiCall();

            name="Kung Fu Panda";
            myElement.value=name;
            apiCall();

            name="Don";
            myElement.value=name;
            apiCall();

            name="Boss";
            myElement.value=name;
            apiCall();

            name="Ip Man 2";
            myElement.value=name;
            apiCall();

            name="Ip Man 3";
            myElement.value=name;
            apiCall();
            return false;
        }

        function removeElement(e)
        {
            console.log(e);
            e.parentElement.remove();

            return false;
        }
