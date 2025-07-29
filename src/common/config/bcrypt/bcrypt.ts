import * as bcrypt from 'bcrypt';


export const hashPassword = async (password: string) => {
    const salt = 10
    return bcrypt.hash(password, salt)
} 


export const compirePass = async (pass: string, hashPass: string) => {
    return await bcrypt.compare(pass, hashPass)
}