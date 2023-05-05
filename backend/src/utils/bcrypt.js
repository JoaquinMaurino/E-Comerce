import bcrypt from 'bcrypt';

export const createCryptPass = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(12))

export const validatePass = (passwordSent, passwordDB)=> bcrypt.compareSync(passwordSent, passwordDB)