import UserModel from '../models/user.model.js'

export async function registerUserController(request, response) {
    try {
        const { name, email, password} = request.body
        
        if(!name || !email || !password){
            return response.status(400).json({
                message : "Ingrese el correo, nombre de usuario y contraseña",
                error : true,
                success : false
            })
        }

        const user = await UserModel.findOne({ email })

        if (user){
            return response.json({
                message : "Error, el correo registrado ya existe",
                error : true,
                success : false
            })
        }
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error: true,
            success : false
        })
    }
}