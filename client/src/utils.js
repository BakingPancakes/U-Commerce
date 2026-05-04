const domainToCollege = {
    "umass.edu": "18502fe8-e548-4b43-b78e-5de6d39418ae",
    "amherst.edu": "b35870bb-e1ba-4cb8-9400-b1a4194e143d",
    "smith.edu": "dd02db02-b8ab-48c0-8af7-c26d1425e087",
    "mtholyoke.edu": "a0eced9e-cbd6-4c7c-b017-41d85a57aa8d"
} //static hardcoded map for now

const idToName  = {
    "18502fe8-e548-4b43-b78e-5de6d39418ae": "UMass Amherst",
    "b35870bb-e1ba-4cb8-9400-b1a4194e143d": "Amherst College",
    "dd02db02-b8ab-48c0-8af7-c26d1425e087": "Smith College",
    "a0eced9e-cbd6-4c7c-b017-41d85a57aa8d": "Mt. Holyoke College"
}

/**
 * Returns the college associated with the email
 * @param {string} email 
 * @returns a string representing the college name, or undefined if invalid domain
 */
export function getCollege(email){
    return domainToCollege[email.split("@")[1]]
}

export function getCollegeName(id) {
    return idToName[id];
}
