const keccak256 = require('keccak256')


const generate = (patientdata) => {
     let patient = 
        (patientdata.name + '').replace(/[\r\n\s ]/gmi, '')+ 
        (patientdata.HealthCardID + '').replace(/[\r\n\s ]/gmi, '')+ 
        (patientdata.Email + '').replace(/[\r\n\s ]/gmi, '')+ 
        (patientdata.Phone + '').replace(/[\r\n\s ]/gmi, '')+ 
        (patientdata.PhotoURL + '').replace(/[\r\n\s ]/gmi, '')+ 
        (patientdata.DateOfBird + '').replace(/[\r\n\s ]/gmi, '')+ 
        (patientdata.VaccineId + '').replace(/[\r\n\s ]/gmi, '')+ 
        (patientdata.LotNumber + '').replace(/[\r\n\s ]/gmi, '')+ 
        (patientdata.ProductName + '').replace(/[\r\n\s ]/gmi, '')+       
        (patientdata.manufacturer + '').replace(/[\r\n\s ]/gmi, '')+ 
        (patientdata.quantityDose + '').replace(/[\r\n\s ]/gmi, '')+ 
        (patientdata.doseNumber + '').replace(/[\r\n\s ]/gmi, '')+ 
        (patientdata.inmunityDate + '').replace(/[\r\n\s ]/gmi, '')+ 
        (patientdata.vaccinationDate + '').replace(/[\r\n\s ]/gmi, '')+ 
        (patientdata.nonceNumber + '').replace(/[\r\n\s ]/gmi, ''); 
        console.log('patient => ' + patient)
        console.log('Nonce => ' + patientdata.nonceNumber)
        
    return keccak256(patient).toString('hex')
};



module.exports = {
    generate
};