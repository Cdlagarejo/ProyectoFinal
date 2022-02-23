const BookReviewModel = require('../model/book_review.model.js')

class Book_Review {
    constructor (){
        this.bookReviewModel = new BookReviewModel();
    }
    async insert ({id_user,id_book,review_text}) {
        try {
            const response = await this.bookReviewModel.insert({id_user,id_book,review_text});
            return {mensaje : 'registro exitoso' ,code: undefined,object :{
                id: response.insertId ,id_user, id_book

            }};
        } catch (error) {
            return {mensaje: error.code,code: error.errno,object: undefined};
        }
    }

    async update ({id,id_user,id_book,review_text}) {
        try {
            const response = await this.bookReviewModel.update({id,id_user,id_book,review_text});
            return {mensaje : 'actualización exitosa' ,code: undefined,object :{
                id,id_user,id_book,review_text

            }};
        } catch (error) {
            return {mensaje: error.code,code: error.errno,object: undefined};
        }
    }

    async delete (id) {
        try {
            await this.bookReviewModel.delete(id);
            return {mensaje : 'eliminación exitosa' ,code: undefined,object :{
                deleted_id: id 

            }};
        } catch (error) {
            return {mensaje: error.code,code: error.errno,object: undefined};
        }

        
    }

    async get_all () {
        try {
            const response = await this.bookReviewModel.get_all();
            return {mensaje : 'busqueda exitosa' ,code: undefined,object :response};
        } catch (error) {
            return {mensaje: error.code,code: error.errno,object: undefined};
        }

        
    }

    
    async get_by_id (id) {
        try {
            const response = await this.bookReviewModel.get_by_id(id);
            return {mensaje : 'busqueda exitosa' ,code: undefined,object :response};
        } catch (error) {
            return {mensaje: error.code,code: error.errno,object: undefined};
        }

        
    }

        
    async get_by_user (id_user) {
        try {
            const response = await this.bookReviewModel.get_by_user(id_user);
            return {mensaje : 'busqueda exitosa' ,code: undefined,object :response};
        } catch (error) {
            return {mensaje: error.code,code: error.errno,object: undefined};
        }

        
    }

           
    async get_by_book (id_book) {
        try {
            const response = await this.bookReviewModel.get_by_book(id_book);
            return {mensaje : 'busqueda exitosa' ,code: undefined,object :response};
        } catch (error) {
            return {mensaje: error.code,code: error.errno,object: undefined};
        }

        
    }
}

module.exports = Book_Review;