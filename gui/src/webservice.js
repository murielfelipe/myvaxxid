 
function webservice(method, data) {

    return new Promise((resolve, reject)=>{

        var url = 'https://'+window.location.host.split(':')[0]+':9000/'+ method;

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(response => {
            resolve(response)
        }).catch(error => console.error('Error:', error))
    })
}

module.exports = webservice