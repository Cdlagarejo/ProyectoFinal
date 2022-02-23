const pool = require('../../../database.js')


class BookReviewModel {
    constructor (){

    }

    async insert ({id_user,id_book,review_text}) {
        const response = await pool.query(`INSERT INTO db_mi_libreria.tbl_book_review (id_user,id_book,review_text) VALUES (${id_user},${id_book},'${review_text}')`);
        return response;
    }
    async update ({id,id_user,id_book,review_text}) {
        const response = await pool.query(`
        UPDATE db_mi_libreria.tbl_book_review
        SET review_text = '${review_text}'
        WHERE id = ${id} and id_user = ${id_user} and id_book = ${id_book}
        
        `);
        return response;
    }
    async delete (id) {
        const response = await pool.query(`delete from db_mi_libreria.tbl_book_review WHERE id = ${id}`);
        return response;
    }
    async get_all () {
        const response = await pool.query(`select * from db_mi_libreria.tbl_book_review`);
        return response;
    }
    async get_by_id (id) {
        const response = await pool.query(`select * from db_mi_libreria.tbl_book_review WHERE id = ${id}`);
        return response;
    }
    async get_by_user (id_user) {
        const response = await pool.query(`select * from db_mi_libreria.tbl_book_review WHERE id_user = ${id_user}`);
        return response;
    }

    async get_by_book (id_book) {
        const response = await pool.query(`select * from db_mi_libreria.tbl_book_review  where id_book = ${id_book}`);
        return response;
    }
}

module.exports = BookReviewModel;