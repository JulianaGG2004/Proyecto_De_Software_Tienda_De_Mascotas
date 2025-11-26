import CategoryModel from "../models/category.model.js"

export const AddCategoryController = async(request, response)=>{
    try {

        const { name, image } = request.body

        if(!name || !image){
            return response.status(400).json({
                message : "Ingrese los parametros requeridos.",
                error: true,
                success : false
            })
        }

        const addCategory = new CategoryModel({
            name,
            image
        })

        const saveCategory = await addCategory.save()

        if(!saveCategory){
            return response.status(500).json({
                message : "Hubo un error al crear la Categoría",
                error : true,
                success : false
            })
        }

        return response.json({
            message : "Categoría registrada exitosamente",
            data : saveCategory,
            success : true,
            error : false
        })
        
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getCategoryController = async(request, response)=>{
    try {
        const data = await CategoryModel.find()

        return response.json({
            data : data,
            error : false,
            success :true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const updateCategoryController = async(request, response)=>{
    try {
        const { categoryId, name, image} = request.body

        const update = await CategoryModel.updateOne({
            _id : categoryId
        },{
            name,
            image
        })

        return response.json({
            message : "Categoría actualizada exitosamente",
            success : true,
            error : false,
            data : update
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error :true,
            success : false
        })
    }
}