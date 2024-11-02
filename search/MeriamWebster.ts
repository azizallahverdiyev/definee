function MeriamWebster(webviewRef) {
  const jsCode = `
          (
            function() {
              let tryCount = 0;
    
              function fetchData() {
              const notAvailable = document.querySelector(".no-spelling-suggestions");
              if (notAvailable) {
                window.ReactNativeWebView.postMessage(JSON.stringify({"type": "", "meaning": "No results"}));

              }
              else {
               const containers = document.querySelector("#left-content").querySelectorAll(".entry-word-section-container");
                if (containers.length > 0) {
                    
                    for (let i = 0; i < containers.length; i++) {
                    const containerType = containers[i].querySelector(".parts-of-speech").textContent.split(" ")[0];
                    for (let j = 0; j < containers[i].querySelectorAll(".vg-sseq-entry-item").length; j++) {
                        const defContainer = containers[i].querySelectorAll(".vg-sseq-entry-item")[j];
                        const badge = defContainer.querySelector(".badge")
                        if (!badge) {
                            for (let z = 0; z < defContainer.querySelectorAll(".dt").length; z++) {
                                const currDef = defContainer.querySelectorAll(".dt")[z];
                                const checkReal = currDef.querySelector(".dtText").querySelector(".text-uppercase");
                                if (!checkReal) {
                                    const currmeaning = currDef.querySelector(".dtText").textContent.slice(2);
                                    const currexample = currDef.querySelector(".sub-content-thread");
                                    if (currexample && currexample.textContent) {

                                        window.ReactNativeWebView.postMessage(JSON.stringify({"type": containerType, "meaning": currmeaning, "example": currexample.textContent}));
                                        
                                    }
                                    else {
                                        window.ReactNativeWebView.postMessage(JSON.stringify({"type": containerType, "meaning": currmeaning }));
                                    }
                                }
                            }
                            }
                        }
                    }
                }
                else {
                    tryCount = tryCount + 1
                    if (tryCount <= 20) {
                      setTimeout(() => fetchData(), 500);
                    }
                    else {
                      window.ReactNativeWebView.postMessage(JSON.stringify({type: "notfound"}));
                    }
                  
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

export { MeriamWebster };
