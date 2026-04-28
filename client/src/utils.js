const domainToCollege = {
    "umass.edu": "UMass Amherst",
    "amherst.edu": "Amherst College",
    "hampshire.edu": "Hampshire College",
    "smith.edu": "Smith College",
    "mtholyoke.edu": "Mt. Holyoke College",
}

/**
 * Returns the college associated with the email
 * @param {string} email 
 * @returns a string representing the college name, or undefined if invalid domain
 */
export function getCollege(email){
    return domainToCollege[email.split("@")[1]]
}
