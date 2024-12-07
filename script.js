/* COPYRIGHT (C) 2024 - SWATHYMOL SAJEEV | GNU General Public License v3.0

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, 
either version 3 of the License, or (at your option) any later version. This program is distributed in the hope that it will be useful,but WITHOUT ANY WARRANTY; 
without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>. */

const resultElement = document.getElementById("result");
let recognition;

function startConverting(){
    
    if('webkitSpeechRecognition' in window){

        recognition = new webkitSpeechRecognition();

        setupRecognition(recognition);
        recognition.start();
    }

}

function stopConverting(){

    if(recognition){
        recognition.stop();
    }


}

function setupRecognition(recognition){

    recognition.continuous = true;

    recognition.interimResults = true;

    recognition.lang = 'en-US';

    recognition.onresult = function(event){

        const {finalTranscript, interTranscript} = processResult(event.results);

        resultElement.innerHTML = finalTranscript + interTranscript;

    }


}

function processResult(results){

    let finalTranscript = '';
    let interTranscript = '';

    for(let i = 0; i < results.length; i++){

        let transcript = results[i][0].transcript;
        transcript.replace("\n", "<br>");

        if(results[i].isFinal){

            finalTranscript += transcript;

        }else{

            interTranscript += transcript;
        }
    }

    return {finalTranscript, interTranscript}

}