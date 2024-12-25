document.addEventListener('DOMContentLoaded', function() {
    const selectedTextarea = document.getElementById('selectedText');
    const translationResult = document.getElementById('translationResult');
    const translateBtn = document.getElementById('translateBtn');
    const apiChoiceSelect = document.getElementById('apiChoice');
 
    // Demander au background le texte selectionné quand la popup est chargé
    chrome.runtime.sendMessage({ action: 'getSelectedText' }, function(response) {
        if (response && response.text) {
          selectedTextarea.value = response.text;
        }
     });
    // Evenement pour le bouton "Traduire"
    translateBtn.addEventListener('click', function() {
        const selectedText = selectedTextarea.value;
        const apiChoice = apiChoiceSelect.value;
         chrome.runtime.sendMessage({
           action: 'translateText',
           text: selectedText,
            api: apiChoice
            }, function(response) {
                if (response && response.translation) {
                     translationResult.textContent = response.translation;
                  } else if(response && response.error){
                      translationResult.textContent = response.error;
                  }
              });
     });
 });