//Do not share this token
//TODO input your own API token
const TOKEN = 'COHERE_API_KEY'

// this is where we call the API to summarize the review
function summarize(cell_value) {

    let raw = JSON.stringify({
        "message": "Summarize this in about 10 words: " + cell_value,
        "temperature": 0.2,
        "model": "command-r-plus-08-2024",
    });
    let requestOptions = {
        'method': 'post',
        'muteHttpExceptions': true,
        'contentType': 'application/json',
        'headers': {
            'Authorization': 'Bearer ' + TOKEN
        },
        'payload': raw,
        redirect: 'follow'
    };
    
     let response = UrlFetchApp.fetch("https://api.cohere.ai/v1/chat", requestOptions)
     let responseContentTxt = JSON.parse(response.getContentText());
     let summarizedTxt = "SUMMARY: " + responseContentTxt.text + "\n";
     return summarizedTxt;

}