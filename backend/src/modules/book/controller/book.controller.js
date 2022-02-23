const BookModel = require('../model/book.model.js')

class Book {
    constructor () {
        this.bookModel = new BookModel();
    }

    async insert ({author,isbn,publication_date,title}) {
        try {
            const response = await this.bookModel.insert({author,isbn,publication_date,title});
            return {mensaje: 'registro exitoso',code: undefined,object :{
                id: response.insertId ,author,isbn,publication_date,title 

            }};
        } catch (error) {
            return {mensaje: error.code,code: error.errno,object: undefined};;
        }
    }
    async update ({id,author,isbn,publication_date,title}) {
        try {
            const response = await this.bookModel.update({id,author,isbn,publication_date,title});
            return {mensaje: 'actualización exitosa',code: undefined,object :{
                id: response.insertId ,author,isbn,publication_date,title 

            }};
        } catch (error) {
            return {mensaje: error.code,code: error.errno,object: undefined};;
        }
    }
    async delete (id) {
        try {
            const response = await this.bookModel.delete(id);
            return {mensaje: 'eliminación exitosa',code: undefined,object :{
                id

            }};
        } catch (error) {
            return {mensaje: error.code,code: error.errno,object: undefined};;
        }
    }
    async get_all () {
        try {
            const response = await this.bookModel.get_all();
            return {mensaje: 'busqueda exitosa',code: undefined,object :response};
        } catch (error) {
            return {mensaje: error.code,code: error.errno,object: undefined};;
        }
    }
    async get_by_id (id) {
        try {
            const response = await this.bookModel.get_by_id(id);
            return {mensaje: 'busqueda exitosa',code: undefined,object :response};
        } catch (error) {
            return {mensaje: error.code,code: error.errno,object: undefined};;
        }
    }


}

module.exports = Book;