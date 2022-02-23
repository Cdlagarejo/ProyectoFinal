const pool = require('../../../database.js')
class BookModel {
    constructor(){
        
    }
    async insert ({author,isbn,publication_date,title}) {
        const response = await pool.query(`INSERT INTO db_mi_libreria.tbl_book (author,isbn,publication_date,title) values ('${author}','${isbn}','${publication_date}','${title}') `);
        return response;
    }
    async update ({id,author,isbn,publication_date,title}) {

        const response = await pool.query(`
        update db_mi_libreria.tbl_book set
        author = '${author}', 
        isbn = '${isbn}',
        publication_date = '${publication_date}',
        title =  '${title}'
        where id = ${id}
        `);
        return response;
    }
    async delete (id) {
        const response = await pool.query(`delete from  db_mi_libreria.tbl_book where id =  ${id}`);
        return response;
    }
    async get_all () {
        const response = await pool.query('select * from  db_mi_libreria.tbl_book');
        return response;
    }
    async get_by_id (id) {
        const response = await pool.query(`select * from  db_mi_libreria.tbl_book where id =  ${id}`);
        return response;
    }
}


module.exports = BookModel;