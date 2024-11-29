// structuredDataJSON.js

// Function 1
function parseJSON(json) {
  // Your code here
  return JSON.parse(json)
}

// Function 2
function stringifyJSON(obj) {
  // Your code here
  return JSON.stringify(obj)
}

// Function 3
function getValueFromJSON(obj, key) {
  // Your code here
  let value = obj[key]
  return value

}

// Function 4
function updateValueInJSON(obj, key, value) {
  // Your code here
  obj[key] = value
  return obj
}

// Function 5
function removeKeyFromJSON(obj, key) {
  // Your code here
  delete obj[key]
  return obj
}

// Function 6
function filterByAttribute(json, attr) {
  const filtered = {}

  for (let key in json) {
    if (Array.isArray(json[key])) {
      // Filtre le tableau pour ne garder que les objets qui possèdent `attr`
      const filteredArray = json[key].filter(item => item.hasOwnProperty(attr));
      if (filteredArray.length > 0) {
        filtered[key] = filteredArray
      }
    }
  }

  return filtered
}

// Function 7

function sortByAttribute(json, attr) {
  // Parcours chaque clé de l'objet JSON
  for (let key in json) {
    // Si la valeur de la clé est un tableau
    if (Array.isArray(json[key])) {
      // Trier ce tableau selon l'attribut spécifié (attr)
      json[key].sort((a,b) => (a[attr] - b[attr]))
    }
  }
  return json
}

// Function 8
function countAttributes(json) {
  // Your code here
  let count = 0
  // Parcourir les clé de l'objet JSON
  for (let key in json){
      // Si la valeur de la clé est un tableau
      if(Array.isArray(json[key])) {
        count += Object.keys(json).length
      }
  }

  return count
}

// Function 9
function findNestedValue(json, path) {
  //Find and return the value at the given nested path in the JSON object.
  //Découper le path avec split(retourne un tableau avec les différents éléments)
  const segments = path.split(/[\.\[\]]+/).filter(Boolean)
  let result = json

  //On a maintenant les différents éléments du path. Example : ['people', '0', 'name']
  // Parcourt chaque segment du tableau `keys` (les parties du chemin)
  for (const segment of segments) {
    // Vérifie si `result` existe et si la clé actuelle (`key`) est présente dans `result`
    if (result && segment in result) {
      // Si oui, met à jour `result` avec la valeur associée à cette clé
      result = result[segment];
    } else {
      // Si `result` est null/undefined ou si la clé n'existe pas, retourne `undefined`
      return undefined;
    }
  }

  return result
}

// Function 10
function flattenJSON(obj) {
  // Crée un objet vide pour stocker le résultat aplati
  const result = {}
  // Parcourt chaque clé de l'objet d'entrée
  for(let key in obj){
    // Vérifie si la valeur de cette clé est un tableau
    if(Array.isArray(obj[key])) {
      // Si c'est un tableau, parcourt chaque élément du tableau
      obj[key].forEach((element, index) => {
        // Vérifie si l'élément du tableau est un objet
        if(typeof element === 'object' && element !== null){
          // Si l'élément est un objet, aplatir ses propriétés et les ajouter au résultat
          for(let subKey in element) {
            // Ajouter l'élément aplati à l'objet résultat
            result[`${key}[${index}].${subKey}`] = element[subKey]
          }
        }else{
          // Si l'élément n'est pas un objet, l'ajouter tel quel dans l'objet résultat
          result[`${key}[${index}]`] = element
        }       
      })
      // Si la valeur n'est pas un tableau mais un objet, aplatir directement cet objet    
    }else if (typeof obj[key] === 'object' && obj[key] !== null){
      const subObj = flattenJSON(obj[key])
      for (let subKey in subObj) {
        result[`${key}.${subKey}`] = subObj[subKey];
      }
    }else{
      // Si la valeur est une valeur primitive, l'ajouter directement au résultat
      result[key] = obj[key]
    } 
  }
// Retourner l'objet aplati
console.log(result)
return result
}

module.exports = {
  parseJSON,
  stringifyJSON,
  getValueFromJSON,
  updateValueInJSON,
  removeKeyFromJSON,
  filterByAttribute,
  sortByAttribute,
  countAttributes,
  findNestedValue,
  flattenJSON,
};