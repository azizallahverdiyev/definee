function AmericanHeritage(webviewRef: any) {
  const jsCode = `

      (

      function() {
        let tryCount = 0;

        function fetchData() {

          const elements = document.querySelectorAll(".module__title");

          if (elements.length > 0) {

            const containers = document.querySelectorAll(".module--definitions__group");

            for (let i = 0; i < containers.length; i++) {

              const containerType = containers[i].querySelector(".module--definitions__part-of-speech").textContent;

              for (let j = 0; j < containers[i].querySelectorAll(".module--definitions__definition").length; j++) {

                const currmeaning = containers[i].querySelectorAll(".module--definitions__definition")[j].textContent.split('Similar:')[0].split('"')[0].trim();

                const currexample = containers[i].querySelectorAll(".module--definitions__definition")[j].querySelector(".module--definitions__usage");

                if (currexample) {

                  window.ReactNativeWebView.postMessage(JSON.stringify({"type": containerType, "meaning": currmeaning, "example": currexample.textContent}));

                }

                else {

                  window.ReactNativeWebView.postMessage(JSON.stringify({"type": containerType, "meaning": currmeaning}));

                }

              }


            }

          } else {
            tryCount = tryCount + 1
            if (tryCount <= 10) {
              setTimeout(() => fetchData(), 500);
            }
            else {
              window.ReactNativeWebView.postMessage(JSON.stringify({type: "notfound"}));
            }

          }

        }

        fetchData();

        

      })();

    `;

  if (webviewRef.current) {
    webviewRef.current.injectJavaScript(jsCode);
  }
}

export { AmericanHeritage };
