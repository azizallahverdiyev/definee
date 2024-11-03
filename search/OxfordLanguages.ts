function OxfordLanguages(webviewRef: any) {
  const jsCode = `
        (
        function() {
          let tryCount = 0


          function fetchData() {
            const containers = document.querySelectorAll("[jsname^=r5Nvmf]");
            if (containers.length > 0) {
       
                setTimeout(() => {

                for (let i = 0; i < containers.length; i++) {
                const containerType = containers[i].querySelector("[class^=YrbPuc]").textContent;
                for (let j = 0; j < containers[i].querySelectorAll("[data-dobid^=dfn]").length; j++) {
                    const currmeaning = containers[i].querySelectorAll("[data-dobid^=dfn]")[j].textContent;
                    const currexample = containers[i].querySelectorAll("[class^=ZYHQ7e]")[j];
                    if (currexample) {
                      window.ReactNativeWebView.postMessage(JSON.stringify({"type": containerType, "meaning": currmeaning, "example": currexample.textContent}));
                    }
                    else {
                      window.ReactNativeWebView.postMessage(JSON.stringify({"type": containerType, "meaning": currmeaning }));
                    }
                }
    
                }
                }, 500);
                
                

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

export { OxfordLanguages };
