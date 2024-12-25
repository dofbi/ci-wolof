chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.action === 'getSelectedText'){
        chrome.scripting.executeScript({
            target: { tabId: sender.tab.id },
            function: () => {
                return window.getSelection().toString();
                }
            },
            (injectionResult) => {
                sendResponse({ text: injectionResult[0].result });
            }
        );
        return true;
    }
    else if (request.action === 'translateText') {
        const text = request.text;
        const api = request.api;

        //  faire la requette à l'api
        translateWithApi(text, api)
            .then(translation => {
                sendResponse({ translation: translation });
            }).catch(error => {
                sendResponse({ error: error.message });
            });
        return true;
    }
    return false;
});

async function translateWithApi(text, api) {
    // pour l'instant on ne prend en charge que la version huginface
    try {
        const response = await fetch('https://api-inference.huggingface.co/models/julesgm/mbart-50-one-to-many-mmt-wolof', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: text
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        return data[0].translation_text;
    } catch (error) {
        throw new Error(`Error during API call: ${error.message}`);
    }
}