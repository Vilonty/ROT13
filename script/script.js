document.addEventListener('DOMContentLoaded', function() {
    
    const inputArea = document.getElementById('inputArea');

    inputArea.addEventListener('input', function() {
        encoder();
    });

    });

function encoder(){

    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let alphabetTopCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let inputText = document.getElementById('inputArea').value;

    let result = '';

    for(let i = 0;i < inputText.length; i++){

        for(let j = 0; j < alphabet.length; j++){

            if(inputText[i] == alphabet[j] || inputText[i] == alphabetTopCase[j]){   

                result += inputText[i] == alphabet[j] ? setAlphabet(alphabet, j) : setAlphabet(alphabetTopCase, j);
                punctuation = false;

            };
        };

        if(punctuation){

            result += inputText[i];

        };

        punctuation = true;

    };

    document.getElementById('outputArea').innerHTML = result;

};

function setAlphabet(alphabet, j){

    let res;

    if((j + 13) >= alphabet.length){

        res = alphabet[(j + 13) - alphabet.length];
    }else{

        res = alphabet[j + 13];
    }
    
    return res;
};