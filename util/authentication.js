import bcrypt from 'bcrypt'

function validatePassword(password, repeatPassword) {
    return password === repeatPassword
}

async function hashPassword(password) {
    return await bcrypt.hash(password, 12)
}

async function checkPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword)

}

export {
    validatePassword,
    hashPassword,
    checkPassword
}